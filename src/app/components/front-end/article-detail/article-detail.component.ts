import { ArticleService } from '../../../services/article.service';
import { Observable } from 'rxjs';
import { Article } from '../../../models/article';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ShareButtons } from '@ngx-share/core';
import { take } from 'rxjs/operators';
import { SeoService } from '../../../services/seo.service';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  Article       : Observable<Article>
  showSpinner   = true;
  defaultImage  = 'assets/loading.gif';
  offset        = 100;
  id            : string;
  seoData
  pageId
  url
  constructor(
    @Inject(DOCUMENT) private document: any,
    private ArticleService  : ArticleService,
    private route           : ActivatedRoute,
    public  share           : ShareButtons,
    private seo             : SeoService
  ) {
      this.pageId = this.url = this.document.location.href
   }

  ngOnInit() {
    this.seoData = this.route.params.pipe(switchMap(param => this.ArticleService.getArticle(param['id'])))
    .pipe(
      take(1)
    ).subscribe(data => {
      this.seo.generateTags({
        title: data.title, 
        description: data.discription, 
        image: data.url, 
        slug: `article/${this.route.snapshot.paramMap.get('id')}`
      })
    })


    
    this.id = this.route.snapshot.paramMap.get('id')
    this.Article = this.route.params.pipe(switchMap(param => this.ArticleService.getArticle(param['id'])))

    this.Article.subscribe((x) => {
      this.showSpinner = false;
    });
  }

}
