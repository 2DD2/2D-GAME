


/* global Command, gEngine */

function Move(){
    
    /*
     * 目标
     */
    this.mTarget = null;
    
    this.mSpeed = [];
};

gEngine.Core.inheritPrototype(Move,Command);

Move.prototype.initEvent = function(target,speed){
    this.mTarget = target;
    this.mSpeed = speed;
};

Move.prototype.excute = function(){ 
    this.mTarget.moveX(this.mSpeed[0]);
    this.mTarget.moveY(this.mSpeed[1]);
};