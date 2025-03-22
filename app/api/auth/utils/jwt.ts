import * as jwt from "jsonwebtoken";
import { User } from "../../entities/user.entity";
import { UnauthorizedError } from "../../utils/errors";
import { Member } from "../../entities/member.entity";

const secret = process.env.JWT_SECRET ?? "";

export function generateToken(payload: User | Member): string {
  const user = {
    userId: (payload as User).userId ?? undefined,
    memberId: (payload as Member).memberId ?? undefined,
    firebaseId: payload.fireBaseId,
    name: payload.firstName + " " + payload.lastName,
    email: payload.email,
  };
  return jwt.sign(user, secret, { expiresIn: "1h" });
}

export function verifyToken(token: string): User {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded as User;
  } catch {
    throw new UnauthorizedError("Invalid token");
  }
}
