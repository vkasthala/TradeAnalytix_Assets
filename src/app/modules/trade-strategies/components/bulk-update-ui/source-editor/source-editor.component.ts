import { AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AgEditorComponent } from 'ag-grid-angular';
import { ICellEditorParams, IAfterGuiAttachedParams } from 'ag-grid-community';
import { SourceType } from 'src/app/modules/trade-management/models/source-type.model';
import { UserMetadataService } from 'src/app/modules/trade-management/services/user-metadata.service';

@Component({
  selector: 'editor-cell',
  template: `<select class="form-control select-input" id="inputState" (change)="onChange($event)"
      [(ngModel)]='selected'>
      <option *ngFor="let key of sources" [value]="key" [label]="key.name"></option>
  </select>`,
})
export class SourceEditorComponent implements OnInit, AgEditorComponent, AfterViewInit {

  sources: SourceType[] = [];
  selected: SourceType;
  params: ICellEditorParams;

  @ViewChild('select', { read: ViewContainerRef, static: false })
  public input: ViewContainerRef;

  constructor(private metadataService: UserMetadataService) { }

  ngOnInit() {
    
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.input.element.nativeElement.focus());
  }

  agInit(params: ICellEditorParams): void {
    this.loadSourceTypes();
    this.params = params;
  }

  getValue() {
    return this.selected ? this.selected.name : '';
  }

  isPopup?(): boolean {
    return true;
  }


  loadSourceTypes() {
    this.metadataService.getTradeSourceTypes().subscribe(result => {
      this.sources = [];
      this.sources.push(new SourceType());
      this.sources = this.sources.concat(result);
      this.selected = this.sources.find(refData => refData.name == this.params.value);
    });
  }

  onChange($event){
    console.log('change::', $event.target.value);
    this.params.value = this.sources[$event.target.selectedIndex].name;
    this.selected = this.sources[$event.target.selectedIndex];
  }

}
