import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().max(20),
  projectType: z.enum(['vitrine', 'reservation', 'application', 'e-commerce', 'autre', '']).optional(),
  entreprise: z.string().max(100).optional(),
  message: z.string().max(5000).optional(),
  _hp: z.literal('').optional(),
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  const result = schema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: z.flattenError(result.error) }, { status: 400 });
  }

  const { name, email, phone, projectType, entreprise, message } = result.data;

  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  try {
    await transporter.sendMail({
      from: `"Becee Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO,
      replyTo: email,
      subject: `Nouveau contact — ${projectType || "Autre"} — ${name}`,
      html: `
        <p><strong>Nom :</strong> ${esc(name)}</p>
        <p><strong>Email :</strong> ${esc(email)}</p>
        <p><strong>Téléphone :</strong> ${phone ? esc(phone) : "—"}</p>
        <p><strong>Entreprise :</strong> ${entreprise ? esc(entreprise) : "—"}</p>
        <p><strong>Type de projet :</strong> ${projectType ? esc(projectType) : "—"}</p>
        <hr />
        <p>${esc(message ?? "").replace(/\n/g, "<br />")}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("SMTP error:", err);
    return NextResponse.json({ error: "Erreur envoi email" }, { status: 500 });
  }
}
