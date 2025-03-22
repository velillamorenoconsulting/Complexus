import { FindOptionsWhere, Like, Repository } from "typeorm";
import { Event } from "../entities/event.entity";
import { getDataSource } from "../database";
import { ValidEventFilters } from "../types/entities.types";
import { removeNullOrUndefined } from "../utils/utils";
import { DatabaseError } from "../utils/errors";

export class EventRepository {
  private repo: Repository<Event> | null = null;

  private async init(): Promise<void> {
    if (!this.repo) {
      const dataSource = await getDataSource();
      this.repo = dataSource.getRepository(Event);
    }
  }

  async findAll(
    includeRelations: boolean = false,
    valid: boolean = false,
  ): Promise<Event[]> {
    await this.init();
    return this.repo!.find({
      withDeleted: !valid,
      order: { startAt: "DESC" },
      select: {
        eventId: true,
        startAt: true,
        endAt: true,
        eventType: true,
        isDeleted: true,
        price: true,
        createdAt: true,
        location: {
          ubication: true,
          description: true,
          address: true,
        },
        title: true,
        description: true,
        images: true,
      },
      relations: {
        purchases: includeRelations,
      },
    });
  }

  async findById(eventId: string): Promise<Event | null> {
    await this.init();

    return this.repo!.createQueryBuilder("event")
      .leftJoinAndSelect(
        "event.questions",
        "question",
        "question.visibility = :flag",
        { flag: "general" },
      )
      .where("event.eventId = :eventId", { eventId })
      .getOne();
  }

  async searchEvent(searchKey: string): Promise<Event[]> {
    return this.repo!.find({
      where: [{ title: Like(searchKey) }, { description: Like(searchKey) }],
    });
  }

  async findByKey(keys: Partial<ValidEventFilters>): Promise<Event[]> {
    return this.repo!.find({
      where: removeNullOrUndefined(keys) as FindOptionsWhere<Event>,
    });
  }

  async findByDateRange(startDate: Date, endDate?: Date): Promise<Event[]> {
    return this.repo!.find({
      where: {
        startAt: startDate,
        ...(endDate ? { endAt: endDate } : {}),
      },
    });
  }

  async create(event: Partial<Event>): Promise<Event> {
    await this.init();
    return this.repo!.save(event);
  }

  async update(
    eventId: string,
    event: Partial<Event>,
  ): Promise<number | undefined> {
    await this.init();
    const initialEvent = await this.repo!.findOneBy({ eventId });
    if (!initialEvent) return undefined;
    const result = await this.repo!.update(
      { eventId },
      {
        ...event,
      },
    );
    return result.affected;
  }

  async deleteEvent(eventId: string): Promise<number> {
    await this.init();
    const { affected } = await this.repo!.delete({ eventId });
    if (!affected) throw new DatabaseError();
    return affected;
  }

  async softDeleteEvent(eventId: string, author: string): Promise<number> {
    await this.init();
    await this.repo!.update(
      { eventId },
      { isDeleted: true, updatedBy: author },
    );
    const { affected } = await this.repo!.softDelete({ eventId });
    if (!affected) throw new DatabaseError();
    return affected;
  }
}
