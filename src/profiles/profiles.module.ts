import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfilesController } from "./profiles.controller";
import { ProfilesService } from "./profiles.service";
import { ProfileEntity } from "./repository/profile.entity";
import { ProfileRepository } from "./repository/profile.repository";

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity])],
  providers: [ProfilesService, ProfileRepository],
  controllers: [ProfilesController],
  exports: [ProfilesService],
})
export class ProfilesModule {}
