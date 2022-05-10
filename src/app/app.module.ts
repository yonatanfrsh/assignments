import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarModule } from 'primeng/menubar';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {InputMaskModule} from 'primeng/inputmask';
import {CalendarModule} from 'primeng/calendar';
import {InputSwitchModule} from 'primeng/inputswitch';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {TableModule} from 'primeng/table';
import {CheckboxModule} from 'primeng/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { MainComponent } from './components/main/main.component';
import { HeadComponent } from './components/head/head.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NewAssignmentComponent } from './components/new-assignment/new-assignment.component';
import { AssignmentsListComponent } from './components/assignments-list/assignments-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }    from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';
import { NewTypeComponent } from './components/new-type/new-type.component';
import { TypesListComponent } from './components/types-list/types-list.component';
import { TimezonelessDatePipe } from './pipes/timezoneless-date.pipe';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    LayoutComponent,
    MainComponent,
    HeadComponent,
    HomeComponent,
    PageNotFoundComponent,
    NavbarComponent,
    NewAssignmentComponent,
    AssignmentsListComponent,
    NewTypeComponent,
    TypesListComponent,
    TimezonelessDatePipe
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    InputMaskModule,
    InputSwitchModule,
    CalendarModule,
    MessageModule,
    MessagesModule,
    TableModule,
    CheckboxModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [TimezonelessDatePipe, DatePipe],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
