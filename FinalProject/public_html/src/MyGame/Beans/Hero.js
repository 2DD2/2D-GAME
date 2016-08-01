// By lijilan

/* File: Hero.js 
 *
 * Creates and initializes the Hero ()
 * overrides the update function of GameObject to define
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Hero(spriteTexture) {
    this.mRender = new SpriteAnimateRenderable(spriteTexture);
    this.mPos=[0,0];
    this.mSize=(10,10);
    this.mGravity = -1;
    this.mSpeed = 0;
    this.mDir = 0;
    
    this.mOnGround = true;
    
//    this.mRender.setElementPixelPositions(0, 10, 0, 10);    
    this.setCurrentFrontDir(this.mDir);
    
    GameObject.call(this, this.mRender);
}
gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.update = function () {
    // control by WASD
    
   
    if(this.mOnGround){
        this.mSpeed=0;
    }else{
        this.mSpeed = this.mSpeed + this.mGravity;
    }
    
};
Hero.prototype.draw = function(camera){
    
};

Hero.prototype.Jump = function(){ // y: current Ypos ,hight: the hight to jump
    this.mSpeed = 10;
};

Hero.prototype.Anti = function(){
    this.mGravity = - this.mGravity;
    this.mDir = - this.mDir;
    this.setCurrentFrontDir(this.mDir);
};

Hero.prototype.Die = function(){
    
};

Hero.prototype.setOnGround = function( bool ){
    this.mOnGround = bool;
};

Hero.prototype.getPos = function(){
    return this.mPos;
};

Hero.prototype.setPos = function(x,y){
    this.mPos = [x,y];
};