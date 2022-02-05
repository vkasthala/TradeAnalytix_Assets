import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ICellEditorParams } from 'ag-grid-community';
import { UserMetadataStoreService } from 'src/app/modules/shared/services/user-metadata-store.service';

@Component({
  selector: 'app-direction-editor',
  template: `<select class="form-control select-input" id="inputState" (change)="onChange($event)" [(ngModel)]="selectedId">
  <option *ngFor="let key of metadataStoreService.directions" [value]="key.id" [label]="key.name"></option>
</select>`
})
export class DirectionEditorComponent implements OnInit {

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
    return this.params.data.direction;
  }

  isPopup?(): boolean {
    return true;
  }

  onChange($event) {
    this.params.data.direction = this.metadataStoreService.directions[$event.target.selectedIndex].name;
    this.params.data.directionId = this.metadataStoreService.directions[$event.target.selectedIndex].id;
  }
}
