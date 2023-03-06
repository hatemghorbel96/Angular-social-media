import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-inscrire',
  templateUrl: './inscrire.component.html',
  
})
export class InscrireComponent implements OnInit {

  newUser = new User();
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  addUser(){

    
    let formData = new FormData();
       formData.append('username',this.newUser.username);
       formData.append('email',this.newUser.email);
       formData.append('nom',this.newUser.nom);
       formData.append('password',this.newUser.password);
       formData.append('img',this.img);
       
       this.userService.register(formData).subscribe(
         u => {console.log(u); // just pour afficher dans le console
       /* this.router.navigate(['admin-prod']); */
       });
       }
   
   
    
   
   
       img:any;
   
       selectImage(event){
         
         this.img = event.target.files[0];
         console.log(this.img);
       }

}
