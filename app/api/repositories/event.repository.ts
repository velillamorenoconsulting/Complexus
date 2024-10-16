import { Repository } from "typeorm";
import { Event } from "../entities/event.entity";
import { getDataSource } from "../database";
import { DatabaseError } from "../utils/errors";

export class EventRepository {
  private repo: Repository<Event> | null = null;

  private async init(): Promise<void> {
    if (!this.repo) {
      const dataSource = await getDataSource();
      this.repo = dataSource.getRepository(Event);
    }
  }

  async findAll(): Promise<Event[]> {
    await this.init();
    return this.repo!.find();
  }

  async findById(eventId: string): Promise<Event | null> {
    await this.init();
    return this.repo!.findOneBy({ eventId });
  }

  async create(event: Partial<Event>): Promise<Event> {
    await this.init();
    const result = await this.repo!.save(event);
    return result;
  }
}
