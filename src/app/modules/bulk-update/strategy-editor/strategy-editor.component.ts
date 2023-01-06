import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ICellEditorParams } from 'ag-grid-community';
import { UserMetadataStoreService } from 'src/app/modules/shared/services/user-metadata-store.service';

@Component({
  selector: 'app-strategy-editor',
  template: `<select class="form-control select-input" id="inputState" (change)="onChange($event)" [(ngModel)]="selectedId">
  <option *ngFor="let key of metadataStoreService.directions" [value]="key.id" [label]="key.name"></option>
</select>`
})
export class StrategyEditorComponent implements OnInit {

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
    this.selectedId = this.params ? this.params.data.directionId : undefined;
  }

  getValue() {
    return this.params.data.strategyType;
  }

  isPopup?(): boolean {
    return false;
  }

  onChange($event) {
    // this.params.data.strategyType = this.metadataStoreService.strategyType[$event.target.selectedIndex].name;
    // this.params.data.directionId = this.metadataStoreService.directions[$event.target.selectedIndex].id;
    // this.params.data.dirty = true;
  }
}
