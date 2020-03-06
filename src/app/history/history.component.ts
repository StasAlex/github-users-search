import { EventEmitter } from 'protractor';
import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  @Input() users: [];

  constructor() {}

  ngOnInit() {}
}
