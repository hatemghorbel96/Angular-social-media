import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Like } from 'src/app/model/like';
import { Post } from 'src/app/model/post';
import { User } from 'src/app/model/user';
import { CommentService } from 'src/app/services/comment.service';
import { LikeService } from 'src/app/services/like.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
 
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  commentFormGroup!: FormGroup;
  loading = false;
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();
  successComment!: number;
  newPost =  new Post();
  thisuser: User = new User();
  val:number =3;
  hidenitems:any={};
  private toastr! :ToastrService;
  posttest: Post[] = [];
  postother: Post[] = [];
  test!: Like;
  liky:Like[]=[];
  likys:Like[]=[];
  valeurpost!:number;
  @Input() var:any;
  aVariable: any;
  g:number=0;
  constructor(private postservice: PostService,public userService: UserService,private fb:FormBuilder,private commentservice: CommentService,private likeService: LikeService) { }

  ngOnInit(): void {
    this.gettall();
    this.getUser();
    this.testlikes();
    this.testlikesbyothers();
    
    this.getalllike();
    this.getallike();
    this.commentFormGroup = this.fb.group({
      content: this.fb.control(null,[Validators.required]), 
      
      
    })
  }

  plus(){
    this.g=100;
    console.log("test g=100")
  }

  plus2(){
    this.g=0;
    console.log("test g=100")
  }

  testee2(id:number){
   
    this.likeService.testpostuser(this.userService.loggedUser,id).subscribe(
      (data)=>{
        this.test=data;
       
      }
    ),console.log("test var",id)
  }


  testeepost(){
    const val=this.valeurpost;
    const user=this.userService.loggedUser;
    this.likeService.testpostuser(user,val).subscribe(data => {})
  }

  gettall() {
    this.postservice.getallposts().subscribe(
      data => {
        this.posts = data;
      
        console.log("post",data);
      }
    )
  }

  getalllike() {
    this.likeService.getalllikes().subscribe(
      data => {
        this.liky = data.filter(likes => likes.usernamelike === this.userService.loggedUser);
      
        console.log("post",data);
      }
    )
  }

  getallike() {
    this.likeService.getalllikes().subscribe(
      data => {
        this.likys = data.filter(likes => likes.usernamelike !== this.userService.loggedUser);
      
        console.log("post",data);
      }
    )
  }

  public getUser(){
    this.userService.consulterUserbyusername().subscribe(
      data => {
        this.thisuser = data;
       
      }
    )
 
}

more(){
  this.val=this.val+2;
}

  loggedUserLikesPost(post: Post) {
    return post.likes.some(like => like.usernamelike === this.userService.loggedUser);
  }

likepost(username:string,id:number){
  this.likeService.liked(username,id).subscribe(
    (data) =>{
      console.log(data);
      
      
      this.gettall();
      this.getUser();
    }),     
    err => {
      console.log("Error");
      this.gettall();
    this.getUser();
    }     
}

dislikepost(username:string,id:number){
  this.likeService.annulelike(username,id).subscribe(
    (data) =>{
      console.log(data);
      
      
      this.gettall();
      this.getUser();
    }),     
    err => {
      console.log("Error");
      this.gettall();
      this.getUser();
    } ,this.gettall();
    this.getUser();
}


  testlikes(){
    this.postservice.testifliked(this.userService.loggedUser).subscribe(
      (data)=>{
        this.posttest=data;
      }
    )
  }

  testlikesbyothers(){
    this.postservice.testlikedbyothers(this.userService.loggedUser).subscribe(
      (data)=>{
        this.postother=data;
      }
    )
  }

/*   testee(){
    this.postservice.testlikedbyothers(this.userService.loggedUser).subscribe(
      (data)=>{
        this.test=data;
      }
    )
  } */

    
 

  addComment(postid:number){
    this.isLoading.next(true);
    
    let commenta = this.commentFormGroup.value;
   
    this.commentservice.addcomment(commenta,postid,this.userService.loggedUser).subscribe(
      
      (data) =>{
        console.log(data);
        
        this.successComment= 1
        this.isLoading.next(false);
        this.gettall();
      }),     
      err => {
        console.log("Error");
        this.gettall();
      }  ,this.commentFormGroup.reset();     
  }


  sortBy() {
    return this.posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  addpostwithimg(){

    
    let formData = new FormData();
       formData.append('content',this.newPost.content);
     
       formData.append('img',this.img);
       
       this.postservice.ajouterpost(formData,this.userService.loggedUser).subscribe(
        {next :(data)=>{
          this.gettall();
          console.log("data",data);
          
        },
        error :(err) => {
          this.gettall();
          console.log(err);
        }
      }) }
        
       img:any;
   
       selectImage(event){
         
         this.img = event.target.files[0];
         console.log(this.img);
       }
  
       addstatut(){
           
           this.postservice.ajoutestatut(this.newPost,this.userService.loggedUser).subscribe(
              {next :(data)=>{
            
              console.log("data",data);
              
            },
            error :(err) => {
              this.gettall();
              console.log(err);
            }
          }) 
         
         
           }

}
