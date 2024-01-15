import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  protected loginModalOpen: boolean = false;
  selectedObject : any;
  constructor(
    private router: Router,
    protected toastr: ToastrService,
  ) { }

  ngOnInit() {
    
  }

  onNavigate(event){ 
    this.selectedObject = event.target.value;
    this.router.navigate([event.target.value]) 
  }

}
