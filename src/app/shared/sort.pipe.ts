import { Pipe, PipeTransform } from "@angular/core";
import { Msg } from "./interfaces";

@Pipe({
    name: 'sortMessages'
})
export class SortPipe implements PipeTransform{
    transform(messages: Msg[]): Msg[] {
        return messages.sort((a, b) => {
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
