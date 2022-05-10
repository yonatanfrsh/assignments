import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AssignmentType } from 'src/app/models/assignment-type';
import { AssignmentTypeService } from 'src/app/services/assignment-type.service';

@Component({
  selector: 'app-new-type',
  templateUrl: './new-type.component.html',
  styleUrls: ['./new-type.component.css']
})
export class NewTypeComponent implements OnInit {

  newTypeForm: FormGroup;

  constructor(private router: Router, private assignmentTypeService: AssignmentTypeService) { }

  ngOnInit(): void {    
    this.newTypeForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)])
    });
  }
  
  get name() { return this.newTypeForm.get('name'); }

  
  newTypeSubmit(): void {
    if (this.newTypeForm.valid) {
      this.addType();
    }
    else {
      alert("יש למלא את הטופס כנדרש");
    }
  }
  
  public async addType() {
    const assignmentType = new AssignmentType(
      0,
      this.name?.value
    );

    try {
      let self = this;
      await this.assignmentTypeService.newAssignmentsTypes(assignmentType).subscribe({
        next(x) {
          console.log(x);          
          self.router.navigateByUrl("/types/list");
        },
        error(err) {},
        complete() {}
      });
    }
    catch (err) {
      alert(err);
    }
  }

}
