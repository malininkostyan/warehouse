import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { ContactsComponent } from './contacts/contacts.component';
//import { MenuComponent } from './menu/menu.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { AboutUsComponent } from './about-us/about-us.component';
import {HttpClientModule} from '@angular/common/http'
import { AdminComponent } from './admin/admin.component';
import { AuthComponent } from './auth/auth.component';
import { RegComponent } from './reg/reg.component';
import { FormsModule } from '@angular/forms'
import { AuthCookie } from './auth-cookies-handler';
import { ActivateGuard } from './activate-guard';
import { FilesComponent } from './files/files.component';
import { CategoryComponent } from './category/category.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    AboutUsComponent,
  //  MenuComponent,
    DeliveryComponent,
    ContactsComponent,
    AdminComponent,
    AuthComponent,
    RegComponent,
    FilesComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AuthCookie,
    ActivateGuard
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }