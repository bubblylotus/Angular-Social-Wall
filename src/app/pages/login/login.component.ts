import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private userService: UserService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]), 
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }
// too much logic is a component ts, move to user service, this should only handle what's shown...?
//definitely need to move this to services esp w/ reapeat in create account
//define user object and pass it around, type cast your inputs and outputs
  onLogin(){
    this.userService.getUser(this.loginForm.value.email).then(
      (response:any) => {
        console.log(response);
        if(response.length == 0){
          this.snackBar.open('Account does not exist!', 'ok');
        }
        else{
          if(response[0].password === this.loginForm.value.password){
            this.snackBar.open('Login successful!', 'ok');
            this.userService.user = response[0];
            //stringify and store user to restore upon refreshing page
            localStorage.setItem('user', JSON.stringify(response[0]));
            this.router.navigate(['/posts'])
          }
          else{
            this.snackBar.open('Incorrect password!', 'ok')
          }
        }
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

}
