import { Injectable, Session } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdministratorEntity } from './entities/administrator.entity';
import { Repository } from 'typeorm';
import { AdministratorLoginDTO } from './dto/AdministratorLogin.dto';
import { AdministratorPassChangeDTO } from './dto/AdministratorPassChange.dto';
import { classDTO } from './dto/class.dto';
import { classEntity } from './entities/class.entity';
import { sectionEntity } from './entities/section.entity';
import { sectionDTO } from './dto/section.dto';
import { StudentEntity } from './entities/student.entity';
import * as bcrypt from 'bcrypt';
import { StudentDTO } from './dto/student.dto';
import { SchoolInfoEntity } from './entities/SchoolInfo.entity';
import { DepartmentEntity } from './entities/Department.entity';
import { TeacherEntity } from './entities/Teacher.entity';
import { StaffEntity } from './entities/Staff.entity';
import { SubjectEntity } from './entities/Subject.entity';
import { gradeDTO } from './dto/grade.dto';
import { gradeEntity } from './entities/grade.Entity';
import { SubjectDTO } from './dto/Subject.dto';
import { examtypeEntity } from './entities/examtype.Entity';
import { examtypeDTO } from './dto/examtype.dto';
import { classRoutineDTO } from './dto/classRoutine.dto';
import { classRoutineEntity } from './entities/classRoutine.entity';
import { examEntity } from './entities/exam.Entity';
import { examDTO } from './dto/exam.dto';
import { examRoutineEntity } from './entities/examRoutine.entity';
import { MailerService } from "@nestjs-modules/mailer/dist";
import { MessageEntity } from './entities/message.entity';
import { AcademicNoticeEntity } from './entities/academicNotice.entity';
import { AcademicNoticeDTO } from './dto/notice.dto';



@Injectable()
export class AdministratorService {
  constructor(
    @InjectRepository(AdministratorEntity) private AdministratorRepository: Repository<AdministratorEntity>,
    @InjectRepository(classEntity) private ClassRepository: Repository<classEntity>,
    @InjectRepository(sectionEntity) private SectionRepository: Repository<sectionEntity>,
    @InjectRepository(StudentEntity) private StudentRepository: Repository<StudentEntity>,
    @InjectRepository(SchoolInfoEntity) private SchoolInfoRepository: Repository<SchoolInfoEntity>,
    @InjectRepository(DepartmentEntity) private DepartmentRepository: Repository<DepartmentEntity>,
    @InjectRepository(TeacherEntity) private TeacherRepository: Repository<TeacherEntity>,
    @InjectRepository(StaffEntity) private StaffRepository: Repository<StaffEntity>,
    @InjectRepository(SubjectEntity) private SubjectRepository: Repository<SubjectEntity>,
    @InjectRepository(gradeEntity) private gradeRepository: Repository<gradeEntity>,
    @InjectRepository(examtypeEntity) private examtypeRepository: Repository<examtypeEntity>,
    @InjectRepository(classRoutineEntity) private classRoutineRepository: Repository<classRoutineEntity>,
    @InjectRepository(examEntity) private examRepository: Repository<examEntity>,
    @InjectRepository(examRoutineEntity) private examRoutineRepository: Repository<examRoutineEntity>,
    @InjectRepository(MessageEntity) private messageRepository: Repository<MessageEntity>,
    @InjectRepository(AcademicNoticeEntity) private academicNoticeRepository: Repository<AcademicNoticeEntity>,
    private mailerService: MailerService
  ) {}

  //School Information
  async addSchoolInfo(SchoolInfo:any):Promise<SchoolInfoEntity[]>{
    console.log(SchoolInfo)
    return await this.SchoolInfoRepository.save(SchoolInfo)
  }

  //Administrator Login
  async login(loginData:AdministratorLoginDTO){
    if(loginData.Email != null && loginData.Password != null){
      const exData = await this.AdministratorRepository.findOneBy({Email:loginData.Email})
      const isMatch = await bcrypt.compare(loginData.Password, exData.Password)

      if(isMatch){
        return "Login Success"
      }else{
        return "User Not Found"
      }
    }else{
      return "Email or Password Blank"
    }
  }

  //Forget Password
  async forgetPass(email){
    console.log(email)
    const ex = await this.AdministratorRepository.findOne({
      where:{
        Email:email.Email
      }
    })
    if(ex!=null){
      return true
    }
    else{
      return false
    }
  }

  async forgetpassverify(otp){
    console.log("Hello")
    console.log(otp)
    return await this.mailerService.sendMail({
      to: otp.email,
      subject: otp.subject,
      text: otp.text, 
    }); 
  }

  async forgetPassChange(email, newpass){
    const salt = await bcrypt.genSalt()
    const hassedpassed = await bcrypt.hash(newpass.Password, salt)

    newpass.Password = hassedpassed

    console.log(email)
    console.log(newpass.Password)

    const ex = await this.AdministratorRepository.findOne({
      where:{
        Email:email
      }
    })

    console.log(ex)

    ex.Password = newpass.Password;

    return await this.AdministratorRepository.update(ex.ID, ex)
  }

  //Administrator Profile View
  async profile(email: string):Promise<any>{
    try{
      const data = await this.AdministratorRepository.findOne({
        select:{
          FirstName: true,
          LastName: true,
          Email: true,
          ContactNumber: true,
          Gender: true,
          DateOfBirth: true,
          Address: true
        },
        where:{
          Email:email
        }
      })

      if(data!=null){
        return data
      }else{
        return "User Not Found"
      }
    }catch(error){
      return error
    }
  }

  //Administrator password change
  async passwordChange(Id:number, newPass:AdministratorPassChangeDTO){

    const salt = await bcrypt.genSalt()
    const hassedpassed = await bcrypt.hash(newPass.Password, salt)

    newPass.Password = hassedpassed

    console.log(newPass)

    return await this.AdministratorRepository.update(Id, newPass)
  }

  //Add Class
  async addClass(classData:classDTO):Promise<classEntity>{
    return await this.ClassRepository.save(classData)
  }

  //View Class
  async viewClass():Promise<classEntity[]>{
    return await this.ClassRepository.find()
  }

  //Delete Class
  async deleteClass(Id:number){
    return await this.ClassRepository.delete(Id)
  }

  //Add Section
  async addSection(sectionData:sectionDTO):Promise<sectionEntity>{
    return await this.SectionRepository.save(sectionData)
  }

  //View Section
  async viewSection():Promise<sectionEntity[]>{
    return await this.SectionRepository.find()
  }

  //Delete Section
  async deleteSection(Id:number){
    return await this.SectionRepository.delete(Id)
  }

  //Add a Student
  async addStudent(student:StudentDTO):Promise<StudentEntity[]>{
    const salt = await bcrypt.genSalt()
    const hassedpassed = await bcrypt.hash(student.StudentPassword, salt)

    student.StudentPassword = hassedpassed

    await this.StudentRepository.save(student);
    
    return await this.StudentRepository.find({
      relations:{
        Class:true,
        Section:true
      }
    })
  } 


  //All Student list View
  async viewStudent(){
    return await this.StudentRepository.find({
      relations:{
        Class:true,
        Section:true
      }
    })
  }


  //All Student list View by Class
  async viewStudentByClass(className:any){
    return await this.StudentRepository.find({
      relations:{
        Class:true,
        Section:true
      },
      where:{
        Class: className
      }
    })
  }

  //All Student list View by Class and Section
  async deleteStudent(ClassName:any, SectionName:any){
    console.log(ClassName)
    console.log(SectionName)
    return await this.StudentRepository.find({
      relations:{
        Class:true,
        Section:true
      },
      where:{
        Class: {ClassName: ClassName},
        Section:{SectionName: SectionName}
      }
    });
  }

  //Update Student
  async updateStudent(id:number, updateData){
    console.log(id)
    console.log(updateData)
    return this.StudentRepository.update(id, updateData)
  }

  //Update Student Photo
  async updatePhoto(id:number, updateData){
    console.log(id)
    console.log(updateData)
    return this.StudentRepository.update(id, updateData)
  }


  //Add Department
  async addDepartment(department:any):Promise<DepartmentEntity[]>{
    return await this.DepartmentRepository.save(department)
  }


  //Add a Teacher
  async addTeacher(teacher:any):Promise<TeacherEntity[]>{
    const salt = await bcrypt.genSalt()
    const hassedpassed = await bcrypt.hash(teacher.Password, salt)

    teacher.Password = hassedpassed

    await this.TeacherRepository.save(teacher);
    
    return await this.TeacherRepository.find({
      relations:{
        TeacherDepartment: true
      }
    })
  } 

  //All Teacher list View
  async viewTeacher(){
    return await this.TeacherRepository.find({
      relations:{
         TeacherDepartment: true
      }
    })
  }

  //Add a Staff
  async addStaff(staff:any):Promise<StaffEntity>{
    return await this.StaffRepository.save(staff);
  } 

  //All Teacher list View
  async viewStaff(){
    return await this.StaffRepository.find()
  }

  //Add Subject
  async addSubject(subject:SubjectDTO):Promise<SubjectEntity>{
    return await this.SubjectRepository.save(subject)
  }

  //add garde
  async addgrade(grade:gradeDTO):Promise<gradeEntity>{
    return await this.gradeRepository.save(grade)
  }

  //add Exam Type
  async addexamtype(examtype:examtypeDTO):Promise<examtypeEntity>{
    return await this.examtypeRepository.save(examtype)
  }

  //Add Exam 
  async addExam(exam:any):Promise<examEntity[]>{
    return await this.examRepository.save(exam)
  }

  //add Class Routine
  async addClassRoutine(classRoutine:any):Promise<classRoutineEntity[]>{
    console.log(classRoutine)
    return await this.classRoutineRepository.save(classRoutine);
  }

  //add Exam Routine
  async addexamRoutine(examRoutine:any):Promise<examRoutineEntity[]>{
    return await this.examRoutineRepository.save(examRoutine);
  }

  //Mailer
  async sendEmail(mydata){
    console.log(mydata)
    return await this.mailerService.sendMail({
      to: mydata.email,
      subject: mydata.subject,
           text: mydata.text, 
    }); 
   }

  //Message
  async message(message:any):Promise<MessageEntity>{
    console.log(message)
    return this.messageRepository.save(message)
  }

  //Academic Notice
  async ANotice(@Session() session, notice:any):Promise<AcademicNoticeEntity>{
    console.log(session)

    const ex = await this.AdministratorRepository.findOne({
      where:{
        Email: session.email
      }
    })

    console.log(ex)
    const id = ex.ID
    notice.Admin = id
    
    console.log(notice)
    return this.academicNoticeRepository.save(notice)
  }

  //view notice 
  async viewNotice(@Session() email){
    console.log(email)
    var Email = email.email;
    return await this.academicNoticeRepository.find({
      relations:{
        Admin:true,
      },
      where:{
        Admin: {Email: email.email},
      }
    });
  }
  

 
}
