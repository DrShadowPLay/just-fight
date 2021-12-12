import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {teacher} from "../../../types/teacher-interface";
import {TeacherService} from "../../../core/services/teacher.service";

@Component({
  selector: 'app-trainer-page',
  templateUrl: './trainer-page.component.html',
  styleUrls: ['./trainer-page.component.css']
})
export class TrainerPageComponent implements OnInit {

  oneteacher: teacher;
  constructor(private teacherService: TeacherService, private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
  }
  getOneTrainier(trainer_id: string){
    this.teacherService.getOneTeacher(trainer_id).subscribe(teacher=>{
      this.oneteacher = teacher;
      this.ref.detectChanges();
    }, error => {
      console.log(error.message);
    })
  }


}
