import { Component, OnInit , ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
