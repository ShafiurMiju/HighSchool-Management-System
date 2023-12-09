import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { StudentEntity } from "./student.entity";
import { examEntity } from "./exam.Entity";
import { SubjectEntity } from "./Subject.entity";
import { gradeEntity } from "./grade.Entity";

@Entity("Result")
export class resultEntity{
    @PrimaryGeneratedColumn()
    ID: number;

    @Column()
    MarksObtained: number;

    @Column({ type: 'date' })
    PublishedDate: Date;

    @ManyToOne(() => StudentEntity, (student) => student.Results)
    Student: StudentEntity;

    @ManyToOne(() => examEntity, (exam) => exam.Results)
    Exam: examEntity;

    @ManyToOne(() => SubjectEntity, (subject) => subject.Results)
    Subject: SubjectEntity;

    @ManyToOne(() => gradeEntity, (grade) => grade.Results)
    Grade: gradeEntity;
}