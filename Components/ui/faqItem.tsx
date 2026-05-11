'use client';

import { useState, useRef } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FaqItemProps {
  faq: {
    question: string;
    answer: string;
  };
}

export default function FaqItem({ faq }: FaqItemProps) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border-b border-[#E8E8E8]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-6 text-left group"
      >
        <span className="font-playfair text-lg text-foreground group-hover:text-accent transition-colors">
          {faq.question}
        </span>
        <span className="shrink-0 w-6 h-6 flex items-center justify-center text-muted-foreground group-hover:text-accent transition-colors">
          {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>
      <div
        ref={contentRef}
        style={{
          maxHeight: open ? (contentRef.current?.scrollHeight ?? 0) + 'px' : '0px',
          opacity: open ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.35s ease, opacity 0.3s ease',
        }}
      >
        <p className="font-inter text-base text-muted-foreground leading-relaxed pb-6">
          {faq.answer}
        </p>
      </div>
    </div>
  );
}