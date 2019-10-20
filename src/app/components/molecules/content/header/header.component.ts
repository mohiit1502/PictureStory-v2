import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @HostBinding('class.container-fluid') expand: boolean = false;

  constructor() { }

  ngOnInit() {
    this.expand = true;
  }

}
