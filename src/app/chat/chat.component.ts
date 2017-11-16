import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements AfterViewChecked, OnInit {
  messages: Array<MessageEvent> = [];
  private ws: WebSocket;
  authSubscription: Subscription;
  sub: string;
  @ViewChild('chatHistory') private chatHistory: ElementRef;
  @ViewChild('message') private message: ElementRef;

  constructor(private auth: AuthService, private router: Router) {
    const accessToken = localStorage.getItem('access_token');
    this.ws = new WebSocket('ws://@192.168.0.12:8080/ws/messages?token=' + accessToken);
    this.ws.onmessage = (me => {
      const data = JSON.parse(me.data) as MessageEvent;
      this.messages.push(data);
    });
  }

  ngAfterViewChecked() {
    this.chatHistory.nativeElement.scrollTop = this.chatHistory.nativeElement.scrollHeight;
  }

  ngOnInit() {
    this.authSubscription = this.auth.loggedIn$.subscribe(loggedIn => {
      if (!loggedIn) {
        this.sub = null;
        this.ws.close();
        this.ws = null;
        this.router.navigate(['']);
      }
      this.sub = this.auth.userProfile.sub;
    });
  }

  onEnter(value: String) {
    console.log(value);
    this.message.nativeElement.value = '';
    this.ws.send(value);
  }
}

interface MessageEvent {
  when: string;
  sub: string;
  name: string;
  picture: string;
  message: string;
}
