import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { Friend } from 'src/app/model/friend';
import { Post } from 'src/app/model/post';
import { User } from 'src/app/model/user';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',

})
export class MyprofileComponent implements OnInit {
  user: User = new User();
  count: Friend[]=[];
  valueId!: number ;
  newPost =  new Post();
  posts: Post[]=[];
  commentFormGroup!: FormGroup;
  loading = false;
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();
  successComment!: number;
  currentUser = new User();
  valueiduser!: number;
  imgURL: any;public imagePath;
  successedit!: number;
  constructor(public userService: UserService,private postservice: PostService,private route: ActivatedRoute,private fb:FormBuilder,private commentservice: CommentService) { }

  ngOnInit(): void {
    this.getUser();
    this.countfriend();
    this.commentFormGroup = this.fb.group({
      content: this.fb.control(null,[Validators.required]), 
      
      
    })
  

   
      this.mypost();
   

  }

  getuseridformimg(id: number){
    
    const idcom: number = id;
    console.log(idcom)
    this.valueiduser= idcom;

    this.userService.consulterUser(this.valueiduser).
    subscribe( com =>{ this.currentUser = com;
    console.log(com)
      
    } ) ;
          
  }


  updateImageuser(){

    
      
    const ids: number = this.valueiduser;  
    let formData = new FormData();
    
    formData.append('img',this.imgg);
    
  this.userService.updateimage(formData,ids).subscribe({
    next:(data)=>{
      this.successedit= 2
      console.log('success',data);
      this.getuseridformimg(ids)
     },
     error :(err) => {
      
       console.log('error',err);
       this.getuseridformimg(ids)
     }
   })
 }



    
    /* (data) =>{console.log(data);
    this.getUser(),this.mypost();
    this.successedit= 2
    console.log("successedit");
    }), 
        
    err => {
      console.log("Error");
      this.getUser(),this.mypost();
      this.successedit= 2
    }  ,this.getUser(),this.mypost();
     
} */

imgg:any;
   
       selectImageuser(event){
         
         this.imgg = event.target.files[0];
         console.log(this.imgg);

         var reader = new FileReader();


         // preview img
         this.imagePath = this.imgg;
         reader.readAsDataURL(this.imgg);
         reader.onload = (_event) => {
           this.imgURL = reader.result;}
 }

  addComment(postid:number){
    this.isLoading.next(true);
    
    let commenta = this.commentFormGroup.value;

    this.commentservice.addcomment(commenta,postid,this.userService.loggedUser).subscribe(
      
      (data) =>{
        console.log(data);
        
        this.successComment= 1
        this.isLoading.next(false);
        this.mypost();
      }),     
      err => {
        console.log("Error");
        this.mypost();
      }  ,this.commentFormGroup.reset();     
  }


  public getUser(){
    this.userService.consulterUserbyusername().subscribe(
      data => {
        this.user = data;
        this.valueId=this.user.id;
        console.log("valueid",this.valueId);
        this.countfriend();
        this.mypost();
      }
    )
    this.countfriend();
}

countfriend(){
 
  const userid: number = this.valueId;
  this.userService.countfriend(userid).subscribe(
    f=>{
      this.count=f;
      console.log(this.count)
      console.log('userId:',this.valueId);
    }
  )
}

addpostwithimg(){

    
  let formData = new FormData();
     formData.append('content',this.newPost.content);
   
     formData.append('img',this.img);
     
     this.postservice.ajouterpost(formData,this.userService.loggedUser).subscribe(
      {next :(data)=>{
        this.getUser();
        this.mypost();
        console.log("data",data);
        
      },
      error :(err) => {
        this.mypost();
        this.getUser();
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
            this.mypost()
            console.log(err);
          }
        }) 
       
       
         }


         mypost() {
          this.postservice.getmyposts(this.userService.loggedUser).subscribe(
            data => {
              this.posts = data;
              console.log("post:",data);
            }
          )
        }

        sortBy() {
          return this.posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }

}
