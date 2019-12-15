import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { RegComponent } from './reg/reg.component';
import { AuthComponent } from './auth/auth.component';
import {AdminComponent} from './admin/admin.component';
import { ActivateGuard } from './activate-guard';
import { FilesComponent} from './files/files.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  {path:'admin', component: AdminComponent, canActivate: [ActivateGuard]},
  {path:'main', component:MainComponent},
  {path:'contacts', component:ContactsComponent},
  {path:'category', component:CategoryComponent},
  {path:'about_us', component:AboutUsComponent},
  {path:'delivery', component:DeliveryComponent},
  {path:'reg', component:RegComponent},
  {path:'auth', component:AuthComponent},
  {path:'files', component:FilesComponent},
  {path:'**', redirectTo:'/main',  pathMatch:'full'},
  {path:'', component:MainComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
