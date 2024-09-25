import * as jwt from "jsonwebtoken";
import { User } from "../../entities/user.entity";
import { UnauthorizedError } from "../../utils/errors";

const secret = process.env.JWT_SECRET ?? "";

export function generateToken(payload: any): string {
  const user = {
    userId: payload.userId ?? undefined,
    memberId: payload.memberId ?? undefined,
    firebaseId: payload.fireBaseId,
    name: payload.firstName + " " + payload.lastName,
    email: payload.email,
  };
  const token = jwt.sign(user, secret, { expiresIn: "1h" });
  return token;
}

export function verifyToken(token: string): User {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded as User;
  } catch (error) {
    throw new UnauthorizedError("Invalid token");
  }
}
