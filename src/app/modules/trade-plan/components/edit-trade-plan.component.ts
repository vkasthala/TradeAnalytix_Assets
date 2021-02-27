import { ViewChild, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AddnewtradeplanComponent } from './add-trade-plan/addnewtradeplan.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { UserMetadataService } from '../../trade-management/services/user-metadata.service';
import { TradePlansService } from '../services/trade-plans.service';

@Component({
  selector: 'app-edit-trade-plan',
  templateUrl: './add-trade-plan/addnewtradeplan.component.html',
  styleUrls: ['./add-trade-plan/addnewtradeplan.component.scss']
})
export class EditTradePlanComponent extends AddnewtradeplanComponent implements OnInit {


  constructor(
    router: Router,
    _dialog: MatDialog, metadataService: UserMetadataService,
    tradePlanService: TradePlansService) {
    super(_dialog, router, metadataService, tradePlanService);
    this.edit = true;
    this.add = false;
  }

  ngOnInit() {
    // this.setState();
  }




}
