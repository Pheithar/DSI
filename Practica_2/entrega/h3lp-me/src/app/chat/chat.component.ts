// https://github.com/rpaschoal/ng-chat

import { Component, OnInit } from '@angular/core';

import { ChatAdapter } from 'ng-chat';
import { SignalRAdapter } from '../signalr-adapter';

import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(private http: HttpClient) { }

  title:string = "Chat";

  placeholder:string = "Escribe un mensaje";
  searchPlaceholder:string = "Buscar"


  currentTheme = 'dark-theme';
  triggeredEvents = [];
  fileUploadUrl: string = `${SignalRAdapter.serverBaseUrl}UploadFile`;

  userId: string = "offline-demo";
  username: string = "test";

  adapter: ChatAdapter = new SignalRAdapter(this.username, this.http);

  switchTheme(theme: string): void {
   this.currentTheme = theme;
  }

  onEventTriggered(event: string): void {
   this.triggeredEvents.push(event);
  }

  ngOnInit(): void {
  }

}
