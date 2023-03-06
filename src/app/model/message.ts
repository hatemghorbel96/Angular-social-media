import { Chat } from "./chat";

export class Message {
    messageId!: number
    senderEmail!: string;
    time!: string;
    replymessage!: string;
    chat!: Chat;
    constructor() {

    }
}
