import { Component, OnInit } from '@angular/core';
import { Friend } from 'src/app/model/friend';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-acceuilprofile',
  templateUrl: './acceuilprofile.component.html',
 
})
export class AcceuilprofileComponent implements OnInit {
  user: User = new User();
  count: Friend[]=[];
  valueId!: number ;

  currentUser: any;
  constructor(public userservice : UserService) { }

  ngOnInit(): void {
    this.getUser()

    this.currentUser = this.userservice.getUser();
     
      this.countfriend();
     


  }


  public getUser(){
    this.userservice.consulterUserbyusername().subscribe(
      data => {
        this.user = data;
        this.valueId=this.user.id;
        this.countfriend();
      }
    )
}

countfriend(){
 
  const userid: number = this.valueId;
  this.userservice.countfriend(userid).subscribe(
    f=>{
      this.count=f;
      console.log(this.count)
      console.log('userId:',this.valueId);
    }
  )

}

}
