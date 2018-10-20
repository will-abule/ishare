import { User } from '../../../models/users';
import { UserService } from '../../../services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  User            :   User[]
  filteredUser    :   User[]
  sub             :   Subscription
  p               :   number = 1

  constructor(private UserService: UserService) { }

  ngOnInit() {
    this.sub = this.UserService.getUsers().subscribe(p => this.User = this.filteredUser = p)
  }

  filter(query:string ) {
    this.filteredUser = (query) ?
     this.User.filter(p => p.displayName.toLowerCase().includes(query.toLowerCase())):
     this.User
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}

