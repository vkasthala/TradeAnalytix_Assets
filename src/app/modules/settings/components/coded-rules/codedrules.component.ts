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
export class CodedRulesComponent<T> implements OnInit {

  @ViewChild('codedRules', { static: false }) protected codedRules: EditableGridComponent<UserCodedRule>;
  
  //paramNameCol: EditableGridColumn;
  ruleOperatorCol: EditableGridColumn;
  valueCol: EditableGridColumn;

  columnConfigs: EditableGridColumn[] = [{"id":"1000", "name":"Receive an alert while adding or editing a trade when the stock amount is greater than", "type":"text", "values":[],"placeholder":"", "visible":false},
  {"id":"500", "name":"Receive an alert while adding or editing a trade when the option amount is greater than", "type":"text", "values":[],"placeholder":"", "visible":false},
  {"id":"10000", "name":"Receive an alert while adding or editing a trade when the total amount of a trade is greater than", "type":"text", "values":[],"placeholder":"", "visible":false},
  {"id":"50000", "name":"Receive an alert while adding or editing a trade when maximum risk of a trade is greater than", "type":"text", "values":[],"placeholder":"", "visible":false},
  {"id":"50000", "name":"Receive an alert while adding or editing a trade when maximum profit potential of a trade is less than", "type":"text", "values":[],"placeholder":"", "visible":false},
  {"id":"", "name":"Receive an alert wh,,en a trade is being averaged", "type":"text", "values":[],"placeholder":"", "visible":false},
  {"id":"50000", "name":"Receive an alert at the end of the day when maximum risk of the account greater than", "type":"text", "values":[],"placeholder":"", "visible":false},
  {"id":"50000", "name":"Receive an alert at the end of the day when maximum profit potential of the account is less than", "type":"text", "values":[],"placeholder":"", "visible":false},
  {"id":"", "name":"Receive an alert when a trade plan is not created for the day", "type":"text", "values":[],"placeholder":"", "visible":false},
  {"id":"20", "name":"Receive an alert at the end of the day when daily trade count exceeds", "type":"text", "values":[],"placeholder":"", "visible":false},
  {"id":"120", "name":"Receive an alert at the end of the day when weekly trade count exceeds", "type":"text", "values":[],"placeholder":"", "visible":false}
];

  selectedModel: T;
  edit: boolean = false;
  addItemSubject: Subject<T>;
  editItemSubject: Subject<T>;
  deleteItemSubject: Subject<T>;
  comboChangeSubject: Subject<string>;

  constructor(private codedRuleService: CodedRuleService, private cdr: ChangeDetectorRef, private _dialog: MatDialog, private toastr: ToastrService) { }
  step = 0;

  ngOnInit() {

  }

  setStep(index: number) {
    this.step = index;
  }

  ngAfterViewInit() {
    //this.loadCodedRuleOptions();
    //this.initCodedRulesGrid();
  }

  /*loadCodedRuleOptions() {
    this.codedRuleService.getCodedRules().subscribe(result => {
      let arr = [];
      result.forEach(rule => {
        arr.push([rule.id, rule.label]);
      });
      this.paramNameCol.values = arr;
    });
  }*/

  loadCodedRulesData() {
    this.codedRuleService.getUserCodedRules().subscribe(result => {
      this.codedRules.dataSource = result;
    });
  }

  /*initCodedRulesGrid() {
    this.loadCodedRulesData();

    let cols: EditableGridColumn[] = [];
    let colIds: string[] = [];
    let col: EditableGridColumn = new EditableGridColumn();
    col.id = "ruleParam";
    col.name = "Parameter";
    col.placeholder = "Parameter";
    col.type = 'select';
    col.values = [];
    colIds.push('ruleName');
    this.paramNameCol = col;
    cols.push(col);

    col = new EditableGridColumn();
    col.id = "ruleOperator";
    col.name = "Operator";
    col.type = 'select';
    col.values = [];
    colIds.push('operatorName');
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
  }*/

  lodRuleOperators(ruleId: string) {
    this.codedRuleService.getRuleOperators(ruleId).subscribe(result => {
      let arr = [];
      result.forEach(rule => {
        arr.push([rule.id, rule.name]);
      });
      this.ruleOperatorCol.values = arr;
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

  onRowEdit(element) {
    console.log(element);
    this.selectedModel = element;
    element.visible = true;
  }
  onItemEdit(element) {
    for (let ind = 0; ind < this.columnConfigs.length; ind++) {
      let ele = document.getElementById(this.columnConfigs[ind].id);
      if (ele) {
        this.selectedModel[this.columnConfigs[ind].id] = ele['value'];
      }
    }
    element.visible = false;
  }
  onCancel(element) {
    element.visible = false;
  }

}
