import Link from 'next/link';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const footerLinks = {
  Services: [
    { label: 'Site vitrine', path: '/services' },
    { label: 'Système de réservation', path: '/services' },
    { label: 'Application métier', path: '/services' },
  ],
  Agence: [
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'À propos', path: '/a-propos' },
    { label: 'Contact', path: '/contact' },
  ],
  Légal: [
    { label: 'Mentions légales', path: '/mentions-legales' },
    { label: 'Politique de confidentialité', path: '/confidentialite' },
    { label: 'CGV', path: '/cgv' },
  ],
};

const socialLinks = [
  { Icon: FaLinkedin, label: 'LinkedIn', href: '#' },
  { Icon: FaGithub, label: 'GitHub', href: '#' },
  { Icon: FaTwitter, label: 'Twitter', href: '#' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#E8E8E8] bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="mb-5 flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded border border-foreground" />

              <span className="font-inter text-sm font-semibold tracking-tight text-foreground">
                StudioDev
              </span>
            </Link>

            <p className="mb-6 font-inter text-sm leading-relaxed text-muted-foreground">
              Agence de développement web spécialisée dans les solutions digitales sur mesure
              pour les PME françaises.
            </p>

            <div className="flex gap-3">
              {socialLinks.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-sm border border-[#E8E8E8] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-5 font-inter text-xs font-semibold uppercase tracking-widest text-foreground">
                {category}
              </h4>

              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.path}
                      className="font-inter text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-[#E8E8E8] pt-8 sm:flex-row">
          <p className="font-inter text-xs text-muted-foreground">
            © {currentYear} StudioDev — SASU. Tous droits réservés.
          </p>

          <p className="font-inter text-xs text-muted-foreground">
            Conçu et développé avec passion en France 🇫🇷
          </p>
        </div>
      </div>
    </footer>
  );
}