import { Component, OnInit } from '@angular/core';
import { SnapTradeService } from '../snap-trade.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-snap-trade-component',
  templateUrl: './snap-trade-component.component.html',
  styleUrls: ['./snap-trade-component.component.scss']
})
export class SnapTradeComponentComponent implements OnInit {

  data: string;
  username:string;
  userId:string;
  userData:any;
  responseData: string |null = null; 
  errorMessage: string | null = null;

  constructor(private activatedRoute:ActivatedRoute,
        private snapTradeService :SnapTradeService,
        private userservice:UserService) {
        this.username = this.activatedRoute.snapshot.paramMap.get('username');
        this.userId=this.activatedRoute.snapshot.paramMap.get('userid');
  }

  

  ngOnInit() {
      this.snapTradeService.registerUser(this.username,this.userId).subscribe((response) => {
      console.log('Success response:', response);
      this.responseData = response; // Store successful response
      this.errorMessage = null; // Clear any previous error message
    },
    (error) => {
      this.errorMessage = `Snaptrade account alredy exists!`; // Set the error message
      console.error('Error occurred:', error);
    }
  );
    console.log(" called ...");
  }

}
