import {Component, OnInit, TemplateRef} from '@angular/core';
import {StudentService} from "../../../core/services/student.service";
import {student} from "../../../types/student-interface";
import {ActivatedRoute, Router} from "@angular/router";
import {SchoolService} from "../../../core/services/school.service";
import {school} from "../../../types/school-interface";
import {NbDialogService} from "@nebular/theme";

@Component({
  selector: 'app-every-school-page',
  templateUrl: './every-school-page.component.html',
  styleUrls: ['./every-school-page.component.css']
})
export class EverySchoolPageComponent implements OnInit {


  studentArray: student[] = [];
  allStudentsArray: student [] =[];
  allStudentsNotFromSchoolArray: student[] = [];
  thisSchool: school;
  thisStudent: student;
  school_id: string;
  constructor( private router: Router, private dialogService: NbDialogService, private schoolService : SchoolService, private studentservice: StudentService, private route: ActivatedRoute) { }

  ngOnInit() {

      this.route.params.subscribe(params =>{
      this.school_id = params.school_id;
      this.getSchool();
      this.getStudentFromSchool();
      this.getAllStudents();
    });
    //const school_id = this.route.snapshot.paramMap.get('school_id');


  }

  openDialog(dialog: TemplateRef<any>){
    this.dialogService.open(dialog);
  }


    openStudentAddDialog(dialog: TemplateRef<any>, student: student){
    this.dialogService.open(dialog).onClose.subscribe(thisStudent=> thisStudent &&  this.addOneStudentToThisSchool(student, this.thisSchool.school_id.toString()));
  }




  getSchool(){

    this.schoolService.getOneSchool(this.school_id).subscribe(thisSchool=>{
      this.thisSchool = thisSchool;
    }, error => {
      console.log(error.message);
    });
  }

  getStudentFromSchool(){
    this.studentservice.getStudentsFromSchool(this.school_id).subscribe(thisStudentArray=>{
      this.studentArray = thisStudentArray;
    }, error => {
      console.log(error.message);
    });
  }

  getAllStudents(){
    this.studentservice.getAllStudnets().subscribe(thisAllStudentsArray=>{
      console.log("BLUB")
      this.allStudentsArray  = thisAllStudentsArray;
    } ,error => {
      console.log(error.message);
    })
  }

  getAllstudentsNotFromThisSchool(school_id: string){
      this.studentservice.getAllStudentsNotFromThisSchool(school_id).subscribe(thisStudentArray=>{
        this.allStudentsNotFromSchoolArray = thisStudentArray;
        console.log(thisStudentArray)
      }, error => {
        console.log(error.message)
      })

  }


  deleteOneStudentFromSchool(student_id :string, school_id: string){
    this.studentservice.deleteOneStudentFromSchool(student_id,school_id).subscribe(()=>{
      this.getStudentFromSchool()
     // this.getAllstudentsNotFromThisSchool(school_id);
    });

  }

  addOneStudentToThisSchool( thisStudent: student, school_id : string){
    console.log("HELLO")
    this.studentservice.addOneStudenToSchool(thisStudent, school_id).subscribe(()=>{
      this.getAllStudents();
       this.getStudentFromSchool();
    });

}





}
