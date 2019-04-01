import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CalendarEvent } from 'angular-calendar';

import { MatColors } from '@fuse/mat-colors';

import { DiaryEventModel } from 'app/main/pages/diary/event.model';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventFormComponent implements OnInit {

    action: string;
    event: CalendarEvent;
    eventForm: FormGroup;
    dialogTitle: string;
    presetColors = MatColors.presets;

  constructor(
    public matDialogRef: MatDialogRef<EventFormComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
  ) 
  {
    this.event = _data.event;
    this.action = _data.action;

    if ( this.action === 'edit' )
    {
        this.dialogTitle = this.event.title;
    }
    else
    {
        this.dialogTitle = 'New Event';
        this.event = new DiaryEventModel({
            start: _data.date,
            end  : _data.date
        });
    }

    this.eventForm = this.createEventForm(); 
  }
  /**
     * Create the event form
     *
     * @returns {FormGroup}
     */
    createEventForm(): FormGroup
    {
        return new FormGroup({
            title : new FormControl(this.event.title),
            start : new FormControl(this.event.start),
            end   : new FormControl(this.event.end),
            allDay: new FormControl(this.event.allDay),
            color : this._formBuilder.group({
                primary  : new FormControl(this.event.color.primary),
                secondary: new FormControl(this.event.color.secondary)
            }),
            meta  :
                this._formBuilder.group({
                    location: new FormControl(this.event.meta.location),
                    notes   : new FormControl(this.event.meta.notes)
                })
        });
    }
  ngOnInit() {
  }

}
