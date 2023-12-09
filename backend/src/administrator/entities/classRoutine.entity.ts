import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { classEntity } from "./class.entity";
import { sectionEntity } from "./section.entity";

@Entity("ClassRoutine")
export class classRoutineEntity{
    @PrimaryGeneratedColumn()
    ID: number;

    @Column()
    File: string;

    @Column({ type: 'timestamp', nullable: true })
    CreatedDate: Date;

    @Column()
    ExpiredDate: Date;

    @ManyToOne(() => classEntity, (Class) => Class.ClassRoutine)
    Class: classEntity;

    @ManyToOne(() => sectionEntity, (section) => section.ClassRoutine)
    Section: sectionEntity;

}