import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-trade-plan',
  templateUrl: './trade-plan.component.html',
  styleUrls: ['./trade-plan.component.scss']
})
export class TradePlaneComponent implements OnInit {
  

  protected loginModalOpen: boolean = false;
  constructor(
    private router: Router,
    private _dialog: MatDialog,

    protected toastr: ToastrService
  ) { }

  ngOnInit() {
    
  }

  

}
