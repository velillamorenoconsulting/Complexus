import { plainToInstance } from "class-transformer";
import { Question } from "../entities/question.entity";
import { QuestionRepository } from "../repositories/question.repository";
import { ValidationError, validateOrReject } from "class-validator";
import {
  ApplicationError,
  NotFoundError,
  ValidateError,
} from "../utils/errors";
import { EventRepository } from "../repositories/event.repository";

export class QuestionService {
  private questionRepository: QuestionRepository;
  private eventRepository: EventRepository;

  constructor() {
    this.questionRepository = new QuestionRepository();
    this.eventRepository = new EventRepository();
  }

  async createQuestion(question: Partial<Question>): Promise<Question> {
    const questionAttributes = {
      ...question,
      createdBy: "SYSTEM",
      updatedBy: "SYSTEM",
    };
    const questionToCreate = plainToInstance(Question, questionAttributes);
    try {
      await validateOrReject(questionToCreate);
      if (!question.event)
        throw new ApplicationError("No event information received");
      const relatedEvent = await this.eventRepository.findById(
        question.event as unknown as string
      );
      if (!relatedEvent) throw new NotFoundError("Event");
      if (relatedEvent?.startAt > new Date())
        throw new ApplicationError("No questions allowed to unstarted events");
    } catch (error: any) {
      if (Array.isArray(error)) {
        const constraints = error.map((error: ValidationError) => {
          const key = Object.keys(error.constraints as object)[0];
          return error.constraints?.[key] as string;
        });
        throw new ValidateError(constraints);
      } else throw error;
    }
    return this.questionRepository.create(questionToCreate);
  }
}
