import { Event } from "../api/entities/event.entity";
import { Testimony } from "../api/entities/testimony.entity";

export interface ServerResponse<T> {
  message: T;
}

export interface EventList extends ServerResponse<Event[]> {}

export interface EventResponse extends ServerResponse<Event> {}

export interface TestimonyListResponse extends ServerResponse<Testimony[]> {}
