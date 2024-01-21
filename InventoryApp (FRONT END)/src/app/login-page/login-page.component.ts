import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginFormClass } from '../LoginFormClass';
import { AuthenticationServiceService } from '../services/authentication-service.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  
  successMessage:string ="";
  errMessage: string ="";

  loginFormClass: LoginFormClass = new LoginFormClass();
  constructor(private authenticateService: AuthenticationServiceService, private routerService:RouterService) { }

  ngOnInit(): void {
  }

  
  loginForm=new FormGroup({
    
    emailid:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required])
  })

  get emailid(){
    return this.loginForm.get('emailid');
  }

  get password(){
    return this.loginForm.get('password');
  }

  login(){

    
    this.loginFormClass.username=this.emailid?.value;
    this.loginFormClass.password=this.password?.value;

    
    if(this.loginFormClass.username=="")
    {
      this.errMessage="Email Id is required";
    }
    else if(this.loginFormClass.password=="")
    {
      this.errMessage="Password is required";
    }
    else{
            if(this.loginForm.valid)
            {
              this.authenticateService.authenticate(this.loginFormClass).subscribe(data => {

                  localStorage.setItem('token',data.token);
                  if (localStorage.getItem('token') !== null) {

                   
                    this.routerService.routeToDashboard();
                    } 

            //new code
          },
          (error) => {
            // Handle authentication errors here
            // console.log("this" + JSON.stringify(error.status));
            if (error.status === 401) {
              this.errMessage = "Incorrect email or password. Please try again.";
            } else {
              this.errMessage = "An unexpected error occurred. Please try again later.";
            }
          }
        );
      } else {
        this.errMessage = "UserName should be your Email Id";
      }
    }
  }
            //   });
            // }
            // else{
            //   this.errMessage="UserName should be your Email Id";
            // }
        }

//   }

// }