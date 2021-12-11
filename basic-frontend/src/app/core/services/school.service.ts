import { Injectable } from '@angular/core';
import {school} from "../../types/school-interface";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private  http:HttpClient) { }
  getSchools():Observable<school[]>{
    /*
    return new Promise<school[]>((resolve, reject)=>{
      const url = 'http://localhost:3000/api/school';
      fetch(url).then(schools => schools.json()).then(json=>{
        resolve(json);
      }).catch(err =>{
        reject(err.message);
      });
    });

     */

    return this.http.get<school[]>('http://localhost:3000/api/school')
  }

  addSchools(thisSchool : school):Observable<void>{
    return this.http.post<void>('http://localhost:3000/api/school', thisSchool);
  }

}
