import { Terms } from '../../../models/settings';
import { SettingsService } from '../../../services/settings.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.css']
})
export class TermsAndConditionsComponent implements OnInit {

  term: Observable<Terms>;
  showSpinner = true;

  constructor(
    private SettingsService: SettingsService, 
    private seo: SeoService,
  ) { 
    this.term = this.SettingsService.getTerms();
   }

   ngOnInit() {
    this.seo.generateTags({
      title: 'Terms of Use', 
      description: 'You need an account for most activities on our platform, including to purchase and enroll in a course or to submit a course for publication. When setting up and maintaining your account, you must provide and continue to provide accurate and complete information, including a valid email address.', 
      image: 'https://teamishare.com/assets/img/iSharelogo.png',
      slug: 'articles'
    })

    this.term.subscribe((x) => {
      this.showSpinner = false;
    });

  }

}