import { Router } from '@angular/router';
import { LessonService } from './../../../services/lesson.service';
import { Component, OnInit } from '@angular/core';
import { NguCarousel, NguCarouselStore, NguCarouselService } from '@ngu/carousel';

@Component({
  selector: 'app-lesson-sliders',
  templateUrl: './lesson-sliders.component.html',
  styleUrls: ['./lesson-sliders.component.css']
})
export class LessonSlidersComponent implements OnInit {

  lesson
  p: number = 1;
  private carouselToken: string;

  public carouselTile: NguCarousel;

  constructor(
    private LessonService : LessonService,
    private Router        : Router,
    private carousel: NguCarouselService
  ) { }

  ngOnInit() {
    this.LessonService.getLessons().subscribe(l =>  this.lesson = l)

    this.carouselTile = {
      grid: {xs: 1, sm: 2, md: 3, lg: 4, all: 0},
      slide: 2,
      speed: 400,
      animation: 'lazy',
      point: {
        visible: false
      },
      load: 2,
      touch: true,
      easing: 'ease'
    }
  }

  initDataFn(key: NguCarouselStore) {
    this.carouselToken = key.token;
  }

  resetFn() {
    this.carousel.reset(this.carouselToken);
  }

  moveToSlide() {
    this.carousel.moveToSlide(this.carouselToken, 2, false);
  }


}
