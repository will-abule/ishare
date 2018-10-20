import { About } from '../../../models/settings';
import { SettingsService } from '../../../services/settings.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute,
  ) { 
    this.about = this.SettingsService.getAbout();
   }

   ngOnInit() {
    this.about.subscribe((x) => {
      this.showSpinner = false;
    });

  }

}