import { ViewChild, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AddnewtradeplanComponent } from './add-trade-plan/addnewtradeplan.component';
import { Router } from '@angular/router';
import { DateAdapter, MatDialog } from '@angular/material';
import { UserMetadataService } from '../../trade-management/services/user-metadata.service';
import { TradePlansService } from '../services/trade-plans.service';
import { ToastrService } from 'ngx-toastr';
import { DemoModeDetailsService } from '../../shared/services/demo-mode-details.service';
import { SettingsService } from '../../settings/services/settings.service';

@Component({
  selector: 'app-view-trade-plan',
  templateUrl: './add-trade-plan/addnewtradeplan.component.html',
  styleUrls: ['./add-trade-plan/addnewtradeplan.component.scss']
})
export class ViewTradePlanComponent extends AddnewtradeplanComponent implements OnInit {


  constructor(
    _dialog: MatDialog,
    router: Router,
    metadataService: UserMetadataService,
    tradePlanService: TradePlansService,
    demoService: DemoModeDetailsService,
    toastr: ToastrService,
    dateAdapter: DateAdapter<Date>,
    settingsService: SettingsService,) {
    super(_dialog, router, metadataService, tradePlanService, toastr, demoService, dateAdapter, settingsService);
    this.view = true;
    this.edit = false;
    this.add = false;
    this.isDemoMode = false;
  }


}
