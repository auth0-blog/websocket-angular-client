import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements AfterViewChecked {
  messages: Array<MessageEvent> = [];
  private ws: WebSocket;
  @ViewChild('chatHistory') private chatHistory: ElementRef;

  constructor() {
    this.ws = new WebSocket('ws://localhost:8080/ws/messages');
    this.ws.onmessage = (me => {
      const data = JSON.parse(me.data) as MessageEvent;
      this.messages.push(data);
    });
  }

  ngAfterViewChecked() {
    this.chatHistory.nativeElement.scrollTop = this.chatHistory.nativeElement.scrollHeight;
  }
}

interface MessageEvent {
  message: string;
  when: string;
}
