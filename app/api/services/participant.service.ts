import { plainToInstance } from "class-transformer";
import { Participant } from "../entities/participant.entity";
import { ParticipantRepository } from "../repositories/participant.repository";
import { validateOrReject, ValidationError } from "class-validator";
import { NotFoundError, ValidateError } from "../utils/errors";

export class ParticipantService {
  private readonly participantRepository: ParticipantRepository;

  constructor() {
    this.participantRepository = new ParticipantRepository();
  }

  async getAllParticipants(): Promise<Participant[]> {
    return this.participantRepository.getParticipants();
  }

  async createParticipant(
    participantToCreate: Partial<Participant>,
  ): Promise<Participant> {
    const receivedAttributes = {
      ...participantToCreate,
      createdBy: "SYSTEM",
      updatedBy: "SYSTEM",
    };

    const participantAttributes = plainToInstance(
      Participant,
      receivedAttributes,
    );
    try {
      await validateOrReject(participantAttributes);
    } catch (e: any) {
      const constraints = e.map((error: ValidationError) => {
        const key = Object.keys(error.constraints as object)[0];
        return error.constraints?.[key];
      });
      throw new ValidateError(constraints);
    }
    return this.participantRepository.createParticipant(participantAttributes);
  }

  async deleteParticipant(
    participantId: string,
    author: string,
  ): Promise<string> {
    const participant =
      await this.participantRepository.getParticipant(participantId);
    if (!participant) throw new NotFoundError("Participant");
    await this.participantRepository.softDeleteParticipant(
      participantId,
      author,
    );
    return participant.participantId;
  }
}
