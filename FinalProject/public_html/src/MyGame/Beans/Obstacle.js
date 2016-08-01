/* File: Obstacle.js 
 * Created by 周玮皓 on 2016/8/1.
 * Obstacle是障碍物对象
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable, DefaultOptions: false */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Obstacle(spriteTexture) {
    this.mRender = new SpriteRenderable(spriteTexture);
    this.mPos = [0,0];
    this.mSize = (10,10);
    this.mSpeed = DefaultOptions.mSpeed;
    
    GameObject.call(this, this.mRender);
}
gEngine.Core.inheritPrototype(Obstacle, GameObject);

Obstacle.prototype.update = function () {
    //随背景向左移动
    this.mPos[0] -= this.mSpeed; 
};
Obstacle.prototype.draw = function(camera){
    
};

Obstacle.prototype.getPos = function(){
    return this.mPos;
};

Obstacle.prototype.setPos = function(x,y){
    this.mPos = [x,y];
};