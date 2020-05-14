export class Conversation {

members:Array<string>(2);

messagesTime:Array<string>;
messagesOwner:Array<string>;
messageContent:Array<string>;


  constructor(members:Array<string>(2), messagesTime:Array<string>, messagesOwner:Array<string>, messageContent:Array<string>) {
    this.members = members;
    this.messagesTime = messagesTime;
    this.messagesOwner = messagesOwner;
    this.messageContent = messageContent;
  }
}
