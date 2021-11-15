import { LightningElement, track } from 'lwc';

export default class IqviaWrapper1 extends LightningElement {

    @track currentSelection = 'item_2';
    @track item_1_selected =false;
    @track item_2_selected=true;
    @track item_3_selected=false;
    @track item_4_selected=false;
    @track item_5_selected=false;
    @track child_form_modified = false;

    constructor() {
        super();
    }

    handleNavItemSelection(event){
        if (this.child_form_modified){            
            let ans = confirm('Form being edited, If tab is changed data will be lost. Continue?');
            if(!ans){
                return;
            }
            if(ans){
                this.child_form_modified = false;
            }
        }
        this.template.querySelector('[name="'+  this.currentSelection +'"]').parentNode.classList.remove('slds-is-active');        
        this.currentSelection = event.target.name;
        this.template.querySelector('[name="' + this.currentSelection +'"]').parentNode.classList.add('slds-is-active');

        this.item_1_selected = this.currentSelection == 'item_1'?true:false;
        this.item_2_selected = this.currentSelection == 'item_2'?true:false;
        this.item_3_selected = this.currentSelection == 'item_3'?true:false;
        this.item_4_selected = this.currentSelection == 'item_4'?true:false;
        this.item_5_selected = this.currentSelection == 'item_5'?true:false;
    }

    childFormModified(){
        this.child_form_modified = true;
    }
}