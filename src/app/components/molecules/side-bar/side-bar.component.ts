import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  
  @Output() tabsData = [
    {'href': 'homeSubmenu', 'tabImage': 'fa-home', 'tabText': 'Home', 'activeClass': true, 'subList': false},
    {'href': 'about', 'tabImage': 'fa-briefcase', 'tabText': 'About', 'activeClass': false, 'subList': false},
    {'href': 'pageSubmenu', 'tabImage': 'fa-copy', 'tabText': 'Tasks', 'activeClass': false, 'subList': true},
    {'href': 'favorites', 'tabImage': 'fa-image', 'tabText': 'Favorites', 'activeClass': false, 'subList': false},
    {'href': 'question', 'tabImage': 'fa-question', 'tabText': 'FAQ', 'activeClass': false, 'subList': false},
    {'href': 'contact', 'tabImage': 'fa-paper-plane', 'tabText': 'Contact', 'activeClass': false, 'subList': false},
  ]

  constructor() { }

  ngOnInit() {
  }

}
