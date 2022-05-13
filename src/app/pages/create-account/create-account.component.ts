import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  createAccountForm: FormGroup;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.createAccountForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]), 
      username: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onCreateAccount(){
    //promise returns resolve or error so need then and catch
    this.userService.createNewUser(this.createAccountForm.value)
    .then((response) => {
      console.log(response);
      this.userService.user = response;
      localStorage.setItem('user', JSON.stringify(response));
      this.router.navigate(['/posts']);
    })
    .catch((error) => {
      console.log(error);
    });
  }


}
