import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { GuestEntity } from './guest.entity';
import { AdministratorEntity } from './administrator.entity';

@Entity("Message")
export class MessageEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({nullable: true})
  GMessage: string;

  @Column({nullable: true})
  AMessage: string;

  @Column({type: 'date'})
  Date: Date;

  @ManyToOne(() => GuestEntity, (guest) => guest.Messages)
  Guest: GuestEntity;

  @ManyToOne(() => AdministratorEntity, (admin) => admin.Messages)
  Admin: AdministratorEntity;
}