import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMyDrpOptions } from 'mydaterangepicker';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router) { }

  myDateRangePickerOptions: IMyDrpOptions = {
    dateFormat: 'dd.mm.yyyy',
    editableDateRangeField: false,
    ariaLabelInputField : 'Date'
 };

  ngOnInit() {
  }

  saveprofile() {
    this.router.navigate(['/dashboard']);
  }

}
