import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpAddresserService {

  constructor() { }

  //to change when releasing
  address: string = "http://127.0.0.1:8080//";

  getAddress(){
    return this.address;
  }
}
