import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatSort } from '@angular/material';
import { ManageRulePopupComponent } from './manage-rule-popup/manage-rule-popup.component';
import { MatPaginator } from '@angular/material/paginator';
import { EntryExitRulesService } from '../../services/entry-exit-rules.service';
import { EntryExitRulesGridRow } from '../../models/entry-exit-rules-grid-row.model';

import { EntryExitRulesResult } from '../../models/entry-exit-rules-result.model';
import { EntryExitRule } from '../../models/entry-exit-rules.model';
import { SettingsService } from '../../services/settings.service';
import { EntryExitRulesGridStore} from '../../services/entry-exit-rules-grid-store';
import { EntryExitRulesGridRequest} from '../../models/entry-exit-rules-grid-request.model';
import { EntryExitRulesGridPage} from '../../models/entry-exit-rules-grid-page.model';


// EntryExitRulesService
@Component({
  selector: 'app-managerules',
  templateUrl: './managerules.component.html',
  styleUrls: ['./managerules.component.scss']
})
export class ManagerulesComponent implements OnInit {
  displayedColumns: string[] = ['date', 'type', 'description', 'source', 'action'];
  expandIndex: any;
  pageSize: number = 20
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  dataSource: EntryExitRulesGridStore;
  tentryExitRulesGridRequest: EntryExitRulesGridRequest = this.getInitialRequest();

  public gridData = [];
  constructor(private _dialog: MatDialog,
    private router: Router,
    private entryExitRulesService: EntryExitRulesService,
    private settingsService: SettingsService
    ) { }
  
  entryExitRulesResults: EntryExitRulesResult;
  entryExitRules: EntryExitRule[] = [];
  

  ngOnInit() {
    this.dataSource = new EntryExitRulesGridStore(this.entryExitRulesService, this.settingsService);
    this.loadPage();
  }


  loadPage() {
    this.dataSource.loadEntryExitRulesStore(this.getInitialRequest());
  }

  reload() {
    this.tentryExitRulesGridRequest.page.pageNumber = 0;
    this.loadPage();
  }
  getInitialRequest(): EntryExitRulesGridRequest {
    let request: EntryExitRulesGridRequest = new EntryExitRulesGridRequest();
    let pageRequest: EntryExitRulesGridPage = new EntryExitRulesGridPage();
    pageRequest.pageNumber = 0;
    pageRequest.pageSize = 20;
    request.page = pageRequest;
    return request;
  }
  addRule(title, btnText) {
    const dialogRef = this._dialog.open(ManageRulePopupComponent, {
      disableClose: true,
      width: 'auto',
      data : {
        title: title,
        btnText: btnText,
        formData:''
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
    });
  }

  editRule(rowModel: EntryExitRulesGridRow, title, btnText) {
    const dialogRef = this._dialog.open(ManageRulePopupComponent, {
      disableClose: true,
      width: 'auto',
      data : {
        title: title,
        btnText: btnText,
        formData:rowModel
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
    });
  }

}
