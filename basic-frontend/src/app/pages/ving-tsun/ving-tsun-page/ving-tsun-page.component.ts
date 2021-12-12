import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../core/services/api.service";

@Component({
  selector: 'app-ving-tsun-page',
  templateUrl: './ving-tsun-page.component.html',
  styleUrls: ['./ving-tsun-page.component.css']
})
export class VingTsunPageComponent implements OnInit {

  constructor(private  apiService: ApiService) { }

  ngOnInit(): void {
  }

}
