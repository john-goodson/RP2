import { Component, OnChanges, Input, OnInit,
         Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'message',
    templateUrl: 'message.component.html',
    styleUrls: ['message.component.css']
})
export class MessageComponent implements OnChanges {
    @Input() message: string;
    
    counter: number =0 
    
    @Output() messageClicked: EventEmitter<string> =
        new EventEmitter<string>();

    ngOnInit(): void {
        console.log('hey... the message component initialized')
    }


    ngOnChanges(): void {
   
        this.message = this.message;
    }

    onClick(): void {
        this.messageClicked.emit(`The message ${this.message}  was clicked!`);
        this.counter++ 
        console.log('counter: ===== ' + this.counter)
    }
}
