import { Component, OnInit } from '@angular/core';
import { PositionsResponse } from '../shared/models/portfolio.model';
import { PositionService } from '../shared/services/position.service';


@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss']
})
export class PositionsComponent implements OnInit {
  
  positionResponse: PositionsResponse = {
    data: {
    data: [],
    total_day_p_and_l: 0,
    total_p_and_l: 0
    }
  }
  positionsCount: number = 0;
  userId: string = "";

  constructor(
    private _positionService: PositionService
  ) { }

  ngOnInit() {
    this.loadPositions();
  }

  loadPositions(){
    this._positionService.getPositions().subscribe(response=>{
      if(response){
        this.positionResponse.data.data = response.data.data;
        this.positionResponse.data.total_p_and_l = response.data.total_day_p_and_l;
        this.positionResponse.data.total_p_and_l = response.data.total_p_and_l;
        this.positionsCount = this.positionResponse.data.data!.length;
      }
    }, error => {
      console.log(error);
    })
  }

  updateChangeProps(data: any) {
    if (data && data.body) {
      let payload = JSON.parse(data.body);
      if (payload.status) {
        this.loadPositions();
      }
    }
  }


}
