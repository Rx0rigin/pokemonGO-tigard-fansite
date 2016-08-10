import {Component, OnInit, OnDestroy} from '@angular/core';
import {NavController} from 'ionic-angular';
import { CalendarComponent } from '../../components/calendar/calendar.component';

/**
 * Calendar component made for Ionic 2 and Angular.io
 */
@Component({
  directives: [CalendarComponent], 
  templateUrl: 'build/pages/calendar/calendar.html'
})
export class CalendarPage implements OnInit, OnDestroy {
  daySquares: Array<{ dayNumber: number }>;
  tile: Array<{ tileNumber: number }>;
  constructor(private navCtrl: NavController) {
   
  }
  /**
   * When Calendar component is called we want to set up a 
   * 6 by 7 wide grid with the current month displayed. 
   */
  ngOnInit() {
    this.daySquares = [];
    for ( let i = 0, m = 31; i < m; i++ ) {
      this.daySquares.push({ dayNumber: i });
    }
    /**
     * Subscribe to calendar events and data
     */
  }
  ngOnDestroy() {


  }
  
}
