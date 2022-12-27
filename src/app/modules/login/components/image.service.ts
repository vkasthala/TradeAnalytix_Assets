import { Injectable, Inject, Optional } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
export class ImageService {
  constructor(private http: HttpClient) {}
  
data:any= 
    [
        {
          "image": "../../../../assets/images/slideshow/e-trade.png",
          "thumbImage": "../../../../assets/images/slideshow/e-trade.png",
          "order":1
        },
        {
          "image": "../../../../assets/images/slideshow/img2.png",
          "thumbImage": "../../../../assets/images/slideshow/img2.png",
          "order":2
        },
        {
          "image": "../../../../assets/images/slideshow/img3.png",
          "thumbImage": "../../../../assets/images/slideshow/img3.png",
          "order":3
        },
        {
          "image": "../../../../assets/images/slideshow/img4.png",
          "thumbImage": "../../../../assets/images/slideshow/img4.png",
          "order":4
        },
        {
          "image": "../../../../assets/images/slideshow/img5.png",
          "thumbImage": "../../../../assets/images/slideshow/img5.png",
          "order":5
        },
        {
          "image": "../../../../assets/images/slideshow/img6.png",
          "thumbImage": "../../../../assets/images/slideshow/img6.png",
          "order":6
        },
        {
          "image": "../../../../assets/images/slideshow/img7.png",
          "thumbImage": "../../../../assets/images/slideshow/img7.png",
          "order":7
        },
        {
          "image": "../../../../assets/images/slideshow/img8.png",
          "thumbImage": "../../../../assets/images/slideshow/img8.png",
          "order":8
        },
      ] ;
  getImages() {
    return this.http.get(
      "https://accedo-video-app-api.herokuapp.com/getImages",
      httpOptions
    );
  }

  getImagesWithOrder(){
    return this.data;
  }
}