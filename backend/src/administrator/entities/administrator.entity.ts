import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm';
import { GuestEntity } from './guest.entity';
import { MessageEntity } from './message.entity';
import { AcademicNoticeEntity } from './academicNotice.entity';

@Entity("administrator")
@Unique(["Email"])
export class AdministratorEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  FirstName: string;

  @Column()
  LastName: string;

  @Column()
  Email: string;

  @Column()
  ContactNumber: number;

  @Column()
  Gender: string;

  @Column({ type: 'date' })
  DateOfBirth: Date;

  @Column()
  Password: string;

  @Column()
  Address: string;

  @OneToMany(() => MessageEntity, (message) => message.Admin)
  Messages: MessageEntity[];

  @OneToMany(() => AcademicNoticeEntity, (academicNotice) => academicNotice.Admin)
  AcademicNotices: AcademicNoticeEntity[];
}
