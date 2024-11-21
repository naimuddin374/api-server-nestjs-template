import AWS, { Scheduler } from "aws-sdk";
import { SchedulerInputData } from "../types/systemType";
import { getSchedulerNameByType, getSchedulerTimeFormat } from "./helper";

export interface CreateSchedulerResponse {
  scheduleArn: string;
}

const SCHEDULER_GROUP = process.env.SCHEDULER_GROUP ?? "default";
export class SchedulerWrapper {
  protected schedulerClient: Scheduler;

  constructor() {
    AWS.config.update({
      region: process.env.BUCKET_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    this.schedulerClient = new AWS.Scheduler({
      apiVersion: "2021-06-30",
    });
  }

  /** GET AWS SCHEDULER */
  public async getAWSScheduler(schedulerName: string): Promise<Scheduler.Types.GetScheduleOutput> {
    const deleteScheduleInput: Scheduler.Types.DeleteScheduleInput = {
      Name: schedulerName,
      GroupName: SCHEDULER_GROUP,
    };
    return await this.schedulerClient.getSchedule(deleteScheduleInput).promise();
  }

  /** CREATE AWS SCHEDULER */
  public async createAWSScheduler(executionTime: number, inputData: SchedulerInputData): Promise<CreateSchedulerResponse> {
    const schedulerName = getSchedulerNameByType(inputData);

    const params = {
      /** SCHEDULER NAME MUST NOT CONTAIN ANY SPACES, WORD MUST BE SEPARATED WITH -,
       * OTHERWISE VALIDATION ERROR WILL BE THROWN
       * NAME MUST BE UNIQUE, SAME NAME IS NOT ALLOWED
       * */
      Name: schedulerName,
      GroupName: SCHEDULER_GROUP,
      FlexibleTimeWindow: {
        Mode: "OFF",
      },
      //at(yyyy-mm-ddThh:mm:ss)
      ScheduleExpression: `at(${getSchedulerTimeFormat(executionTime)})`,
      ScheduleExpressionTimezone: "Asia/Dhaka",
      Target: {
        /** ARN OF THE TARGET AWS SERVICE */
        Arn: process.env.SCHEDULER_TARGET_ARN ?? "",

        /** INPUT MUST CONTAINT JSON STRINGIFY VALUE WHOSE LENGTH MUST BE GREATER THAN OR EQUAL TO 1 */
        Input: JSON.stringify(inputData),

        /** ARN OF THE IAM POLICY ROLER THAT THE SCHEDULER IS GOING TO USE */
        RoleArn: process.env.SCHEDULER_ROLE_ARN ?? "",

        RetryPolicy: {
          MaximumEventAgeInSeconds: 3600,
          MaximumRetryAttempts: 185,
        },
      },
    };

    const command: Scheduler.Types.CreateScheduleOutput = await this.schedulerClient.createSchedule(params).promise();

    return {
      scheduleArn: command.ScheduleArn,
    };
  }

  /** UPDATE AWS SCHEDULER */
  public async updateAWSScheduler(executionTime: number, inputData: SchedulerInputData): Promise<void> {
    const schedulerName = getSchedulerNameByType(inputData);

    /** CHECK IF THE SCHEDULER EXISTS BEFORE MAKING THE UPDATE */
    const getSchedulerInput: Scheduler.Types.GetScheduleInput = {
      Name: schedulerName,
      GroupName: SCHEDULER_GROUP,
    };

    const existingScheduler: Scheduler.Types.GetScheduleOutput = await this.schedulerClient.getSchedule(getSchedulerInput).promise();
    if (existingScheduler && Object.keys(existingScheduler).length > 0) {
      const params = {
        /** SCHEDULER NAME MUST NOT CONTAIN ANY SPACES, WORD MUST BE SEPARATED WITH -,
         * OTHERWISE VALIDATION ERROR WILL BE THROWN
         * NAME MUST BE UNIQUE, SAME NAME IS NOT ALLOWED
         * */
        Name: schedulerName,
        GroupName: SCHEDULER_GROUP,
        FlexibleTimeWindow: {
          Mode: "OFF",
        },
        //at(yyyy-mm-ddThh:mm:ss)
        ScheduleExpression: `at(${getSchedulerTimeFormat(executionTime)})`,
        ScheduleExpressionTimezone: "Asia/Dhaka",
        Target: {
          /** ARN OF THE TARGET AWS SERVICE */
          Arn: process.env.SCHEDULER_TARGET_ARN ?? "",

          /** INPUT MUST CONTAINT JSON STRINGIFY VALUE WHOSE LENGTH MUST BE GREATER THAN OR EQUAL TO 1 */
          Input: JSON.stringify(inputData),

          /** ARN OF THE IAM POLICY ROLER THAT THE SCHEDULER IS GOING TO USE */
          RoleArn: process.env.SCHEDULER_ROLE_ARN ?? "",

          RetryPolicy: {
            MaximumEventAgeInSeconds: 3600,
            MaximumRetryAttempts: 185,
          },
        },
      };

      const command: Scheduler.Types.UpdateScheduleOutput = await this.schedulerClient.updateSchedule(params).promise();
      console.log("scheduler updated = ", command);
    }
  }

  /** DELETE AWS SCHEDULER */
  public async deleteAWSScheduler(inputData: SchedulerInputData): Promise<void> {
    const schedulerName = getSchedulerNameByType(inputData);
    console.log({ inputData, schedulerName });
    try {
      const existingScheduler = await this.getAWSScheduler(schedulerName);
      if (existingScheduler) {
        const deleteScheduleInput: Scheduler.Types.DeleteScheduleInput = {
          Name: schedulerName,
          GroupName: SCHEDULER_GROUP,
        };
        await this.schedulerClient.deleteSchedule(deleteScheduleInput).promise();
        console.log("Scheduler deleted = ", schedulerName);
      }
    } catch (error: any) {
      console.log("Scheduler not found = ", schedulerName);
    }
  }
}
