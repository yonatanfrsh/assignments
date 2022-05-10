import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Assignment } from 'src/app/models/assignment';
import { AssignmentType } from 'src/app/models/assignment-type';
import { TimezonelessDatePipe } from 'src/app/pipes/timezoneless-date.pipe';
import { AssignmentTypeService } from 'src/app/services/assignment-type.service';
import { AssignmentService } from 'src/app/services/assignment.service';

@Component({
  selector: 'app-new-assignment',
  templateUrl: './new-assignment.component.html',
  styleUrls: ['./new-assignment.component.css']
})
export class NewAssignmentComponent implements OnInit {

  public assignmentTypes: AssignmentType[] = [];
  private assignmentTypeSubscription : Subscription;

  newAssignmentForm: FormGroup;

  constructor(private timezonelessDate: TimezonelessDatePipe, private router: Router, private assignmentService: AssignmentService, private assignmentTypeService: AssignmentTypeService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {   
    this.initAssignmentTypes();
    this.newAssignmentForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      typeId: new FormControl('', [Validators.required]),
      repeated: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl(''),
      description: new FormControl('', [Validators.maxLength(400)])
    });
    this.newAssignmentForm.setValue({
      name: "a",
      typeId: 1,
      repeated: false,
      startDate: new Date(),
      endDate: null,
      description: null
    });
  }

  private initAssignmentTypes() {
    
    let self = this;
    this.assignmentTypeSubscription = this.assignmentTypeService.getAssignmentsTypes().subscribe({
      next(x) { 
        x.forEach(element => {
          self.assignmentTypes.push(new AssignmentType(element.id, element.name));
        });
        self.typeId?.setValue(1);
      },
      error(err) { console.log(err) },
      complete() { console.log('done') }
    });
  }

  get name() { return this.newAssignmentForm.get('name'); }
  get typeId() { return this.newAssignmentForm.get('typeId'); }
  get repeated() { return this.newAssignmentForm.get('repeated'); }
  get startDate() { return this.newAssignmentForm.get('startDate'); }
  get endDate() { return this.newAssignmentForm.get('endDate'); }
  get description() { return this.newAssignmentForm.get('description'); }

  newAssignmentSubmit(): void {
    console.log(this.newAssignmentForm.value);
    if (this.newAssignmentForm.valid) {
      this.addAssignment();
      //console.log(this.newAssignmentForm.value);
    }
    else {
      alert("יש למלא את הטופס כנדרש");
    }
  }

  public async addAssignment() {
    let assignmentId = 0;
    let assignmentEnded = true;
    let assignmentArchive = false;
    const assignment = new Assignment(
      assignmentId,
      this.name?.value,
      Number(this.typeId?.value),
      this.repeated?.value,
      this.timezonelessDate.transform(this.startDate?.value),
      this.timezonelessDate.transform(this.endDate?.value),
      assignmentEnded,
      this.description?.value,
      assignmentArchive
    );


    try {    
      let self = this;
      await this.assignmentService.addAssignment(assignment).subscribe({
        next(result) {
          self.router.navigateByUrl("/assignments/list");
        }        
      });
    }
    catch (err) {
      alert(err);
    }
  }

  startDateSelected() {
    if (this.endDate?.value != null && this.endDate.value < this.startDate?.value){
      this.endDate?.setValue(this.startDate?.value);
    }
  }
}
