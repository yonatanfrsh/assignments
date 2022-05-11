import { Injectable } from '@angular/core';
import { Assignment } from '../models/assignment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AssignmentModelView } from '../models/assignment-model-view';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private http: HttpClient) { }

  public countAssignments(includeArchive : boolean): Observable<number> {
    return this.http.get<number>(environment.baseUrlApi + `api/Assignments/CountAssignmentsAsync/${includeArchive}`);
  }

  public addAssignment(assignment: Assignment): Observable<Assignment> {
    return this.http.post<AssignmentModelView>(environment.baseUrlApi + "api/Assignments/NewAssignmentAsync", assignment);
  }

  public getAssignments(withArchive: boolean): Observable<AssignmentModelView[]> {
    return this.http.get<AssignmentModelView[]>(environment.baseUrlApi + `api/Assignments/GetAssignmentsAsync/${withArchive}`);
  }  

  public assignmentSetEnded(assignment: AssignmentModelView) : Observable<Assignment> {
    return this.http.post<AssignmentModelView>(environment.baseUrlApi + "api/Assignments/AssignmentSetEndedAsync", assignment);
  }

  public deleteAssignmentById(id : number) : Observable<Assignment> {
    return this.http.delete<AssignmentModelView>(environment.baseUrlApi + `api/Assignments/DeleteAssignmentAsync/${id}`);
  }

  public archiveAssignment(assignment: AssignmentModelView) : Observable<Assignment> {
    return this.http.post<AssignmentModelView>(environment.baseUrlApi + `api/Assignments/ArchiveAssignmentAsync/`, assignment);
  }
}
