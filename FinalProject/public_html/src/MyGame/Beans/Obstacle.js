/* File: Obstacle.js 
 * Created by 周玮皓 on 2016/8/1.
 * Obstacle是障碍物对象
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable, DefaultOptions: false */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Obstacle(spriteTexture) {
    this.mRender = new SpriteRenderable(spriteTexture);
    this.mPos = [15,-5];
    this.mSize = (10,10);
    this.Speed = Math.random(0.2,0.5);
    GameObject.call(this,this.mRender);
}
gEngine.Core.inheritPrototype(Obstacle, GameObject);

Obstacle.prototype.update = function () {
    //随背景向左移动
    this.getXform().setPosition(this.getXform().getXPos()-this.Speed , -5);
    GameObject.prototype.update.call(this);
};
Obstacle.prototype.draw = function(camera){
    GameObject.prototype.draw(this,camera);
};
