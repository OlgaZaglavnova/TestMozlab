import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Msg } from '../shared/interfaces';
import { MessagesService } from '../shared/messages.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{
  messages: Msg[];

  constructor(private messagesService: MessagesService) { }
    
  ngOnInit(): void {
    this.messages = this.messagesService.getAll();

  }

  

}
