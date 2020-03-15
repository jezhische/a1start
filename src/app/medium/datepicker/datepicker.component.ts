import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {IMyDate, IMyDateModel, IMyInputFieldChanged, INgxMyDpOptions, NgxMyDatePickerDirective} from 'ngx-mydatepicker';
import {DatepickerService} from '../../service/datepicker-service/datepicker.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css'],
  providers: [DatePipe]
})
export class DatepickerComponent implements OnInit {

  private myDatePickerLeftOptions: INgxMyDpOptions;
  private myDatePickerRightOptions: INgxMyDpOptions;



  private disabled = false;
  private myForm: FormGroup;
  invoiceDateFrom: Date;
  invoiceDateTo: Date;

  constructor(private formBuilder: FormBuilder,
              private datepickerService: DatepickerService,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.myDatePickerLeftOptions = this.datepickerService.getMyLeftOptions();
    this.myDatePickerRightOptions = this.datepickerService.getMyRightOptions();
    // this.initForm();
    console.log('onInit(): SampleDatePickerReacticeForms');
    const d: Date = new Date();
    // myDate: [null, Validators.required]   // not initial date set
    // myDate: [{jsdate: new Date()}, Validators.required] // initialized todat with jsdate property
    // myDateFrom: [{
    //   date: {year: d.getFullYear(),
    //     month: d.getMonth() + 1,
    //     day: d.getDate()}},
    //   Validators.required] // this example is initialized to specific date
    this.myForm = this.formBuilder.group({
      myDateFrom: [
        null,
        Validators.required] ,
      myDateTo: [
        null,
        Validators.required],
      name: ['']
    });
  }
  nameChanged() {console.log(this.myForm.controls.name.value);}
  onSubmitReactiveForms(): void {
    console.log('Value: ', this.myForm.controls.myDateFrom.value, ' - Valid: ', this.myForm.controls.myDateFrom.valid,
      ' - Dirty: ', this.myForm.controls.myDateFrom.dirty);
    console.log('Value: ', this.myForm.controls.myDateTo.value, ' - Valid: ', this.myForm.controls.myDateTo.valid,
      ' - Dirty: ', this.myForm.controls.myDateTo.dirty);
  }

  @ViewChild('dp1', {static: false}) dp1: NgxMyDatePickerDirective;
  @ViewChild('dp2', {static: false}) dp2: NgxMyDatePickerDirective;

// (inputFieldChanged)="print($event)" - меняется на каждый клик клавиши, отслеживает любой введенный символ
print(ch: IMyInputFieldChanged) {
  console.log(ch);
  console.log(new Date(ch.value));
}

// (dateChanged)="onDp1DateChanged($event)" - меняется, когда введена дата из календаря
// В этом методе устанавливается ограничение на disableUntil и disableSince
  onDp1DateChanged($event: IMyDateModel, identifier: string) {
  console.log('onDp1DateChanged');
  switch (identifier) {
    case 'dp1': {
      // this.invoiceDateFrom = new Date($event.jsdate);
      if ($event == null) {this.dp1.clearDate(); }
      this.myForm.controls.myDateFrom.patchValue($event);
      this.myDatePickerRightOptions = this.datepickerService.getMyRightOptions($event.date);
      console.log('myDateFrom changed');
      break;
    }
    case 'dp2': {
      if ($event == null) {this.dp2.clearDate(); }
      this.myForm.controls.myDateTo.patchValue($event);
      this.myDatePickerLeftOptions = this.datepickerService.getMyLeftOptions(null, $event.date);
      console.log('myDateTo changed');
      break;
    }
  }
    // console.log(new Date($event.jsdate));
  // console.log('Value: ', this.myForm.controls.myDateFrom.value, ' - Valid: ', this.myForm.controls.myDateFrom.valid,
  //     ' - Dirty: ', this.myForm.controls.myDateFrom.dirty, ' - DateFrom: ', this.invoiceDateFrom, ' - DateTo: ', this.invoiceDateTo);
    if (this.myForm.controls.myDateFrom.value != null || this.myForm.controls.myDateTo.value != null) {
      // console.log(new Date(this.myForm.controls.myDateFrom.value.jsdate).getTime());
      console.log(this.myForm.controls.myDateTo.value.epoc);
      console.log(this.myForm.controls.myDateFrom.value.epoc);
    }
  }

  onDateInputFieldChanged($event: IMyInputFieldChanged, datepicker: NgxMyDatePickerDirective, identifier: string) {
    if ($event.value != null && $event.value !== '') {
      console.log($event.value, ' onDateInputFieldChanged: new Date($event.value).getTime() = ', new Date($event.value).getTime());
    }
    // const dateStart = new Date('1990');
    // if ($event.value != null && $event.value !== '' && new Date($event.value) > dateStart) {
    if ($event.value.length === 10) {
      switch (identifier) {
        case 'dp1': {
          // this.invoiceDateFrom = new Date($event.jsdate);
            this.myForm.controls.myDateFrom.patchValue(this.toIMyDateModel($event));
            this.myDatePickerRightOptions = this.datepickerService.getMyRightOptions(this.toIMyDate($event));
            console.log('myDateFrom changed: ', this.toIMyDate($event), 'isRange(): ', this.isRange());
            break;
        }
        case 'dp2': {
          const model = this.toIMyDateModel($event);
          this.myForm.controls.myDateTo.patchValue(model);
          this.myDatePickerLeftOptions = this.datepickerService.getMyLeftOptions(null, this.toIMyDate($event));
          console.log('myDateTo changed: ', this.toIMyDate($event), 'isRange(): ', this.isRange());
          break;
        }
      }
    } else if ($event.value.length === 1) {
      this.myForm.controls.myDateFrom.patchValue(null);
      // datepicker.clearDate();
    }
  }

  isRange() {
    if (this.myForm.controls.myDateFrom.value == null || this.myForm.controls.myDateTo.value == null) { return true; }
    return (this.myForm.controls.myDateTo.value.epoc - this.myForm.controls.myDateFrom.value.epoc) > 0;
  }

  private toIMyDate(inputChange?: IMyInputFieldChanged): IMyDate {
    if (inputChange && inputChange.value.length === 10) {
      const value = inputChange.value;
      return {
        year: +value.substr(6, 4),
        month: +value.substr(0, 2),
        day: +value.substr(3, 2)
      };
    } else { return {
      year: 0,
      month: 0,
      day: 0
    }; }
  }

  private toIMyDateModel(inputChange?: IMyInputFieldChanged, ): IMyDateModel {
    if (!inputChange) {
      return null;
    } else {
      const iMyDate = this.toIMyDate();
      const formatted = 'MM/dd/yyyy';
      const jsdate: Date = new Date(this.datePipe.transform(inputChange.value, formatted));
      return {
        date: iMyDate,
        jsdate,
        formatted,
        epoc: jsdate.getTime() / 1000
      };
    }
  }

// clearDateOnNull2(dp2: NgxMyDatePickerDirective, identifier: string) {
//   console.log('document.getElementById(\'dateTo\').nodeValue.length', document.getElementById('dateTo').nodeValue.length)
//   if (document.getElementById('dateTo').nodeValue.length === 0) {
//     dp2.clearDate();
//   }
// }




  setDate(): void {
    // Set today using the setValue function
    const date: Date = new Date();
    // setValue() - работает только для установки всех полей в форме сразу, е5сли нужно установить только одно какое-либо, нужно
    // использовать patchValue()
    this.myForm.setValue({myDateFrom: {date: {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()}}});
  }

  resetDate(): void {
    // Reset date picker to specific date (today)
    const date: Date = new Date();
    this.myForm.reset({myDateFrom: {date: {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()}}});
  }

  clearDate(): void {
    // Clear the date using the setValue function
    this.myForm.setValue({myDateFrom: null});
  }

  disable(): void {
    this.disabled = !this.disabled;
    if (this.disabled) {
      this.myForm.get('myDate').disable();
    } else {
      this.myForm.get('myDate').enable();
    }
  }
}
