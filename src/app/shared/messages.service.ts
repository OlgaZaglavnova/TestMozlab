import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "src/environments/environment";
import { AddResponse, Msg } from "./interfaces";

@Injectable({providedIn: 'root'})
export class MessagesService implements OnDestroy{

    messages: Msg[] = [];
    mSub: Subscription;
    uSub: Subscription;

    constructor(private http: HttpClient){}

    addMsg(msg: Msg):Observable<Msg>{
        return this.http.post(`${environment.dbUrl}/messages.json`, msg)
            .pipe(map((response: AddResponse) => {
                let addedMsg: Msg =  {
                    ...msg,
                    id: response.name
                };
                // console.log('MessagesService addMsg', addedMsg);
                this.messages.push(addedMsg);
                return addedMsg;
            }))
        // msg.id = this.messages.length + 1;
        // this.messages.push(msg);
    }

    getAll() {
        return this.http.get(`${environment.dbUrl}/messages.json`)
        .pipe(
            map((response: {[key: string]: any}) => {
                return  Object.keys(response)
                    .map(key => ({
                        ...response[key],
                        id: key
                    }));
            })
        );
    }

    updateDbLike(message: Msg):Observable<Msg>{
        return this.http.patch<Msg>(`${environment.dbUrl}/messages/${message.id}.json`, message)
    }

    setLike(msg: Msg, likes: number){
        let tmpMsg: Msg={
            ...msg,
            likes
        }
        this.uSub = this.updateDbLike(tmpMsg).subscribe(()=> {
            this.messages.find(elem => {
                return elem.id === msg.id
            }).likes = likes;
            this.sortLikes(this.messages);
        });
        

    }

    sortLikes(msgs: Msg[]): Msg[]{
         return msgs.sort((a, b) => {
            if (a.likes  > b.likes){
                return -1;
            }
            if (a.likes  < b.likes){
                return 1;
            }
            return 0
        })
    }

    ngOnDestroy(): void {
        if(this.uSub){
            this.uSub.unsubscribe();
          }
        if(this.mSub){
          this.mSub.unsubscribe();
        }
      }

    //Обновление данных из БД
      refresh(){
        this.mSub = this.getAll().subscribe(
          messages => {
            this.messages = messages;
            this.sortLikes(this.messages);
          }
        );
      }
}