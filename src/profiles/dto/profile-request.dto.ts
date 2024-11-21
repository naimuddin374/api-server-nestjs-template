import { IsString, IsOptional, IsJSON } from "class-validator";
import { ProfileEntity } from "../repository/profile.entity";

export class ProfileRequest {
  @IsJSON()
  public address: string;

  public static toEntity(request: ProfileRequest, existingEntity?: ProfileEntity): ProfileEntity {
    const entity = existingEntity || new ProfileEntity();
    entity.address = request.address;
    return entity;
  }
}
