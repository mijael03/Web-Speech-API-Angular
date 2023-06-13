import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CommentComponent } from './comment/comment.component';
const routeConfig: Routes = [
    {
      path: '',
      component: HomeComponent,
      title: 'Home page'
    },
    {
      path: 'comments',
      component: CommentComponent,
      title: 'Home comments'
    }
  ];
  
  export default routeConfig;