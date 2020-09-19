import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-entry-rules',
  templateUrl: './mobile-entry-rules.component.html',
  styleUrls: ['./mobile-entry-rules.component.scss']
})
export class MobileEntryRulesComponent implements OnInit {

  @Output('prevStep') prevStep = new EventEmitter();
  constructor(private router:Router) { }

  ngOnInit() {
  }

  previous() {
    this.prevStep.emit()
  }

  addTrade() {
    this.router.navigate(['/dashboard/trade-strategies'])
  }
}
