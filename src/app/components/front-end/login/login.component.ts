import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/users';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;
  user : User;
  activeButton    = false;
  submit = 'Submit'
  loader = false
  
  formErrors = {
    'email': '',
    'password': '',
    'errors':''
  };
  validationMessages = {
    'email': {
      'required': 'Email is required.',
      'email': 'Email must be a valid email'
    },
    'password': {
      'required': 'Password is required.',
      'pattern': 'Password must be include at one letter and one number.',
      'minlength': 'Password must be at least 4 characters long.',
      'maxlength': 'Password cannot be more than 40 characters long.',
    },
    'errors': {
      'required': 'Password is required.',
      'message': 'invalid password.',
      
    }
  };


  constructor(
        private fb        :   FormBuilder,
        private auth      :   AuthService,
        private router    :   Router
    ) { }
  
  ngOnInit() {

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });

    this.auth.user.subscribe(user => this.user = user)
    this.buildForm();
  }
  
  
  signIn(){
    this.submit = 'processing'
    this.loader = true
    this.auth.emailLogin(this.userForm.value['email'], this.userForm.value['password'])
  }

  reSend() {
    return this.auth.reSend()
  }

  facebookLogin() {
    this.auth.facebookLogin();
  }
  
  buildForm(): void {
    this.userForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]
      ],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ]
      ],
      'errors': ['', [
  
      ]
      ],
    });
  
    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }
  
  // Updates validation state on form changes.
  onValueChanged(data?: any) {
  if (!this.userForm) { return; }
    const form = this.userForm;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
          if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
}

