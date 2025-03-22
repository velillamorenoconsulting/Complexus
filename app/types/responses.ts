import { Event } from "../api/entities/event.entity";
import { Testimony } from "../api/entities/testimony.entity";

export interface ServerResponse<T> {
  message: T;
}

export type EventList = ServerResponse<Event[]>;

export type EventResponse = ServerResponse<Event>;

export type TestimonyListResponse = ServerResponse<Testimony[]>;
