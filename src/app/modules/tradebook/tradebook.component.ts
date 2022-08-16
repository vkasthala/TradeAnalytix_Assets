import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tradebook',
  templateUrl: './tradebook.component.html',
  styleUrls: ['./tradebook.component.scss']
})
export class TradeBookComponent implements OnInit {



  constructor(
    private router: Router,
  ) { }

  ngOnInit() {

  }


}
