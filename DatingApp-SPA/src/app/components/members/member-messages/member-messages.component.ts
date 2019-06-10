import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Message } from 'src/app/models/message';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.scss']
})
export class MemberMessagesComponent implements OnInit {

  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};

  constructor(private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    const currentUserId = +this.authService.decodedToken.nameid;
    this.userService.getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
      .pipe(
        tap(messages => {
          console.log('currentUserId', currentUserId);
          messages.forEach(m => {
            console.log('recipientId', m.recipientId);
            if (!m.isRead && m.recipientId === currentUserId) {
              console.log('markMessageAsRead');
              this.userService.markMessageAsRead(currentUserId, m.id);
            }
          });
        })
      )
      .subscribe(messages => {
        this.messages = messages;
    }, error => {
      this.alertify.error(error);
    });
  }

  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage).subscribe((message: Message) => {
      this.messages.unshift(message);
      this.newMessage.content = '';
    }, error => {
      this.alertify.error(error);
    });
  }

}
