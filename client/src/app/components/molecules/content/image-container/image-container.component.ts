import { Component, OnInit, Output } from '@angular/core';
import { Image } from '../image';

@Component({
  selector: 'app-image-container',
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.scss']
})
export class ImageContainerComponent implements OnInit {
  @Output() images: Image[] = [
    new Image('dragonfly1', '/assets/images/GUD_1.JPG', 'Guddu 1'),
    new Image('dragonfly2', '/assets/images/GUD_2.JPG', 'sampleDesc2'),
    new Image('dragonfly3', '/assets/images/GUD_3.JPG', 'sampleDesc3'),
    new Image('dragonfly4', '/assets/images/GUD_4.JPG', 'sampleDesc4'),
    new Image('dragonfly1', '/assets/images/GUD_5.JPG', 'sampleDesc1'),
    new Image('dragonfly2', '/assets/images/GUD_6.JPG', 'sampleDesc2'),
    new Image('dragonfly3', '/assets/images/GUD_7.JPG', 'sampleDesc3'),
    new Image('dragonfly4', '/assets/images/GUD_8.JPG', 'sampleDesc4'),
    new Image('dragonfly1', '/assets/images/GUD_9.JPG', 'sampleDesc1'),
    new Image('dragonfly2', '/assets/images/GUD_10.JPG', 'sampleDesc2'),
    new Image('dragonfly3', '/assets/images/GUD_11.JPG', 'sampleDesc3'),
    new Image('dragonfly4', '/assets/images/GUD_12.JPG', 'sampleDesc4'),
    new Image('dragonfly1', '/assets/images/GUD_4.JPG', 'sampleDesc1'),
    new Image('dragonfly2', '/assets/images/GUD_3.JPG', 'sampleDesc2'),
    new Image('dragonfly3', '/assets/images/GUD_2.JPG', 'sampleDesc3'),
    new Image('dragonfly4', '/assets/images/GUD_1.JPG', 'sampleDesc4')
  ]

  constructor() { }

  ngOnInit() {
  }

}
