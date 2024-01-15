import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-compare-strategy',
  templateUrl: './compare-strategy.component.html',
  styleUrls: ['./compare-strategy.component.scss']
})
export class CompareStrategyComponent implements OnInit {
  protected loginModalOpen: boolean = false;
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    
  }

  

}
