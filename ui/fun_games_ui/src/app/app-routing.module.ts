import { QuestionPage } from './question/question.page';
import { QuestionListPage } from './question-list/question-list.page';
import { CategoryPage } from './category/category.page';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CategoryPage,
  },
  {
    path: 'category/:id',
    component: QuestionListPage,
  },
  {
    path: 'question/:id',
    component: QuestionPage,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
