import { SharedModule } from '../../shared/shared.module';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { AddCourseComponent } from './add-course/add-course.component';
import { CoursesComponent } from './courses/courses.component';
import { ProjectComponent } from './projects/projects.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { ArticlesComponent } from './articles/articles.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { CategoriesComponent } from './categories/categories.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { LessonComponent } from './lessons/lessons.component';
import { AddLessonComponent } from './add-lesson/add-lesson.component';
import { EditLessonComponent } from './edit-lesson/edit-lesson.component';
import { AdminAboutComponent } from './about/about.component';
import { AdminTermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { AdminPrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

import { AdminGuard } from '../../gaurd/admin.guard';
import { UserGuard } from '../../gaurd/user.guard';
import { SuperAdminGuard } from '../../gaurd/super-admin.guard';
import { EmailGuard } from '../../gaurd/email.guard';
import { GeustGuard } from '../../gaurd/geust.guard';

import { UsersComponent } from './users/users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { MailComponent } from './mail/mail.component';

import { Routes, RouterModule } from '@angular/router';
import { ProfileComponentAdmin } from './profile/profile.component';

const routes: Routes = [
  
  { path: 'privacy-policy', component: AdminPrivacyPolicyComponent },
  { path: 'mail', component: MailComponent },

  { path: 'profile', component: ProfileComponentAdmin , canActivate: [UserGuard, EmailGuard] },

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  { path: 'articles', component: ArticlesComponent , canActivate: [UserGuard, EmailGuard, GeustGuard, AdminGuard, SuperAdminGuard] },
  { path: 'add-article', component: AddArticleComponent , canActivate: [UserGuard, EmailGuard, GeustGuard, AdminGuard, SuperAdminGuard] },
  { path: 'edit-article/:id', component: EditArticleComponent , canActivate: [UserGuard, EmailGuard, GeustGuard, AdminGuard, SuperAdminGuard] },

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  { path: 'categories', component: CategoriesComponent , canActivate: [UserGuard, EmailGuard, AdminGuard, SuperAdminGuard] },
  { path: 'add-category', component: AddCategoryComponent , canActivate: [UserGuard, EmailGuard, AdminGuard, SuperAdminGuard] },
  { path: 'edit-category/:id', component: EditCategoryComponent , canActivate: [UserGuard, EmailGuard, AdminGuard, SuperAdminGuard] },

  { path: 'lessons', component: LessonComponent , canActivate: [UserGuard, EmailGuard, AdminGuard, SuperAdminGuard] },
  { path: 'add-lesson', component: AddLessonComponent , canActivate: [UserGuard, EmailGuard, AdminGuard, SuperAdminGuard] },
  { path: 'edit-lesson/:id', component: EditLessonComponent , canActivate: [UserGuard, EmailGuard, AdminGuard, SuperAdminGuard] },

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  { path: 'projects', component: ProjectComponent , canActivate: [UserGuard, EmailGuard, SuperAdminGuard] },
  { path: 'add-project', component: AddProjectComponent , canActivate: [UserGuard, EmailGuard, SuperAdminGuard] },
  { path: 'edit-project/:id', component: EditProjectComponent , canActivate: [UserGuard, EmailGuard, SuperAdminGuard] },

  { path: 'courses', component: CoursesComponent , canActivate: [UserGuard, EmailGuard, SuperAdminGuard] },
  { path: 'add-course', component: AddCourseComponent , canActivate: [UserGuard, EmailGuard, SuperAdminGuard] },
  { path: 'edit-course/:id', component: EditCourseComponent , canActivate: [UserGuard, EmailGuard, SuperAdminGuard] },

  { path: 'about', component: AdminAboutComponent , canActivate: [UserGuard,  EmailGuard, SuperAdminGuard]},
  { path: 'terms-and-conditions', component: AdminTermsAndConditionsComponent , canActivate: [UserGuard, EmailGuard, SuperAdminGuard] },

  { path: 'users', component: UsersComponent , canActivate: [UserGuard, EmailGuard, SuperAdminGuard] },
  { path: 'edit-user/:id', component: EditUserComponent , canActivate: [UserGuard, EmailGuard, SuperAdminGuard] },

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    AddCourseComponent,
    CoursesComponent,
    EditCourseComponent,
    ProjectComponent,
    AddProjectComponent,
    EditProjectComponent,
    ArticlesComponent,
    AddArticleComponent,
    EditArticleComponent,
    CategoriesComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    LessonComponent,
    AddLessonComponent,
    EditLessonComponent,
    AdminAboutComponent,
    AdminTermsAndConditionsComponent,
    AdminPrivacyPolicyComponent,
    UsersComponent,
    EditUserComponent,
    MailComponent,
    ProfileComponentAdmin
  ],
  exports: [
    RouterModule,
  ]
})
export class BackEndModule { }
