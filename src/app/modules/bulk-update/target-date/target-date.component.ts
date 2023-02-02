import { AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AgEditorComponent } from 'ag-grid-angular';
import { ICellEditorParams } from 'ag-grid-community';
import * as moment from 'moment';
import { UserMetadataStoreService } from 'src/app/modules/shared/services/user-metadata-store.service';

@Component({
  selector: 'editor-cell',
  template: `<div class="datepicker-group">
  <input matInput [matDatepicker]="targetCloseDate" [(ngModel)]="selectedValue" />
  <mat-datepicker-toggle matSuffix [for]="targetCloseDate">
  </mat-datepicker-toggle>
  <mat-datepicker #targetCloseDate></mat-datepicker>
</div>`,
})
export class TargetDateComponent implements OnInit, AgEditorComponent, AfterViewInit {
  selectedValue:any;
  selectedId: number;
  params: ICellEditorParams;

  @ViewChild('mat-datepicker', { read: ViewContainerRef })
  public input: ViewContainerRef;

  constructor(private metadataStoreService: UserMetadataStoreService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    //setTimeout(() => this.input.element.nativeElement.focus());
  }

  agInit(params: ICellEditorParams): void {
    this.params = params;
    this.selectedValue = this.params ? this.params.data.targetCloseDate : undefined;
  }

  getValue() {
    let dd = moment(this.selectedValue);
    return  dd.format('DD-MMM-YYYY');
    // return this.selectedValue;
  }

  isPopup?(): boolean {
    return false;
  }

  onChange($event) {
    this.params.data.dirty = true;
    this.selectedValue = $event
  }

}
