import { Friend } from "./friend";
import { Post } from "./post";
import { Role } from "./role";
import { Comment } from "./comment";
import { Like } from "./like";

export class User {
    id!:number;
    username!:string ;
    email!: string;
    nom !: string ;
    password !: string ;  
    roles!:Role[];
    photo!: string;
    friends!:Friend[];
    secfriends!:Friend[];
    connected!:number;
    posts:Post[]=[];
    comments:Comment[]=[];
    likes:Like[]=[];
    desconnecteAt!:Date;
 
  
   
   
}
