import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-import-trade',
  templateUrl: './import-trade.component.html',
  styleUrls: ['./import-trade.component.scss']
})
export class ImportTradeComponent implements OnInit {
  

  protected loginModalOpen: boolean = false;
  constructor(
    private router: Router,
    private _dialog: MatDialog,

    protected toastr: ToastrService
  ) { }

  ngOnInit() {
    
  }

  

}
