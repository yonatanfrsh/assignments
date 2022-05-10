import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssignmentType } from '../models/assignment-type';

@Injectable({
  providedIn: 'root'
})
export class AssignmentTypeService {

  constructor(private http: HttpClient) { }

  public getAssignmentsTypes(): Observable<AssignmentType[]> {
    return this.http.get<AssignmentType[]>("http://localhost:5286/api/AssignmentsTypes/GetAssignmentsTypesAsync");
  }  

  public newAssignmentsTypes(assignmentType: AssignmentType): Observable<AssignmentType> {
    return this.http.post<AssignmentType>("http://localhost:5286/api/AssignmentsTypes/NewAssignmentTypeAsync", assignmentType);
  }

  public getAssignmentTypesById(typeId : number) : Observable<AssignmentType> {
    return this.http.get<AssignmentType>(`http://localhost:5286/api/AssignmentsTypes/GetAssignmentTypeByIdAsync/${typeId}`);
  }
}
