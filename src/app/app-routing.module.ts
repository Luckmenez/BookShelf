import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { BookFormComponent } from "./books/book-form/book-form.component";
import { BooklistComponent } from "./books/booklist/booklist.component";

const routes: Routes = [
  {path: '', component: BooklistComponent},
  {path: 'create', component:BookFormComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {

}
