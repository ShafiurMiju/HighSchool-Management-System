import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { classEntity } from "./class.entity";
import { sectionEntity } from "./section.entity";
import { resultEntity } from "./result.entity";

@Entity("student")
export class StudentEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  FirstName: string;

  @Column()
  LastName: string;

  @Column()
  FatherName: string;

  @Column()
  MotherName: string;

  @Column()
  Email: string;

  @Column()
  ContactNumber: number;

  @Column({ type: 'date' })
  DateOfBirth: Date;

  @Column()
  Gender: string;

  @Column()
  Address: string;

  @Column()
  StudentPassword: string;

  @Column({ type: 'date', nullable: true })
  AdmissionDate: Date;

  @Column()
  ProfilePicture: string;

  @Column()
  Status: string;

  @ManyToOne(() => classEntity, (sclass)=>sclass.Students)
  Class: classEntity; 

  @ManyToOne(() => sectionEntity, (section)=>section.Students)
  Section: sectionEntity;

  @OneToMany(() => resultEntity, (result) => result.Student)
  Results: resultEntity[];

//   @OneToMany(() => TeacherStudentChat, (teacherStudentChat) => teacherStudentChat.Student)
//   TeacherStudentChats: TeacherStudentChat[];
}