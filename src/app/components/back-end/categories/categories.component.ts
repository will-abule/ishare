import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  Category           
  filteredCategory   
  sub                 :   Subscription

  constructor(private category: CategoryService) { }

  ngOnInit() {
    this.sub = this.category.getCategories().subscribe(p => this.Category = this.filteredCategory = p)
  }

  filter(query:string ) {
    this.filteredCategory = (query) ?
     this.Category.filter(p => p.title.toLowerCase().includes(query.toLowerCase())):
     this.Category
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}

