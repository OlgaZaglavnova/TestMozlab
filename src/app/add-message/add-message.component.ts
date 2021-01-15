import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Msg } from '../shared/interfaces';
import { MessagesService } from '../shared/messages.service';
/**
 * Компонент-форма добавления нового вопроса
 * Form component for new question adding
 */
@Component({
  selector: 'app-add-message',
  templateUrl: './add-message.component.html',
  styleUrls: ['./add-message.component.scss']
})
export class AddMessageComponent implements OnInit, OnDestroy {

  aSub: Subscription;

  form: FormGroup;

  @Output() addMsgEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor(private messagesService:MessagesService) { }

  ngOnDestroy(): void {
    if(this.aSub){
      this.aSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      text: new FormControl('', Validators.required)
    })
  }

  addMessage(){
    if (this.form.invalid){
      return;
    }
    const msg: Msg = {
      text: this.form.value.text,
      likes: 0
    };
    this.addMsgEmitter.emit(this.form.value.text);

    this.aSub = this.messagesService.addMsg(msg).subscribe(
      () => {
        this.form.reset();
      }
    );


    
  }

}
