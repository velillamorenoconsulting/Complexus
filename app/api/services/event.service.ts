import { EventRepository } from "../repositories/event.repository";
import { Event } from "../entities/event.entity";
import { ApplicationError, NotFoundError } from "../utils/errors";
import { validateOrReject } from "class-validator";
import { plainToInstance } from "class-transformer";
import { deleteImages } from "../cloudinary/cloudinary";
import { handleValidationError } from "@/app/utils";

export class EventService {
  private eventRepository: EventRepository;

  constructor() {
    this.eventRepository = new EventRepository();
  }

  async getAllEvents(
    includeRelations?: boolean,
    validEvents?: boolean,
  ): Promise<Event[]> {
    return this.eventRepository.findAll(includeRelations, validEvents);
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
  async createEvent(eventInfo: Partial<Event>): Promise<Event> {
    const eventReceivedAttributes = {
      ...eventInfo,
      createdBy: "SYSTEM",
      updatedBy: "SYSTEM",
    };
    const eventToCreate = plainToInstance(Event, eventReceivedAttributes);
    try {
      await validateOrReject(eventToCreate);
    } catch (error) {
      handleValidationError(error);
    }
    return this.eventRepository.create(eventToCreate);
  }

  async updateEvent(eventId: string, event: Partial<Event>): Promise<string> {
    const result = await this.eventRepository.update(eventId, event);
    if (!result) {
      throw new NotFoundError("Event");
    }
    return eventId;
  }

  async deleteEvent(
    eventId: string,
    isSoft: boolean = true,
    author: string,
  ): Promise<string> {
    const event = await this.eventRepository.findById(eventId);
    if (!event) throw new NotFoundError("event");
    let deleted: number;
    if (isSoft) {
      deleted = await this.eventRepository.softDeleteEvent(eventId, author);
    } else {
      deleted = await this.eventRepository.deleteEvent(eventId);
    }
    // Delete event images to free space
    const publicImageIds = event.images.map(
      (img) => img.split("/").pop()!.split(".")[0],
    );
    deleteImages(publicImageIds);

    if (!deleted) throw new ApplicationError("Problem deleting the record");
    return event.eventId;
  }
}
