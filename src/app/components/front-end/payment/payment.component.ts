import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  activeButton    = false; 
  user
  num: number;

  constructor(
    private Router: Router,
    private auth: AuthService,
    private UserService: UserService
  ) { }

  ngOnInit() {
    this.auth.user.subscribe(user => this.user = user)
  }

  g() {
    return this.num = Math.random() *10000000000000000
  }

  paymentCancel() {
    // this.Router.navigate(['/'])
  }
  
  paymentDone(user) {
    return this.UserService.makeSubscriber2(user)
    // this.Router.navigate(['/lessons'])
  }
  
}