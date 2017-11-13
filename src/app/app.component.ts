import {AfterViewChecked, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked {
  messages: Array<MessageEvent> = [];
  private ws = new WebSocket('ws://localhost:8080/ws/messages');
  @ViewChild('chatHistory') private chatHistory: ElementRef;

  constructor() {
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
