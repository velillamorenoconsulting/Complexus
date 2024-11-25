import { plainToInstance } from "class-transformer";
import { Testimony } from "../entities/testimony.entity";
import { TestimonyRepository } from "../repositories/testimony.repository";
import { validateOrReject, ValidationError } from "class-validator";
import {
  ApplicationError,
  NotFoundError,
  ValidateError,
} from "../utils/errors";

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

  async deleteTestimony(
    testimonyId: string,
    actor: string,
  ): Promise<Testimony> {
    const testimony = await this.testimonyRepo.getTestimony(testimonyId);
    if (!testimony) throw new NotFoundError("Testimony");
    await this.testimonyRepo.delete(testimonyId);

    const updatedFields: Partial<Testimony> = {
      updatedBy: actor,
      isDeleted: true,
    };

    const result = await this.testimonyRepo.update(testimonyId, updatedFields);

    if (!result) {
      throw new ApplicationError("Could not delete correctly the record");
    }

    return testimony;
  }
}
