import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/users';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user : User
  constructor(
    private route       : ActivatedRoute,
    private userService : UserService
  ) { }

  ngOnInit() {
    this.userService.getUser(this.route.snapshot.paramMap.get('id'))
    .subscribe(u => this.user = u)
  }


}
