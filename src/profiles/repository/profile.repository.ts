import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProfileEntity } from "./profile.entity";

@Injectable()
export class ProfileRepository {
    public constructor(
        @InjectRepository(ProfileEntity)
        private readonly repository: Repository<ProfileEntity>
    ) { }

    public async findByUserId(userId: string): Promise<ProfileEntity | null> {
        return await this.repository.findOne({ where: { userId } });
    }

    public async createProfile(profile: ProfileEntity): Promise<ProfileEntity> {
        return await this.repository.save(profile);
    }

    public async updateProfile(id: number, profile: Partial<ProfileEntity>): Promise<ProfileEntity | null> {
        await this.repository.update({ id }, profile);
        return await this.repository.findOne({ where: { id } });
    }

    public async deleteProfile(id: number): Promise<boolean> {
        const result = await this.repository.delete({ id });
        return result.affected !== null && result.affected !== undefined && result.affected > 0;
    }

}
