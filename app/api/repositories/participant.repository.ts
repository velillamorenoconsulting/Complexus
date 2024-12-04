import { Repository } from "typeorm";
import { Participant } from "../entities/participant.entity";
import { getDataSource } from "../database";
import { DatabaseError } from "../utils/errors";

export class ParticipantRepository {
  private repository: Repository<Participant> | null = null;

  private async init(): Promise<void> {
    if (!this.repository) {
      const dataSource = await getDataSource();
      this.repository = dataSource.getRepository(Participant);
    }
  }

  async getParticipant(participantId: string): Promise<Participant | null> {
    await this.init();
    return this.repository!.findOneBy({ participantId });
  }

  async getParticipants(): Promise<Participant[]> {
    await this.init();
    return this.repository!.find();
  }

  async createParticipant(participant: Participant): Promise<Participant> {
    await this.init();
    const createdParticipant = await this.repository!.save(participant);
    return createdParticipant;
  }

  async softDeleteParticipant(
    participantId: string,
    author: string,
  ): Promise<number> {
    await this.init();
    await this.repository!.update(
      { participantId },
      { isDeleted: true, updatedBy: author },
    );
    const { affected } = await this.repository!.softDelete({ participantId });
    if (!affected) throw new DatabaseError();
    return affected;
  }
}
