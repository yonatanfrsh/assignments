import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AssignmentType } from 'src/app/models/assignment-type';
import { AssignmentTypeService } from 'src/app/services/assignment-type.service';

@Component({
  selector: 'app-types-list',
  templateUrl: './types-list.component.html',
  styleUrls: ['./types-list.component.css']
})
export class TypesListComponent implements OnInit, OnDestroy {

  public data : AssignmentType[] = [];
  private assignmentTypeSubscription : Subscription;

  constructor(private assignmentTypeService: AssignmentTypeService) { }

  ngOnInit(): void {
    let self = this;
    this.assignmentTypeSubscription = this.assignmentTypeService.getAssignmentsTypes().subscribe({
      next(x) { 
        x.forEach(element => {
          console.log(element);
          self.data.push(new AssignmentType(element.id, element.name));
        }); 
      },
      error(err) { console.log(err) },
      complete() { console.log('done') }
    });
  }

  ngOnDestroy(): void {
    this.assignmentTypeSubscription.unsubscribe();
  }
}
