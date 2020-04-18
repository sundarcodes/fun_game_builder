import { ICategory, IQuestion } from './../model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.page.html',
  styleUrls: ['./question-list.page.scss'],
})
export class QuestionListPage implements OnInit {
  category: ICategory;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(map(() => window.history.state))
      .subscribe((state) => {
        this.category = state.category;
      });
  }

  handleQuestionClick(question: IQuestion, index: number) {
    this.router.navigateByUrl(`question/${index}`, {
      state: { question },
    });
  }
}
