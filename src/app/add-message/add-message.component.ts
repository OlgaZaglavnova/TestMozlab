import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Msg } from '../shared/interfaces';
import { MessagesService } from '../shared/messages.service';

@Component({
  selector: 'app-add-message',
  templateUrl: './add-message.component.html',
  styleUrls: ['./add-message.component.scss']
})
export class AddMessageComponent implements OnInit {

  form: FormGroup;

  constructor(private messagesService:MessagesService) { }

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
    }
    this.messagesService.addMsg(msg);
    this.form.reset();
  }

}
