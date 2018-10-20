import { take } from 'rxjs/operators';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  category      : Category
  id            : string
  activeButton  = false;

  constructor(
    private CategoryService: CategoryService,
    private route : ActivatedRoute,
    private router: Router
  ) {
    this.id = this.route.snapshot.paramMap.get('id')
   }

   ngOnInit() {
    // this.category = this.CategoryService.getCategory(this.id).take(1).subscribe(p => this.category = p)
    this.CategoryService.getCategory(this.id).pipe(take(1)).subscribe(p => this.category = p)
    
  }

  delete(p){
    this.CategoryService.deleteCategory(p,this.id)
  }

  cancel(){
    this.router.navigate(['/admin/categories'])
  }

  save(p){
    this.CategoryService.updateCategory(p,this.id)
  }


}