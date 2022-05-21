import { ViewChild, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AddnewtradeplanComponent } from './add-trade-plan/addnewtradeplan.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { UserMetadataService } from '../../trade-management/services/user-metadata.service';
import { TradePlansService } from '../services/trade-plans.service';
import { ToastrService } from 'ngx-toastr';
import { DemoModeDetailsService } from '../../shared/services/demo-mode-details.service';

@Component({
  selector: 'app-edit-trade-plan',
  templateUrl: './add-trade-plan/addnewtradeplan.component.html',
  styleUrls: ['./add-trade-plan/addnewtradeplan.component.scss']
})
export class EditTradePlanComponent extends AddnewtradeplanComponent implements OnInit {


  constructor(
    _dialog: MatDialog,
    router: Router,
    metadataService: UserMetadataService,
    tradePlanService: TradePlansService,
    demoService: DemoModeDetailsService,
    toastr: ToastrService
    ) {
    super(_dialog, router, metadataService, tradePlanService, toastr, demoService);
    this.edit = true;
    this.add = false;
    this.view = false;
  }

}
