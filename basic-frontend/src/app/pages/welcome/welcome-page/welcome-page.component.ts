import {Component, OnInit, TemplateRef} from '@angular/core';
import {NbDialogService} from "@nebular/theme";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  createInput: string;
  filterInput: string;


  constructor(private dialogService: NbDialogService) {
  }




  ngOnInit(): void {
  }

  openDialog(dialog: TemplateRef<any>){
    this.dialogService.open(dialog);
  }
}


