import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, Res, Query, UseGuards, Session, UnauthorizedException, Put, ParseIntPipe } from '@nestjs/common';
import { AdministratorService } from './administrator.service';
import { AdministratorLoginDTO } from './dto/AdministratorLogin.dto';
import { AdministratorEntity } from './entities/administrator.entity';
import { AdministratorPassChangeDTO } from './dto/AdministratorPassChange.dto';
import { classDTO } from './dto/class.dto';
import { classEntity } from './entities/class.entity';
import { sectionDTO } from './dto/section.dto';
import { sectionEntity } from './entities/section.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { StudentEntity } from './entities/student.entity';
import { StudentDTO } from './dto/student.dto';
import { Transform } from 'class-transformer';
import { SchoolInfoDTO } from './dto/SchoolInfo.dto';
import { SchoolInfoEntity } from './entities/SchoolInfo.entity';
import { DepartmentEntity } from './entities/Department.entity';
import { DepartmentDTO } from './dto/Department.dto';
import { TeacherDTO } from './dto/Teacher.dto';
import { TeacherEntity } from './entities/Teacher.entity';
import { StaffDTO } from './dto/Staff.dto';
import { StaffEntity } from './entities/Staff.entity';
import { SubjectEntity } from './entities/Subject.entity';
import { SubjectDTO } from './dto/Subject.dto';
import { gradeDTO } from './dto/grade.dto';
import { gradeEntity } from './entities/grade.Entity';
import { examtypeEntity } from './entities/examtype.Entity';
import { classRoutineEntity } from './entities/classRoutine.entity';
import { classRoutineDTO } from './dto/classRoutine.dto';
import { examDTO } from './dto/exam.dto';
import { examEntity } from './entities/exam.Entity';
import { examRoutineEntity } from './entities/examRoutine.entity';
import { ExamRoutineDTO } from './dto/examRoutine.dto';
import { SessionGuard } from './session.guard';
import { MessageDTO } from './dto/message.dto';
import { MessageEntity } from './entities/message.entity';
import { AcademicNoticeEntity } from './entities/academicNotice.entity';
import { AcademicNoticeDTO } from './dto/notice.dto';

@Controller('administrator')
export class AdministratorController {
  constructor(private readonly administratorService: AdministratorService) {}

  //School Information
  @Post("/schoolinfo")
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('mySchoolfile',{fileFilter:(req, file, cb)=>{
    if(file.originalname.match(/^.*\.(jpg|webp|png|jepg)$/)){
      cb(null, true)
    }else{
      cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false)
    }
  }, limits:{fileSize: 300000}, storage: diskStorage({destination: './SchoolFile', filename: function(req, file, cb){
    cb(null, Date.now()+file.originalname)}})   
  }))

  async addSchoolInfo(@Body() SchoolInfo:SchoolInfoDTO, @UploadedFile() file: Express.Multer.File):Promise<SchoolInfoEntity[]>{
    SchoolInfo.Logo = file.filename
    console.log(SchoolInfo)
    return await this.administratorService.addSchoolInfo(SchoolInfo);
  }

  //Administrator Login
  @Get("/")
  @UsePipes(new ValidationPipe())
  async login(@Session() session, @Body() loginData:AdministratorLoginDTO){
    const logdata = await this.administratorService.login(loginData)
    if(logdata == "Login Success"){
      session.email = loginData.Email
      return (session.email)
    }
    else{
      throw new UnauthorizedException({ message: "User not found" });
    }
  }

  //Forget password
  @Get("/forgetpass")
  async forgetPass(@Session() session, @Body() email, @Body() otp){
    var ex = await this.administratorService.forgetPass(email);

    if(ex == true){
      session.temp = email.Email
      var pin = Math.random().toString().substr(2, 6)

      session.otp = pin

      console.log(pin)

      otp.email = session.temp
      otp.subject = "Verification Code"
      otp.text = "OTP: "+pin

      console.log(otp)

      return "Email found" + await this.administratorService.forgetpassverify(otp)
    }
    else{
      throw new UnauthorizedException({ message: "Email not found" });
    }
  }

  @Get("/forgetpassverify")
  async forgetpassverify(@Session() session, @Body() otp){
      var genOTP = session.otp
      if(genOTP == otp.otp){
        return "correct otp"
      }else{
        return "wrong otp"
      }
  }

  @Patch("/forgetpasschange")
  async forgetPassChange(@Session() session, @Body() newpass){
    if(newpass.Password == newpass.ConfirmPassword){
      return await this.administratorService.forgetPassChange(session.temp, newpass)
    }
    else{
      return "password not match"
    }
    
  }

  //Administrator Profile View
  @Get("/profile")
  @UseGuards(SessionGuard)
  async profile(@Session() session):Promise<AdministratorEntity>{
    return this.administratorService.profile(session.email)
  }

  //Administrator password change
  @Patch("/passwordchange/:Id")
  @UsePipes(new ValidationPipe())
  async passwordChange(@Param("Id", ParseIntPipe) Id:number, @Body() newPass:AdministratorPassChangeDTO){
    console.log(newPass)
    return await this.administratorService.passwordChange(Id, newPass)
  }

  //Add class
  @Post("/addClass")
  @UsePipes(new ValidationPipe())
  async addClass(@Body() classData:classDTO):Promise<classEntity>{
    return await this.administratorService.addClass(classData)
  }

  //View Class
  @Get("/viewClass")
  async viewClass():Promise<classEntity[]>{
    return await this.administratorService.viewClass()
  }

  //Delete Class
  @Delete("/deleteClass/:Id")
  async deleteClass(@Param("Id") Id:number){
    return await this.administratorService.deleteClass(Id)
  }

  //Add Section
  @Post("/addSection")
  @UsePipes(new ValidationPipe())
  async addSection(@Body() sectionData:sectionDTO):Promise<sectionEntity>{
    return await this.administratorService.addSection(sectionData)
  }

  //View Section
  @Get("/viewSection")
  async viewSection():Promise<sectionEntity[]>{
    return await this.administratorService.viewSection()
  }

  //Delete Section
  @Delete("/deleteSection/:Id")
  async deleteSection(@Param("Id") Id:number){
    return await this.administratorService.deleteSection(Id)
  }


  //Add a Student
  @Post("/addstudent")
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('myfile',{fileFilter:(req, file, cb)=>{
    if(file.originalname.match(/^.*\.(jpg|webp|png|jepg)$/)){
      cb(null, true)
    }else{
      cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false)
    }
  }, limits:{fileSize: 300000}, storage: diskStorage({destination: './uploadFile', filename: function(req, file, cb){
    cb(null, Date.now()+file.originalname)}})   
  }))

  async addStudent(@Body() student:StudentDTO, @UploadedFile() file: Express.Multer.File):Promise<StudentEntity[]>{
    student.ProfilePicture = file.filename
    student.AdmissionDate = new Date()

    console.log(student)
    return await this.administratorService.addStudent(student);
  }

  //All Student list
  @Get("/viewStudent")
  async viewStudent(){
    return await this.administratorService.viewStudent()
  }

  //All Student list by class
  @Get("/viewStudentByClass")
  async viewStudentByClass(@Body() className:any){
    return await this.administratorService.viewStudentByClass(className)
  }

  //All Student list View by Class and Section
  @Get("/student")
  async deleteStudent(@Query("Class") ClassName:any, @Query("Section") SectionName:any){
    console.log(ClassName)
    console.log(SectionName)
    return await this.administratorService.deleteStudent(ClassName, SectionName)
  }

  //Update student
  @Put("updatestudent/:id")
  async updateStudent(@Param("id") id:number, @Body() updateData){
    console.log(id)
    console.log(updateData)
    return await this.administratorService.updateStudent(id, updateData)
  }

  //Student Photo Upload
  @Patch("updatephoto/:id")
  @UseInterceptors(FileInterceptor('myfile',{fileFilter:(req, file, cb)=>{
    if(file.originalname.match(/^.*\.(jpg|webp|png|jepg)$/)){
      cb(null, true)
    }else{
      cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false)
    }
  }, limits:{fileSize: 300000}, storage: diskStorage({destination: './uploadFile', filename: function(req, file, cb){
    cb(null, Date.now()+file.originalname)}})   
  }))

  async updatePhoto(@Param("id") id:number, @Body() updateData, @UploadedFile() file: Express.Multer.File){
    updateData.ProfilePicture = file.filename
    console.log(id)
    console.log(updateData)
    return await this.administratorService.updatePhoto(id, updateData)
  }


  //Add Department
  @Post("/addDepartment")
  @UsePipes(new ValidationPipe())
  async addDepartment(@Body() department:DepartmentDTO):Promise<DepartmentEntity[]>{
    return await this.administratorService.addDepartment(department)
  }

  
  //Add a Teacher
  @Post("/addteacher")
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('teacherPhoto',{fileFilter:(req, file, cb)=>{
    if(file.originalname.match(/^.*\.(jpg|webp|png|jepg)$/)){
      cb(null, true)
    }else{
      cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false)
    }
  }, limits:{fileSize: 300000}, storage: diskStorage({destination: './myFile/teacherPhoto', filename: function(req, file, cb){
    cb(null, Date.now()+file.originalname)}})   
  }))

  async addTeacher(@Body() teacher:TeacherDTO, @UploadedFile() file: Express.Multer.File):Promise<TeacherEntity[]>{
    teacher.ProfilePicture = file.filename
    console.log(teacher)
    return await this.administratorService.addTeacher(teacher);
  }

  //All Teacher list
  @Get("/viewteacher")
  async viewTeacher(){
    return await this.administratorService.viewTeacher()
  }



  //Add Staff
  @Post("/addstaff")
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('staffPhoto',{fileFilter:(req, file, cb)=>{
    if(file.originalname.match(/^.*\.(jpg|webp|png|jepg)$/)){
      cb(null, true)
    }else{
      cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false)
    }
  }, limits:{fileSize: 300000}, storage: diskStorage({destination: './myFile/staffPhoto', filename: function(req, file, cb){
    cb(null, Date.now()+file.originalname)}})   
  }))

  async addStaff(@Body() staff:StaffDTO, @UploadedFile() file: Express.Multer.File):Promise<StaffEntity>{
    staff.ProfilePicture = file.filename
    return await this.administratorService.addStaff(staff)
  }
  
  //All Staff list
  @Get("/viewstaff")
  async viewStaff(){
    return await this.administratorService.viewStaff()
  }

  //Add Subject
  @Post("/addSubject")
  @UsePipes(new ValidationPipe())
  async addSubject(@Body() subject:SubjectDTO):Promise<SubjectEntity>{
    return await this.administratorService.addSubject(subject)
  }

  //Add Grade 
  @Post("/addgrade")
  @UsePipes(new ValidationPipe())
  async addgrade(@Body() grade:any):Promise<gradeEntity>{
    return await this.administratorService.addgrade(grade);
  }

  //Add Exam Type 
  @Post("/addexamtype")
  @UsePipes(new ValidationPipe())
  async addexamtype(@Body() examtype:any):Promise<examtypeEntity>{
    return await this.administratorService.addexamtype(examtype);
  }

  //Add Exam
  @Post("/addexam")
  @UsePipes(new ValidationPipe())
  async addExam(@Body() exam:examDTO):Promise<examEntity[]>{
    return await this.administratorService.addExam(exam)
  }

  //Add class routine
  @Post("/addclassroutine")
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('classRoutineFile',{fileFilter:(req, file, cb)=>{
    if(file.originalname.match(/^.*\.(pdf)$/)){
      cb(null, true)
    }else{
      cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false)
    }
  }, limits:{fileSize: 1000000}, storage: diskStorage({destination: './myFile/classRoutine', filename: function(req, file, cb){
    cb(null, Date.now()+file.originalname)}})   
  }))

  async addClassRoutine(@Body() classRoutine:classRoutineDTO, @UploadedFile() file: Express.Multer.File):Promise<classRoutineEntity[]>{
    console.log(classRoutine)

    classRoutine.File = file.filename
    classRoutine.CreatedDate = new Date();

    return await this.administratorService.addClassRoutine(classRoutine)
  }

  //Add exam routine
  @Post("/addexamroutine")
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('examRoutineFile',{fileFilter:(req, file, cb)=>{
    if(file.originalname.match(/^.*\.(pdf)$/)){
      cb(null, true)
    }else{
      cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'pdf'), false)
    }
  }, limits:{fileSize: 1000000}, storage: diskStorage({destination: './myFile/examRoutine', filename: function(req, file, cb){
    cb(null, Date.now()+file.originalname)}})   
  }))

  async addexamRoutine(@Body() examRoutine:ExamRoutineDTO, @UploadedFile() file: Express.Multer.File):Promise<examRoutineEntity[]>{
    examRoutine.File = file.filename
    examRoutine.Date = new Date();

    return await this.administratorService.addexamRoutine(examRoutine)
  }

  //Mailer
  @Post('/sendemail')
  sendEmail(@Body() mydata){
  console.log(mydata)
  return this.administratorService.sendEmail(mydata);
  }

  //Message
  @Post("/message")
  @UsePipes(new ValidationPipe())
  async message(@Body() message:MessageDTO):Promise<MessageEntity>{
    message.Date = new Date();
    return await this.administratorService.message(message)
  }

  //Academic Notice
  @Post("/notice")
  @UsePipes(new ValidationPipe())
  @UseGuards(SessionGuard)
  async ANotice(@Session() session, @Body() notice:AcademicNoticeDTO):Promise<AcademicNoticeEntity>{
    console.log(session)
    console.log(notice)
    notice.AcademicNoticeDate = new Date();
    console.log(notice)
    return await this.administratorService.ANotice(session, notice)
  }

  //Notice show
  @Get("/viewnotice")
  async viewNotice(@Session() session){
    return await this.administratorService.viewNotice(session)
  }

  //
  @Get('/signout')
  @UseGuards(SessionGuard)
  signout(@Session() session)
  {
    if(session.destroy())
    {
      return "you are logged out";
    }
    else
    {
      throw new UnauthorizedException("invalid actions");
    }
  }

}
