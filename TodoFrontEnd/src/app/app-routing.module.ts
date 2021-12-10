import { DialogComponent } from './components/dialog/dialog.component';
import { AuthGuard } from './guards/authguard.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotComponent } from './components/forgot/forgot.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetComponent } from './components/reset/reset.component';
import { TodoComponent } from './components/todo/todo.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:"full"

  },
  {
    path:"register",
    component:RegisterComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"todo",
    component:TodoComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"forgot",
    component:ForgotComponent
  },
  {
    path:"reset/:token",
    component:ResetComponent
  },
  {
    path:"confirm/:email/:token",
    component:LoginComponent
  },{
    path:"dialog",
    component:DialogComponent

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
