/* File: Obstacle.js 
 * Created by 周玮皓 on 2016/8/1.
 * Obstacle是障碍物对象
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable, DefaultOptions, gManager: false */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Obstacle(spriteTexture,flag, firstXPos) {
    this.mRender = new SpriteRenderable(spriteTexture);
    if(firstXPos){
        this.FirstPos = firstXPos;
    }else{
        this.FirstPos = 25;
    }
    if(flag === 1){
        this.YPos =3.2;
    }else if(flag === -1){
          this.YPos = -3.2;
    }else{
        this.YPos = 0;
    }
     this.YPos =4.2;
    GameObject.call(this,this.mRender);
    
    this.setSpeed(gManager.DefaultOptions.mWaySpeed/2);
    this.setCurrentFrontDir(vec2.fromValues(-1, 0));
    this.getXform().setPosition(this.FirstPos,this.YPos);
    this.getXform().setSize(3,3);
    
    var r = new RigidRectangle(this.mRender.getXform(), 3,3);
    r.setMass(0.7);  // less dense than Minions
    r.setRestitution(0.3);
    this.setPhysicsComponent(r);
    
}
gEngine.Core.inheritPrototype(Obstacle, GameObject);

Obstacle.prototype.update = function () {
    GameObject.prototype.update.call(this);
    //随背景向左移动
    GameObject.prototype.update.call(this);
    if(this.getXform().getXPos()<-25){
        this.getXform().setXPos(this.FirstPos);
    }
};
Obstacle.prototype.draw = function(camera){
    GameObject.prototype.draw.call(this,camera);
};

function BlockA(blockTexture){
  
    var Block1 = new Obstacle(blockTexture,1,50);
    var Block2 = new Obstacle(blockTexture,-1,30);
    var Block3 = new Obstacle(blockTexture,1,20);
    var Block4 = new Obstacle(blockTexture,-1,40);
    
    mSet.push(Block1);
    mSet.push(Block2);
    mSet.push(Block3);
    mSet.push(Block4);
    
   return mSet;
}

function DangerB(blockTexture,n){
    var mSet = [];
    var Danger1 = new Obstacle(blockTexture,-1,40);
    var Danger2 = new Obstacle(blockTexture,1,35);
    var Danger3 = new Obstacle(blockTexture,-1,50);
    var Danger4 = new Obstacle(blockTexture,1,25);
    
    mSet.push(Danger1);
    mSet.push(Danger2);
    mSet.push(Danger3);
    mSet.push(Danger4);
    
   return mSet;
}
