import { Project } from '../../../models/project';
import { ProjectService } from '../../../services/project.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectComponent implements OnInit, OnDestroy {

  Project            :   Project[]
  filteredProject    :   Project[]
  sub                :   Subscription
  p                  :   number = 1

  constructor(private project: ProjectService) { }

  ngOnInit() {
    this.sub = this.project.getProjects().subscribe(p => this.Project = this.filteredProject = p)
  }

  filter(query:string ) {
    this.filteredProject = (query) ?
     this.Project.filter(p => p.title.toLowerCase().includes(query.toLowerCase())):
     this.Project
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}

