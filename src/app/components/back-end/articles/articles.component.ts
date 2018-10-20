import { Article } from '../../../models/article';
import { ArticleService } from '../../../services/article.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit, OnDestroy {

  Article            :   Article[]
  filteredArticle    :   Article[]
  sub                :   Subscription
  p                  :   number = 1

  constructor(
    private article: ArticleService,
    public  auth   : AuthService
    ) { }

  ngOnInit() {
    this.auth.user.subscribe(user =>  this.sub = this.article.getUserArticles(user.uid).subscribe(p => this.Article = this.filteredArticle = p))
  }

  filter(query:string ) {
    this.filteredArticle = (query) ?
     this.Article.filter(p => p.title.toLowerCase().includes(query.toLowerCase())):
     this.Article
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}

