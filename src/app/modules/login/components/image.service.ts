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
          "image": "../../../../assets/images/slideshow/img1.svg",
          "thumbImage": "../../../../assets/images/slideshow/img1.svg",
          "order":1
        },
        {
          "image": "../../../../assets/images/slideshow/img2.svg",
          "thumbImage": "../../../../assets/images/slideshow/img2.svg",
          "order":2
        },
        {
          "image": "../../../../assets/images/slideshow/img3.svg",
          "thumbImage": "../../../../assets/images/slideshow/img3.svg ",
          "order":3
        },
        {
          "image": "../../../../assets/images/slideshow/img4.svg",
          "thumbImage": "../../../../assets/images/slideshow/img4.svg",
          "order":4
        },
        {
          "image": "../../../../assets/images/slideshow/img5.svg",
          "thumbImage": "../../../../assets/images/slideshow/img5.svg",
          "order":5
        },
        {
          "image": "../../../../assets/images/slideshow/img6.svg",
          "thumbImage": "../../../../assets/images/slideshow/img6.svg",
          "order":6
        },
        {
          "image": "../../../../assets/images/slideshow/img7.svg",
          "thumbImage": "../../../../assets/images/slideshow/img7.svg",
          "order":7
        },
        {
          "image": "../../../../assets/images/slideshow/img8.svg",
          "thumbImage": "../../../../assets/images/slideshow/img8.svg",
          "order":8
        },
        {
          "image": "../../../../assets/images/slideshow/img1.svg",
          "thumbImage": "../../../../assets/images/slideshow/img1.svg",
          "order":9
        },
        {
          "image": "../../../../assets/images/slideshow/img2.svg",
          "thumbImage": "../../../../assets/images/slideshow/img2.svg",
          "order":10
        },
        {
          "image": "../../../../assets/images/slideshow/img3.svg",
          "thumbImage": "../../../../assets/images/slideshow/img3.svg ",
          "order":11
        },
        {
          "image": "../../../../assets/images/slideshow/img4.svg",
          "thumbImage": "../../../../assets/images/slideshow/img4.svg",
          "order":12
        },
        {
          "image": "../../../../assets/images/slideshow/img5.svg",
          "thumbImage": "../../../../assets/images/slideshow/img5.svg",
          "order":13
        },
        {
          "image": "../../../../assets/images/slideshow/img6.svg",
          "thumbImage": "../../../../assets/images/slideshow/img6.svg",
          "order":14
        },
        {
          "image": "../../../../assets/images/slideshow/img7.svg",
          "thumbImage": "../../../../assets/images/slideshow/img7.svg",
          "order":15
        },
        {
          "image": "../../../../assets/images/slideshow/img8.svg",
          "thumbImage": "../../../../assets/images/slideshow/img8.svg",
          "order":16
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