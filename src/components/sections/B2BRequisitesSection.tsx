'use client';

import { motion } from 'motion/react';
import { COMPANY_INFO } from '@/data/company';
import { Copy } from 'lucide-react';
import { useState } from 'react';

export default function B2BRequisitesSection() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const rows = [
    [
      { label: 'ИНН', value: COMPANY_INFO.requisites?.inn },
      { label: 'КПП', value: COMPANY_INFO.requisites?.kpp },
      { label: 'ОГРН', value: COMPANY_INFO.requisites?.ogrn },
    ],
    [
      { label: 'Банк', value: COMPANY_INFO.requisites?.bank, wide: true },
      { label: 'БИК', value: COMPANY_INFO.requisites?.bik },
    ],
    [
      { label: 'Расчетный счет', value: COMPANY_INFO.requisites?.rs },
      { label: 'Корр. счет', value: COMPANY_INFO.requisites?.ks },
    ],
    [
      { label: 'Юридический адрес', value: COMPANY_INFO.requisites?.legalAddress, full: true },
    ],
  ];

  const ReqField = ({ label, value }: { label: string; value?: string }) => (
    <div className="group flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-on-surface-variant/50">{label}</span>
        <button
          onClick={() => handleCopy(value || '', label)}
          className="opacity-0 group-hover:opacity-100 p-0.5 rounded transition-opacity"
          title="Копировать"
        >
          {copied === label
            ? <span className="text-[9px] font-mono text-primary">OK</span>
            : <Copy className="w-3 h-3 text-on-surface-variant/50" />
          }
        </button>
      </div>
      <p className="font-mono text-[13px] font-medium text-on-surface leading-snug pb-1 border-b border-outline/50 group-hover:border-outline transition-colors">
        {value ?? '—'}
      </p>
    </div>
  );

  return (
    <section className="py-8 border-y border-outline bg-background">
      <div className="section-container">
        <div className="flex items-baseline gap-4 mb-6">
          <h2 className="font-mono text-[11px] tracking-[0.1em] uppercase text-on-surface-variant/50">
            Реквизиты компании
          </h2>
          <div className="flex-1 h-[1px] bg-outline/50" />
        </div>

        <div className="space-y-5">
          {rows.map((row, ri) => (
            <motion.div
              key={ri}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: ri * 0.04 }}
              className="grid gap-x-10 gap-y-4"
              style={{ gridTemplateColumns: row.length === 1 ? '1fr' : row.some(f => f.wide) ? '2fr 1fr' : `repeat(${row.length}, 1fr)` }}
            >
              {row.map(field => (
                <ReqField key={field.label} label={field.label} value={field.value} />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
