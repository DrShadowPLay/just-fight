import { Injectable } from '@angular/core';
import {school} from "../../types/school-interface";
import {teacher} from "../../types/teacher-interface";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http:HttpClient) { }
  geteachers():Observable<teacher[]>{
    /*return new Promise<teacher[]>((resolve, reject)=>{

      const url = 'http://localhost:3000/api/teacher';

      fetch(url).then(teachers => teachers.json()).then(json=>{
        resolve(json);
      }).catch(err =>{
        reject(err.message);
      });
    });
    */

    return this.http.get<teacher[]>('http://localhost:3000/api/teacher');

  }

  addTeacher(thisTeacher : teacher):Observable<void> {
    /*
        return new Promise<void>((resolve, reject) =>{
          const url = `http://localhost:3000/api/school/${thisTeacher.school_id}/teacher`;
          fetch(url, {
            method: 'POST',
            body: JSON.stringify(thisTeacher),
            headers: {'Content-Type': 'application/json'}
          }).then(teacher=>{
            console.log(JSON.stringify(thisTeacher));
            resolve();
          }).catch(err=>{
            reject(err)
          });
        });
      }

     */
    return this.http.post<void>(`http://localhost:3000/api/school/${thisTeacher.school_id}/teacher`, thisTeacher)
  }

  deleteOneTeacher(teacher_id: string):Observable<void>{
    console.log(teacher_id)
    return this.http.delete<void>(`http://localhost:3000/api/teacher/${teacher_id}`);
  }

}
