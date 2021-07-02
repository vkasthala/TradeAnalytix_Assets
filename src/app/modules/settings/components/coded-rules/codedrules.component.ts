import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
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

  constructor(private codedRuleService: CodedRuleService, private cdr: ChangeDetectorRef, private _dialog: MatDialog, private toastr: ToastrService) { }
  step = 0;
  ngOnInit() {

  }

  setStep(index: number) {
    this.step = index;
  }
  ngAfterViewInit() {
    this.initCodedRulesGrid();
    this.cdr.detectChanges();
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
    col.id = "ruleName";
    col.name = "Parameter";
    col.placeholder = "Parameter";
    col.type = 'select';
    col.values = ['Forex Options', 'Stock Options', 'Stock Future'];
    colIds.push('name');
    cols.push(col);

    col = new EditableGridColumn();
    col.id = "operatorName";
    col.name = "Operator";
    col.type = 'select';
    col.values = ['Percentage', 'Fixed'];
    colIds.push('type');
    cols.push(col);

    col = new EditableGridColumn();
    col.id = "value";
    col.name = "Value";
    col.type = 'text';
    colIds.push('value');
    cols.push(col);

    this.codedRules.setColumnConfigs(cols);
    this.codedRules.setColumns(colIds);

    let addItemSubject: Subject<UserCodedRule> = new Subject<UserCodedRule>();
    let editItemSubject: Subject<UserCodedRule> = new Subject<UserCodedRule>();
    let deleteItemSubject: Subject<UserCodedRule> = new Subject<UserCodedRule>();
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

    this.codedRules.addItemSubject = addItemSubject;
    this.codedRules.editItemSubject = editItemSubject;
    this.codedRules.deleteItemSubject = deleteItemSubject;
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
