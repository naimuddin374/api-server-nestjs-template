import { Controller, Get, Post, Delete, Body, Request, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiCreatedResponse, ApiNoContentResponse, ApiTags } from "@nestjs/swagger";
import { ProfilesService } from "./profiles.service";
import { ProfileResponse } from "./dto/profile-response.dto";
import { ProfileRequest } from "./dto/profile-request.dto";
import { AuthenticatedRequest } from "../types/authenticated.request";

@Controller("main/profiles")
@ApiTags("Profiles")
@ApiBearerAuth()
export class ProfilesController {
  public constructor(private readonly service: ProfilesService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: "Successfully retrieved the profile.",
    type: ProfileResponse,
  })
  public async getProfile(@Request() request: AuthenticatedRequest): Promise<ProfileResponse> {
    const userId = request.raw.user.userId; // Extract userId from token
    const profile = await this.service.getProfileByUserId(userId);
    return ProfileResponse.fromEntity(profile);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: "Profile created or updated successfully.",
    type: ProfileResponse,
  })
  public async upsertProfile(
    @Request() request: AuthenticatedRequest,
    @Body() profileRequest: ProfileRequest
  ): Promise<ProfileResponse> {
    const userId = request.raw.user.userId; // Extract userId from token
    const profile = await this.service.upsertProfile(userId, profileRequest);
    return ProfileResponse.fromEntity(profile);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: "Profile deleted successfully.",
  })
  public async deleteProfile(@Request() request: AuthenticatedRequest): Promise<boolean> {
    const userId = request.raw.user.userId; // Extract userId from token
    return await this.service.deleteProfile(userId);
  }
}
