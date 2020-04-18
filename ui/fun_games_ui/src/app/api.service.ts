import { IQuestion, ICategory } from './model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { groupBy } from 'lodash';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  categories: Subject<Array<ICategory>>;
  categories$: Observable<Array<ICategory>>;
  constructor(private http_client: HttpClient) {
    this.load_questions_from_backend();
    this.categories = new Subject();
    this.categories$ = this.categories.asObservable();
  }

  tranform_data_from_backend_to_frontend(data) {
    const ids = Object.keys(data);
    const questions: Array<IQuestion> = ids.map((id) => ({
      id,
      word_urls: data[id]['word_urls'],
      answer_url: data[id]['answer_url'],
      actual_word: data[id]['actual_word'],
      category: data[id]['category'],
    }));

    console.log(questions);

    const grouped_dict = groupBy(
      questions,
      (question: IQuestion) => question.category
    );
    console.log(grouped_dict);

    const grouped_list = Object.keys(grouped_dict).map((category_name) => ({
      category: category_name,
      questions: grouped_dict[category_name],
    }));

    console.log(grouped_list);
    this.categories.next(grouped_list);
  }

  load_questions_from_backend() {
    console.log('in load');
    const API_URL = environment.db_url;
    this.http_client.get(API_URL).subscribe((data) => {
      console.log(data);
      this.tranform_data_from_backend_to_frontend(data);
    });
  }
}
