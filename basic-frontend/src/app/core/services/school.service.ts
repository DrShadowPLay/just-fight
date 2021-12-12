import { Injectable } from '@angular/core';
import {school} from "../../types/school-interface";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  schools: BehaviorSubject<school[]> = new BehaviorSubject<school[]>([]);


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

  getOneSchool(school_id: string):Observable<school>{
    return  this.http.get<school>(`http://localhost:3000/api/school/${school_id}`);
  }

  addSchools(thisSchool : school):Observable<void>{
    return this.http.post<void>('http://localhost:3000/api/school', thisSchool);
  }

  deleteOneSchool(school_id: string): Observable<void>{
    return this.http.delete<void>(`http://localhost:3000/api/school/${school_id}`);

  }

}
