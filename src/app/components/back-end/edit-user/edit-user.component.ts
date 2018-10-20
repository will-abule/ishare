import { User } from '../../../models/users';
import { UserService } from '../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  User          : User
  id            : string
  activeButton  = false;

  constructor(
    private UserService: UserService,
    private route : ActivatedRoute,
    private router: Router
  ) {
    this.id = this.route.snapshot.paramMap.get('id')
   }

   ngOnInit() {
    // this.category = this.CategoryService.getCategory(this.id).take(1).subscribe(p => this.category = p)
    this.UserService.getUser(this.id).pipe(take(1)).subscribe(p => this.User = p)
    
  }

  makeUser(p){
    this.UserService.makeUser(p)
  }

  makeSubscriber(p){
    this.UserService.makeSubscriber(p)
  }

  makeAdmin(p){
    this.UserService.makeAdmin(p)
  }

  addToTeam(p){
    this.UserService.addToTeam(p)
  }

  removeFromTeam(p){
    this.UserService.removeFromTeam(p)
  }


  // delete(p){
  //   this.UserService.deleteUser(p,this.id)
  // }

  cancel(){
    this.router.navigate(['/admin/users'])
  }




}