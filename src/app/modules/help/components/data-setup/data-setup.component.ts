import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-data-setup',
  templateUrl: './data-setup.component.html',
  styleUrls: ['./data-setup.component.scss']
})
export class HelpDataSetupComponent implements OnInit {
  protected loginModalOpen: boolean = false;
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    
  }

  

}
