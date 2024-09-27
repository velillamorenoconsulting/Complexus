import CredentialsProvider from "next-auth/providers/credentials";
import { LoginService } from "../loginService/login.service";
import { verifyToken } from "../utils/jwt";
import { NextAuthOptions, Session } from "next-auth";
import NextAuth from "next-auth/next";
import {
  CustomJWT,
  SignedUser,
  SignedUserResponse,
} from "../../types/auth.types";

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
            id: `${userInfo.firstName} ${userInfo.lastName}`,
            email: userInfo.email,
            token: userInfo.token,
          };
          if (userInfo) {
            return userPayload;
          } else {
            return null;
          }
        } catch (error: any) {
          throw new Error(error.message);
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
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.accessToken = (user as SignedUserResponse).token;
      }
      return token;
    },
    session: ({ session, token }): Session => {
      session.user = {
        name: token.sub,
        email: token.email,
        // @ts-expect-error forced attribute
        accessToken: token.accessToken as CustomJWT,
      };
      return session;
    },
  },
});

export { handler as GET, handler as POST };
