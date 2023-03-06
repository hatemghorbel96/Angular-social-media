import { User } from "./user";

export class Friend {
    id!: number;
    user!:User;
    secondUser!:User;
    accepted!:number;
    sender!:string;
    createdDate!:Date;
}
