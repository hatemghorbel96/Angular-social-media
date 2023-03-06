import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/model/post';
import { CommentService } from 'src/app/services/comment.service';
import { LikeService } from 'src/app/services/like.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
 
})
export class ShowPostComponent implements OnInit {
  post: Post = new Post();
  val:number =3;
  constructor(private postservice: PostService,private route : ActivatedRoute,public userservice: UserService,
    private commentservice: CommentService,private likeService: LikeService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.postbyid();
  })
}

  postbyid() {
    const postid: number = +this.route.snapshot.paramMap.get('id')!;
    this.postservice.getpostbyid(postid).subscribe(
      data => {
        this.post = data;
      }
        
    )
    }


    likepost(username:string,id:number){
      this.likeService.liked(username,id).subscribe(
        (data) =>{
          console.log(data);
          
          
          this.postbyid();
        }),     
        err => {
          console.log("Error");
          this.postbyid();
        }     
    }
  
    dislikepost(username:string,id:number){
      this.likeService.annulelike(username,id).subscribe(
        (data) =>{
          console.log(data);
          
          
          this.postbyid();
        }),     
        err => {
          console.log("Error");
          this.postbyid();
        } ,this.postbyid();
    }

    more(){
      this.val=this.val+2;
    }
  
  

}