import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { Friend } from 'src/app/model/friend';
import { Post } from 'src/app/model/post';
import { User } from 'src/app/model/user';
import { Comment } from 'src/app/model/comment';
import { CommentService } from 'src/app/services/comment.service';
import { FriendService } from 'src/app/services/friend.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { LikeService } from 'src/app/services/like.service';
import { Like } from 'src/app/model/like';
import { Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAsAgoPipe } from 'src/app/date-as-ago.pipe';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
 
})

export class ProfileComponent implements OnInit  {
  user: User = new User();
  friends: Friend[]=[];
  isfol= new Friend();
  ismyfriend= new Friend();
  newFriend = new Friend();
  receivefriend= new Friend();
  currentFriend = new Friend();
  count: Friend[]=[];
   notification: Friend[]=[] ;
  searchMode: boolean = false;
  currentfriendId= new Friend();
  posts: Post[]=[];
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();
  /* comments: Comment[] = []; */
  newComment = new Comment();
  currentComment = new Comment();
  successComment!: number;
  valueid!: number;
  ifisliked= new Like();
  p!:number;
  likes: Like[]=[];
  id!:number
  postsChunk!: Post[];
  postToDisplay = 1;
  morePost = false;
  loading = false;
  mawjoudsayed!: Like;
  
  filterargs = {title: 'hello'};
  thisuser: User = new User();
  commentFormGroup!: FormGroup;
  exp!:number;
 
  constructor(public userservice: UserService,private route : ActivatedRoute,private friendservice :FriendService,private appcom:AppComponent,
    private postservice: PostService,private commentservice: CommentService,private likeService: LikeService,private fb:FormBuilder) { }
    
  ngOnInit(): void {
    this.countexp();
    this.mawjoudwala();
    const userid: number = +this.route.snapshot.paramMap.get('id')!;
    
    this.commentFormGroup = this.fb.group({
      content: this.fb.control(null,[Validators.required]), 
      
      
    })
    
    this.postservice.getmypostsbyid(userid).subscribe(
      data => {
        this.posts = data;
        
        this.posts.reverse();
        if (this.posts.length > this.postToDisplay) {
          this.postsChunk = this.posts.slice(0, this.postToDisplay);
          this.morePost = true;
        } else {
          this.postsChunk = this.posts.slice(0, this.posts.length);
          this.morePost = false;
        }
        
        console.log("post",data);
      }
    )
   

    this.route.paramMap.subscribe(()=>{
      this.postsbyid();
    })

    this.postsbyid();

   /*  const userid: number = +this.route.snapshot.paramMap.get('id')!;
    this.postservice.getmypostsbyid(userid).pipe(
      map((response) => response)
    ).subscribe(
      data => {
        this.posts = data;
        this.posts.reverse();
        if (this.posts.length > this.postToDisplay) {
          this.postsChunk = this.posts.slice(0, this.postToDisplay);
          this.morePost = true;
        } else {
          this.postsChunk = this.posts.slice(0, this.posts.length);
          this.morePost = false;
        }
        
        console.log("post",data);
      }
    ) */

    this.userservice.findfriend(this.route.snapshot.params['id']).
    subscribe( prod =>{ this.currentfriendId = prod;
      console.log(this.currentfriendId);
    } ) ;

   

    this.route.paramMap.subscribe(()=>{
      this.getUserByid();
      this.getfriends();
      this.sendfriendreq();
      this.wearefriends();
      this.countfriend();
      this.receive();
      this.postsbyid();
      this.getalllikes();
      this.getUser();
      this.countexp();
    });

   
   


  }

 




  addComment(postid:number){
    this.isLoading.next(true);
    
    let commenta = this.commentFormGroup.value;

    this.commentservice.addcomment(commenta,postid,this.userservice.loggedUser).subscribe(
      
      (data) =>{
        console.log(data);
        
        this.successComment= 1
        this.isLoading.next(false);
        this.postsbyid();
      }),     
      err => {
        console.log("Error");
        this.postsbyid();
      }  ,this.commentFormGroup.reset();     
  }

  getalllikes(){
    this.likeService.getalllikes().subscribe(
      data=>{
        this.likes=data;
      }
    )
  }

 /*  iflikedpost(id:number) {

   
   
      this.likeService.ifliked(this.userservice.loggedUser,id).subscribe(
      data => {
        this.ifisliked = data;
        console.log(this.userservice.loggedUser,id)
        console.log("iflike",this.ifisliked)
      }
    )  
  }  */

  likepost(username:string,id:number){
    this.likeService.liked(username,id).subscribe(
      (data) =>{
        console.log(data);
        this.countexp();
        
        this.postsbyid();
      }),     
      err => {
        console.log("Error");
        this.postsbyid();
      }     
  }

  dislikepost(username:string,id:number){
    this.likeService.annulelike(username,id).subscribe(
      (data) =>{
        console.log(data);
        this.countexp();
        
        this.postsbyid();
      }),     
      err => {
        console.log("Error");
        this.postsbyid();
      } ,this.postsbyid();
  }


  mawjoudwala() {
   
    this.likeService.mijoud(this.userservice.loggedUser).subscribe(
      (data) =>{
        this.mawjoudsayed = data;
      
   
      }),     
      err => {
        console.log("Error");
        
      },console.log("Error gg",this.mawjoudsayed);
  }
  

  getUserByid() {

   
    const userid: number = +this.route.snapshot.paramMap.get('id')!;
    this.userservice.consulterUser(userid).subscribe(
      data => {
        this.user = data;
      }
    )
  }

  countexp() {

   
    const userid: number = +this.route.snapshot.paramMap.get('id')!;
    this.userservice.experience(userid).subscribe(
      data => {
        this.exp = data;
      }
    )
  }

  public getUser(){
    this.userservice.consulterUserbyusername().subscribe(
      data => {
        this.thisuser = data;
       
      }
    )
 
}

  getfriends() {
    this.friendservice.getall().subscribe(
      f => {
        this.friends = f;
      }
    )
  }

  

  sendfriendreq(){
    const userid: number = +this.route.snapshot.paramMap.get('id')!;
    this.userservice.isfollowed(userid).subscribe(
      f=>{
        this.isfol=f;
      }
    )

  }

  wearefriends(){
    const userid: number = +this.route.snapshot.paramMap.get('id')!;
    this.userservice.wefriends(userid).subscribe(
      f=>{
        this.ismyfriend=f;
      }
    )

  }

  countfriend(){
    const userid: number = +this.route.snapshot.paramMap.get('id')!;
    this.userservice.countfriend(userid).subscribe(
      f=>{
        this.count=f;
        console.log(this.count)
      }
    )

  }

  receive(){
    const userid: number = +this.route.snapshot.paramMap.get('id')!;
    this.userservice.receivefriendreq(userid).subscribe(
      f=>{
        this.receivefriend=f;
      }
    )

  }

 

  addfriend(logged:string,f:Friend){

    const userid: number = +this.route.snapshot.paramMap.get('id')!;
    this.friendservice.friendreq(f,logged,userid).subscribe(
      (data) =>{
        console.log(data);
        this.getUserByid();
        this.getfriends();
        this.sendfriendreq();
        this.wearefriends();
        this.countfriend();
        this.receive();
        
        
      }),     
      err => {
        console.log("Error");
      }
      this.appcom.notificationfriendreq()
  }

  acceptfriend(u:Friend,id:number){
   
    this.userservice.accept(u,id).subscribe(
      f=>{
        this.ismyfriend=f;
        this.getUserByid();
        this.getfriends();
        this.sendfriendreq();
        this.wearefriends();
        this.countfriend();
        this.receive();
        this.appcom.notificationfriendreq();
      }
    )

  }

 

  rejectfriend(f:Friend){
    const userid: number = +this.route.snapshot.paramMap.get('id')!;
    this.userservice.reject(f,userid).subscribe(
      f=>{
        this.ismyfriend=f;
        this.getUserByid();
        this.getfriends();
        this.sendfriendreq();
        this.wearefriends();
        this.countfriend();
        this.receive();
        this.appcom.notificationfriendreq();
      }
    )

  }

  deletefriend(){
    const userid: number = +this.route.snapshot.paramMap.get('id')!;
    this.userservice.delete(userid).subscribe(
      f=>{
        this.ismyfriend=f;
        this.getUserByid();
        this.getfriends();
        this.sendfriendreq();
        this.wearefriends();
        this.countfriend();
        this.receive();
        this.appcom.notificationfriendreq();
      }
    )

  }

  

  postsbyid() {
    const userid: number = +this.route.snapshot.paramMap.get('id')!;
    
    this.postservice.getmypostsbyid(userid).subscribe(
      data => {
        this.posts = data;
        this.posts.reverse();
        if (this.posts.length > this.postToDisplay) {
          this.postsChunk = this.posts.slice(0, this.postToDisplay);
          this.morePost = true;
        } else {
          this.postsChunk = this.posts.slice(0, this.posts.length);
          this.morePost = false;
        }
        
        console.log("post",data);
      }
    )
    }

    morePosts(): void {
      if (this.posts.length > this.postToDisplay) {
        this.postToDisplay += this.postToDisplay;
        this.morePost = true;
        this.postsChunk = this.posts.slice(0, this.postToDisplay);
        if (this.posts.length < this.postToDisplay) {
          this.morePost = false;
        }
      }
    }

  sortBy() {
    return this.posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

 
 

  

 

  updateComment(){

    
      
      const idcomment: number = this.valueid;  

    this.commentservice.updatecomment(this.currentComment,idcomment).subscribe(
      (data) =>{console.log(data);
      
        this.successComment= 2
      }),     
      err => {
        console.log("Error");
      }       
  }

  supprimerComment(c: Comment){
         
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
    this.commentservice.supprimerComment(c.idComment).subscribe(() => {
    console.log("comment supprimé");
    
    this.successComment= 3
    });
    }

 /*  reloadCurrentPage() {
     window.location.reload(); 
     this.router.navigate([this.router.url]) 
   } */

  /*  commentsdetails(thecomId){
  
    
 
    this.commentservice.consulterComments(thecomId).subscribe(
      data => {
        this.comments = data;
      }      
    )
    
  } */



  



}
