import { ILike, Repository } from "typeorm";
import { Question } from "../entities/question.entity";
import { getDataSource } from "../database";

export class QuestionRepository {
  private repository: Repository<Question> | null = null;

  async init() {
    if (!this.repository) {
      const dataSource = await getDataSource();
      this.repository = dataSource.getRepository(Question);
    }
  }

  async findQuestion(questionId: string): Promise<Question | null> {
    await this.init();
    return this.repository!.findOneBy({ questionId });
  }

  async findQuestionsPerEvent(eventId: string): Promise<Question[]> {
    await this.init();
    return this.repository!.find({
      where: {
        event: { eventId },
      },
      relations: {
        author: true,
      },
    });
  }

  async findQuestionsPerUser(userId: string): Promise<Question[]> {
    await this.init();
    return this.repository!.find({
      where: {
        author: {
          userId,
        },
      },
      relations: {
        event: true,
      },
    });
  }

  async findQuestionsByApproval(
    isApproved: boolean,
    eventId?: string,
    includeRelations: boolean = false
  ): Promise<Question[]> {
    await this.init();
    return this.repository!.find({
      where: {
        isApproved,
        ...(eventId ? { eventId } : {}),
      },
      relations: {
        author: includeRelations,
        event: includeRelations,
      },
    });
  }

  async findQuestionsBySearchTerm(
    searchTerm: string,
    filterOptions?: {
      userId?: string;
      eventId?: string;
    },
    includeRelations: boolean = false
  ): Promise<Question[]> {
    await this.init();
    return this.repository!.find({
      where: {
        questionContent: ILike(searchTerm),
        ...(filterOptions ? filterOptions : {}),
      },
      relations: {
        author: includeRelations,
        event: includeRelations,
      },
    });
  }

  async create(question: Partial<Question>): Promise<Question> {
    await this.init();
    return this.repository!.save(question);
  }
}
