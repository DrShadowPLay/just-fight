import { Component, OnInit } from '@angular/core';
import {StudentService} from "../../../core/services/student.service";
import {student} from "../../../types/student-interface";

@Component({
  selector: 'app-school-page',
  templateUrl: './school-page.component.html',
  styleUrls: ['./school-page.component.css']
})
export class SchoolPageComponent implements OnInit {

  studentArray: student[] =[];
  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.getAllStudnets().subscribe(schoolArray=>{
      this.studentArray = schoolArray;
    }, error => {
      console.log(error.message);
    });

  }

}

