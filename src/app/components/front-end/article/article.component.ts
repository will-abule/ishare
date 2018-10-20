import { ArticleService } from '../../../services/article.service';
import { Observable } from 'rxjs';
import { Article } from '../../../models/article';
import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  value : number
  Article : Observable<Article[]>
  showSpinner = true;
  defaultImage = 'assets/loading.gif';
  offset = 100;
  p: number = 1;

  constructor(
    private ArticleService  : ArticleService,
    private seo             : SeoService
  ) { }

  ngOnInit() {
    this.seo.generateTags({
      title: 'Articles', 
      description: 'These are short article to guide on your way to building Awesome apps!', 
      image: 'https://teamishare.com/assets/img/iSharelogo.png',
      slug: 'articles'
    })

    
    this.Article = this.ArticleService.getArticles();

    this.Article.subscribe((x) => {
      this.showSpinner = false;
    });

    this.Article.subscribe(e => this.value = e.length )
  }

}
