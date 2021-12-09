import {Component, HostBinding, OnInit} from '@angular/core';
import {NbSidebarService} from "@nebular/theme";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private sidebarService: NbSidebarService) {
  }

  ngOnInit(): void {
  }

  toggle() {
    this.sidebarService.toggle();
  }
  items = [{ title: 'Profile' }, { title: 'Log out' }];

}

