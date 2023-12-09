import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AdministratorEntity } from './administrator.entity';

@Entity('AcademicNotice')
export class AcademicNoticeEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  AcademicNoticeTitle: string;

  @Column()
  AcademicNoticeText: string;

  @Column({type:'date'})
  AcademicNoticeDate: Date;

  @ManyToOne(() => AdministratorEntity, (admin) => admin.AcademicNotices)
  Admin: AdministratorEntity;
}