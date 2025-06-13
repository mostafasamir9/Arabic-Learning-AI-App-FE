import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostListComponent } from './post-list/post-list.component';
import { PostFormComponent } from './post-form/post-form.component';
import { PostDetailComponent } from './post-detail/post-detail.component'; // Import PostDetailComponent

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create-post', component: PostFormComponent },
  { path: 'posts/:id', component: PostDetailComponent } // Add route for post details
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
