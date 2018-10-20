import { ProjectService } from '../../../services/project.service';
import { Observable } from 'rxjs';
import { Project } from '../../../models/project';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  Project : Observable<Project[]>
  showSpinner = true;
  defaultImage = 'assets/loading.gif';
  offset = 100;
  p: number = 1;

  constructor(
    private LessonService   : ProjectService,
    private route           : ActivatedRoute,
    private seo             : SeoService
  ) { }

  ngOnInit() {
    this.Project = this.LessonService.getProjects();

    this.Project.subscribe((x) => {
      this.showSpinner = false;
    });

    this.seo.generateTags({
      title: 'Projects', 
      description: 'Projects on  Angular, TypeScript, JavaScript, Node js, Express, Firebase, Firestore & More', 
      image: 'https://teamishare.com/assets/img/iSharelogo.png',
      slug: 'projects'
    })
  }

}
