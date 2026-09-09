import React from 'react';
import { Metadata } from 'next';
import { INITIAL_SERVICES } from '@/lib/store';
import { ServicesView } from '@/components/services/ServicesView';

export const metadata: Metadata = {
  title: 'Services & Capabilities | ObliqueTech',
  description: 'Practical technology solutions across Web Development, AI/ML, UI/UX Design, IT Consulting, Custom Software, and Mobile Apps.',
};

export default function ServicesPage() {
  return <ServicesView services={INITIAL_SERVICES} />;
}
