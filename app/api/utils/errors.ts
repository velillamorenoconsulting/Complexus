/** Base Error for typing controllers */
export abstract class CustomBaseError extends Error {
  public statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;

    // Ensures the correct prototype chain is maintained
    Object.setPrototypeOf(this, CustomBaseError.prototype);
  }
}

export class NotFoundError extends CustomBaseError {
  constructor(public entity: string) {
    super(entity + " Not Found", 404);
  }
}

export class ValidateError extends CustomBaseError {
  constructor(public validations: string[]) {
    const errors = validations.join(", ");
    super(`Validation Error(s): ${errors}`, 400);
  }
}
