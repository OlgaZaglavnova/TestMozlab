import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Msg } from '../shared/interfaces';
import { MessagesService } from '../shared/messages.service';

/**
 * Компонент вывода отдельного вопроса из списка
 * One message of list component
 */
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() message: Msg;
  @Output() likeEmitter: EventEmitter<number> = new EventEmitter<number>();
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
    this.likeEmitter.emit(tmpLike);

    this.messagesService.setLike(this.message, tmpLike);
    this.liked = !this.liked;
  }

}
