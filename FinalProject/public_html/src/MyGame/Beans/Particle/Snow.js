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
Snow.prototype.getspeed = function(){
    return this.mSpeed;
};

Snow.prototype.getXform = function(){
    return GameObject.prototype.getXform.call(this);
};

Snow.prototype.update = function(){
    GameObject.prototype.update.call(this);
    
};

Snow.prototype.draw = function(aCamera){
    GameObject.prototype.draw.call(this,aCamera);
};

