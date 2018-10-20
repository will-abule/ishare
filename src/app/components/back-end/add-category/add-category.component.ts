import { Router } from '@angular/router';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  activeButton    = false;
  
  constructor(
    private CategoryService   :  CategoryService,
    private Router            :  Router
  ) { }

  ngOnInit() {
  }

  save(c){
    this.CategoryService.saveCategory(c)
  }

  cancel(){
    this.Router.navigate(['/admin/categorires'])
  }

}
