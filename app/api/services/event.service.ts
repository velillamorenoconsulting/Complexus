import { EventRepository } from "../repositories/event.repository";
import { Event } from "../entities/event.entity";
import { NotFoundError, ValidateError } from "../utils/errors";
import { validateOrReject, ValidationError } from "class-validator";
import { plainToInstance } from "class-transformer";

export class EventService {
  private eventRepository: EventRepository;

  constructor() {
    this.eventRepository = new EventRepository();
  }

  async getAllEvents(includeRelations?: boolean): Promise<Event[]> {
    return this.eventRepository.findAll(includeRelations);
  }

  // TODO Include flag for includes or throw error
  async getEventById(eventId: string): Promise<Event> {
    const event = await this.eventRepository.findById(eventId);
    if (!event) throw new NotFoundError("Event");
    return event;
  }

  async getEventsBySearchTerm(searchTerm: string): Promise<Event[]> {
    return this.eventRepository.searchEvent(searchTerm);
  }

  async getEventsByLocation(location: string): Promise<Event[]> {
    return this.eventRepository.findByKey({ location });
  }

  async getEventsByDateRange(
    startDate: Date,
    endDate?: Date,
  ): Promise<Event[]> {
    return this.eventRepository.findByDateRange(startDate, endDate);
  }

  // TODO Have JWT userId extracted
  async createEvent(eventInfo: any): Promise<Event> {
    const eventReceivedAttributes = {
      ...eventInfo,
      createdBy: "SYSTEM",
      updatedBy: "SYSTEM",
    };
    const eventToCreate = plainToInstance(Event, eventReceivedAttributes);
    try {
      await validateOrReject(eventToCreate);
    } catch (error: any) {
      const constraints = error.map((error: ValidationError) => {
        const key = Object.keys(error.constraints as object)[0];
        return error.constraints?.[key];
      });
      throw new ValidateError(constraints);
    }
    return this.eventRepository.create(eventToCreate);
  }
}
