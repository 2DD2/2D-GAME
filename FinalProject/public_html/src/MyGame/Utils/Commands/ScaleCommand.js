/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global Command, gEngine, vec2 */

function ScaleCommand(target,deltaVec){
    this.mTarget = target;
    this.mDeltaVec = deltaVec;
}

gEngine.Core.inheritPrototype(ScaleCommand,Command);

ScaleCommand.prototype.excute = function(){
    
    // TODO:注意传入的对象
    /*
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     */
    this.mTarget.setWidth(this.mTarget.getWidth() + this.mDeltaVec[0]);
    this.mTarget.setHeight(this.mTarget.getHeight() + this.mDeltaVec[1]);
    
};