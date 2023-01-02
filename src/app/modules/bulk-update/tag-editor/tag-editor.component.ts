import { AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AgEditorComponent } from 'ag-grid-angular';
import { ICellEditorParams } from 'ag-grid-community';
import { UserMetadataStoreService } from 'src/app/modules/shared/services/user-metadata-store.service';
import { TradeTagsComponent } from '../../trade-management/components/add-trade/Steps/trade-tags/trade-tags.component';

@Component({
  selector: 'editor-cell',
  template: `<app-trade-tags #tradeTags></app-trade-tags>`,
})
export class TagEditorComponent implements OnInit, AgEditorComponent, AfterViewInit {

  // tradeTags:any;
  selectedId: number;
  params: ICellEditorParams;

  public input: ViewContainerRef;
  @ViewChild('tradeTags', { static: false }) tradeTagsComponent: TradeTagsComponent;
  
  constructor(private metadataStoreService: UserMetadataStoreService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    //setTimeout(() => this.input.element.nativeElement.focus());
  }

  agInit(params: ICellEditorParams): void {
    this.params = params;
    // this.selectedValue = this.params ? this.params.data.targetCloseDate : undefined;
  }

  getValue() {
    return this.tradeTagsComponent.getCommaSeperatedTagNames();
  }

  isPopup?(): boolean {
    return false;
  }

  onChange($event) {
    this.params.data.dirty = true;
  }

}
