import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../shared/messages.service';
/**
 * Компонент главной страницы
 * Main page component
 */
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{

  constructor(public messagesService: MessagesService) { }
      
  ngOnInit(): void {
    this.messagesService.refresh();
  }

  

}
