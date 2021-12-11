import {Component, HostBinding, OnInit, TemplateRef} from '@angular/core';
import {NbDialogService, NbSidebarService} from "@nebular/theme";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {teacher} from "../../types/teacher-interface";
import {TeacherService} from "../services/teacher.service";
import {SchoolService} from "../services/school.service";
import {school} from "../../types/school-interface";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  fromInvalid: boolean = false;
  formSubmitted: boolean = false;

  addSchoolForm: FormGroup = new FormGroup({
    school_idInput: new FormControl(),
    school_nameInput: new FormControl(),
    school_placeInput: new FormControl(),
    school_plzInput: new FormControl(),
  });

  addTeacherForm: FormGroup = new FormGroup({
    school_idInput: new FormControl(),
    nameInput: new FormControl(),
    lastNameInput: new FormControl(),
    emailInput: new FormControl(),
    telNrInput: new FormControl()

  });

  constructor(private sidebarService: NbSidebarService, private dialogService: NbDialogService, private formBuilder: FormBuilder , private teacherService: TeacherService, private schoolService : SchoolService) {
  }

  ngOnInit(): void {
    this.addSchoolForm = this.formBuilder.group({
      school_nameInput:[null, [Validators.required]],
      school_placeInput:[null,[Validators.required]],
      school_plzInput: [null, [Validators.required]]
    });

    this.addTeacherForm = this.formBuilder.group({
      school_idInput: [null, [Validators.required]],
      nameInput: [null, [Validators.required]],
      lastNameInput: [null, [Validators.required]],
      emailInput: [null, [Validators.required, Validators.email]],
      telNrInput: [null]
    });


  }

  toggle() {
    this.sidebarService.toggle();
  }

  opendialog(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  async addSchool(){
    this.formSubmitted = true;
    if(this.addSchoolForm.invalid)
    {
      this.fromInvalid = true;
      return;
    }
    else {
      const thisSchool:school ={
        school_id :0,
        school_name: this.addSchoolForm.value.school_nameInput,
        school_plz: this.addSchoolForm.value.school_plzInput,
        school_place: this.addSchoolForm.value.school_placeInput,
        teacher: null

      }
        this.schoolService.addSchools(thisSchool).subscribe(next=>{}, error => {
          console.log(error.message);
        });
      this.formSubmitted = false;
      this.fromInvalid = false;
      window.location.reload();
    }

  }

  async addTeacher() {
    this.formSubmitted = true;
    if (this.addTeacherForm.invalid) {
      this.fromInvalid = true;
      return;
    } else {

      const thisTeacher: teacher = {
        teacher_id: 0,
        school_id: this.addTeacherForm.value.school_idInput,
        teacher_name: this.addTeacherForm.value.nameInput,
        teacher_lastName: this.addTeacherForm.value.lastNameInput,
        teacher_mail: this.addTeacherForm.value.emailInput,
        teacher_telNumber: this.addTeacherForm.value.telNrInput,
        students: []
      }
       this.teacherService.addTeacher(thisTeacher).subscribe(next=>{},err => {
        console.log(err.message);
      })
      this.formSubmitted = false;
      this.fromInvalid = false;
      window.location.reload();
    }
  }



  items = [{title: 'Profile'}, {title: 'Log out'}];

}

