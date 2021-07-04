import { stringify } from '@angular/compiler/src/util';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { of, Subject } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/modules/shared/components/modals/confirm-dialog/confirm-dialog.component';
import { EditableGridComponent } from 'src/app/modules/shared/components/widgets/editable-grid/editable-grid.component';
import { EditableGridColumn } from 'src/app/modules/shared/models/common/editable-grid-column.model';
import { BockerageCommission } from '../../models/brockerage-commission.model';
import { UserCodedRule } from '../../models/user-coded-rule.model';
import { CodedRuleService } from '../../services/coded-rule.service';
import { DataSetupService } from '../../services/data-setup.service';

@Component({
  selector: 'app-codedrules',
  templateUrl: './codedrules.component.html',
  styleUrls: ['./codedrules.component.scss']
})
export class CodedRulesComponent implements OnInit {

  @ViewChild('codedRules', { static: false }) protected codedRules: EditableGridComponent<UserCodedRule>;

  paramNameCol: EditableGridColumn;
  ruleOperatorCol: EditableGridColumn;
  valueCol: EditableGridColumn;

  constructor(private codedRuleService: CodedRuleService, private cdr: ChangeDetectorRef, private _dialog: MatDialog, private toastr: ToastrService) { }
  step = 0;

  ngOnInit() {

  }

  setStep(index: number) {
    this.step = index;
  }

  ngAfterViewInit() {
    this.loadCodedRuleOptions();
    this.initCodedRulesGrid();
    this.cdr.detectChanges();
  }

  loadCodedRuleOptions() {
    this.codedRuleService.getCodedRules().subscribe(result => {
      let options: Map<string, string> = new Map();
      result.forEach(rule => {
        options.set(rule.id + '', rule.label);
      });
      this.paramNameCol.values = options;
      this.cdr.detectChanges();
    });
  }

  loadCodedRulesData() {
    this.codedRuleService.getUserCodedRules().subscribe(result => {
      this.codedRules.dataSource = result;
    });
  }

  initCodedRulesGrid() {
    this.loadCodedRulesData();

    let cols: EditableGridColumn[] = [];
    let colIds: string[] = [];
    let col: EditableGridColumn = new EditableGridColumn();
    col.id = "ruleParam";
    col.name = "Parameter";
    col.placeholder = "Parameter";
    col.type = 'select';
    col.values = new Map<string, string>();
    colIds.push('name');
    this.paramNameCol = col;
    cols.push(col);

    col = new EditableGridColumn();
    col.id = "ruleOperator";
    col.name = "Operator";
    col.type = 'select';
    col.values = new Map<string, string>();
    colIds.push('type');
    cols.push(col);
    this.ruleOperatorCol = col;

    col = new EditableGridColumn();
    col.id = "val";
    col.name = "Value";
    col.type = 'text';
    colIds.push('val');
    cols.push(col);
    this.valueCol = col;

    this.codedRules.setColumnConfigs(cols);
    this.codedRules.setColumns(colIds);

    let addItemSubject: Subject<UserCodedRule> = new Subject<UserCodedRule>();
    let editItemSubject: Subject<UserCodedRule> = new Subject<UserCodedRule>();
    let deleteItemSubject: Subject<UserCodedRule> = new Subject<UserCodedRule>();
    let comboChangeSubject: Subject<string> = new Subject<string>();
    addItemSubject.asObservable().subscribe(data => {
      this.codedRuleService.createCodedRule(data).subscribe(data => {
        this.showSuccessMessage('Successfully added the coded rule');
        this.loadCodedRulesData();
      }, err => {
        console.log('error in creating coded rule: ', data)
        this.showErrorMessageDialog('Error! failed to add coded rule');
      });
    });

    editItemSubject.asObservable().subscribe(data => {
      this.codedRuleService.updateCodedRule(data).subscribe(data => {
        this.showSuccessMessage('Successfully updated the coded rule');
        this.loadCodedRulesData();
      }, err => {
        console.log('error in editing coded rule: ', data)
        this.showErrorMessageDialog('Error! failed to edit coded rule');
      });
    });

    deleteItemSubject.asObservable().subscribe(data => {
      this.getDeleteDialog().afterClosed().subscribe(dialogResult => {
        if (dialogResult == true) {
          this.codedRuleService.deleteCodedRule(data.id).subscribe(data => {
            this.showSuccessMessage('Successfully deleted the coded rule');
            this.loadCodedRulesData();
          }, err => {
            console.log('error in deleteing coded rule: ', data)
            this.showDeleteErrorMessage();
          });
        }
      });
    });

    comboChangeSubject.asObservable().subscribe(data => {
      if (data === 'ruleParam') {
        let ruleId = document.getElementById('ruleParam')['value'];
        if (ruleId) {
          let ruleNumber: number = parseInt(ruleId);
          this.lodRuleOperators(ruleId);
          this.valueCol.visible = !(ruleNumber === 6 || ruleNumber === 11);
        }
      }
    });

    this.codedRules.addItemSubject = addItemSubject;
    this.codedRules.editItemSubject = editItemSubject;
    this.codedRules.deleteItemSubject = deleteItemSubject;
    this.codedRules.comboChangeSubject = comboChangeSubject;
  }

  lodRuleOperators(ruleId: string) {
    this.codedRuleService.getRuleOperators(ruleId).subscribe(result => {
      let options: Map<string, string> = new Map();
      result.forEach(rule => {
        options.set(rule.id + '', rule.name);
      });
      this.ruleOperatorCol.values = options;
    });
  }

  getDeleteDialog() {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: { 'message': 'Are you sure you want to delete this entry?' }
    });
    return dialogRef;
  }

  showDeleteErrorMessage() {
    this.toastr.error('Failed to delete entry. Please check if this has assigned to any trade strategy.', '');
  }

  showErrorMessageDialog(msg: string) {
    this.toastr.error(msg, '');
  }

  showSuccessMessage(msg: string) {
    this.toastr.success(msg);
  }

}
