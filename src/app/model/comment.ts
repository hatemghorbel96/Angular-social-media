import { Post } from "./post";
import { User } from "./user";

export class Comment {

    idComment!: number;
    content!:string;
    dateCreation!:Date;
    UpdatedAt!:Date;
    user!:User;
    post!:Post;
}
