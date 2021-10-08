import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActionType } from 'src/app/modules/shared/models/trade-management/action-type.enum';
import { OptionType } from 'src/app/modules/shared/models/trade-management/option-type.enum';
import { CompareStrategyDetails } from '../../models/compare-strategy-details.model';
import { CompareStrategyOption } from '../../models/compare-strategy-option.model';


@Component({
  selector: 'app-strategy-details-modal',
  templateUrl: './strategy-details.component.html',
  styleUrls: ['./strategy-details.component.scss']
})
export class StrategyDetailsComponent implements OnInit {

  strategyDetails: CompareStrategyDetails;

  constructor(
    public dialogRef: MatDialogRef<StrategyDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {

    this.strategyDetails = data.details;
    console.log('details::', this.strategyDetails);
  }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

  getStockLabel(): string {
    return this.getActionTypeLabel(this.strategyDetails.compareStrategyStock.actionType) + ' ' + this.strategyDetails.compareStrategyStock.quantity + ' Stock at ';
  }

  getOptionLabel(option: CompareStrategyOption): string {
    return this.getActionTypeLabel(option.actionType) + ' ' + option.contracts + ' contract of ' + option.strikePrice + ' ' + option.expireDate + ' ' + this.getOptionTypeLabel(option.optionType) + ' at ';
  }

  getActionTypeLabel(actionTypeId: number): string {
    let text: string = '';
    if (ActionType['Buy to Open'] == actionTypeId) {
      text = 'Buy to Open';
    } else if (ActionType['Buy to Close'] == actionTypeId) {
      text = 'Buy to Close';
    } else if (ActionType['Sell to Open'] == actionTypeId) {
      text = 'Sell to Open';
    } else if (ActionType['Sell to Close'] == actionTypeId) {
      text = 'Sell to Close';
    }
    return text;
  }

  getOptionTypeLabel(optionTypeId: number): string {
    let text: string = '';
    if (OptionType.Call == optionTypeId) {
      text = 'Call';
    } else if (OptionType.Put == optionTypeId) {
      text = 'Put';
    }
    return text;
  }

}
