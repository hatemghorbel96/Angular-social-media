import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
 
})
export class PostComponent implements OnInit {

  constructor(public userservice: UserService) { }

  ngOnInit(): void {
  }

}
