import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { MessagesService } from '../shared/messages.service';

import { AddMessageComponent } from './add-message.component';

describe('AddMessageComponent', () => {
  let component: AddMessageComponent;
  let fixture: ComponentFixture<AddMessageComponent>;
  const messagesServiceStub = {
    addMsg: () => {}

  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, MatIconModule, MatBadgeModule],
      declarations: [ AddMessageComponent ],
      providers: [{provide: MessagesService, useValue: messagesServiceStub}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // xit('should create AddMessageComponent', () => {
  //   expect(component).toBeDefined();
  // });

  it ('should emit properly EventEmitter and call addMessage()', () => {
    let form = fixture.debugElement.query(By.css('form'));
    let textarea = fixture.debugElement.query(By.css('.addMessageForm_text'));
    let btn = fixture.debugElement.query(By.css('.addMessageForm_btn'));
    let text = "Add Test question";

    let spy = spyOn(component.addMsgEmitter, 'emit')

    textarea.nativeElement.value = text;
    textarea.nativeElement.dispatchEvent(new Event('input')); 
    fixture.detectChanges();

    form.triggerEventHandler('submit', null);

    expect(spy).toHaveBeenCalledWith(text);
  });
});
