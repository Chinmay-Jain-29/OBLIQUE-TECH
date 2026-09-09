import React from 'react';
import { Metadata } from 'next';
import { AboutView } from '@/components/about/AboutView';

export const metadata: Metadata = {
  title: 'About ObliqueTech — Who We Are & Origin Story',
  description: 'ObliqueTech is a technology company focused on building practical digital solutions for businesses and creating meaningful opportunities through technology.',
};

export default function AboutPage() {
  return <AboutView />;
}
