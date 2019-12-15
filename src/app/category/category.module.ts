import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category.component';
import {FormsModule} from "@angular/forms";

export const ROUTES: Routes = [
  { path: '', component: CategoryComponent}
];


@NgModule({
  declarations: [
    CategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES), 
    FormsModule
  ]
})
export class CategoryModule { }