import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "profiles" })
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: "userId", type: "varchar", unique: true })
  public userId: string;

  @Column({ name: "address", type: "json" })
  public address: string;

  // @Column({ name: "avatar_url", type: "varchar", nullable: true })
  // public avatarUrl?: string;

  @Column({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  public createdAt: Date;

  @Column({ name: "updated_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  public updatedAt: Date;
}
