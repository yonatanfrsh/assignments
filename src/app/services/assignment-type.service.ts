import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssignmentType } from '../models/assignment-type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssignmentTypeService {

  constructor(private http: HttpClient) { }

  public getAssignmentsTypes(): Observable<AssignmentType[]> {
    return this.http.get<AssignmentType[]>(environment.baseUrlApi + "api/AssignmentsTypes/GetAssignmentsTypesAsync");
  }  

  public newAssignmentsTypes(assignmentType: AssignmentType): Observable<AssignmentType> {
    return this.http.post<AssignmentType>(environment.baseUrlApi + "api/AssignmentsTypes/NewAssignmentTypeAsync", assignmentType);
  }

  public getAssignmentTypesById(typeId : number) : Observable<AssignmentType> {
    return this.http.get<AssignmentType>(environment.baseUrlApi + `api/AssignmentsTypes/GetAssignmentTypeByIdAsync/${typeId}`);
  }
}
