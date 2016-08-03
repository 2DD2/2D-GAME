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
  
    this.kXDelta = 0.2;
    this.kYDelta = 2.0;
    
    this.mGravity = -1;
    
    this.mRender.getXform().setSize(1.5,3);
    this.mRender.getXform().setYPos(4);
    
    GameObject.call(this,this.mRender);
        
    this.mRigid = new RigidRectangle(this.mRender.getXform(), 1.5, 3);
    this.mRigid.setMass(0.7);  // less dense than Minions
    this.mRigid.setRestitution(0.3);
    //this.getPhysicsComponent().setAcceleration([0,-10]);
    this.setPhysicsComponent(this.mRigid);   
}

gEngine.Core.inheritPrototype(Hero, GameObject);
Hero.prototype.update = function () {
    if(this.getXform().getXPos()< -20 || this.getXform().getYPos()< -10 || this.getXform().getYPos()> 10){
        this.Die();
    }
    
    var v = this.getPhysicsComponent().getVelocity();
    if ( gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)){
        v[0] = -2;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right && this.getXform().getXPos <15 )) {
        v[0] = 2;
    }

    GameObject.prototype.update.call(this);
};
Hero.prototype.draw = function (camera) {
    
    GameObject.prototype.draw.call(this,camera);
};
 Hero.prototype.Die = function () {
     
   gEngine.GameLoop.stop();
};

Hero.prototype.Jump = function () { // y: current Ypos ,hight: the hight to jump
    var v = this.getPhysicsComponent().getVelocity();
    v[1] = 20 *( -this.mGravity );
};
     
Hero.prototype.antiJump= function () {  
   var g = this.getPhysicsComponent().getAcceleration();
   var g1 = [g[0], -g[1]];
   this.getPhysicsComponent().setAcceleration(g1);
   
   var w= this.getXform().getWidth();
   this.getXform().setWidth(-w);
   
   if(this.mGravity < 0){
     this.getXform().setRotationInDegree(180);    
    }else{
     this.getXform().setRotationInDegree(0);
    }
    this.mGravity = -this.mGravity ;
};
