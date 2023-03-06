import { User } from "./user";
import { Comment } from "./comment";
import { Like } from "./like";
export class Post {
    idPost!: number;
    user!:User;
    createdAt!:Date;
    content!:string;
    photo!:string;
    comments!: Array<Comment>;
    likes:Like[]=[];
}
