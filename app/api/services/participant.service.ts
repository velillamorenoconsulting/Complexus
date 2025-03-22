import { plainToInstance } from "class-transformer";
import { Participant } from "../entities/participant.entity";
import { ParticipantRepository } from "../repositories/participant.repository";
import { validateOrReject } from "class-validator";
import { NotFoundError } from "../utils/errors";
import { handleValidationError } from "@/app/utils";

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
    } catch (e) {
      handleValidationError(e);
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
