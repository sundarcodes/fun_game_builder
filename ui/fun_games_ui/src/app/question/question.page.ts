import { ActivatedRoute } from '@angular/router';
import { IQuestion } from './../model';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {
  question: IQuestion;
  showAnswer: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(map(() => window.history.state))
      .subscribe((state) => {
        this.question = state.question;
        console.log(this.question);
      });
  }

  onShowAnswerClick() {
    this.showAnswer = true;
  }
}
