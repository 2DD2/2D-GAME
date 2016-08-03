/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global gManager */

function ShowControlCommand(){
    this.mCurrentState = gManager.DefaultOptions.getIsFirst();
};

ShowControlCommand.prototype.excute = function(){
    if(this.mCurrentState){
        this.mCurrentState = !this.mCurrentState;
        var ui = gManager.UIManager.getElementbyNum(1);
        ui.setState(this.mCurrentState);

    }else{
        this.mCurrentState = !this.mCurrentState;
        var ui = gManager.UIManager.getElementbyNum(1);
        ui.setState(this.mCurrentState);
    }
};

