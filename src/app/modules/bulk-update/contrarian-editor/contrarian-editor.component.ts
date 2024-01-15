import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ICellEditorParams } from 'ag-grid-community';
import { UserMetadataStoreService } from 'src/app/modules/shared/services/user-metadata-store.service';

@Component({
  selector: 'app-contrarian-editor',
  template: `<select class="form-control select-input" id="inputState" (change)="onChange($event)" [(ngModel)]="selectedId">
      <option *ngFor="let key of metadataStoreService.contrarian" [value]="key.id" [label]="key.name"></option>
  </select>`
})
export class ContrarianEditorComponent implements OnInit {

  selectedId: number;
  params: ICellEditorParams;

  @ViewChild('select', { read: ViewContainerRef, static: false })
  public input: ViewContainerRef;

  constructor(private metadataStoreService: UserMetadataStoreService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    //setTimeout(() => this.input.element.nativeElement.focus());
  }

  agInit(params: ICellEditorParams): void {
    this.params = params;
    this.selectedId = this.params ? this.params.data.contrarianId : undefined;
  }

  getValue() {
    return this.params.data.contrarian;
  }

  isPopup?(): boolean {
    return false;
  }

  onChange($event) {
    this.params.data.contrarian = this.metadataStoreService.contrarian[$event.target.selectedIndex].name;
    this.params.data.contrarianId = this.metadataStoreService.contrarian[$event.target.selectedIndex].id;
    this.params.data.dirty = true;
  }
}
