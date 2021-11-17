import { LightningElement, track } from 'lwc';

export default class TabLeaveAlert extends LightningElement {

    @track confirmBoxOpened = false;
    @track lastClickTimeStamp;
    
    preventReload = (e) => {
        //prevents page reload.    
        console.log('beforeunload prevented.');     
        e.preventDefault();
        e.returnValue = 'sample value';
    }

    preventTabSwitch = (e) => {
        console.log('click detected..');
        let currentClickTimeStamp = e.timeStamp;
        //check if click is outside compo
        if(e.target.tagName === 'BODY' && 
            !this.confirmBoxOpened && 
            this.lastClickTimeStamp !== currentClickTimeStamp){

            this.lastClickTimeStamp = e.timeStamp;
            this.confirmBoxOpened = true;
            let ans = confirm('leave form filling?');
            if(!ans) {
                //if warning respected stay on the form
                this.confirmBoxOpened = false;
                e.stopPropagation();
                e.preventDefault();                  
            }else{
                //remove listeners as disconnected callback won't be executed
                //when main tabs are switched
                console.log('removing registered events as user is willing to leave form.');
                console.log(this);            
                window.removeEventListener('beforeunload', this.preventReload, true);
                document.removeEventListener('click', this.preventTabSwitch, true);
            }
        }
    }

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
        window.addEventListener('beforeunload', this.preventReload, true);            
        document.addEventListener('click', this.preventTabSwitch, true);
    }

    handleButton1() {
        console.log('handle button1.');
    }

    disconnectedCallback(){
        window.removeEventListener('beforeunload', this.preventReload, true);
        document.removeEventListener('click', this.preventTabSwitch, true);
    }

}
