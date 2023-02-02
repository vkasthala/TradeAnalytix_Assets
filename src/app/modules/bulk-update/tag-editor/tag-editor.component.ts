import { AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AgEditorComponent } from 'ag-grid-angular';
import { ICellEditorParams } from 'ag-grid-community';
import { UserMetadataStoreService } from 'src/app/modules/shared/services/user-metadata-store.service';
import { UserTag } from '../../settings/models/user-tag.model';
import { UserTagService } from '../../settings/services/user-tag.service';
import { TradeTag } from '../../shared/models/trade-management/trade-tag.model';
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
  @ViewChild('tradeTags') tradeTagsComponent: TradeTagsComponent;

  constructor(private metadataStoreService: UserMetadataStoreService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    //setTimeout(() => this.input.element.nativeElement.focus());
    this.tradeTagsComponent.tags = this.getTradeTags(this.params.data.tags);
  }

  agInit(params: ICellEditorParams): void {
    this.params = params;
    // this.selectedValue = this.params ? this.params.data.targetCloseDate : undefined;
  }

  getValue() {
    this.params.data.tags = this.getTagIds();
    this.params.data.dirty = true;
    return this.params.data.tags;
    //return this.tradeTagsComponent.getCommaSeperatedTagNames();
  }

  isPopup?(): boolean {
    return false;
  }

  onChange($event) {
    this.params.data.dirty = true;
  }

  getTagIds(): string {
    let tagIds: number[] = [];
    this.tradeTagsComponent.tags.forEach(tag => {
      tagIds.push(tag.tagId);
    });
    return tagIds.join(',');
  }

  getTradeTags(tagIds: string): TradeTag[] {
    let tagArr: TradeTag[] = [];
    if (tagIds) {
      tagIds.split(',').forEach(tagId => {
        let tradeTag: TradeTag = new TradeTag(parseInt(tagId));
        //tradeTag.id = this.params.data.id;
        //tradeTag.tagId = tagId;
        tagArr.push(tradeTag);
      });
    }
    return tagArr;
  }

}
