import { Injectable } from '@angular/core';
import {IMyDate, INgxMyDpOptions} from 'ngx-mydatepicker';

@Injectable({
  providedIn: 'root'
})
export class DatepickerService {

  constructor() { }

  getMyLeftOptions(disableUntil?: IMyDate, disableSince?: IMyDate): INgxMyDpOptions {
    return {
      disableUntil: disableUntil ? disableUntil : {year: 0, month: 0, day: 0},
      disableSince: disableSince ? disableSince : {year: 0, month: 0, day: 0},
      dateFormat: 'mm/dd/yyyy'
    };
  }
  getMyRightOptions(disableUntil?: IMyDate, disableSince?: IMyDate): INgxMyDpOptions {
    return {
      disableUntil: disableUntil ? disableUntil : {year: 0, month: 0, day: 0},
      disableSince: disableSince ? disableSince : {year: 0, month: 0, day: 0},
      dateFormat: 'mm/dd/yyyy',
      alignSelectorRight: true
    };
  }
}
