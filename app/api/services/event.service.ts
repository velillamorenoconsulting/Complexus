import { EventRepository } from "../repositories/event.repository";
import { Event } from "../entities/event.entity";
import { NotFoundError } from "../utils/errors";

export class EventService {
  private eventRepository: EventRepository;

  constructor() {
    this.eventRepository = new EventRepository();
  }

  async getAllEvents(): Promise<Event[]> {
    return this.eventRepository.findAll();
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

  async getEventsByDateRange(startDate: Date, endDate?: Date): Promise<Event[]> {
    return this.eventRepository.findByDateRange(startDate, endDate);
  }
}
