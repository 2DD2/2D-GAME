// By lijilan

/* File: Hero.js 
 *
 * Creates and initializes the Hero ()
 * overrides the update function of GameObject to define
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Hero(renderableObj) {
 
    this.mRender = renderableObj;
    this.mGravity = -0.02;

    this.mFirst = 0.5;
    this.mOnGround = true;
//    this.mRender.setElementPixelPositions(0, 10, 0, 10);    
    this.setCurrentFrontDir(0,1);
  //  this.incSpeedBy(3);
    this.mRender.getXform().setSize(1.5,3);
    this.mRender.getXform().setPosition(0, -5);

    GameObject.call(this,this.mRender);
}

gEngine.Core.inheritPrototype(Hero, GameObject);


Hero.prototype.update = function () {
    GameObject.prototype.update.call(this);
    if (this.getXform().getYPos() < -5.0){
        this.getXform().setYPos(-5);
        this.mOnGround = true;
    }else if(this.getXform().getYPos()>5.0){
         this.getXform().setYPos(5);
        this.mOnGround = true;
    }
    if (this.mOnGround) {
        this.mSpeed = 0;
    } else {
        this.mSpeed += this.mGravity;
    } 
    
};
Hero.prototype.draw = function (camera) {
    GameObject.prototype.draw.call(this,camera);
};

Hero.prototype.Jump = function () { // y: current Ypos ,hight: the hight to jump
    if(this.mOnGround){
        if(this.mGravity > 0){
                this.setSpeed(-this.mFirst);
           }else{
                this.setSpeed(this.mFirst);
           }   
    }
   this.mOnGround = false;
};

Hero.prototype.antiJump= function () {  
    if(this.mGravity < 0){
     this.getXform().setRotationInDegree(180);    
    }else{
     this.getXform().setRotationInDegree(0);
    }
    var w=this.getXform().getWidth();
    var h=this.getXform().getHeight();
    this.getXform().setSize(-w,h);

    this.Jump();
    
    this.mGravity = - this.mGravity;
};

Hero.prototype.Die = function () {

};

Hero.prototype.setOnGround = function (bool) {
    this.mOnGround = bool;
};

Hero.prototype.IncFirstSpeed = function(){
    this.mFirst = this.mFirst + 0.05;
};


