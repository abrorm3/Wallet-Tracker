import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import{AuthService} from "./auth.service";
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  constructor(private authService: AuthService){}

  private subscription: Subscription | undefined;
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  visible:boolean=false;
  changetype:boolean=true;
  isLoginMode = true;
  isLoading = false;
  error:any = null;

  onSwitchMode(){
    this.isLoginMode=!this.isLoginMode;
  }

  viewpassword(){
    this.visible=!this.visible;
    this.changetype=!this.changetype;
  }
  onSubmit(form:NgForm){
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading=true;
    if (this.isLoginMode) {
      this.subscription = this.authService.login(email, password).subscribe({
        next: (resData) => {
          console.log(resData);
          this.isLoading = false;
        },
        error: (errorMessage) => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.isLoading = false;
        }
      });
    }
    else{
      this.authService.signup(email,password).subscribe({
        next: (resData) => {
          console.log(resData);
          this.isLoading = false;
        },
        error: (errorMessage) => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.isLoading = false;
        }
      });
    }

    form.reset();

  }

}