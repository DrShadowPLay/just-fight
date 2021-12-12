import {Component, OnInit, ChangeDetectionStrategy, NgZone, ChangeDetectorRef} from '@angular/core';
import {SchoolService} from "../../services/school.service";
import {school} from "../../../types/school-interface";
import {TeacherService} from "../../services/teacher.service";
import {teacher} from "../../../types/teacher-interface";
import {window} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent implements OnInit {
  schoolArray: school[] = [];
  teacherArray: teacher[] = [];
  school_id: string;
  blub: string = "PENIS";


  constructor(private ref: ChangeDetectorRef, private schoolservice: SchoolService, private teacherservice: TeacherService, private router: Router, private ngZone: NgZone) {
  }


  ngOnInit() {
    //this.school_id = params.school_id;
    this.getSchool();
    this.getTeacher();
    this.blub = "HELLO"
  }

  deleteSchool(school_id: string) {
    this.schoolservice.deleteOneSchool(school_id).subscribe(() => {
      this.router.navigate([
        '/school'
      ]).then(() => {
        this.getSchool();
        this.ref.detectChanges();
      });
    }, error => {
      console.log(error);
    });

  }

  deleteTeacher(teacher_id: string) {
    console.log(teacher_id)
    this.teacherservice.deleteOneTeacher(teacher_id).subscribe(() => {
        this.router.navigate([
          '/trainer'
        ]).then(() => {
          this.getTeacher();
          this.ref.detectChanges();
        });
      }
      , error => {
        console.log(error);
      })
  }

  getSchool = () => {
    console.log("in get school ")
    this.schoolservice.getSchools().subscribe(schoolArray => {
      this.schoolArray = schoolArray;
      this.ref.detectChanges();
    }, error => {
      console.log(error.message)
    });

  }

  emptyArray() {
    this.schoolArray = [];
  }

  getTeacher() {
    this.teacherservice.geteachers().subscribe(teacherArray => {
        this.teacherArray = teacherArray;
        this.ref.detectChanges();
      }, error => {
        console.log(error.message);
      }
    );
  }


}
