/* File: Obstacle.js 
 * Created by 周玮皓 on 2016/8/1.
 * Obstacle是障碍物对象
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable, DefaultOptions: false */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Obstacle(spriteTexture,flag) {
    this.mRender = new SpriteRenderable(spriteTexture);
    //this.mSize = [10,10];
    this.XPos = Math.random(5,15)+20;
        
    if(flag > 0){
           this.YPos =3.2;
        }else{
          this.YPos = -3.2;
    }

    GameObject.call(this,this.mRender);
    this.setSpeed(0.05);
    this.setCurrentFrontDir(vec2.fromValues(-1, 0));
    this.getXform().setPosition(this.XPos,this.YPos);
    this.getXform().setSize(1,1);
}
gEngine.Core.inheritPrototype(Obstacle, GameObject);

Obstacle.prototype.update = function () {
    GameObject.prototype.update.call(this);
    //随背景向左移动
    GameObject.prototype.update.call(this);
    if(this.getXform().getXPos()<-25){
        this.getXform().setXPos(Math.random(0,1)*20+20);
    }
};
Obstacle.prototype.draw = function(camera){
    GameObject.prototype.draw.call(this,camera);
};

function ObstacleSet(spriteTexture,n){
    var mSet = [];
    for(var i =0 ;i<n;i++){
        var temp = new ObstacleSet(spriteTexture);
        mSet.push(temp);
    }
   return mSet;
}