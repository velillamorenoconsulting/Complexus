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
            userId: userInfo.userId,
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
            id: `${memberInfo.firstName} ${memberInfo.lastName}`,
            email: memberInfo.email,
            userId: memberInfo.memberId,
            token: memberInfo.token,
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
        token.userId = (user as SignedUserResponse).userId;
      }
      return token;
    },
    session: ({ session, token }): Session => {
      session.user = {
        name: token.sub,
        email: token.email,
        // @ts-expect-error forced attribute
        accessToken: token.accessToken as CustomJWT,
        userId: token.userId as CustomJWT,
      };
      return session;
    },
  },
});

export { handler as GET, handler as POST };
