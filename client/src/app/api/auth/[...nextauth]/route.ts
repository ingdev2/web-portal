import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "users-auth",
      name: "users-auth",
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
              verification_code: credentials?.verification_code,
              id_number: credentials?.id_number,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );

        const user = await res.json();

        console.log("User: ", user);

        if (user.error) throw user;

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: "/users_login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
