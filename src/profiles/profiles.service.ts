import { BadRequestException, Injectable, NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { ProfileRepository } from "./repository/profile.repository";
import { ProfileEntity } from "./repository/profile.entity";
import { ProfileRequest } from "./dto/profile-request.dto";

@Injectable()
export class ProfilesService {
  public constructor(private readonly repository: ProfileRepository) {}

  public async upsertProfile(userId: string, profileRequest: ProfileRequest): Promise<ProfileEntity> {
    try {
      const existingProfile = await this.repository.findByUserId(userId);

      if (existingProfile) {
        // Update existing profile
        const updatedEntity = ProfileRequest.toEntity(profileRequest, existingProfile);
        const result = await this.repository.updateProfile(existingProfile.id, updatedEntity);
        if (!result) {
          throw new InternalServerErrorException("Failed to update the profile.");
        }
        return result;
      } else {
        // Create new profile
        const newEntity = ProfileRequest.toEntity(profileRequest);
        newEntity.userId = userId;
        return await this.repository.createProfile(newEntity);
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async getProfileByUserId(userId: string): Promise<ProfileEntity> {
      const profile = await this.repository.findByUserId(userId);
      if (!profile) {
        throw new NotFoundException(`Profile not found`);
      }
      return profile;
  }

  public async deleteProfile(userId: string): Promise<boolean> {
    try {
      const existingProfile = await this.repository.findByUserId(userId);
      if (!existingProfile) {
        throw new NotFoundException(`Profile not found`);
      }
      return await this.repository.deleteProfile(existingProfile.id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
