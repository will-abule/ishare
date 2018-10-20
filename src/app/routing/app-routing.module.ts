import { ProfileComponent } from './../components/front-end/profile/profile.component';
import { SharedModule } from './../shared/shared.module';
import { ForgotComponent } from './../components/front-end/forgot/forgot.component';
import { SearchComponent } from '../components/front-end/search/search.component';
import { CourseComponent } from '../components/front-end/course/course.component';

import { PaymentComponent } from '../components/front-end/payment/payment.component';
import { ProjectsComponent } from '../components/front-end/projects/projects.component';
import { CategoryComponent } from '../components/front-end/category/category.component';
import { TermsAndConditionsComponent } from '../components/front-end/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from '../components/front-end/privacy-policy/privacy-policy.component';
import { AboutComponent } from '../components/front-end/about/about.component';
import { LessonDetailComponent } from '../components/front-end/lesson-detail/lesson-detail.component';
import { LessonsComponent } from '../components/front-end/lessons/lessons.component';
import { ArticleDetailComponent } from '../components/front-end/article-detail/article-detail.component';
import { ArticleComponent } from '../components/front-end/article/article.component';
import { ContactComponent } from '../components/front-end/contact/contact.component';
import { PageNotFoundComponent } from '../components/ui/page-not-found/page-not-found.component';
import { RegisterComponent } from '../components/front-end/register/register.component';
import { LoginComponent } from '../components/front-end/login/login.component';
import { HomeComponent } from '../components/front-end/home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { ProjectsDetailComponent } from '../components/front-end/projects-detail/projects-detail.component';
import { CategoryDetailComponent } from '../components/front-end/category-detail/category-detail.component';
import { UserGuard } from '../gaurd/user.guard';
import { EmailGuard } from '../gaurd/email.guard';

// Routes setup
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact-us', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'search', component: SearchComponent },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotComponent },

  { path: 'payment', component: PaymentComponent , canActivate: [UserGuard, EmailGuard] },

  { path: 'lessons', component: LessonsComponent },
  { path: 'lesson/:id', component: LessonDetailComponent , canActivate: [UserGuard, EmailGuard] },

  { path: 'projects', component: ProjectsComponent },
  { path: 'project/:id', component: ProjectsDetailComponent },
  { path: 'project/:id/:id', component: CourseComponent , canActivate: [UserGuard, EmailGuard] },

  { path: 'category', component: CategoryComponent },
  { path: 'category/:id', component: CategoryDetailComponent , canActivate: [UserGuard, EmailGuard] },
  
  { path: 'articles', component: ArticleComponent },
  { path: 'article/:id', component: ArticleDetailComponent },

  { path: 'profile/:id', component: ProfileComponent },

  { path: 'admin', loadChildren: 'app/components/back-end/back-end.module#BackEndModule' },

  { path: '**', component: PageNotFoundComponent },
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forRoot(routes),
  ],
  declarations: [
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
