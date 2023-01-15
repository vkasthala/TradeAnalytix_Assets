import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ICellEditorParams } from 'ag-grid-community';
import { UserMetadataStoreService } from 'src/app/modules/shared/services/user-metadata-store.service';
import { StrategyType } from '../../shared/models/trade-management/strategy-type.enum';
import { StrategyCreateService } from '../../shared/services/strategy-create.service';

@Component({
  selector: 'app-strategy-editor',
  template: `<select class="form-control select-input" id="inputState" (change)="onChange($event)" [(ngModel)]="selectedId">
  <option *ngFor="let key of strategyTypes" [value]="key" [label]="strategies[key]"></option>
</select>`
})
export class StrategyEditorComponent implements OnInit {

  strategies = StrategyType;
  strategyTypes: String[] = [];


  selectedId: number;
  params: ICellEditorParams;

  @ViewChild('select', { read: ViewContainerRef, static: false })
  public input: ViewContainerRef;

  constructor(
    private metadataStoreService: UserMetadataStoreService,
    private strategyCreateService: StrategyCreateService
  ) { }

  ngOnInit() {

    this.strategyTypes = this.strategyCreateService.getStrategies();
  }

  ngAfterViewInit(): void {
    //setTimeout(() => this.input.element.nativeElement.focus());
  }

  agInit(params: ICellEditorParams): void {
    this.params = params;
    this.selectedId = this.params ? this.params.data.strategyTypeId : undefined;
  }

  getValue() {
    return this.params.data.strategyType;
  }

  isPopup?(): boolean {
    return false;
  }

  onChange($event) {
    if (this.selectedId) {
      this.params.data.strategyType = this.strategies[$event.target.selectedIndex];
      this.params.data.strategyTypeId =  parseInt(this.selectedId + '');
      this.params.data.dirty = true;
    }
  }
}
