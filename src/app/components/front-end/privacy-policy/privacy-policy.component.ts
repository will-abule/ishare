import { Privacy } from '../../../models/settings';
import { SettingsService } from '../../../services/settings.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute,
  ) { 
    this.privacy = this.SettingsService.getPrivacy();
   }

   ngOnInit() {
    this.privacy.subscribe((x) => {
      this.showSpinner = false;
    });

  }

}