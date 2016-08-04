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
        this.YPos =4.2;
    }else if(flag === -1){
          this.YPos = -4.2;
    }else{
        this.YPos = 0;
    }
    
    GameObject.call(this,this.mRender);
    
    this.setSpeed(gManager.DefaultOptions.mWaySpeed/2);
    this.setCurrentFrontDir(vec2.fromValues(-1, 0));
    this.getXform().setPosition(this.FirstPos,this.YPos);
    this.getXform().setSize(3,3);
    
    //刚体
    var r = new RigidRectangle(this.mRender.getXform(), 2.8,2.8);
    r.setMass(0.5);  // less dense than Minions
    r.setRestitution(10);
    
    // 重力方向
    if(flag === 1){
        r.setAcceleration([0,-50]);
    }else if(flag === -1){
         r.setAcceleration([0,50]);
    }else{
        r.setAcceleration([0,50]);
    }
    
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


function DangerB(blockTexture){
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
