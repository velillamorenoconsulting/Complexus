import { User } from "next-auth";
import { User as RecordUser } from "../entities/user.entity";
import { DefaultJWT } from "next-auth/jwt";
import { Member } from "../entities/member.entity";

export enum LoginType {
  MEMBER = "member",
  USER = "user",
}

export interface SignedUser extends Omit<RecordUser, "generateId"> {
  token: string;
  type: string;
}

export interface SignedMember extends Omit<Member, "generateId"> {
  token: string;
  type: string;
}

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
  userId: string;
  type: string;
}
