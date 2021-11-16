import { LightningElement, track } from 'lwc';

export default class TabLeaveAlert extends LightningElement {

    @track confirmBoxOpened = false;
    @track lastClickTimeStamp;

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
            console.log('beforeunload event.');     
            event.preventDefault();
            event.returnValue = 'sample value';
        });

        //todo: remove below event listener on submit button or proper action.        
        document.addEventListener("click", (e) =>{
            console.log(e);
            let currentClickTimeStamp = e.timeStamp;
            //check if click is outside compo
            if(e.target.tagName === 'BODY' && 
                !this.confirmBoxOpened && 
                this.lastClickTimeStamp !== currentClickTimeStamp){

                this.lastClickTimeStamp = e.timeStamp;
                this.confirmBoxOpened = true;
                let ans = confirm('leave form filling?');
                if(!ans) {
                    this.confirmBoxOpened = false;
                    e.stopPropagation();
                    e.preventDefault();                  
                }                
            }
    	}, true);
    }

    handleButton1() {
        console.log('handle button1.');
    }

}
