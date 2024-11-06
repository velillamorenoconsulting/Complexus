import { Event } from "../api/entities/event.entity";

export interface ServerResponse<T> {
  message: T;
}

export interface EventList extends ServerResponse<Event[]> {}

export interface EventResponse extends ServerResponse<Event> {}
