import { UiModule } from '../components/ui/ui.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';

// third party
import { MarkdownModule } from 'ngx-markdown';
import { DisqusModule } from 'angular2-disqus';
import { ShareButtonModule } from '@ngx-share/button';
import { ShareModule } from '@ngx-share/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { CustomFormsModule } from 'ng2-validation';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http'; 
import { Angular4PaystackModule } from 'angular4-paystack';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import "froala-editor/js/froala_editor.pkgd.min.js";
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';
import { NguCarouselModule } from '@ngu/carousel';
import { YoutubePlayerModule } from 'ng2-youtube-player';
import { ImageCropperModule } from 'ngx-image-cropper';
import * as $ from 'jquery';
window["$"] = $;
window["jQuery"] = $;


@NgModule({
  imports: [
    CommonModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule,
    HttpClientJsonpModule,
    CustomFormsModule,
    Angular4PaystackModule,
    RouterModule,
    NguCarouselModule,
    LazyLoadImagesModule,
    YoutubePlayerModule,
    DisqusModule,
    ImageCropperModule,
    MarkdownModule.forRoot(),
    ShareModule.forRoot(),
    ShareButtonModule.forRoot(),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
  ],
  exports: [
    CommonModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule,
    HttpClientJsonpModule,
    CustomFormsModule,
    Angular4PaystackModule,
    ShareModule,
    ShareButtonModule,
    FroalaEditorModule,
    FroalaViewModule,
    RouterModule,
    LazyLoadImagesModule,
    MarkdownModule,
    NguCarouselModule,
    YoutubePlayerModule,
    DisqusModule,
    ImageCropperModule
  ],
  declarations: []
})
export class SharedModule { }
