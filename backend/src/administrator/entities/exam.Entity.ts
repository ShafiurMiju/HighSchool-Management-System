import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { examtypeEntity } from "./examtype.Entity";
import { classEntity } from "./class.entity";
import { examRoutineEntity } from "./examRoutine.entity";
import { resultEntity } from "./result.entity";

@Entity("Exam")
export class examEntity{
    @PrimaryGeneratedColumn()
    ID: number

    @Column()
    ExamDate: Date

    @ManyToOne(() => examtypeEntity, (examtype) => examtype.Exams)
    ExamType: examtypeEntity;

    @ManyToOne(() => classEntity, (Class) => Class.Exams)
    Class: classEntity;

    @OneToMany(() => examRoutineEntity, (examRoutine) => examRoutine.Exam)
    ExamRoutines: examRoutineEntity[];

    @OneToMany(() => resultEntity, (result) => result.Exam)
    Results: resultEntity[];

}