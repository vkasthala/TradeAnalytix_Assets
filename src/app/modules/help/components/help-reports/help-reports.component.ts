import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-help-reports',
  templateUrl: './help-reports.component.html',
  styleUrls: ['./help-reports.component.scss']
})
export class HelpReportsComponent implements OnInit {
  protected loginModalOpen: boolean = false;
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    
  }

  

}
