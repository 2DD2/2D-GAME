


/* global Command, gEngine */

function Move(target,speed){
    
    /*
     * 目标
     */
    this.mTarget = target;
    
    this.mSpeed = speed;
};

gEngine.Core.inheritPrototype(Move,Command);

Move.prototype.excute = function(){ 
    this.mTarget.moveX(this.mSpeed[0]);
    this.mTarget.moveY(this.mSpeed[1]);
};