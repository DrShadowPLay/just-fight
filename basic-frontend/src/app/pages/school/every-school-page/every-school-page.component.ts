import { Component, OnInit } from '@angular/core';
import {StudentService} from "../../../core/services/student.service";
import {student} from "../../../types/student-interface";
import {ActivatedRoute} from "@angular/router";
import {SchoolService} from "../../../core/services/school.service";
import {school} from "../../../types/school-interface";

@Component({
  selector: 'app-every-school-page',
  templateUrl: './every-school-page.component.html',
  styleUrls: ['./every-school-page.component.css']
})
export class EverySchoolPageComponent implements OnInit {


  studentArray: student[] = [];
  thisSchool: school;
  school_id: string;
  constructor(private schoolService : SchoolService, private studentservice: StudentService, private route: ActivatedRoute) { }

  ngOnInit() {

      this.route.params.subscribe(params =>{
      this.school_id = params.school_id;
      this.getSchool();
      this.getStudentFromSchool();
    });
    //const school_id = this.route.snapshot.paramMap.get('school_id');


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
      console.log(thisStudentArray);
      this.studentArray = thisStudentArray;
    }, error => {
      console.log(error.message);
    });
  }




}
