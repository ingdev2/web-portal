import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        id_type: {
          label: "Tipo de documento",
          type: "text",
        },
        id_number: {
          label: "Número de identificación",
          type: "number",
          placeholder: "123456789",
          inputMode: "numeric",
          pattern: "[0-9]*",
        },
        password: {
          label: "Contraseña",
          type: "password",
        },
      },

      async authorize(credentials, req) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/loginUsers`,
          {
            method: "POST",
            body: JSON.stringify({
              id_type: credentials?.id_type,
              id_number: credentials?.id_number
                ? parseInt(credentials?.id_number)
                : undefined,
              password: credentials?.password,
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
});

export { handler as GET, handler as POST };
