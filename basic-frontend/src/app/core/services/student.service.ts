import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {student} from "../../types/student-interface";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }
  getStudentsFromSchool(school_id : string):Observable<student[]>{
    return  this.http.get<student[]>(`http://localhost:3000/api/school/${school_id}/student`);
  }
  getAllStudnets():Observable<student[]>{
    return  this.http.get<student[]>('http://localhost:3000/api/student');
  }

  delteOneStudent(student_id: string):Observable<void> {
    return  this.http.delete<void>(`http://localhost:3000/api/student${student_id}`)

  }

  addStudent(thisStudent: student):Observable<void>{
    return this.http.post<void>('http://localhost:3000/api/student', thisStudent);
  }
}
