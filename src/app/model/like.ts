import { Binary } from "@angular/compiler";
import { Post } from "./post";
import { User } from "./user";

export class Like {

    id!: number;
    user!:User;
    post!:Post;
    usernamelike!:String;
    postlike!:number;
}
