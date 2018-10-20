import { Terms } from '../../../models/settings';
import { SettingsService } from '../../../services/settings.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute,
  ) { 
    this.term = this.SettingsService.getTerms();
   }

   ngOnInit() {
    this.term.subscribe((x) => {
      this.showSpinner = false;
    });

  }

}