import { LightningElement } from 'lwc';

export default class TabLeaveAlert extends LightningElement {

    handleInput(event) {
        if (event.target.name == 'input1') {
            console.log('handle input1.');
        }
        if (event.target.name == 'input2') {
            console.log('handle input2.');
        }
        if (event.target.name == 'input3') {
            console.log('handle input3.');
        }
        this.dispatchEvent(new CustomEvent('childformmodified'));
        
        //todo: remove below event listener on submit button or proper action.
        //so that same functionality don't execute at un-wanted event
        window.addEventListener('beforeunload', (event) => {
            //prevents page reload.         
            event.preventDefault();
            event.returnValue = 'sample value';
        });
    }

    handleButton1() {
        console.log('handle button1.');
    }

}