import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  user = new User();
  err=0;
  t!: User;

    
  
  constructor(private userservice : UserService,private router: Router, private app:AppComponent) { }

  ngOnInit(): void {
  }

  onLoggedin() {
    this.userservice.login(this.user).subscribe({
      next: (data) => {
        let jwToken = data.headers.get('Authorization')!;
        this.userservice.saveToken(jwToken);
       /*  this.router.navigate(['/home']); */
        window.location.href="/home"

      
       
       this.app.getUser()
      },
      error: (err: any) => {
        this.err = 1;
      }
    }
    ); 
  }


 
   
  


}