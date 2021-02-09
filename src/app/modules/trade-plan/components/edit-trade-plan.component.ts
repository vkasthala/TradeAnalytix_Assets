import { ViewChild, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AddnewtradeplanComponent } from './add-trade-plan/addnewtradeplan.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-edit-trade-plan',
  templateUrl: './add-trade-plan/addnewtradeplan.component.html',
  styleUrls: ['./add-trade-plan/addnewtradeplan.component.scss']
})
export class EditTradePlanComponent extends AddnewtradeplanComponent implements OnInit {

    
  constructor(
    router: Router,
    _dialog: MatDialog) {
    super(_dialog, router);
    this.edit = true;
    this.add = false;
  }

  ngOnInit() {
    // this.setState();
  }




}
