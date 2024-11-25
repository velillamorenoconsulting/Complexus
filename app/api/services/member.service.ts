import { plainToInstance } from "class-transformer";
import { Member } from "../entities/member.entity";
import { MemberRepository } from "../repositories/member.repository";
import { NotFoundError, ValidateError } from "../utils/errors";
import { ValidationError, validateOrReject } from "class-validator";

export class MemberService {
  private memberRepository: MemberRepository;

  constructor() {
    this.memberRepository = new MemberRepository();
  }

  async getAllMembers(): Promise<Member[]> {
    return this.memberRepository.findAll();
  }

  async getMemberById(memberId: string): Promise<Member> {
    const member = await this.memberRepository.findById(memberId);
    if (!member) throw new NotFoundError("Member");
    return member;
  }

  async getMemberByEmail(email: string): Promise<Member> {
    const member = await this.memberRepository.findByEmail(email);
    if (!member) throw new NotFoundError("Member");
    return member;
  }

  async updateMember(
    memberId: string,
    payload: Partial<Member>,
  ): Promise<Member> {
    const member = await this.memberRepository.findById(memberId);
    if (!member) throw new NotFoundError("Member");
    return this.memberRepository.updateById(memberId, payload);
  }

  async createMember(
    member: Partial<Member> & { password: string },
  ): Promise<Member> {
    const memberAttributes = {
      ...member,
      createdBy: "SYSTEM",
      updatedBy: "SYSTEM",
    };
    const memberToCreate = plainToInstance(Member, memberAttributes);
    try {
      await validateOrReject(memberToCreate);
    } catch (error: any) {
      const constraints = error.map((error: ValidationError) => {
        const key = Object.keys(error.constraints as object)[0];
        return error.constraints?.[key];
      });
      throw new ValidateError(constraints);
    }
    return this.memberRepository.create(memberToCreate);
  }

  async deleteMember(
    memberId: string,
    isSoft: boolean = true,
    author: string,
  ): Promise<string> {
    const member = await this.memberRepository.findById(memberId);
    if (!member) throw new NotFoundError("Member");
    let deleted: number;
    if (isSoft) {
      deleted = await this.memberRepository.softDeleteMember(memberId, author);
    } else {
      deleted = await this.memberRepository.deleteMember(memberId);
    }
    return member.memberId;
  }
}
