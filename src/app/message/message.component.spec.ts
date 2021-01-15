import { BuiltinType } from '@angular/compiler';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { MessagesService } from '../shared/messages.service';

import { MessageComponent } from './message.component';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;
  const messagesServiceStub = {
    setLike: () => {
      if (!component.liked){
        component.message.likes++
      } else {
        component.message.likes--
      }
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageComponent ],
      providers: [{provide: MessagesService, useValue: messagesServiceStub}],
      imports: [FormsModule, ReactiveFormsModule, MatIconModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    component.message = {text: 'Test Question 2', likes: 0};
    
    fixture.detectChanges();
    
  });

  // xit('should create MessageComponent', () => {
  //   fixture.whenStable().then(()=>{
  //     expect(component).toBeDefined();
  //   })
  // });

  it('should increment component.message.likes from 0 to 1 when heart clicked (in case of component.liked was false)', () => {
    component.liked = false;

    let hrt = fixture.debugElement.query(By.css('.message-like'));
    hrt.triggerEventHandler('click', null);
    fixture.detectChanges();
      // expect(component.message.likes).toBe(1);
    expect(hrt.properties.matBadge).toBe(1);
  });

  it('should decrement component.message.likes from 1 to 0 when heart clicked (in case of component.liked was true)', () => {
    component.liked = true;
    component.message.likes = 1;
    fixture.detectChanges();


    let hrt = fixture.debugElement.query(By.css('.message-like'));
    hrt.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(hrt.properties.matBadge).toBe(0);
  });


});
