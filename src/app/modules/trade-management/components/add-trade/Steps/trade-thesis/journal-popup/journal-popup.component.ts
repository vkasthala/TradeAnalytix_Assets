import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StrategyType } from 'src/app/modules/shared/models/trade-management/strategy-type.enum';
import { StrategyCreateService } from 'src/app/modules/shared/services/strategy-create.service';
import { UserMetadataStoreService } from 'src/app/modules/shared/services/user-metadata-store.service';
import { TradeThesis } from 'src/app/modules/trade-management/models/trade-thesis.model';

@Component({
  selector: 'app-journal-popup',
  templateUrl: './journal-popup.component.html',
  styleUrls: ['./journal-popup.component.scss']
})
export class JournalPopupComponent implements OnInit {

  category: string;
  title: string;
  strategies = StrategyType;

  tradeThesis: TradeThesis;

  strategyTypes: String[];
  strategyTypeId: number;

  constructor(
    public dialogRef: MatDialogRef<JournalPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private strategyCreateService: StrategyCreateService,
    private userMetadataStoreService: UserMetadataStoreService
    ) {
    this.category = data.category;
    this.title = data.title;
    this.strategyTypeId = data.strategyTypeId;
    this.tradeThesis = data.tradeThesis;
  }

  ngOnInit() {
    this.strategyTypes = this.strategyCreateService.getStrategies();
  }

  closeModal() {
    this.dialogRef.close();
  }

  saveFieldSettings() {
    this.dialogRef.close({
      strategyTypeId: this.strategyTypeId,
      tradeThesis: this.tradeThesis
    });
  }

}
