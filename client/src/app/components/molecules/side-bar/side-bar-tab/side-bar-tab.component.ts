import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-side-bar-tab',
  templateUrl: './side-bar-tab.component.html',
  styleUrls: ['./side-bar-tab.component.scss']
})
export class SideBarTabComponent implements OnInit {
  
  @Input() tab: {'href': string, 'tabImage': string, 'tabText': string, 'activeClass': string};

  constructor() { }

  ngOnInit() {
  }

}
