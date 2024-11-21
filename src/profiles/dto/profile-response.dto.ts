import { ProfileEntity } from "../repository/profile.entity";

export class ProfileResponse {
  public id: number;
  public userId: string;
  public address: string;
  public createdAt: Date;
  public updatedAt: Date;

  public static fromEntity(entity: ProfileEntity): ProfileResponse {
    const response = new ProfileResponse();
    response.id = entity.id;
    response.userId = entity.userId;
    response.address = entity.address;
    response.createdAt = entity.createdAt;
    response.updatedAt = entity.updatedAt;
    return response;
  }
}
