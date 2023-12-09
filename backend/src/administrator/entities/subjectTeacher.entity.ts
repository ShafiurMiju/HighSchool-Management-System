import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TeacherEntity } from './Teacher.entity';
import { SubjectEntity } from './Subject.entity';
import { classEntity } from './class.entity';
import { sectionEntity } from './section.entity';


@Entity("SubjectTeacher")
export class SubjectTeacherEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @ManyToOne(() => TeacherEntity, (teacher) => teacher.STeachers)
  Teacher: TeacherEntity;

  @ManyToOne(() => SubjectEntity, (subject) => subject.STeachers)
  Subject: SubjectEntity;

  @ManyToOne(() => classEntity, (Class) => Class.STeachers)
  Class: classEntity;

  @ManyToOne(() => sectionEntity, (section) => section.STeachers)
  Section: sectionEntity;
}