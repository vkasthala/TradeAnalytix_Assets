import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EditableGridColumn } from 'src/app/modules/shared/models/common/editable-grid-column.model';
import { isArray } from 'util';
import { UserCodedRule } from '../../models/user-coded-rule.model';
import { CodedRuleService } from '../../services/coded-rule.service';

@Component({
  selector: 'app-codedrules',
  templateUrl: './codedrules.component.html',
  styleUrls: ['./codedrules.component.scss']
})
export class CodedRulesComponent implements OnInit {

  ruleOperatorCol: EditableGridColumn;
  valueCol: EditableGridColumn;

  userCodedRules: UserCodedRule[];
  tradeLevelRules=[];
  portfolioLevelRules=[];
  constructor(private codedRuleService: CodedRuleService, private toastr: ToastrService) { }

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
        if(rule.ruleType === 1) {
          this.portfolioLevelRules.push(rule)
        } else {
          this.tradeLevelRules.push(rule);
        }
      })
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
    console.log(element);
    element.editing = true;
    element.tempVal = element.val ? element.val : element.defaultValue;
  }

  onItemEdit(element: UserCodedRule) {
    if (!element.tempVal || element.tempVal.length === 0) {
      return;
    }
    element.val = element.tempVal;
    element.editing = false;
    if (!element.checked) {
      return;
    }
    this.addOrUpdateRule(element);
  }

  addOrUpdateRule(element: UserCodedRule) {
    // Set rule value
    if (!element.val) {
      element.val = element.defaultValue;
    }

    if (!element.id || element.id === 0) {
      this.codedRuleService.createCodedRule(element).subscribe(data => {
        this.toastr.success('Automatic rule enabled', 'Success');
        this.loadCodedRulesData();
      }, err => {
        console.log('error in creating coded rule: ', element)
        this.showErrorMessageDialog('Error! failed to add coded rule');
      });
    } else {
      this.codedRuleService.updateCodedRule(element).subscribe(data => {
        this.toastr.success('Automatic rule updated', 'Success');
        this.loadCodedRulesData();
      }, err => {
        console.log('error in editing coded rule: ', element)
        this.showErrorMessageDialog('Error! failed to edit coded rule');
      });
    }
  }

  deleteCodedRule(rule: UserCodedRule) {
    this.codedRuleService.deleteCodedRule(rule.id).subscribe(data => {
      this.toastr.success('Automatic rule disabled.', 'Success');
      this.loadCodedRulesData();
    }, err => {
      console.log('error in deleteing coded rule: ', rule)
      this.showErrorMessageDialog('Failed to remove from rules list');
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
  }

}
