import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { classEntity } from './class.entity';
import { sectionEntity } from './section.entity';
import { examEntity } from './exam.Entity';


@Entity("ExamRoutine")
export class examRoutineEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  File: string;

  @Column({ type: 'date' })
  Date: Date;

  @ManyToOne(() => classEntity, (Class) => Class.ExamRoutines)
  Class: classEntity;

  @ManyToOne(() => sectionEntity, (section) => section.ExamRoutines)
  Section: sectionEntity;

  @ManyToOne(() => examEntity, (exam) => exam.ExamRoutines)
  Exam: examEntity;
}