import { Injectable } from '@angular/core';
import { Assignment } from '../models/assignment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AssignmentModelView } from '../models/assignment-model-view';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private http: HttpClient) { }

  public countAssignments(includeArchive : boolean): Observable<number> {
    return this.http.get<number>(`http://localhost:5286/api/Assignments/CountAssignmentsAsync/${includeArchive}`);
  }

  public addAssignment(assignment: Assignment): Observable<Assignment> {
    return this.http.post<AssignmentModelView>("http://localhost:5286/api/Assignments/NewAssignmentAsync", assignment);
  }

  public getAssignments(withArchive: boolean): Observable<AssignmentModelView[]> {
    return this.http.get<AssignmentModelView[]>(`http://localhost:5286/api/Assignments/GetAssignmentsAsync/${withArchive}`);
  }  

  public assignmentSetEnded(assignment: AssignmentModelView) : Observable<Assignment> {
    return this.http.post<AssignmentModelView>("http://localhost:5286/api/Assignments/AssignmentSetEndedAsync", assignment);
  }

  public deleteAssignmentById(id : number) : Observable<Assignment> {
    return this.http.delete<AssignmentModelView>(`http://localhost:5286/api/Assignments/DeleteAssignmentAsync/${id}`);
  }

  public archiveAssignment(assignment: AssignmentModelView) : Observable<Assignment> {
    return this.http.post<AssignmentModelView>(`http://localhost:5286/api/Assignments/ArchiveAssignmentAsync/`, assignment);
  }
}
