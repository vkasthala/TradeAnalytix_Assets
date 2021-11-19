import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-trade-journal',
  templateUrl: './trade-journal.component.html',
  styleUrls: ['./trade-journal.component.scss']
})
export class TradeJournalComponent implements OnInit {
  

  protected loginModalOpen: boolean = false;
  constructor(
    private router: Router,
    private _dialog: MatDialog,

    protected toastr: ToastrService
  ) { }

  ngOnInit() {
    
  }

  

}
