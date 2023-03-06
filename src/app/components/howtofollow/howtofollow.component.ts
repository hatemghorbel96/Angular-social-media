import { Component, OnInit, TemplateRef } from '@angular/core';
import { Friend } from 'src/app/model/friend';
import { User } from 'src/app/model/user';
import { FriendService } from 'src/app/services/friend.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-howtofollow',
  templateUrl: './howtofollow.component.html',
  
})
export class HowtofollowComponent implements OnInit {
  n:number=2;
  users: User[]=[];
  friends: Friend[]=[];
  
  newFriend = new Friend();
  currentFriend = new Friend();

  constructor(public userservice: UserService,private friendservice :FriendService) { }
  
  ngOnInit(): void {
    this.getUsers()
    this.getfriends()
  }



  getUsers() {
    this.userservice.getall().subscribe(
      data => {
        this.users = data;
      }
    )
  }


  getUserByid() {
    
    this.userservice.getall().subscribe(
      data => {
        this.users = data;
      }
    )
  }

  getfriends() {
    this.friendservice.getall().subscribe(
      data => {
        this.friends = data;
      }
    )
  }

  addfriend(f:number,username :string,idfriend :number){

    this.friendservice.getbyid(f).subscribe(
      data => {
        this.currentFriend = data;
      }
    )
    this.friendservice.friendreq(this.currentFriend,username,idfriend).subscribe(
      (data) =>{
        console.log(data);
       
      }),     
      err => {
        console.log("Error");
      }
  }

}
