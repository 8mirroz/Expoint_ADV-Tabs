import React from 'react';
import { Metadata } from 'next';
import { getAllArticles } from '@/lib/mdx';
import { AcademyClient } from '@/components/academy/AcademyClient';

export const metadata: Metadata = {
  title: 'Academy | Expoint ADV',
  description: 'Экспертные материалы, разбор 902-ПП и руководства по производству и согласованию наружной рекламы.',
};

export default function AcademyPage() {
  const articles = getAllArticles();

  return <AcademyClient articles={articles} />;
}
