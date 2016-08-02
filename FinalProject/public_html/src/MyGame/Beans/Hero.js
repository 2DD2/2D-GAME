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
    this.mGravity = -0.08;

    this.mOnGround = true;
//    this.mRender.setElementPixelPositions(0, 10, 0, 10);    
    this.setCurrentFrontDir(0,1);
  //  this.incSpeedBy(3);
    this.mRender.getXform().setSize(1.5,3);
    this.mRender.getXform().setPosition(0, -4.9);

    GameObject.call(this,this.mRender);
}

gEngine.Core.inheritPrototype(Hero, GameObject);


Hero.prototype.update = function () {
    GameObject.prototype.update.call(this);
    if (this.getXform().getYPos() < -5 || this.getXform().getYPos()>5){
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
                this.setSpeed(-0.8);
           }else{
                this.setSpeed(0.8);
           }
           this.mOnGround = false;
    }

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
 
    console.log(this.getXform().getRotationInDegree());
    this.Jump();
    this.mGravity = - this.mGravity;
};

Hero.prototype.Die = function () {

};

Hero.prototype.setOnGround = function (bool) {
    this.mOnGround = bool;
};



