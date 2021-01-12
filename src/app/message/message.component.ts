import { Component, Input, OnInit } from '@angular/core';
import { Msg } from '../shared/interfaces';
import { MessagesService } from '../shared/messages.service';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() message: Msg;
  liked = false;

  constructor(private messagesService:MessagesService) { }

  ngOnInit(): void {
  }

  like(){
    let tmpLike = this.message.likes;
    if (this.liked){
      tmpLike--;
    } else {
      tmpLike++;
    }
    this.messagesService.setLike(this.message.id, tmpLike);
    this.liked = !this.liked;
  }

}
