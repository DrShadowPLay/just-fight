import { Component, OnInit } from '@angular/core';
import {school} from "../../types/school-interface";
import {SchoolService} from "../services/school.service";
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


  constructor() { }

  async ngOnInit() {


  }


}
