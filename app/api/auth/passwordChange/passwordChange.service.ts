import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { ApplicationError } from "../../utils/errors";

export class PasswordChangeService {
  async resetPassword(email: string) {
    try {
      sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      throw new ApplicationError("Authentication service failed");
    }
  }
}
