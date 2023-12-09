import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StudentEntity } from "./student.entity";
import { classRoutineEntity } from "./classRoutine.entity";
import { examRoutineEntity } from "./examRoutine.entity";
import { SubjectTeacherEntity } from "./subjectTeacher.entity";

@Entity("section")
export class sectionEntity{
    @PrimaryGeneratedColumn()
    ID: number

    @Column()
    SectionName: string;

    @OneToMany(() => StudentEntity, (student) => student.Section, {cascade:true})
    Students: StudentEntity[];

    @OneToMany(() => classRoutineEntity, (classroutine) => classroutine.Section)
    ClassRoutine: classRoutineEntity[]

    @OneToMany(() => examRoutineEntity, (examroutine) => examroutine.Section)
    ExamRoutines: examRoutineEntity[]

    @OneToMany(() => SubjectTeacherEntity, (subjectTeacher) => subjectTeacher.Section)
    STeachers: SubjectTeacherEntity[];
}