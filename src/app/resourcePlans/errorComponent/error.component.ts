import { Component, OnChanges, Input, OnInit,
         Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'error',
    templateUrl: 'error.component.html',
    styleUrls: ['error.component.css']
})
export class ErrorComponent implements OnChanges {
    @Input() error: string;
    
    counter: number =0 
    
    @Output() errorClicked: EventEmitter<string> =
        new EventEmitter<string>();

    ngOnInit(): void {
        console.log('hey... the error component initialized')
    }


    ngOnChanges(): void {
   
        this.error = this.error;
    }

    onClick(): void {
        this.errorClicked.emit(`The error ${this.error}  was clicked!`);
        this.counter++ 
        console.log('counter: ===== ' + this.counter)
    }
}
