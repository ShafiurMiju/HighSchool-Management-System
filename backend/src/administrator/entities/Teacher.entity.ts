import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { DepartmentEntity } from './Department.entity';
import { SubjectTeacherEntity } from './subjectTeacher.entity';

@Entity("Teacher")
export class TeacherEntity {
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

  @Column({ type: 'date' })
  DateOfBirth: Date;

  @Column()
  Gender: string;

  @Column()
  Education: string;

  @Column()
  Password: string;

  @Column()
  ProfilePicture: string;
  
  @ManyToOne(() => DepartmentEntity, (teacherDepartment) => teacherDepartment.Teachers)
  TeacherDepartment: DepartmentEntity;

//   @OneToMany(() => Note, (note) => note.Teacher)
//   Notes: Note[];

//   @OneToMany(() => Notice, (notice) => notice.Teacher)
//   Notices: Notice[];

  @OneToMany(() => SubjectTeacherEntity, (subjectTeacher) => subjectTeacher.Teacher)
  STeachers: SubjectTeacherEntity[];

//   @OneToMany(() => TeacherStudentChat, (teacherStudentChat) => teacherStudentChat.Teacher)
//   TeacherStudentChats: TeacherStudentChat[];
}
