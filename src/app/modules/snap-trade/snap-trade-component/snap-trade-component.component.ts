import { Component, OnInit } from '@angular/core';
import { SnapTradeService } from '../snap-trade.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-snap-trade-component',
  templateUrl: './snap-trade-component.component.html',
  styleUrls: ['./snap-trade-component.component.scss']
})
export class SnapTradeComponentComponent implements OnInit {

  data: string;
  username:string;
  responseData: string |null = null; 
  errorMessage: string | null = null;

  constructor(private activatedRoute:ActivatedRoute,private snapTradeService :SnapTradeService) {
    this.username = this.activatedRoute.snapshot.paramMap.get('username');

  }

  

  ngOnInit() {
    console.log(" calling ...");
      this.snapTradeService.postData(this.username).subscribe((response) => {
        console.log('Success response:', response);
        this.responseData = response; // Store successful response
        this.errorMessage = null; // Clear any previous error message
      },
      (error) => {
        this.errorMessage = 'An error occurred while submitting data. Please try again.'; // Set the error message
        console.error('Error occurred:', error);
      }
    );
    console.log(" called ...");
  }

}
