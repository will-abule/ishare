import { SharedModule } from '../../shared/shared.module';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleComponent } from './article/article.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { ContactComponent } from './contact/contact.component';
import { LessonsComponent } from './lessons/lessons.component';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';
import { CategoryComponent } from './category/category.component';
import { AboutComponent } from './about/about.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectsDetailComponent } from './projects-detail/projects-detail.component';
import { PaymentComponent } from './payment/payment.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CourseComponent } from './course/course.component';
 
import { UiModule } from '../ui/ui.module';
import { SearchComponent } from './search/search.component';
import { LessonSlidersComponent } from './lesson-sliders/lesson-sliders.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ProfileComponent } from './profile/profile.component';
import { TeamSlidersComponent } from './team-sliders/team-sliders.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UiModule,
    SharedModule
  ],
  declarations: [
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ContactComponent,
    ArticleComponent,
    ArticleDetailComponent,
    LessonsComponent,
    LessonDetailComponent,
    CategoryComponent,
    AboutComponent,
    TermsAndConditionsComponent,
    PrivacyPolicyComponent,
    ProjectsComponent,
    ProjectsDetailComponent,
    PaymentComponent,
    CategoryDetailComponent,
    CourseComponent,
    SearchComponent,
    LessonSlidersComponent,
    ForgotComponent,
    ProfileComponent,
    TeamSlidersComponent,
  ],
})
export class FrontEndModule { }

//platformBrowserDynamic().bootstrapModule(FrontEndModule);