import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {SchoolService} from "../../services/school.service";
import {school} from "../../../types/school-interface";
import {TeacherService} from "../../services/teacher.service";
import {teacher} from "../../../types/teacher-interface";

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent implements OnInit {
  schoolArray: school[] = [];
  teacherArray: teacher[] = [];
  constructor(private schoolservice: SchoolService, private teacherservice: TeacherService) {
  }


  async ngOnInit() {
   await this.schoolservice.getSchools().subscribe(schoolArray=>{
     this.schoolArray = schoolArray;
   }, error => {
     console.log(error.message);
   });

    this.teacherservice.geteachers().subscribe(teacherArray=>{
      this.teacherArray = teacherArray;
    }, error => {
      console.log(error.message);
      }
    );
  }

}
