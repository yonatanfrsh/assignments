import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentsListComponent } from './components/assignments-list/assignments-list.component';
import { HomeComponent } from './components/home/home.component';
import { NewAssignmentComponent } from './components/new-assignment/new-assignment.component';
import { NewTypeComponent } from './components/new-type/new-type.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TypesListComponent } from './components/types-list/types-list.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },  
  { path: "assignments/new", component: NewAssignmentComponent },
  { path: "assignments/list", component: AssignmentsListComponent },
  { path: "types/new", component: NewTypeComponent },
  { path: "types/list", component: TypesListComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
