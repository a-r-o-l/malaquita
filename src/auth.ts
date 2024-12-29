import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import dbConnect from "@/lib/mongoose";
import CredentialsProvider from "next-auth/providers/credentials";
import Account, { IAccount } from "./models/Account";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(dbConnect),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        await dbConnect();
        const foundAccount: IAccount | null = await Account.findOne({
          username: credentials.username,
        });
        if (!foundAccount) {
          throw new Error("Cuenta no encontrada.");
        }

        if (foundAccount.password !== credentials.password) {
          throw new Error("password o nombre de usuario invalido.");
        }
        return {
          id: foundAccount._id.toString(),
          name: foundAccount.username,
          role: foundAccount.role,
          password: foundAccount.password,
          imageUrl: foundAccount.imageUrl,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async jwt(token, user) {
      console.log("token -> ", token);
      console.log("user ->", user);
      if (user) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        token.id = user.id;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        token.role = user.role;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        token.imageUrl = user.imageUrl;
      }
      return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async session(session, token) {
      console.log("token2 -> ", token);
      console.log("session ->", session);
      if (token) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        session.user.id = token.id;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        session.user.role = token.role;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        session.user.imageUrl = token.imageUrl;
      }
      return session;
    },
  },
});
