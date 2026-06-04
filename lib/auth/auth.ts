import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../database/prisma";
import { resend } from "../mail/resend";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL!,
  secret: process.env.BETTER_AUTH_SECRET!,

  onAPIError: {
    errorURL: "/auth/error",
  },

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  trustedOrigins: [
    "http://localhost:3000",
    "https://becee.fr",
    "https://www.becee.fr",
    "https://becee.vercel.app",
  ],

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    maxPasswordLength: 120,
    disableSignUp: true,
    sendResetPassword: async ({ user, url }) => {
      const { error } = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: user.email,
        subject: "Réinitialisez votre mot de passe",
        html: `
        <a href="${url}">
        Réinitialiser mon mot de passe
        </a>
      `,
      });
      if (error) {
        throw new Error(error.message);
      }
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      const { error } = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: user.email,
        subject: "Vérifiez votre email",
        html: `
        <a href="${url}">
          Vérifier mon email
        </a>
      `,
      });
      if (error) {
        throw new Error(error.message);
      }
    },
  },

  advanced: {
    cookiePrefix: "dashboard",
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },

  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "email-password"],
      allowDifferentEmails: false,
    },
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const allowed = await prisma.allowedUser.findUnique({
            where: {
              email: user.email,
            },
          });
          if (!allowed) {
            throw new Error("Accès refusé");
          }
          return {
            data: user,
          };
        },
      },
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 jours
    updateAge: 60 * 60 * 24, // 1 jour
  },
});

// pnpm dlx auth@latest generate --adapter prisma si jamais le generate auto ne marche pas pour config les tables auto ou // pnpm dlx auth@latest generate --config ./lib/auth.ts
