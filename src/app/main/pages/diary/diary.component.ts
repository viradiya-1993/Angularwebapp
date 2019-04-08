import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { startOfDay, isSameDay, isSameMonth } from 'date-fns';
import { CalendarEvent,CalendarEventTimesChangedEvent, CalendarMonthViewDay } from 'angular-calendar';
import { fuseAnimations } from '@fuse/animations';
import { DiaryService } from './diary.service';
import { DiaryEventModel } from './event.model';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-diary',
    templateUrl: './diary.component.html',
    styleUrls: ['./diary.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class DiaryComponent implements OnInit {
     
    activeDayIsOpen: boolean;  
    dialogRef: any;
    events: CalendarEvent[];
    refresh: Subject<any> = new Subject();
    selectedDay: any;
    view: string;
    viewDate: Date;

    constructor(
        private _calendarService: DiaryService,
        private route: ActivatedRoute,
        private _httpClient: HttpClient,
    ) {
        this.route.queryParams.subscribe(params => {
            if(params['calander']){
                this.view=params['calander'];
            }
            else{
                this.view = 'month';
            }            
        });
       // Set the defaults        
        this.viewDate = new Date();
        this.activeDayIsOpen = true;
        this.selectedDay = { date: startOfDay(new Date()) };

        /**
         * Get events from service/server
         */
        this.setEvents();
    }
    ngOnInit(): void {    
        
    }
    /**
       * Set events
       */
    setEvents(): void {
        this.events = this._calendarService.events.map(item => {
            return new DiaryEventModel(item);
        });
    }

    /**
     * Before View Renderer
     *
     * @param {any} header
     * @param {any} body
     */
     beforeMonthViewRender({ header, body }): void {
    //     /**
    //      * Get the selected day
    //      */
        const _selectedDay = body.find((_day) => {            
            return _day.date.getTime() === this.selectedDay.date.getTime();
        });

        if (_selectedDay) {
            /**
             * Set selected day style
             * @type {string}
             */
            _selectedDay.cssClass = 'cal-selected';
        }
    }
    /**
     * Day clicked
     *
     * @param {MonthViewDay} day
     */
    dayClicked(day: CalendarMonthViewDay): void { 
        const date: Date = day.date;
        const events: CalendarEvent[] = day.events;

        if (isSameMonth(date, this.viewDate)) {
            if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
                this.activeDayIsOpen = false;
            }
            else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
        this.selectedDay = day;
        this.refresh.next();
    }
    /**
     * Event times changed
     * Event dropped or resized
     *
     * @param {CalendarEvent} event
     * @param {Date} newStart
     * @param {Date} newEnd
     */
    eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
        event.start = newStart;
        event.end = newEnd;
        // console.warn('Dropped or resized', event);
        this.refresh.next(true);
    }
}