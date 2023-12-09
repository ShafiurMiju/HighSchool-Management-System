import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { resultEntity } from './result.entity';
import { SubjectTeacherEntity } from './subjectTeacher.entity';

@Entity("Subject")
export class SubjectEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  SubjectName: string;

  @OneToMany(() => resultEntity, (result) => result.Subject)
  Results: resultEntity[];

  @OneToMany(() => SubjectTeacherEntity, (subjectTeacher) => subjectTeacher.Subject)
  STeachers: SubjectTeacherEntity[];
}
