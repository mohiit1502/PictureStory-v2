import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Image } from '../../image';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  
  @Input() image: Image;
  @HostBinding('class.col-lg-2') quarter = false;

  constructor() { }

  ngOnInit() {
    this.quarter = true;
  }

}
