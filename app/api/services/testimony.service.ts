import { plainToInstance } from "class-transformer";
import { Testimony } from "../entities/testimony.entity";
import { TestimonyRepository } from "../repositories/testimony.repository";
import { validateOrReject, ValidationError } from "class-validator";
import { ValidateError } from "../utils/errors";

export class TestimonyService {
  private testimonyRepo: TestimonyRepository;

  constructor() {
    this.testimonyRepo = new TestimonyRepository();
  }

  async getAllTestimonies(priority?: number): Promise<Testimony[]> {
    return this.testimonyRepo.findAll(priority);
  }

  async createTestimony(testimony: Partial<Testimony>): Promise<Testimony> {
    const receivedAttributes = {
      ...testimony,
      createdBy: "SYSTEM",
      updatedBy: "SYSTEM",
    };
    const testimonyToCreate = plainToInstance(Testimony, receivedAttributes);
    try {
      await validateOrReject(testimonyToCreate);
    } catch (e: any) {
      const constraints = e.map((error: ValidationError) => {
        const key = Object.keys(error.constraints as Object)[0];
        return error.constraints?.[key];
      });
      throw new ValidateError(constraints);
    }
    return this.testimonyRepo.create(testimonyToCreate);
  }
}
