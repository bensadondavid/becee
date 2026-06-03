'use client';

import { useState } from 'react';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { toast } from 'sonner';
import SectionHeading from '@/utils/SectionHeading';
import AnimatedCard from '@/utils/AnimatedCard';
import GridBackground from '@/utils/GridBackground';


const contactInfo = [
  { icon: Mail, label: 'Email', value: 'contact@becee.fr', href: 'mailto:contact@becee.fr' },
  { icon: Phone, label: 'Téléphone', value: '+33 1 23 45 67 89', href: 'tel:+33123456789' },
  { icon: MapPin, label: 'Adresse', value: '78 rue de Paris, Saint Brice Sous Forêt', href: null },
  { icon: Clock, label: 'Horaires', value: 'Lun — Ven, 8h — 20h', href: null },
];

const projectTypes = [
  { value: 'vitrine', label: 'Site vitrine' },
  { value: 'reservation', label: 'Système de réservation' },
  { value: 'application', label: 'Application métier' },
  { value: 'e-commerce', label: 'E-commerce' },
  { value: 'autre', label: 'Autre' },
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  entreprise: string;
  message: string;
};

const EMPTY_FORM: FormState = { name: '', email: '', phone: '', projectType: '', entreprise: '', message: '' };

export default function ContactPageContent() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [sending, setSending] = useState(false);

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    try {
      const response = await fetch('/api/contactform', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, _hp: '' })
      });
      if (!response.ok) {
        toast.error('Une erreur est survenue, veuillez réessayer');
        return;
      }
      toast.success('Merci ! Notre équipe vous répondra sous 24h.');
      setForm(EMPTY_FORM);
    } catch {
      toast.error('Une erreur est survenue, veuillez réessayer');
    } finally {
      setSending(false);
    }
  }

  function updateField(field: keyof FormState, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  return (
    <div className="pt-16 bg-white">
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <GridBackground />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <SectionHeading
            badge="Contact"
            title="Parlons de votre projet"
            description="Décrivez-nous votre besoin. Notre équipe vous recontacte sous 24h avec une première proposition adaptée."
          />

          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
            <AnimatedCard className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="border border-[#E8E8E8] rounded p-7 sm:p-8 bg-white space-y-5">
                <input type="text" name="_hp" value="" onChange={() => {}} tabIndex={-1} aria-hidden="true" className="hidden" />
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="font-inter text-xs font-medium tracking-wide text-foreground">Nom complet*</Label>
                    <Input id="name" value={form.name} onChange={(e) => updateField('name', e.target.value)}  required className="font-inter text-sm bg-[#FAFAFA] border-[#E8E8E8] h-10 rounded-sm focus:border-foreground/30" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="font-inter text-xs font-medium tracking-wide text-foreground">Email*</Label>
                    <Input id="email" type="email" value={form.email} onChange={(e) => updateField('email', e.target.value)} required className="font-inter text-sm bg-[#FAFAFA] border-[#E8E8E8] h-10 rounded-sm focus:border-foreground/30" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="font-inter text-xs font-medium tracking-wide text-foreground">Téléphone*</Label>
                    <Input id="phone" type="tel" value={form.phone} onChange={(e) => updateField('phone', e.target.value)} required className="font-inter text-sm bg-[#FAFAFA] border-[#E8E8E8] h-10 rounded-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="font-inter text-xs font-medium tracking-wide text-foreground">Type de projet</Label>
                    <Select value={form.projectType} onValueChange={(v) => updateField('projectType', v)}>
                      <SelectTrigger className="font-inter text-sm bg-[#FAFAFA] border-[#E8E8E8] h-10 rounded-sm">
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                      <SelectContent>
                        {projectTypes.map((t) => (
                          <SelectItem key={t.value} value={t.value} className="font-inter text-sm">{t.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="entreprise" className="font-inter text-xs font-medium tracking-wide text-foreground">Entreprise</Label>
                  <Input id="entreprise" type="text" value={form.entreprise} onChange={(e) => updateField('entreprise', e.target.value)} className="font-inter text-sm bg-[#FAFAFA] border-[#E8E8E8] h-10 rounded-sm" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="message" className="font-inter text-xs font-medium tracking-wide text-foreground">Votre message</Label>
                  <Textarea id="message" value={form.message} onChange={(e) => updateField('message', e.target.value)} placeholder="Décrivez votre projet, vos besoins et vos objectifs..." rows={5} className="font-inter text-sm bg-[#FAFAFA] border-[#E8E8E8] rounded-sm resize-none" />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full h-11 bg-foreground text-white font-inter text-sm font-medium rounded-sm hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2"
                >
                  {sending ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Envoyer le message <Send className="w-3.5 h-3.5" strokeWidth={1.5} /></>
                  )}
                </button>
              </form>
            </AnimatedCard>

            <AnimatedCard delay={0.15} className="lg:col-span-2">
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <div key={info.label} className="border border-[#E8E8E8] rounded p-5 bg-white flex items-start gap-4">
                    <div className="w-9 h-9 border border-[#E8E8E8] rounded flex items-center justify-center shrink-0">
                      <info.icon className="w-4 h-4 text-accent" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="font-inter text-[10px] tracking-widest uppercase text-muted-foreground mb-0.5">{info.label}</div>
                      {info.href ? (
                        <a href={info.href} className="font-inter text-sm font-medium text-foreground hover:text-accent transition-colors">
                          {info.value}
                        </a>
                      ) : (
                        <span className="font-inter text-sm font-medium text-foreground">{info.value}</span>
                      )}
                    </div>
                  </div>
                ))}

                <div className="border border-[#E8E8E8] rounded p-6 bg-[#FAFAFA] mt-2">
                  <h3 className="font-playfair text-base font-medium mb-2 text-foreground">Devis gratuit sous 24h</h3>
                  <p className="font-inter text-sm text-muted-foreground leading-relaxed">
                    Notre équipe analyse votre demande et vous envoie une proposition détaillée incluant périmètre, planning et estimation budgétaire.
                  </p>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>
    </div>
  );
}
