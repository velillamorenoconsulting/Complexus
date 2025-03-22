import { plainToInstance } from "class-transformer";
import { Question } from "../entities/question.entity";
import { QuestionRepository } from "../repositories/question.repository";
import { validateOrReject } from "class-validator";
import { ApplicationError, NotFoundError } from "../utils/errors";
import { EventRepository } from "../repositories/event.repository";
import { handleValidationError } from "@/app/utils";

export class QuestionService {
  private questionRepository: QuestionRepository;
  private eventRepository: EventRepository;

  constructor() {
    this.questionRepository = new QuestionRepository();
    this.eventRepository = new EventRepository();
  }

  async findAllQuestions(): Promise<Question[]> {
    return this.questionRepository.findAllQuestions();
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
        question.event as unknown as string,
      );
      if (!relatedEvent) throw new NotFoundError("Event");
      if (relatedEvent?.startAt > new Date())
        throw new ApplicationError("No questions allowed to unstarted events");
    } catch (error) {
      handleValidationError(error);
    }
    return this.questionRepository.create(questionToCreate);
  }

  async deleteQuestion(
    questionId: string,
    isSoft: boolean = true,
    // author: string,
  ): Promise<string> {
    const question = await this.questionRepository.findQuestion(questionId);
    if (!question) throw new NotFoundError("Question");
    if (isSoft) {
      await this.questionRepository.softDeleteQuestion(
        questionId,
        // author,
      );
    } else {
      await this.questionRepository.deleteQuestion(questionId);
    }
    return question.questionId;
  }
}
