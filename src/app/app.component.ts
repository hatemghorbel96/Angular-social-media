import { User } from './model/user';
import { UserService } from 'src/app/services/user.service';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessangerComponent } from './components/messanger/messanger.component';
import { Friend } from './model/friend';
import { Chat } from './model/chat';
import { ChatService } from './services/chat.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Message } from './model/message';
import { Emoji } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { NgScrollbar } from 'ngx-scrollbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'socialmedia';
  usernamelog!: String;
  thisuser: User = new User();
  users: User[]=[];
  allusers: User[]=[];
  searchTerm!: string;
  notification: Friend[]=[] ;
  ismyfriend= new Friend();
  chat!: Chat;
  showmess:number=0
  /* check = sessionStorage.getItem('username'); */
  check = this.userservice.loggedUser
  chatId: any = 0;
  chatObj: Chat = new Chat();
  public chatData: any = [];

  //chat
  chatForm: FormGroup;
 
  messageObj: Message = new Message();
  // chatId: number = 22;
  
  messageList: Message[] = [];
  public chatList: any = [];
  replymessage: String = "checking";
  
  msg = "Good work";
  chatIdd: any = sessionStorage.getItem('chatId');
  color = "";
  secondUserName = "";
  public alluser: any = [];
  
  timesRun = 0;
  timesRun2 = 0;
  firstUserName = this.userservice.loggedUser;
  senderEmail = this.userservice.loggedUser;
  senderCheckk = this.userservice.loggedUser;

  // emoji

  showEmojiPicker = false;
  sets = [
    'native',
    'google',
    'twitter',
    'facebook',
    'emojione',
    'apple',
    'messenger'
  ]
  set: Emoji['set'] = 'apple';
  message = '';
  toggleEmojiPicker() {
    console.log(this.showEmojiPicker);
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event) {
    console.log(this.message)
    const { message } = this;
    console.log(message);
    console.log(`${event.emoji.native}`)
    const text = `${message}${event.emoji.native}`;

    this.message = text;
    // this.showEmojiPicker = false;
  }

  onFocus() {
    console.log('focus');
    this.showEmojiPicker = false;
  }
  onBlur() {
    console.log('onblur')
  }
  //scroll to butttom
  shouldScroll = true;

  // hide and show message
  isShown = false;

  toggleToast() {
    this.isShown = !this.isShown;
  }
  @ViewChild('content', { static: true }) private content: ElementRef;
  constructor(public userservice: UserService, private router: Router, private route: ActivatedRoute, private chatService: ChatService) {
    
    this.getUsers();
    this.chatForm = new FormGroup({
      replymessage: new FormControl()
    });
  }

 

 
  

  ngOnInit () {

  

    
   
    this.userservice.loadToken();
    if (this.userservice.getToken()==null ||
    this.userservice.isTokenExpired())
    this.router.navigate(['/login']);
    
    if (this.userservice.isloggedIn){
     this.ifconnected()
       
    
    }
   
      
    this.getUser();
    this.getUsers();
    console.log('sendercheck', this.userservice.loggedUser);
  



    //chat
    setInterval(() => {
      this.chatService.getChatById(sessionStorage.getItem('chatId')).subscribe(data => {
        this.chatData = data;
        this.messageList = this.chatData.messageList;
        this.secondUserName = this.chatData.secondUserName;
        this.firstUserName = this.chatData.firstUserName;
        this.senderEmail = this.userservice.loggedUser;
      });
    }, 1000);





    let getByname = setInterval(() => {
      // For getting all the chat list whose ever is logged in.
      this.chatService.getChatByFirstUserNameOrSecondUserName(this.userservice.loggedUser).subscribe(data => {
        // console.log(data);
        this.chatData = data;
        this.chatList = this.chatData;
      });

      this.timesRun2 += 1;
      if (this.timesRun2 === 2) {
        clearInterval(getByname);
      }
    }, 1000);

    let all = setInterval(() => {

      this.userservice.getall().subscribe((data) => {
        // console.log(data);

        this.alluser = data;
      })

      this.timesRun += 1;
      if (this.timesRun === 2) {
        clearInterval(all);
      }
    }, 1000);

    this.getUsers()
  }

  goToChat(username: any) {
    this.chatService.test(username,this.userservice.loggedUser).subscribe(
     /*  {
        next:(data :any) => {
          this.chatId = data.chatId;
          
          sessionStorage.setItem("chatId", this.chatId);

          sessionStorage.setItem("gotochat", "false");
          this.router.navigateByUrl('/chat');
          console.log("lennna");
          error: (error)
      }, */
     
      
     
      (data) => {
        
        this.chatId =data.chatId
        console.log(data, this.chatId)
        //this.chatId = data.chatId;
        sessionStorage.setItem("chatId",this.chatId);
        console.log(data)
        sessionStorage.setItem("gotochat", "false");
        this.router.navigateByUrl('/chat');
        console.log("lennna", this.chatId);
      }, 
      (error) => {
        if (error.status == 404) {
          this.chatObj.firstUserName = this.userservice.loggedUser;
          this.chatObj.secondUserName = username;

          this.chatService.createChatRoom(this.chatObj).subscribe(
            (data) => {
              this.chatData = data;
              this.chatId = this.chatData.chatId;
              sessionStorage.setItem("chatId", this.chatData.chatId);
              console.log("loutaaaa");
              sessionStorage.setItem("gotochat", "false");
              this.router.navigateByUrl('/chat');
            })
        } else {
          console.log("else");
        }
      
      });

  }

  goToChatmini(username: any) {
    this.chatService.test(username, this.userservice.loggedUser).subscribe(
     



      (data) => {

        this.chatId = data.chatId
        console.log(data, this.chatId)
        //this.chatId = data.chatId;
        sessionStorage.setItem("chatId", this.chatId);
        console.log(data)
        sessionStorage.setItem("gotochat", "false");
      },
      (error) => {
        
          this.chatObj.firstUserName = this.userservice.loggedUser;
          this.chatObj.secondUserName = username;
        console.log('chatobj',this.chatObj.firstUserName)
        console.log('logged', this.userservice.loggedUser)
          this.chatService.createChatRoom(this.chatObj).subscribe(
            (data) => {
              this.chatData = data;
              this.chatId = this.chatData.chatId;
              sessionStorage.setItem("chatId", this.chatData.chatId);
            
              sessionStorage.setItem("gotochat", "false");
             
            })
         
    
      });

  }

  onKeyUp(filterText : string){
    this.users = this.allusers.filter(item =>
    item.nom.toLowerCase().includes(filterText));
    }


 public onLogout(){
 // this.usernamelog=this.userservice.loggedUser;
  this.ifdesconnected(this.userservice.loggedUser)
    this.userservice.logout();
    this.getUsers()
    
  }

  public getUser(){
    this.userservice.consulterUserbyusername().subscribe(
      data => {
        this.thisuser = data;
        this.notificationfriendreq();
      }
    )
 
}

ifconnected(){
    
  this.userservice.connected(this.thisuser,this.userservice.loggedUser).subscribe(

    {next :(data)=>{
      
      console.log("user connected",data);
      this.getUsers();
    },
    error :(err) => {
     
      console.log(err);
    
      this.getUsers();
    }

  }
  ),this.getUsers(); }


   

ifdesconnected(username:String){
    
  this.userservice.desconnected(this.thisuser,username).subscribe(

    {next :(data)=>{
      
      console.log("user desconnected",data);
      this.getUsers();
    },
    error :(err) => {
     
      console.log(err);
    
      this.getUsers();
    }
  }),this.getUsers(); }

   


getUsers() {
  this.userservice.getall().subscribe(
    {next :(data)=>{
      this.users = data;
      console.log("data",data);
      
    },
    error :(err) => {
     
      console.log(err);
    }
  }) }

 

notificationfriendreq(){
  
  this.userservice.notifriendreq().subscribe(
    f=>{
      this.notification=f;
      console.log("new notf")
    

    }
  )

}

acceptfriend(u:Friend,id:number){
   
  this.userservice.accept(u,id).subscribe(
    f=>{
      this.ismyfriend=f;
     this.notificationfriendreq()
     
    }
  )

}



rejectfriend(f:Friend){
  const userid: number = +this.route.snapshot.paramMap.get('id')!;
  this.userservice.reject(f,userid).subscribe(
    f=>{
      this.ismyfriend=f;
      this.notificationfriendreq()
    }
  )

}

deletefriend(id:number){
  
  this.userservice.delete(id).subscribe(
    f=>{
      this.ismyfriend=f;
      this.notificationfriendreq()
    }
  )

}


//chat

  loadChatByEmail(event: string, event1: string) {
    console.log(event, event1);
    // For removing the previous chatId
    sessionStorage.removeItem("chatId");

    // For checking the chat room by both the emails , if there is present then it will give the chat Id in sessionStorage
    this.chatService.getChatByFirstUserNameAndSecondUserName(event, event1).subscribe(data => {
      // console.log(data);
      this.chatData = data;
      this.chatId = this.chatData[0].chatId;
      console.log(this.chatId);
      sessionStorage.setItem('chatId', this.chatId)


      setInterval(() => {
        this.chatService.getChatById(this.chatId).subscribe(data => {
          this.chatData = data;
          this.messageList = this.chatData.messageList;
          this.secondUserName = this.chatData.secondUserName;
          this.firstUserName = this.chatData.firstUserName;
        });
      }, 1000)

    });

  }

  playAudio() {
    let audio = new Audio();
    /*   audio.src = "../../../~assets/facebook.mp3"; */
    audio.src = "././assets/facebook.mp3";
    audio.load();
    audio.play();
  }

  sendmessagesound() {
    let audio = new Audio();
    /*   audio.src = "../../../~assets/facebook.mp3"; */
    audio.src = "././assets/send.mp3";
    audio.load();
    audio.play();
  }

  sortData() {

    return this.messageList.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

  }

  sendMessage() {
    console.log(this.chatForm.value);

    // This will call the update chat method when ever user send the message
    if(this.chatForm.value!=null){
      this.messageObj.replymessage = this.chatForm.value.replymessage;
      this.messageObj.senderEmail = this.senderEmail;
   
    }
    
    this.chatService.updateChat(this.messageObj, this.chatId).subscribe(data => {
      console.log(data);
      this.chatForm.reset();
     
      // for displaying the messageList by the chatId
      this.chatService.getChatById(this.chatId).subscribe(data => {
        console.log(data);
        this.chatData = data;
        console.log(this.chatId)
        // console.log(this.chatData.messageList);console.log(JSON.stringify(this.chatData.messageList));
        this.messageList = this.chatData.messageList;
        this.secondUserName = this.chatData.secondUserName;
        this.firstUserName = this.chatData.firstUserName;
        this.sendmessagesound();
      })
    })
  }

 

  routeX() {
    // this.router.navigateByUrl('/navbar/recommendation-service');
    sessionStorage.clear();
    // window.location.reload();
    this.router.navigateByUrl('');
  }

  routeHome() {
    this.router.navigateByUrl('');
  }


  toggleDarkTheme(): void {
    var theme = localStorage.getItem('data-theme');
    if (theme === 'dark') {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('data-theme', 'light');
    } else if (theme == null || theme === 'light') {
      document.body.classList.remove('dark-mode');
    }

    if (theme === null) {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('data-theme', 'dark');
    }

    if (theme === 'light') {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('data-theme', 'dark');
    }


  }

}
