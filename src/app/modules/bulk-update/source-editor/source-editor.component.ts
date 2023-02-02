import { AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AgEditorComponent } from 'ag-grid-angular';
import { ICellEditorParams } from 'ag-grid-community';
import { UserMetadataStoreService } from 'src/app/modules/shared/services/user-metadata-store.service';

@Component({
  selector: 'editor-cell',
  template: `<select class="form-control select-input" id="inputState" (change)="onChange($event)" [(ngModel)]="selectedId">
      <option *ngFor="let key of metadataStoreService.sources" [value]="key.id" [label]="key.name"></option>
  </select>`,
})
export class SourceEditorComponent implements OnInit, AgEditorComponent, AfterViewInit {

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
    this.selectedId = this.params ? this.params.data.sourceId : undefined;
  }

  getValue() {
    return this.params.data.source;
  }

  isPopup?(): boolean {
    return false;
  }

  onChange($event) {
    this.params.data.source = this.metadataStoreService.sources[$event.target.selectedIndex].name;
    this.params.data.sourceId = this.metadataStoreService.sources[$event.target.selectedIndex].id;
    this.params.data.dirty = true;
  }

}
