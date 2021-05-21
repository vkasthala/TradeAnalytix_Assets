import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { EditableListComponent } from 'src/app/modules/shared/components/widgets/editable-list/editable-list.component';
import { DataSetupService } from '../../services/data-setup.service';
import { EditableGridComponent } from 'src/app/modules/shared/components/widgets/editable-grid/editable-grid.component';
import { BockerageCommission } from '../../models/brockerage-commission.model';
import { EditableGridColumn } from 'src/app/modules/shared/models/common/editable-grid-column.model';
import { EditableListItem } from 'src/app/modules/shared/models/common/editable-list-item.model';
import { Subject } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/modules/shared/components/modals/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-codedrules',
  templateUrl: './codedrules.component.html',
  styleUrls: ['./codedrules.component.scss']
})
export class CodedRulesComponent implements OnInit {

  @ViewChild('codedRules', { static: false }) protected codedRules: EditableGridComponent<BockerageCommission>;

  constructor(private dataSetupService: DataSetupService, private cdr: ChangeDetectorRef, private _dialog: MatDialog, private toastr: ToastrService) { }
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
    this.dataSetupService.getBrokerageCommissions().subscribe(result => {
      this.codedRules.dataSource = result;
    });
  }

  initCodedRulesGrid() {
    this.loadCodedRulesData();

    let cols: EditableGridColumn[] = [];
    let colIds: string[] = [];
    let col: EditableGridColumn = new EditableGridColumn();
    col.id = "name";
    col.name = "Parameter";
    col.type = 'select';
    col.values = ['Forex Options', 'Stock Options', 'Stock Future'];
    colIds.push('name');
    cols.push(col);

    col = new EditableGridColumn();
    col.id = "type";
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

    let addItemSubject: Subject<BockerageCommission> = new Subject<BockerageCommission>();
    let editItemSubject: Subject<BockerageCommission> = new Subject<BockerageCommission>();
    let deleteItemSubject: Subject<BockerageCommission> = new Subject<BockerageCommission>();
    addItemSubject.asObservable().subscribe(data => {
      this.dataSetupService.createBrokerageCommission(data).subscribe(data => {
        this.showSuccessMessage('Successfully added the new brokerage commission');
        this.loadCodedRulesData();
      }, err => {
        console.log('error in creating brokerage commission: ', data)
        this.showErrorMessageDialog('Error! failed to add brokerage commission');
      });
    });
    editItemSubject.asObservable().subscribe(data => {
      this.dataSetupService.updateBrokerageCommission(data).subscribe(data => {
        this.showSuccessMessage('Successfully updated the selected brokerage commission');
        this.loadCodedRulesData();
      }, err => {
        console.log('error in editing brokerage commission: ', data)
        this.showErrorMessageDialog('Error! failed to edit selected brokerage commission');
      });
    });
    deleteItemSubject.asObservable().subscribe(data => {
      this.getDeleteDialog().afterClosed().subscribe(dialogResult => {
        if (dialogResult == true) {
          this.dataSetupService.deleteBrokerageCommission(data.id).subscribe(data => {
            this.showSuccessMessage('Successfully deleted the selected brokerage commission');
            this.loadCodedRulesData();
          }, err => {
            console.log('error in deleteing brokerage commission: ', data)
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
