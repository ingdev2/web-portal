import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshAccessToken(token: any) {
  try {
    if (!token || !token.refresh_token) {
      throw new Error("Token de refresco no válido.");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refreshToken`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token?.refresh_token}`,
        },
      }
    );

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
      accessTokenExpires:
        Date.now() + refreshedTokens.access_token_expires_in * 1000,
    };
  } catch (error) {
    throw new Error("Error al refrescar el token de acceso");
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: process.env.NEXT_PUBLIC_NAME_AUTH_CREDENTIALS_ADMINS,
      name: process.env.NEXT_PUBLIC_NAME_AUTH_CREDENTIALS_ADMINS,
      credentials: {
        id_number: {
          label: "Número de identificación",
          type: "number",
          inputMode: "numeric",
          pattern: "[0-9]*",
        },
        verification_code: {
          label: "Código de verificación",
          type: "number",
          inputMode: "numeric",
          pattern: "[0-9]*",
        },
      },

      async authorize(credentials, req) {
        if (!credentials) {
          throw new Error("Credenciales no definidas.");
        }
        const { id_number } = credentials;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verifiedLoginAdmins/${id_number}`,
          {
            method: "POST",
            body: JSON.stringify({
              id_number: credentials?.id_number,
              verification_code: credentials?.verification_code,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );

        const admin = await res.json();

        if (admin.error) throw admin;

        return admin;
      },
    }),
    CredentialsProvider({
      id: process.env.NEXT_PUBLIC_NAME_AUTH_CREDENTIALS_USERS,
      name: process.env.NEXT_PUBLIC_NAME_AUTH_CREDENTIALS_USERS,
      credentials: {
        id_number: {
          label: "Número de identificación",
          type: "number",
          inputMode: "numeric",
          pattern: "[0-9]*",
        },
        verification_code: {
          label: "Código de verificación",
          type: "number",
          inputMode: "numeric",
          pattern: "[0-9]*",
        },
      },

      async authorize(credentials, req) {
        if (!credentials) {
          throw new Error("Credenciales no definidas.");
        }
        const { id_number } = credentials;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verifiedLoginUsers/${id_number}`,
          {
            method: "POST",
            body: JSON.stringify({
              id_number: credentials?.id_number,
              verification_code: credentials?.verification_code,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );

        const user = await res.json();

        if (user.error) throw user;

        return user;
      },
    }),
    CredentialsProvider({
      id: process.env.NEXT_PUBLIC_NAME_AUTH_CREDENTIALS_RELATIVES,
      name: process.env.NEXT_PUBLIC_NAME_AUTH_CREDENTIALS_RELATIVES,
      credentials: {
        id_number: {
          label: "Número de identificación",
          type: "number",
          inputMode: "numeric",
          pattern: "[0-9]*",
        },
        patient_id_number: {
          label: "Número de identificación del paciente",
          type: "number",
          inputMode: "numeric",
          pattern: "[0-9]*",
        },
        familiar_email: {
          label: "Email de familiar",
          type: "string",
          inputMode: "text",
        },
        verification_code: {
          label: "Código de verificación",
          type: "number",
          inputMode: "numeric",
          pattern: "[0-9]*",
        },
      },

      async authorize(credentials, req) {
        if (!credentials) {
          throw new Error("Credenciales no definidas.");
        }
        const { id_number } = credentials;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verifiedLoginRelatives/${id_number}`,
          {
            method: "POST",
            body: JSON.stringify({
              id_number: credentials?.id_number,
              patient_id_number: credentials?.patient_id_number,
              familiar_email: credentials?.familiar_email,
              verification_code: credentials?.verification_code,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );

        const user = await res.json();

        if (user.error) throw user;

        return user;
      },
    }),
  ],
  jwt: {
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user && token) {
        return {
          ...token,
          ...user,
        };
      }

      if (
        token?.access_token_expires_in &&
        typeof token.access_token_expires_in === "number"
      ) {
        if (Date.now() < token.access_token_expires_in) {
          return token;
        } else {
          const refreshedToken = await refreshAccessToken(token);

          if (!refreshedToken.error) {
            return {
              ...token,
              access_token: refreshedToken.accessToken,
              access_token_expires_in: refreshedToken.accessTokenExpires,
            };
          } else {
            return {};
          }
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = token;
      } else {
        session.user;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: Number(process.env.NEXT_PUBLIC_MAX_AGE_SESSION) * 60,
  },
});

export { handler as GET, handler as POST };
