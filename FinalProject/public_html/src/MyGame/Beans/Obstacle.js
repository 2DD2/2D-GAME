/* File: Obstacle.js 
 * Created by 周玮皓 on 2016/8/1.
 * Obstacle是障碍物对象
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable, DefaultOptions: false */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Obstacle(spriteTexture) {
    this.mRender = new SpriteRenderable(spriteTexture);
    this.mSize = [10,10];
    //this.Speed = Math.random(0,1)*0.2+0.2;
    this.Speed = 0.1;
    this.XPos = Math.random(5,15)+10;
    this.YPos = function(){
        var flag= Math.random(0,1);
        if(flag -0.5 > 0){
            return gManager.DefaultOptions.up;
        }else{
            return gManager.DefaultOptions.down;
        }
    };
    
    GameObject.call(this,this.mRender);
    
    this.mRender.getXform().setPosition(10,-5);
}
gEngine.Core.inheritPrototype(Obstacle, GameObject);

Obstacle.prototype.update = function () {
    //随背景向左移动
    this.getXform().setXPos(this.getXform().getXPos()-this.Speed);
    GameObject.prototype.update.call(this);
    if(this.getXform().getXPos()<-20){
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