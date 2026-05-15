import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ServiceRates from '@/components/sections/ServiceRates';
import { SERVICES } from '@/data/services';

describe('ServiceRates', () => {
  it('renders a real base price, unit, and calculator link for service cards', () => {
    const firstService = SERVICES[0];

    render(<ServiceRates compact />);

    expect(screen.getByText(firstService.title)).toBeInTheDocument();
    expect(screen.getByTestId(`service-rate-price-${firstService.id}`)).toHaveTextContent(
      firstService.basePrice.toLocaleString('ru-RU')
    );
    expect(screen.getByTestId(`service-rate-unit-${firstService.id}`)).toHaveTextContent(firstService.priceUnit);
    expect(screen.getByTestId(`service-rate-link-${firstService.id}`)).toHaveAttribute(
      'href',
      `/calculator?type=${firstService.id}`
    );
  });
});
