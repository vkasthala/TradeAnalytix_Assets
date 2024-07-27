import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EditableGridColumn } from 'src/app/modules/shared/models/common/editable-grid-column.model';
import { isArray } from 'util';
import { EntryExitRulesGridRow } from '../../models/entry-exit-rules-grid-row.model';
import { EntryExitRulesResult } from '../../models/entry-exit-rules-result.model';
import { UserCodedRule } from '../../models/user-coded-rule.model';
import { CodedRuleService } from '../../services/coded-rule.service';
import { EntryExitRulesService } from '../../services/entry-exit-rules.service';
import { SettingsService } from '../../services/settings.service';
import { ManageRulePopupComponent } from '../managerules/manage-rule-popup/manage-rule-popup.component';
import { ManagerulesComponent } from '../managerules/managerules.component';
import { MatDialog, MatSort } from '@angular/material';
import { EntryExitRule } from '../../models/entry-exit-rules.model';
import { ActivateRuleModalComponent } from '../activate-rule-modal/activate-rule-modal.component';
import { DisableeRuleModalComponent } from '../disable-rule-modal/disable-rule-modal.component';


@Component({
  selector: 'app-codedrules',
  templateUrl: './codedrules.component.html',
  styleUrls: ['./codedrules.component.scss']
})
export class CodedRulesComponent implements OnInit {
  
  @ViewChild('tradeDetails', { static: false }) protected tradeDetails: ManagerulesComponent;
  ruleOperatorCol: EditableGridColumn;
  valueCol: EditableGridColumn;

  userCodedRules: UserCodedRule[];
  tradeLevelRules=[];
  portfolioLevelRules=[];
  isDemoMode: boolean = false;
  Loader: boolean = false;
  
  constructor(private codedRuleService: CodedRuleService, 
    private toastr: ToastrService,
    private entryExitRulesService: EntryExitRulesService,
    private settingsService: SettingsService,
    private _dialog: MatDialog,
    ) { 

  }

  entryExitRulesResults: EntryExitRulesResult;
  entryExitRules: EntryExitRule[] = [];
  rule: EntryExitRule = new EntryExitRule();

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.loadCodedRulesData();
  }


  loadCodedRulesData() {
    this.codedRuleService.getUserCodedRules().subscribe(result => {
      this.userCodedRules = result;
      this.tradeLevelRules=[];
      this.portfolioLevelRules=[];
      this.userCodedRules.forEach((rule, i) => {
        rule.checked = rule.id && rule.id !== null && rule.id > 0;
        //if(rule.ruleType === 1) {
        this.portfolioLevelRules.push(rule);
        //} else {
        //  this.tradeLevelRules.push(rule);
        //}
      })
    });
  }

  showErrorMessageDialog(msg: string) {
    this.toastr.error(msg, 'Error', { 
      tapToDismiss:false,
      closeButton:true,
      disableTimeOut: true
    });
  }

  showSuccessMessage(msg: string) {
    this.toastr.success(msg, 'Success');
  }

  onRowEdit(element: UserCodedRule) {
    const dialogRef = this._dialog.open(ActivateRuleModalComponent, {
      width: 'auto',
      height: 'auto',
      data: element
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        // this.dashboardService.reportIssue(this.createUserComment(res)).subscribe(res => {
        //   this.toastr.info("Issue submitted");
        // });
        element.val = res;
      }
    });


    console.log(element);
    element.editing = true;
    element.tempVal = element.val ? element.val : element.defaultValue;
  }

  onItemEdit(element: UserCodedRule) {
    if (!element.tempVal || element.tempVal.length === 0) {
      return;
    }
    //element.val = element.tempVal;
    element.editing = false;
    if (!element.checked) {
      return;
    }
    this.addOrUpdateRule(element);
  }

  addOrUpdateRule(element: UserCodedRule) {
    this.Loader = true;
    // Set rule value
    // if (!element.val && element.dataType !== "boolean") {
    //   element.val = element.defaultValue;
    // }

    if (!element.id || element.id === 0) {
      this.codedRuleService.createCodedRule(element).subscribe(data => {
        this.toastr.success('Automatic rule enabled', 'Success');
        this.loadCodedRulesData();
        setTimeout(() => {
          this.Loader = false;
        }, 500);
        
      }, err => {
        console.log('error in creating coded rule: ', element)
        this.showErrorMessageDialog('Error! failed to add coded rule');
        this.Loader = false;
      });
    } else {
      this.codedRuleService.updateCodedRule(element).subscribe(data => {
        this.toastr.success('Automatic rule updated', 'Success');
        this.loadCodedRulesData();
        this.Loader = false;setTimeout(() => {
          this.Loader = false;
        }, 500);
      }, err => {
        console.log('error in editing coded rule: ', element)
        this.showErrorMessageDialog('Error! failed to edit coded rule');
        this.Loader = false;
      });
    }
  }

  deleteCodedRule(rule: UserCodedRule) {
    this.Loader = true;
    this.codedRuleService.deleteCodedRule(rule.id).subscribe(data => {
      this.toastr.success('Automatic rule disabled.', 'Success');
      this.loadCodedRulesData();
      setTimeout(() => {
        this.Loader = false;
      }, 500);
    }, err => {
      console.log('error in deleteing coded rule: ', rule)
      this.showErrorMessageDialog('Failed to remove from rules list');
      this.Loader = false;
    });
  }

  onRuleSelectionChange(rule: UserCodedRule) {
    if (rule.checked) {
      this.addOrUpdateRule(rule);
    } else if (rule.id && rule.id > 0) {
      this.deleteCodedRule(rule);
    }
  }

  onCancel(element: UserCodedRule) {
    element.editing = false;
    element.val = element.tempVal;
  }


  addEntryExitRule(title, btnText) {
    const dialogRef = this._dialog.open(ManageRulePopupComponent, {
      disableClose: true,
      width: 'auto',
      data : {
        title: title,
        btnText: btnText,
        isDemoMode:this.isDemoMode,
        formData:''
      }
    });
    
    dialogRef.afterClosed().subscribe((res) => {
      this.settingsService.saveEntryExitRule(res).subscribe(data => {
        this.toastr.success('Manual rule added', 'Success');
        // this.loadPage();
      }, err => {
        this.toastr.error('Failed to add entry exit rule', 'Error', 
        { 
          tapToDismiss:false,
          closeButton:true,
          disableTimeOut: true
        });
      });
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

      this.settingsService.updateEntryExitRule(this.rule).subscribe(data => {
        this.toastr.success('Manual rule updated', 'Success');
        // this.loadPage();
      }, err => {
        this.toastr.error('Failed to update entry exit rule', 'Error', { 
          tapToDismiss:false,
          closeButton:true,
          disableTimeOut: true
        });
      });
    });
  }


  deleteRule(rowModel: EntryExitRulesGridRow) {
    this.rule.id = rowModel.id;
    this.rule.type = rowModel.type;
    this.rule.description = rowModel.description;
    this.rule.source = rowModel.source;

    this.settingsService.deleteEntryExitRule(this.rule).subscribe(data => {
      this.toastr.success('Entry exit rule deleted successfully', 'Success');
      // this.loadPage();
    }, err => {
      this.toastr.error('Failed to delete entry exit rule', 'Error', { 
        tapToDismiss:false,
        closeButton:true,
        disableTimeOut: true
      });
    });
  }

  activateRule(element: UserCodedRule) {
    const dialogRef = this._dialog.open(ActivateRuleModalComponent, {
      width: 'auto',
      height: 'auto',
      data: {
        res:element,
        title: "Activate the automatic trading rule",
        btnText: "Activate",
      }
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res || element.dataType === "boolean") {
        element.val = res;
        this.addOrUpdateRule(element);
      }
    });
    console.log(element);
    element.tempVal = element.val ? element.val : element.defaultValue;
  }

  onUpdateRule(element: UserCodedRule) {
    const dialogRef = this._dialog.open(ActivateRuleModalComponent, {
      width: 'auto',
      height: 'auto',
      data: {
        res:element,
        title: "Update the automatic trading rule",
        btnText: "Submit",
      }
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res || element.dataType === "boolean") {
        element.val = res;
        this.addOrUpdateRule(element);
      }
    });
    element.tempVal = element.val ? element.val : element.defaultValue;
  }

  onCheckBoxChange(rule: UserCodedRule) {
    if (rule.checked) {
      this.onDisableRule(rule);
    } else if (rule.id && rule.id > 0) {
      this.onDisableRule(rule);
    }
  }

  onDisableRule(rule: UserCodedRule) {
    const dialogRef = this._dialog.open(DisableeRuleModalComponent, {
      width: 'auto',
      height: 'auto',
      data: rule
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.deleteCodedRule(rule);
      }
    });
  }

}
