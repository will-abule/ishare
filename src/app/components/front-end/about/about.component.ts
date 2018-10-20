import { SeoService } from './../../../services/seo.service';
import { About } from '../../../models/settings';
import { SettingsService } from '../../../services/settings.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  about: Observable<About>;
  showSpinner = true;

  constructor(
    private SettingsService: SettingsService, 
    private seo: SeoService,
  ) { 
    this.about = this.SettingsService.getAbout();
   }

   ngOnInit() {
    this.seo.generateTags({
      title: 'About | OVERVIEW', 
      description: 'iShare is a technological company aimed at building the next generation of software developers. We use articles, videos and other needed tools to meet the exact need of developers whether they are newbies or professionals in their field of endeavors.', 
      image: 'https://teamishare.com/assets/img/iSharelogo.png',
      slug: 'articles'
    })

    this.about.subscribe((x) => {
      this.showSpinner = false;
    });

  }

}