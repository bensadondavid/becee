// components/services/ServicesFootnote.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ServicesFootnote() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-14 text-center"
    >
      <p className="font-inter text-sm text-muted-foreground">
        Besoin d&apos;un projet qui ne rentre dans aucune case ?{' '}
        <Link
          href="/contact"
          className="text-foreground underline underline-offset-4 hover:text-accent transition-colors"
        >
          Parlons-en ensemble
        </Link>
      </p>
    </motion.div>
  );
}