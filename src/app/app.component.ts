import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotifyService } from './services/notify.service'
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ShareButtons } from '@ngx-share/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  _sub    : Subscription;

  constructor(
    public notify     : NotifyService, 
    private route     : ActivatedRoute, 
    private router    : Router,
    public updates    : SwUpdate,
    public  share     : ShareButtons
  ) { 
    updates.available.subscribe(event => {
      updates.activateUpdate()
      .then(() => document.location.reload());
    })
  }

  ngOnInit() {

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });

    this._sub = this.route.fragment.subscribe((hash: string) => {
      if (hash) {
        const cmp = document.getElementById(hash);
        if (cmp) {
          cmp.scrollIntoView();
        }
      } else {
        window.scrollTo(0, 0);
      }
    });
  }
  
  ngOnDestroy() {
    this._sub.unsubscribe();
  }
}
