import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColocationListComponent } from './colocation-list/colocation-list.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ColocationDetailsComponent } from './colocation-details/colocation-details.component';
import { DatePipe } from '@angular/common';
import { ColocationFormComponent } from './colocation-form/colocation-form.component';
import { SpendFormComponent } from './spend-form/spend-form.component';

const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'colocations/:id', component: ColocationListComponent},
  {path: 'colocation/new/:id', component: ColocationFormComponent},
  {path: 'colocation/:id/:idColocation', component: ColocationDetailsComponent},
  {path: 'spend/:idColocation', component: SpendFormComponent},

]

@NgModule({
  declarations: [
    AppComponent,
    ColocationListComponent,
    LoginComponent,
    ColocationDetailsComponent,
    ColocationFormComponent,
    SpendFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
