import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UebungenService {

  constructor(private  http:HttpClient) { }

  deleteOneUebungFromPlan(trainingsP_id: string, uebungs_id: string): Observable<any>{
    return this.http.delete(`http://localhost:3000/api/trainingsplan/${trainingsP_id}/uebungen${uebungs_id}`);
  }
}
