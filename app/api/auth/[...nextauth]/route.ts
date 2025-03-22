import CredentialsProvider from "next-auth/providers/credentials";
import { LoginService } from "../loginService/login.service";
import { Session } from "next-auth";
import NextAuth from "next-auth/next";
import {
  CustomJWT,
  SignedEntityResponse,
  SignedMemberResponse,
  SignedUserResponse,
} from "../../types/auth.types";
import { UnauthorizedError } from "@/app/api/utils/errors";

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
            type: userInfo.type,
          };
          if (userInfo) {
            return userPayload;
          } else {
            return null;
          }
        } catch {
          throw new UnauthorizedError(`${req.method} Unable to authorize user`);
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
            memberId: memberInfo.memberId,
            token: memberInfo.token,
            type: memberInfo.type,
          };
          if (memberInfo) {
            return memberPayload;
          } else {
            return null;
          }
        } catch {
          throw new UnauthorizedError(`${req.method} Unable to authorize user`);
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
        token.accessToken = (user as SignedEntityResponse).token;
        token.id =
          (user as SignedEntityResponse).type === "user"
            ? (user as SignedUserResponse).userId
            : (user as SignedMemberResponse).memberId;
        token.type = (user as SignedUserResponse).type;
      }
      return token;
    },
    session: ({ session, token }): Session => {
      session.user = {
        name: token.sub,
        email: token.email,
        // @ts-expect-error forced attribute
        accessToken: token.accessToken as CustomJWT,
        id: token.id as CustomJWT,
        type: token.type as CustomJWT,
      };
      return session;
    },
  },
});

export { handler as GET, handler as POST };
