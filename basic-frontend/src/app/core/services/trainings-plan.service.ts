import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {trainingsplan} from "../../types/trainingsplan-interface";

@Injectable({
  providedIn: 'root'
})
export class TrainingsPlanService {


  constructor(private  http:HttpClient) {

  }
  getAllTrainingsPlanFromStudent(student_id : number , school_id: number) :Observable<trainingsplan[]>{
    return this.http.get<trainingsplan[]>(`http://localhost:3000/api/school/${school_id}/student/${student_id}/trainingsplan`)
  }
}
