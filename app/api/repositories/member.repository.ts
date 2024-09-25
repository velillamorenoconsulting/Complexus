import { Repository } from "typeorm";
import { Member } from "../entities/member.entity";
import { getDataSource } from "../database";
import { ApplicationError, DatabaseError } from "../utils/errors";

export class MemberRepository {
  private memberRepository: Repository<Member> | null = null;

  private async init(): Promise<void> {
    if (!this.memberRepository) {
      const dataSource = await getDataSource();
      this.memberRepository = dataSource.getRepository(Member);
    }
  }

  async findAll(): Promise<Member[]> {
    await this.init();
    return this.memberRepository!.find();
  }

  async findById(memberId: string): Promise<Member | null> {
    await this.init();
    return this.memberRepository!.findOneBy({ memberId });
  }

  async findByEmail(email: string): Promise<Member | null> {
    await this.init();
    return this.memberRepository!.findOneBy({ email });
  }

  async updateById(memberId: string, member: Partial<Member>): Promise<Member> {
    await this.init();
    const { affected } = await this.memberRepository!.update(
      { memberId },
      member
    );
    if (!affected) throw new DatabaseError();
    const updatedMember = await this.findById(memberId);
    return updatedMember!;
  }

  async create(member: Member): Promise<Member> {
    await this.init();
    const result = await this.memberRepository!.save(member);
    return result;
  }

  async deleteMember(memberId: string): Promise<number> {
    this.init();
    const { affected } = await this.memberRepository!.delete({ memberId });
    if (!affected) throw new DatabaseError();
    return affected;
  }

  async softDeleteMember(memberId: string): Promise<number> {
    await this.init();
    await this.memberRepository!.update({ memberId }, { isDeleted: true });
    const { affected } = await this.memberRepository!.softDelete({ memberId });
    if (!affected) throw new DatabaseError();
    return affected;
  }
}