import { Login } from "@/services/apiService";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: AuthOptions = {
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session?.name) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.name = session;
      }
      return { ...token, ...user, ...session };
    },
    async session({ session, token }) {
      if (token && token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        var result = await Login({
          //@ts-ignore
          email: credentials?.email,
          password: credentials?.password,
        });
        if (result.object != null) {
          localStorage.setItem("user", JSON.stringify(result.object));
          return result.object;
        } else {
          localStorage.setItem("user", "");
          return null;
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
    signOut: "/",
  },
  session: {
    maxAge: 300 * 24 * 60 * 60,
  },
};

export default authOptions;
