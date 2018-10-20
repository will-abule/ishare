import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { NguCarousel, NguCarouselStore, NguCarouselService } from '@ngu/carousel';

@Component({
  selector: 'app-team-sliders',
  templateUrl: './team-sliders.component.html',
  styleUrls: ['./team-sliders.component.css']
})
export class TeamSlidersComponent implements OnInit {

  team
  p: number = 1;
  private carouselToken: string;

  public carouselTile: NguCarousel;

  constructor(
    private userService : UserService,
    private carousel    : NguCarouselService,
    private route       : ActivatedRoute
  ) { }

  ngOnInit() {
    this.userService.getTeamMembers(this.route.snapshot.paramMap.get('id')).subscribe(t =>  this.team = t)

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
