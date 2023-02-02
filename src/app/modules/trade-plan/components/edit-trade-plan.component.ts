import { ViewChild, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AddnewtradeplanComponent } from './add-trade-plan/addnewtradeplan.component';
import { Router } from '@angular/router';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { UserMetadataService } from '../../trade-management/services/user-metadata.service';
import { TradePlansService } from '../services/trade-plans.service';
import { ToastrService } from 'ngx-toastr';
import { DemoModeDetailsService } from '../../shared/services/demo-mode-details.service';
import { SettingsService } from '../../settings/services/settings.service';

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
    toastr: ToastrService,
    demoService: DemoModeDetailsService,
    dateAdapter: DateAdapter<Date>,
    settingsService: SettingsService,
  ) {
    super(_dialog, router, metadataService, tradePlanService, toastr, demoService, dateAdapter, settingsService);
    this.edit = true;
    this.add = false;
    this.view = false;
  }

}
