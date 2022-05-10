import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Assignment } from 'src/app/models/assignment';
import { AssignmentModelView } from 'src/app/models/assignment-model-view';
import { AssignmentType } from 'src/app/models/assignment-type';
import { AssignmentService } from 'src/app/services/assignment.service';

@Component({
  selector: 'app-assignments-list',
  templateUrl: './assignments-list.component.html',
  styleUrls: ['./assignments-list.component.css']
})
export class AssignmentsListComponent implements OnInit {

  assignments: AssignmentModelView[] = [];
  private assignmentsSubscription: Subscription;
  public showArchive:boolean = false;
  public countAssignments:number = 0;

  constructor(private assignmentService: AssignmentService, private datePipe:DatePipe) { }

  ngOnInit(): void {
    let self = this;
    this.assignmentService.countAssignments(true).subscribe(
      {
        next(result) {
          self.countAssignments = result;
        }
      }
    );
    this.initAssignments(this.showArchive);
  }

  initAssignments(withArchive: boolean) {
    this.assignments.splice(0);
    let self = this;
    this.assignmentsSubscription = this.assignmentService.getAssignments(withArchive).subscribe({
      next(result) {
        result.forEach(element => {
          self.assignments.push(new AssignmentModelView(
            element.id, 
            element.name, 
            element.assignmentType, 
            element.repeated, 
            element.startDate, 
            element.endDate, 
            element.ended,
            element.description, 
            element.archive));
        });
        console.log(self.assignments);
      },
      error(err) { console.log(err) },
      complete() { console.log('done') }
    });
  }

  showArchiveChanged() {
    this.initAssignments(this.showArchive);
  }

  saveClicked(assignment : AssignmentModelView) {
    this.assignmentService.assignmentSetEnded(assignment).subscribe({
      next(result) {
        console.log(result);
      },
      error(err) {

      },
      complete() {
        
      }
    });
  }

  deleteClicked(assignment : AssignmentModelView) {
    let self = this;
    this.assignmentService.deleteAssignmentById(Number(assignment.id)).subscribe({
      next(result) {
        let deleteIndex = self.assignments.findIndex(a => a.id == assignment.id);
        self.assignments.splice(deleteIndex, 1);
      },
      error(err) {

      },
      complete() {
        
      }
    });
  }

  archiveClicked(assignment : AssignmentModelView) {
    let self = this;
    this.assignmentService.archiveAssignment(assignment).subscribe({
      next(result) {
        assignment.archive = true;
        if (self.showArchive == false) {
          let deleteIndex = self.assignments.findIndex(a => a.id == assignment.id);
          self.assignments.splice(deleteIndex, 1);
        }
      },
      error(err) {

      },
      complete() {
        
      }
    });
  }

}
