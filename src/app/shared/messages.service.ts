import { Injectable } from "@angular/core";

import { Msg } from "./interfaces";

@Injectable({providedIn: 'root'})
export class MessagesService{
    messages: Msg[] = [{
        text: 'Question 1',
        id: 1,
        likes: 5
    },
    {
        text: 'Question 2',
        id: 2,
        likes: 120
    },
    {
        text: 'Question 3',
        id: 3,
        likes: 10
    },
    {
        text: 'Question 4',
        id: 4,
        likes: 120
    },
    {
        text: 'Question 5',
        id: 5,
        likes: 10
    }];

    constructor(){}

    addMsg(msg: Msg){
        // return this.http.post(`${environment.dbUrl}/messages.json`, msg)
        //     .pipe(map((response: AddResponse) => {
        //         return {
        //             ...msg,
        //             id: response.name
        //         }
        //     }))
        msg.id = this.messages.length + 1;
        this.messages.push(msg);
    }

    getAll() {
        return this.messages;
    }

    setLike(id: number, likes: number){
        this.messages.find(elem => {
            return elem.id === id
        }).likes = likes;
        this.sortLikes();

    }

    sortLikes(){
        this.messages = this.messages.sort((a, b) => {
            if (a.likes  > b.likes){
                return -1;
            }
            if (a.likes  < b.likes){
                return 1;
            }
            return 0
        })
    }
}