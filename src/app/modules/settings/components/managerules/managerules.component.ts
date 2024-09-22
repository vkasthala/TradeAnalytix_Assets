import { Component, ViewChild, OnInit, EventEmitter } from '@angular/core';
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
import { ToastrService } from 'ngx-toastr';
import { DemoModeDetailsService } from 'src/app/modules/shared/services/demo-mode-details.service';


// EntryExitRulesService
@Component({
  selector: 'app-managerules',
  templateUrl: './managerules.component.html',
  styleUrls: ['./managerules.component.scss']
})
export class ManagerulesComponent implements OnInit {
  displayedColumns: string[] = ['date', 'description', 'action'];
  expandIndex: any;
  pageSize: number = 20
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  dataSource: EntryExitRulesGridStore;
  tentryExitRulesGridRequest: EntryExitRulesGridRequest = this.getInitialRequest();
  public event: EventEmitter<any> = new EventEmitter();
  public gridData = [];
  isDemoMode: boolean = false;
  isMobileDevice: any;

  constructor(private _dialog: MatDialog,
    private router: Router,
    private entryExitRulesService: EntryExitRulesService,
    private settingsService: SettingsService,
    protected toastr: ToastrService,
    private demoService: DemoModeDetailsService
    ) { }
  
  entryExitRulesResults: EntryExitRulesResult;
  entryExitRules: EntryExitRule[] = [];
  rule: EntryExitRule = new EntryExitRule();

  ngOnInit() {
    this.checkDevice();
    this.dataSource = new EntryExitRulesGridStore(this.entryExitRulesService, this.settingsService);
    this.loadPage();
    
  }


  loadPage() {
    this.isDemoMode = this.demoService.demoMode;
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

  addEntryExitRule(title, btnText) {
    const dialogRef = this._dialog.open(ManageRulePopupComponent, {
      disableClose: true,
      width: 'auto',
      data : {
        title: title,
        btnText: btnText,
        isDemoMode:this.isDemoMode,
        formData:{}
      }
    });
    
    dialogRef.afterClosed().subscribe((res) => {
      
      if (res && res !== undefined) {
         this.settingsService.saveEntryExitRule(res).subscribe(data => {
          this.toastr.success('Trading Rule Added Successfully', 'Success');
          this.loadPage();
        }, err => {
          this.toastr.error('Failed to add entry exit rule', 'Error', 
          { 
            tapToDismiss:false,
            closeButton:true,
            disableTimeOut: true
          });
        });
      }
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
      this.rule.id = rowModel.id;
      this.rule.type = rowModel.type;
      this.rule.description = rowModel.description;
      this.rule.source = rowModel.source;
      if (res && res !== undefined) {
        this.settingsService.updateEntryExitRule(this.rule).subscribe(data => {
          this.toastr.success('Trading Rule Updated Successfully', 'Success');
          this.loadPage();
        }, err => {
          this.toastr.error('Failed to update entry exit rule', 'Error', { 
            tapToDismiss:false,
            closeButton:true,
            disableTimeOut: true
          });
        });
      }
    });
  }


  deleteRule(rowModel: EntryExitRulesGridRow) {
    this.rule.id = rowModel.id;
    this.rule.type = rowModel.type;
    this.rule.description = rowModel.description;
    this.rule.source = rowModel.source;

    this.settingsService.deleteEntryExitRule(this.rule).subscribe(data => {
      this.toastr.success('Manual Rule Deleted Successfully', 'Success');
      this.loadPage();
    }, err => {
      this.toastr.error('Unable to Delete Trading Rule', 'Error', { 
        tapToDismiss:false,
        closeButton:true,
        disableTimeOut: true
      });
    });
  }

  closePopup(e) {
    let iframe = document.querySelector('iframe');
    iframe.src='';
    iframe.setAttribute("src",'https://www.youtube.com/embed/z_MMEzxPbGw');
  }

  checkDevice() {
    setTimeout(() => {
      const agent = window.navigator.userAgent.toLowerCase();
      let regexp = /android|iphone|kindle|ipad/i;
      let deviceType = regexp.test(agent);
      if (deviceType) {
        this.isMobileDevice = true;
      } else {
        this.isMobileDevice = false;
      }
    }, 100)
  }

}
