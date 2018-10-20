import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NoContentComponent } from './no-content/no-content.component';
 

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    NavBarComponent,
    FooterComponent,
    PageNotFoundComponent,
    LoadingSpinnerComponent,
    NoContentComponent,
  ],
  exports: [
    NavBarComponent,
    FooterComponent,
    PageNotFoundComponent,
    LoadingSpinnerComponent,
    NoContentComponent,
  ]
})
export class UiModule { }
