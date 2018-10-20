import { SeoService } from './../../../services/seo.service';
import { Privacy } from '../../../models/settings';
import { SettingsService } from '../../../services/settings.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {

  privacy: Observable<Privacy>;
  showSpinner = true;

  constructor(
    private SettingsService: SettingsService, 
    private seo: SeoService,
  ) { 
    this.privacy = this.SettingsService.getPrivacy();
   }

   ngOnInit() {
    this.seo.generateTags({
      title: 'Privacy Policy', 
      description: 'As we, in our sole discretion, otherwise determine to be necessary to ensure the safety or integrity of our users, employees, third parties, the public, or our Services.', 
      image: 'https://teamishare.com/assets/img/iSharelogo.png',
      slug: 'articles'
    })

    this.privacy.subscribe((x) => {
      this.showSpinner = false;
    });

  }

}