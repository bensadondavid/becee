'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Code2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const navLinks = [
  { label: 'Services', path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'À propos', path: '/a-propos' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    onScroll();
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-[#E8E8E8] bg-white/95 backdrop-blur-sm'
          : 'border-b border-[#E8E8E8] bg-white'
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded border border-foreground">
              <Code2 className="h-4 w-4 text-foreground" strokeWidth={1.5} />
            </div>
            <span className="font-inter text-base font-semibold tracking-tight text-foreground">
              StudioDev
            </span>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;

              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`font-inter text-sm transition-colors ${
                    isActive
                      ? 'font-medium text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="rounded-sm border border-foreground px-5 py-2 font-inter text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-white"
            >
              Démarrer un projet
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="p-1 text-foreground lg:hidden"
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-[#E8E8E8] bg-white lg:hidden"
          >
            <div className="mx-auto max-w-6xl space-y-1 px-6 py-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;

                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`block py-2.5 font-inter text-sm transition-colors ${
                      isActive
                        ? 'font-medium text-foreground'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="pt-3">
                <Link
                  href="/contact"
                  className="block w-full rounded-sm border border-foreground px-5 py-2.5 text-center font-inter text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-white"
                >
                  Démarrer un projet
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}