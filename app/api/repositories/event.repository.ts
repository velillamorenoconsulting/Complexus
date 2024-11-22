import { FindOptionsWhere, Like, Repository } from "typeorm";
import { Event } from "../entities/event.entity";
import { getDataSource } from "../database";
import { ValidEventFilters } from "../types/entities.types";
import { removeNullOrUndefined } from "../utils/utils";

export class EventRepository {
  private repo: Repository<Event> | null = null;

  private async init(): Promise<void> {
    if (!this.repo) {
      const dataSource = await getDataSource();
      this.repo = dataSource.getRepository(Event);
    }
  }

  async findAll(includeRelations: boolean = false): Promise<Event[]> {
    await this.init();
    return this.repo!.find({
      order: { startAt: "ASC" },
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
    const matchedEvents = await this.repo!.find({
      where: [{ title: Like(searchKey) }, { description: Like(searchKey) }],
    });
    return matchedEvents;
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
    const result = await this.repo!.save(event);
    return result;
  }

  async update(
    eventId: string,
    event: Partial<Event>,
  ): Promise<number | undefined> {
    await this.init();
    const initialEvent = await this.repo!.findOneBy({ eventId });
    if (!initialEvent) return undefined;
    const images = initialEvent.images;
    if (event.images) {
      images.push(...event.images);
    }
    const result = await this.repo!.update(
      { eventId },
      {
        ...event,
        images,
      },
    );
    return result.affected;
  }
}
