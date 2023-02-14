import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatDialogRef } from '@angular/material';
import { NavigationExtras, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as FileSaver from 'file-saver'
import { StockSymbolService } from 'src/app/modules/shared/services/stock-symbol.service';
import { UserStockStatsService } from 'src/app/modules/shared/services/user-stock-stats.service';
import { TradeStrategyService } from 'src/app/modules/trade-management/services/trade-strategy.service';
import { ImportTradesGridPage } from 'src/app/modules/import-trades-history/models/import-trades-grid-page.model';
import { ImportTradesGridSort } from 'src/app/modules/import-trades-history/models/import-trades-grid-sort.model';
import { ImportTradesGridRequest } from 'src/app/modules/import-trades-history/models/import-trades-grid-request.model';
import { TradeStrategyGridRow } from 'src/app/modules/trade-strategies/models/trade-strategy-grid-row.model';
import { ImportTradesGridStore } from 'src/app/modules/import-trades-history/services/import-trades-grid-store';
import { ImportTradesGridService } from 'src/app/modules/import-trades-history/services/import-trades-grid.service';
import { ImportTradePopupComponent } from './import-trade-popup/import-trade-popup.component';
import { ToastrService } from 'ngx-toastr';
import { UploadFileService } from 'src/app/modules/import-trades/services/upload-file.service';
import { UtilService } from '../utilities/services/util.service';
import { AutoImportTradePopupComponent } from './auto-import-trade-popup/auto-import-trade-popup.component';
import { DemoModeDetailsService } from '../shared/services/demo-mode-details.service';
import { PlaidService } from './services/plaid.service';

@Component({
  selector: 'app-import-trades-history',
  styleUrls: ['import-trades-history.css'],
  templateUrl: 'import-trades-history.html',
})
export class ImportTradesHistory implements AfterViewInit, OnInit {
  selectedFiles: FileList;
  expandIndex: any;
  displayedColumns = ['openDate', 'stockName', 'direction', 'status', 'action'];
  pageSize: number = 20

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  dataSource: ImportTradesGridStore;
  importTradesGridRequest: ImportTradesGridRequest = this.getInitialRequest();

  constructor(private importTradesGridService: ImportTradesGridService,
    private tradeStrategyService: TradeStrategyService,
    private stockSymbolService: StockSymbolService,
    private userStockStatsService: UserStockStatsService,
    private uploadService: UploadFileService,
    protected toastr: ToastrService,
    private router: Router,
    private _dialog: MatDialog,
    private utilService: UtilService,
    private myElement: ElementRef,
    private plaidService: PlaidService,
    //public dialogRef: MatDialogRef<ImportTradePopupComponent>
  ) {
  }

  ngOnInit() {
    this.dataSource = new ImportTradesGridStore(this.importTradesGridService);
    this.loadPage();
  }

  loadPage() {

    this.dataSource.loadTradeStrategies(this.importTradesGridRequest);
  }

  reload() {
    this.importTradesGridRequest.page.pageNumber = 0;
    this.loadPage();
  }

  handlePage($event) {

  }

  ngAfterViewInit() {

    this.paginator.page
      .pipe(
        tap(() => {
          console.log('here...');
          this.updatePageSortParams();
          this.loadPage();
        })
      )
      .subscribe();
  }

  getInitialRequest(): ImportTradesGridRequest {
    let request: ImportTradesGridRequest = new ImportTradesGridRequest();
    let pageRequest: ImportTradesGridPage = new ImportTradesGridPage();
    pageRequest.pageNumber = 0;
    pageRequest.pageSize = 20;
    request.page = pageRequest;
    return request;
  }

  updatePageSortParams() {
    let pageRequest: ImportTradesGridPage = this.importTradesGridRequest.page;
    if (!pageRequest) {
      pageRequest = new ImportTradesGridPage();
      this.importTradesGridRequest.page = pageRequest;
    }
    pageRequest.pageNumber = this.paginator.pageIndex;
    pageRequest.pageSize = this.paginator.pageSize;

    let sortRequest: ImportTradesGridSort = this.importTradesGridRequest.sort;
    if (!sortRequest) {
      sortRequest = new ImportTradesGridSort();
      this.importTradesGridRequest.sort = sortRequest;
    }
    /*sortRequest.column = this.sort.active;
    if (this.sort.active) {
      sortRequest.order = this.sort.direction;
    }*/
  }

  downloadFailedTrade(rowModel: TradeStrategyGridRow) {
    this.importTradesGridService.downloadFailedImportTrades(rowModel.id).subscribe(
      response => {
        const blob = new Blob([response], { type: 'text/csv' });
        FileSaver.saveAs(blob, 'Failed_imports_' + new Date() + '.csv')
      },
      error => {
        console.log('error downloading....', error);
      }
    );
  }

  downloadTradeThesis(rowModel: TradeStrategyGridRow) {
    this.importTradesGridService.downloadImportTradesThesis(rowModel.id).subscribe(
      response => {
        const blob = new Blob([response], { type: 'text/csv' });
        FileSaver.saveAs(blob, 'Trade_Thesis_imports_' + new Date() + '.csv')
      },
      error => {
        console.log('error downloading....', error);
      }
    );
  }

  uploadTradeThesis(event, rowModel: TradeStrategyGridRow) {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles !== undefined && this.selectedFiles.length > 0) {
      this.uploadService.importTradesThesis(this.selectedFiles.item(0), rowModel.id).subscribe(
        event => {
          this.toastr.success('Your trades have been sucessfully imported. Uploaded Records: ____; Failed Records: ____', 'Success');
        },
        err => {
          this.toastr.error('Failed to import trades thesis', 'Error');
        });
      this.selectedFiles = undefined;
    }
    else {
      this.toastr.error('Please select a file import trades thesis', 'Error');
    }
  }

  downloadStandardFile() {
    this.utilService.downloadFile("CueTrade_ImportTrades_Standard.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  }

  expandRowOptions(index) {
    this.expandIndex = index;
  }

  closeActionBox() {
    this.expandIndex = null
  }

  importTradesPopup() {
    const dialogRef = this._dialog.open(ImportTradePopupComponent, {
      disableClose: true,
      width: 'auto',
      //data: dialogData
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res === true) {
        this.reload();
      }
    });
  }

  autoImportTradesPopup() {
    this.plaidService.createLinkToken().subscribe(result => {
      const dialogRef = this._dialog.open(AutoImportTradePopupComponent, {
        disableClose: true,
        width: 'auto',
        data: { 'token': result.token }
      });
      dialogRef.afterClosed().subscribe((res) => {
        if (res === true) {
          this.reload();
        }
      });
    });
  }

  closePopup(e) {
    let iframe = document.querySelector('iframe');
    iframe.src = '';
    iframe.setAttribute("src", 'https://www.youtube.com/embed/txIqoIys3GI');
  }

}



