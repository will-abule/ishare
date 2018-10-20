import { CoursesService } from '../../../services/courses.service';
import { Observable } from 'rxjs';
import { Courses } from '../../../models/courses';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-projects-detail',
  templateUrl: './projects-detail.component.html',
  styleUrls: ['./projects-detail.component.css']
})
export class ProjectsDetailComponent implements OnInit {

  Courses : Observable<Courses[]>
  showSpinner = true;
  defaultImage = 'assets/loading.gif';
  offset = 100;
  p: number = 1;
  id: string;

  constructor(
    private CoursesService  : CoursesService,
    private route           : ActivatedRoute,
    private seo             : SeoService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.Courses = this.CoursesService.getCourses(this.id);

    this.Courses.subscribe((x) => {
      this.showSpinner = false;
    });


    this.seo.generateTags({
      title: 'Projects', 
      description: 'Projects on  Angular, TypeScript, JavaScript, Node js, Express, Firebase, Firestore & More', 
      image: 'https://teamishare.com/assets/img/iSharelogo.png',
      slug: `projects/${this.route.snapshot.paramMap.get('id')}`
    })
  }

}
