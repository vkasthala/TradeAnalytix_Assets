import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ICellEditorParams } from 'ag-grid-community';
import { UserMetadataStoreService } from 'src/app/modules/shared/services/user-metadata-store.service';

@Component({
  selector: 'app-close-event-editor',
  template: `<select class="form-control select-input" id="inputState" (change)="onChange($event)" [(ngModel)]="selectedId">
  <option *ngFor="let key of metadataStoreService.gainLossAttributes" [value]="key.id" [label]="key.name"></option>
</select>`
})
export class CloseEventEditorComponent implements OnInit {

  selectedId: number;
  params: ICellEditorParams;

  @ViewChild('select', { read: ViewContainerRef })
  public input: ViewContainerRef;

  constructor(private metadataStoreService: UserMetadataStoreService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    //setTimeout(() => this.input.element.nativeElement.focus());
  }

  agInit(params: ICellEditorParams): void {
    this.params = params;
    this.selectedId = this.params ? this.params.data.closeEventId : undefined;
  }

  getValue() {
    return this.params.data.closeEvent;
  }

  isPopup?(): boolean {
    return false;
  }

  onChange($event) {
    this.params.data.closeEvent = this.metadataStoreService.gainLossAttributes[$event.target.selectedIndex].name;
    this.params.data.closeEventId = this.metadataStoreService.gainLossAttributes[$event.target.selectedIndex].id;
    this.params.data.dirty = true;
  }
}
