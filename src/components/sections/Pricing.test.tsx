import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Pricing from '@/components/sections/Pricing';

describe('Pricing', () => {
  it('renders scenario cards and switches pricing mode', async () => {
    render(<Pricing />);

    expect(screen.getByText('Локальный стартап')).toBeInTheDocument();
    expect(screen.getByText('Фирменный ритейл')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Только производство/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Только производство/i }));

    expect(await screen.findByText(/34 000/)).toBeInTheDocument();
    expect(await screen.findByText(/чистое производство без монтажа/)).toBeInTheDocument();
  });
});
