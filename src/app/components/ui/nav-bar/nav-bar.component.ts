import { CategoryService } from '../../../services/category.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/users';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  user : User;
  categories

  constructor(
    public auth : AuthService,
    private c   : CategoryService
  ) { }

  ngOnInit() {
    this.auth.user.subscribe(user => this.user = user)
    this.categories = this.c.getCategories()
  }

  signOut(){
    this.auth.signOut();
  }

}
