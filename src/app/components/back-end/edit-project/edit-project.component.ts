import { Project } from '../../../models/project';
import { ProjectService } from '../../../services/project.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  Project       : Project
  id            : string
  activeButton  = false;
  public markdownContent: string = ``;
  
  constructor(
    private ProjectService    : ProjectService,
    private route             : ActivatedRoute,
    private router            : Router
  ) {
    this.id = this.route.snapshot.paramMap.get('id')
   }

   ngOnInit() {
    // this.category = this.CategoryService.getCategory(this.id).take(1).subscribe(p => this.category = p)
    this.ProjectService.getProject(this.id).pipe(take(1)).subscribe(p => this.Project = p)
    
  }

  delete(p){
    this.ProjectService.deleteProject(p,this.id)
  }

  cancel(){
    this.router.navigate(['/admin/lessons'])
  }

  save(p){
    this.ProjectService.updateProject(p,this.id)
  }


}