import { ICategory } from './../model';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  constructor(public apiService: ApiService, private router: Router) {}

  ngOnInit() {}

  handleCategoryClick(category: ICategory) {
    // this.router.navigate([`category/${category.category}`]);
    this.router.navigateByUrl(`category/${category.category}`, {
      state: { category },
    });
  }
}
