/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global GameObject, gEngine */

function Snow(renderable){
    GameObject.call(this,renderable);
    this.mSpeed = [0,0];
}
gEngine.Core.inheritPrototype(Snow,GameObject);

Snow.prototype.setspeed = function(speed){
    this.mSpeed = speed;
};

Snow.prototype.update = function(){
    
    var trans = GameObject.prototype.getXform.call(this);
    trans.incXPosBy(this,this.mSpeed[0]);
    trans.incYPosBy(this,this.mSpeed[1]);
    
    GameObject.prototype.update.call(this);
};

Snow.prototype.draw = function(aCamera){
    GameObject.prototype.draw.call(this,aCamera);
};

