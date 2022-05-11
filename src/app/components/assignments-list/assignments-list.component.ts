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
  public showArchive: boolean = false;
  public countAssignments: number = 0;
  public selectedAssignments: any[] = [];


  constructor(private assignmentService: AssignmentService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.initCountAssignments();
    this.initAssignments(this.showArchive);
  }


  initCountAssignments() {
    let self = this;
    this.assignmentService.countAssignments(true).subscribe(
      {
        next(result) {
          self.countAssignments = result;
        }
      }
    );
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
    this.selectedAssignments = [];
  }

  saveClicked(assignment: AssignmentModelView) {
    var assignmentsMV: AssignmentModelView[] = [assignment];
    this.setMultipleAssignmentEnded(assignmentsMV);
  }

  saveSelectedClicked() {
    console.log(this.selectedAssignments);
    var assignmentsMV: AssignmentModelView[] = this.selectedAssignments.filter(p => p.id != undefined && p.id != null); // bug select one
    this.setMultipleAssignmentEnded(assignmentsMV);
  }

  setMultipleAssignmentEnded(assignmentsMV: AssignmentModelView[]) {
    let self = this;
    this.assignmentService.setMultipleAssignmentEnded(assignmentsMV).subscribe({
      next(result) {
        console.log(result);
        // result.forEach(element => {
        //   console.log(result);
        // });
      },
      error(err) {

      },
      complete() {

      }
    });
  }

  deleteClicked(assignment: AssignmentModelView) {
    let self = this;
    this.assignmentService.deleteAssignmentById(Number(assignment.id)).subscribe({
      next(result) {
        let deleteIndex = self.assignments.findIndex(a => a.id == assignment.id);
        self.assignments.splice(deleteIndex, 1);
        self.initCountAssignments();
      },
      error(err) {

      },
      complete() {

      }
    });
  }

  deleteSelectedClicked() {
    var assignmentsMV: AssignmentModelView[] = this.selectedAssignments.filter(p => p.id != undefined && p.id != null); // bug select one
    this.deleteMultiple(assignmentsMV);
  }

  deleteMultiple(assignmentsMV: AssignmentModelView[]) {
    let self = this;
    this.assignmentService.deleteMultipleAssignment(assignmentsMV).subscribe({
      next(result) {
        result.forEach(element => {
          let deleteIndex = self.assignments.findIndex(a => a.id == element.id);
          self.assignments.splice(deleteIndex, 1);
        });
      },
      error(err) {

      },
      complete() {

      }
    });
  }

  archiveClicked(assignment: AssignmentModelView) {
    var assignmentsMV: AssignmentModelView[] = [assignment];
    this.archiveMultipleAssignment(assignmentsMV);
  }

  archiveSelectedClicked() {
    var assignmentsMV: AssignmentModelView[] = this.selectedAssignments.filter(p => p.id != undefined && p.id != null); // bug select one
    this.archiveMultipleAssignment(assignmentsMV);
  }

  archiveMultipleAssignment(assignmentsMV: AssignmentModelView[]) {
    let self = this;
    this.assignmentService.archiveMultipleAssignment(assignmentsMV).subscribe({
      next(result) {
        result.forEach(element => {
          let archiveIndex = self.assignments.findIndex(a => a.id == element.id);
          self.assignments[archiveIndex].archive = true;
          if (self.showArchive == false) {
            self.assignments.splice(archiveIndex, 1);
          }
        });
      },
      error(err) {

      },
      complete() {

      }
    });
  }

}
