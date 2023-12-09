import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("Staff")
export class StaffEntity {
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

  @Column({type:'date'})
  DateOfBirth: Date;

  @Column()
  Gender: string;

  @Column()
  Address: string;

  @Column()
  ProfilePicture: string;
}