import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  Category: Observable<Category[]>;
  showSpinner = true;

  constructor(
    private CategoryService: CategoryService, 
    private route: ActivatedRoute,
  ) { 
    this.Category = this.CategoryService.getCategories();
   }

   ngOnInit() {
    this.Category.subscribe((x) => {
      this.showSpinner = false;
    });

  }

}