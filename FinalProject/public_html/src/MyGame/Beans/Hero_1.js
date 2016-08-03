// By lijilan

/* File: Hero.js 
 *
 * Creates and initializes the Hero ()
 * overrides the update function of GameObject to define
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable, gManager: false */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


function Hero(renderableObj) {
 
    this.mRender = renderableObj;
    this.mGravity = -0.02;
    
    this.Top = 2.5;
    this.Bot = -2.5;

    this.mFirst = 0.2;
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
    
    if (this.getXform().getYPos() < this.Bot){
        this.getXform().setYPos(this.Bot);
        this.mOnGround = true;
    }else if(this.getXform().getYPos()> this.Top){
         this.getXform().setYPos(this.Top);
        this.mOnGround = true;
    }
    if (this.mOnGround) {
        this.mSpeed = 0;
        if(this.mGravity * this.getXform().getYPos() < 0 ){  //出现粘滞
                this.getXform().setYPos( this.getXform().getYPos() - this.mGravity * 5 );
        }
    } else {
        this.mSpeed += this.mGravity;
    } 
    if(this.getXform().getXPos()< -20 ){
        this.Die();
    }
    
    var hBbox = this.getBBox();
    var block = gManager.ObjectPool.getObjectsByLayer(3).mSet;
    
    for(var i =0 ;i < block.length; i++){
         if(hBbox.intersectsBound(block[i].getBBox())){
             var offsetX = block[i].getXform().getWidth() ;
             this.getXform().setXPos(block[i].getXform().getXPos() -  offsetX);
         }
     }
     var danger = gManager.ObjectPool.getObjectsByLayer(5).mSet;
      for(var i =0 ;i < danger.length; i++){
         if(hBbox.intersectsBound(danger[i].getBBox())){
             this.Die();
         }
     }
    
    GameObject.prototype.update.call(this);
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
   this.resetFirstSpeed();
};

Hero.prototype.antiJump= function () {  
    if(this.mGravity < 0){
     this.getXform().setRotationInDegree(180);    
    }else{
     this.getXform().setRotationInDegree(0);
    }

    if(this.mOnGround){
        if(this.mGravity > 0){
                this.setSpeed(-this.mFirst);
           }else{
                this.setSpeed(this.mFirst);
           }   
    }
   this.mOnGround = false;
    
    this.mGravity = - this.mGravity;
};

Hero.prototype.Die = function () {
   gEngine.GameLoop.stop();
};

Hero.prototype.setOnGround = function (bool) {
    this.mOnGround = bool;
};
Hero.prototype.resetFirstSpeed = function(){
    this.mFirst = 0.2;
};
Hero.prototype.IncFirstSpeed = function(){
    if( this.mFirst < 0.40){
         this.mFirst = this.mFirst + 0.01;
    }
};

Hero.prototype.moveX=function (x){
    this.getXform().setXPos(x);
};

//Hero.protype.setLand = function(up,down){
//    this.Top = up;
//    this.Bot = down;
//};