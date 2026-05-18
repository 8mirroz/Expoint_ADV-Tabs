import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { CalculatorContainer } from './CalculatorContainer';
import { useCartStore } from '@/store/useCartStore';
import { useSalesEngineStore, initialSalesDraft } from '@/store/useSalesEngineStore';

const searchParams = new URLSearchParams();
const mockFetch = vi.mocked(fetch);

vi.mock('next/navigation', () => ({
  useSearchParams: () => searchParams,
}));

function setSearch(query = '') {
  searchParams.forEach((_, key) => {
    searchParams.delete(key);
  });
  const next = new URLSearchParams(query);
  next.forEach((value, key) => {
    searchParams.set(key, value);
  });
}

describe('CalculatorContainer', () => {
  beforeEach(() => {
    localStorage.clear();
    setSearch();
    useCartStore.setState({ items: [] });
    useSalesEngineStore.setState({ draft: initialSalesDraft });
    mockFetch.mockReset();
  });

  it('renders correctly for page and section surfaces', async () => {
    const { rerender } = render(<CalculatorContainer surface="page" />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Тип и сегмент' })).toBeInTheDocument();
    });
    expect(screen.getByTestId('calculator-total')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Тип и сегмент/i })).toHaveAttribute('aria-current', 'step');

    rerender(<CalculatorContainer surface="section" />);

    await waitFor(() => {
      expect(screen.getByText('Embedded configurator')).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: /Тип и сегмент/i })).toHaveAttribute('aria-current', 'step');
  });

  it('preserves entered state while moving between steps', async () => {
    render(<CalculatorContainer surface="page" />);

    fireEvent.click(await screen.findByRole('button', { name: 'Далее' }));

    const textInput = screen.getByLabelText('Текст / бренд');
    fireEvent.change(textInput, { target: { value: 'AURORA' } });

    fireEvent.click(screen.getByRole('button', { name: 'Далее' }));
    fireEvent.click(screen.getByRole('button', { name: 'Назад' }));

    expect(screen.getByLabelText('Текст / бренд')).toHaveValue('AURORA');
  });

  it('updates the live estimate and package totals when geometry changes', async () => {
    render(<CalculatorContainer surface="page" />);

    const totalBefore = (await screen.findByTestId('calculator-total')).textContent;

    fireEvent.click(screen.getByRole('button', { name: 'Далее' }));
    fireEvent.change(screen.getByLabelText('Высота, мм'), { target: { value: '900' } });

    await waitFor(() => {
      expect(screen.getByTestId('calculator-total').textContent).not.toBe(totalBefore);
    });

    fireEvent.click(screen.getByRole('button', { name: 'Далее' }));
    fireEvent.click(screen.getByRole('button', { name: 'Далее' }));

    await waitFor(() => {
      const packagePrice = (screen.getByTestId('package-price-business').textContent ?? '').replace(/\s+/g, ' ').trim();
      const total = (screen.getByTestId('calculator-total').textContent ?? '').replace(/\s+/g, ' ').trim();
      expect(packagePrice).toBe(total);
    });
  });

  it('saves to cart and resumes from cartItem metadata on reopen', async () => {
    const { unmount } = render(<CalculatorContainer surface="page" />);

    await screen.findByTestId('calculator-total');
    fireEvent.click(screen.getByRole('button', { name: /Коммерческая смета/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Добавить setup в корзину' }));

    await waitFor(() => {
      expect(useCartStore.getState().items).toHaveLength(1);
    });

    const savedId = useSalesEngineStore.getState().draft.cartItemId;
    expect(savedId).toBeTruthy();

    unmount();
    useSalesEngineStore.setState({ draft: initialSalesDraft });
    setSearch(`cartItem=${savedId}`);

    render(<CalculatorContainer surface="page" />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Коммерческая смета/i })).toHaveAttribute('aria-current', 'step');
    });
    expect(screen.getByRole('button', { name: 'Сохранить setup' })).toBeInTheDocument();
    expect(useSalesEngineStore.getState().draft.cartItemId).toBe(savedId);
  });

  it('applies product type from query param and serviceId defaults', async () => {
    setSearch('type=flex-neon');
    const { unmount } = render(<CalculatorContainer surface="page" />);

    await waitFor(() => {
      expect(useSalesEngineStore.getState().draft.config.productType).toBe('flex-neon');
    });
    expect(screen.getByRole('button', { name: /Тип и сегмент/i })).toHaveAttribute('aria-current', 'step');

    unmount();
    useSalesEngineStore.setState({ draft: initialSalesDraft });
    setSearch();

    render(<CalculatorContainer surface="page" serviceId="lightbox" />);
    await waitFor(() => {
      expect(useSalesEngineStore.getState().draft.config.productType).toBe('lightbox');
    });
  });

  it('shows stale cart recovery and allows returning to product step', async () => {
    setSearch('cartItem=stale-case&type=flex-neon');
    render(<CalculatorContainer surface="page" />);

    await waitFor(() => {
      expect(screen.getByTestId('stale-recovery-banner')).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: /Коммерческая смета/i })).toHaveAttribute('aria-current', 'step');
    expect(useSalesEngineStore.getState().draft.config.productType).toBe('flex-neon');

    fireEvent.click(screen.getByRole('button', { name: 'Проверить параметры' }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Тип и сегмент/i })).toHaveAttribute('aria-current', 'step');
    });
    expect(screen.queryByTestId('stale-recovery-banner')).not.toBeInTheDocument();
  });

  it('renders handoff checklist and uploads a valid file', async () => {
    mockFetch.mockImplementation(async (input) => {
      const url = typeof input === 'string' ? input : input instanceof Request ? input.url : String(input);
      if (url.includes('/api/upload/pre-sign')) {
        return new Response(JSON.stringify({
          success: true,
          uploadUrl: 'http://localhost/api/upload/local?token=test',
          fileKey: 'uploads/leads/facade.png',
          method: 'PUT',
          expiresAt: '2026-05-18T12:00:00.000Z',
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }

      if (url.includes('/api/upload/local')) {
        return new Response(JSON.stringify({
          success: true,
          fileKey: 'uploads/leads/facade.png',
          storedAt: '2026-05-18T12:00:00.000Z',
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }

      throw new Error(`Unexpected fetch call: ${url}`);
    });

    render(<CalculatorContainer surface="page" />);

    fireEvent.click(await screen.findByRole('button', { name: /Монтаж и согласование/i }));
    await waitFor(() => {
      expect(screen.getByTestId('handoff-panel')).toBeInTheDocument();
    });
    expect(screen.getByText('Фото фасада / места установки')).toBeInTheDocument();
    expect(screen.getByText('Нужна ли проверка 902-ПП')).toBeInTheDocument();

    const fileInput = screen.getByLabelText('Добавить файлы для handoff');
    const valid = new File(['photo'], 'facade.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [valid] } });
    expect(screen.getByText('facade.png')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Загружено')).toBeInTheDocument();
    });
    expect(screen.getByText('uploads/leads/facade.png')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Далее' }));
    fireEvent.click(screen.getByRole('button', { name: 'Назад' }));
    expect(screen.getByText('facade.png')).toBeInTheDocument();

    const invalid = new File(['text'], 'notes.txt', { type: 'text/plain' });
    fireEvent.change(fileInput, { target: { files: [invalid] } });
    expect(screen.getByRole('alert')).toHaveTextContent('Недопустимый формат файла');
    expect(screen.queryByText('notes.txt')).not.toBeInTheDocument();
  });

  it('shows upload failure, supports retry, and removes handoff assets', async () => {
    let uploadShouldFail = true;
    mockFetch.mockImplementation(async (input) => {
      const url = typeof input === 'string' ? input : input instanceof Request ? input.url : String(input);
      if (url.includes('/api/upload/pre-sign')) {
        return new Response(JSON.stringify({
          success: true,
          uploadUrl: 'http://localhost/api/upload/local?token=retry',
          fileKey: 'uploads/leads/logo.pdf',
          method: 'PUT',
          expiresAt: '2026-05-18T12:00:00.000Z',
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }

      if (url.includes('/api/upload/local')) {
        if (uploadShouldFail) {
          return new Response(JSON.stringify({ success: false, error: 'fail' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
        }

        return new Response(JSON.stringify({
          success: true,
          fileKey: 'uploads/leads/logo.pdf',
          storedAt: '2026-05-18T12:00:00.000Z',
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }

      throw new Error(`Unexpected fetch call: ${url}`);
    });

    render(<CalculatorContainer surface="page" />);
    fireEvent.click(await screen.findByRole('button', { name: /Монтаж и согласование/i }));

    const fileInput = await screen.findByLabelText('Добавить файлы для handoff');
    const file = new File(['pdf'], 'logo.pdf', { type: 'application/pdf' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText('Ошибка')).toBeInTheDocument();
    });

    uploadShouldFail = false;
    fireEvent.click(screen.getByRole('button', { name: 'Повторить загрузку logo.pdf' }));

    await waitFor(() => {
      expect(screen.getByText('Загружено')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Удалить logo.pdf' }));
    await waitFor(() => {
      expect(screen.queryByText('logo.pdf')).not.toBeInTheDocument();
    });
  });
});
