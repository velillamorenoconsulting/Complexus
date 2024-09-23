import CredentialsProvider from "next-auth/providers/credentials";
import { LoginService } from "../loginService/login.service";
import { verifyToken } from "../utils/jwt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials-user",
      name: "user",
      credentials: {
        email: {
          label: "Correo electronico",
          type: "email",
          placeholder: "ejemplo@email.com",
        },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }
        try {
          const loginService = new LoginService();
          const userInfo = await loginService.loginUser(credentials);
          const userPayload = {
            id: new Date().toISOString(),
            userInfo,
            token: userInfo,
          };
          if (userInfo) {
            return userPayload;
          } else {
            return null;
          }
        } catch (error: any) {
          console.log(error);
          return null;
        }
      },
    }),
    CredentialsProvider({
      id: "credentials-member",
      name: "member",
      credentials: {
        email: {
          label: "Correo electronico",
          type: "email",
          placeholder: "ejemplo@email.com",
        },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }
        try {
          const loginService = new LoginService();
          const memberInfo = await loginService.loginMember(credentials);
          const memberPayload = {
            id: new Date().toISOString(),
            ...memberInfo,
          };
          if (memberInfo) {
            return memberPayload;
          } else {
            return null;
          }
        } catch (error: any) {
          console.error("Login error: ", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
