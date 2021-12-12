import { Component, OnInit } from '@angular/core';
import {teacher} from "../../../types/teacher-interface";
import {TeacherService} from "../../../core/services/teacher.service";
import {getOneTeacher} from "../../../../../../basic-backend/models/teacher";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-one-trainer-page',
  templateUrl: './one-trainer-page.component.html',
  styleUrls: ['./one-trainer-page.component.css']
})
export class OneTrainerPageComponent implements OnInit {

  oneTrainer: teacher;
  teacher_id: number;

  constructor(private teacherService: TeacherService, private  route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.teacher_id = params.teacher_id
      this.getOneTeacher(this.teacher_id.toString());
    });

  }

  getOneTeacher(teacher_id:string){
    this.teacherService.getOneTeacher(teacher_id).subscribe(thisTeacher =>{
      this.oneTrainer = thisTeacher;

    },err=>{
      console.log(err.message);
    }
    )
  }
}
