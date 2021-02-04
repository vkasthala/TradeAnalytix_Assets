import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ManageRulePopupComponent } from './manage-rule-popup/manage-rule-popup.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EntryExitRulesService } from '../../services/entry_exit_rules.service';
import { EntryExitRulesGridRow } from '../../models/entry-exit-rules-grid-row.model';

// EntryExitRulesService
@Component({
  selector: 'app-managerules',
  templateUrl: './managerules.component.html',
  styleUrls: ['./managerules.component.scss']
})
export class ManagerulesComponent implements OnInit {
  displayedColumns: string[] = ['date', 'type', 'description', 'source', 'action'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  public dataSource = [];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  public gridData = [];
  constructor(private _dialog: MatDialog,
    private router: Router,
    private entryExitRulesService: EntryExitRulesService
    
    ) { }

  ngAfterViewInit() {
    this.entryExitRulesService.getEntryExitRules().subscribe(data => {
      //this.dataSource = data.entryexitrules;
      console.log('dataSource', this.dataSource)
    });
  }

  ngOnInit() {
    
  }

  addRule(title, btnText) {
    const dialogRef = this._dialog.open(ManageRulePopupComponent, {
      disableClose: true,
      width: 'auto',
      data : {
        title: title,
        btnText: btnText,
        formData:''
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
    });
  }

  editTrade(rowModel: EntryExitRulesGridRow, title, btnText) {
    const dialogRef = this._dialog.open(ManageRulePopupComponent, {
      disableClose: true,
      width: 'auto',
      data : {
        title: title,
        btnText: btnText,
        formData:rowModel
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
    });
  }

}
