'use client';

import React from 'react';

interface FinalCTAProps {
  title: string;
  description: string;
  buttonText: string;
  modalContext?: string;
  modalSource?: string;
}

export default function FinalCTA({
  title,
  description,
  buttonText,
  modalContext = 'Запрос расчета по услуге',
  modalSource = 'service_final_cta',
}: FinalCTAProps) {
  return null;
}

