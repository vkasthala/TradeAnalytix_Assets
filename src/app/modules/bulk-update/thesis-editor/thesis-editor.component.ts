import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ICellEditorParams } from 'ag-grid-community';
import { UserMetadataStoreService } from 'src/app/modules/shared/services/user-metadata-store.service';

@Component({
  selector: 'app-thesis-editor',
  template: `<textarea class="form-control select-input" id="inputState" (ngModelChange)="onChange($event)" [(ngModel)]="selectedValue"></textarea>`
})
export class ThesisEditorComponent implements OnInit {
  selectedValue:any;
  params: ICellEditorParams;

  @ViewChild('textarea', { read: ViewContainerRef })
  public input: ViewContainerRef;

  constructor(private metadataStoreService: UserMetadataStoreService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    //setTimeout(() => this.input.element.nativeElement.focus());
  }

  agInit(params: ICellEditorParams): void {
    this.params = params;
    this.selectedValue = this.params ? this.params.data.reason : undefined;
  }

  getValue() {
    return this.params.data.reason;
  }

  isPopup?(): boolean {
    return false;
  }

  onChange($event) {
    this.params.data.reason = $event;
    this.params.data.dirty = true;
  }
}
