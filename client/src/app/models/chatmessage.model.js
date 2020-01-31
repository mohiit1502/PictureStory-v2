export default class ChatMessage {

    constructor(message, isUser) {
        this.message = message;
        this.isUser = isUser;
        this.timeStamp = Date.now();
    }
}