import { User } from "next-auth";
import { User as RecordUser } from "../entities/user.entity";
import { DefaultJWT } from "next-auth/jwt";
import { Member } from "../entities/member.entity";

export enum LoginType {
  MEMBER = "member",
  USER = "user",
}

export interface SignedEntity {
  token: string;
  type: string;
}

export interface SignedUser
  extends SignedEntity,
    Omit<RecordUser, "generateId"> {}
export interface SignedMember
  extends SignedEntity,
    Omit<Member, "generateId"> {}

export interface SignedEntityResponse extends User, SignedEntity {}
export interface SignedMemberResponse extends User {
  token: string;
  memberId: string;
  type: string;
}

export interface SignedUserResponse extends User {
  token: string;
  userId: string;
  type: string;
}

export interface CustomJWT extends Record<string, unknown>, DefaultJWT {
  token: string;
  id: string;
  type: string;
}

export interface SignedAuth extends User {
  id: string;
  token: string;
  type: string;
}
