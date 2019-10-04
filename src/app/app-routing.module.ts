import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { DiscountComponent } from './discount/discount.component';
import { DeliveryComponent } from './delivery/delivery.component';


const routes: Routes = [
  {path:'main', component:MainComponent},
  {path:'contacts', component:ContactsComponent},
  {path:'about_us', component:AboutUsComponent},
  {path:'discount', component:DiscountComponent},
  {path:'delivery', component:DeliveryComponent},
  {path:'', component:MainComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
