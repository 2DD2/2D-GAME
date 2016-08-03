/* File: UIButton.js 
 * Created by 周玮皓 2016/8/2
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


function UIButton(renderableObj, x, y, w, h) {
    this.mRender = renderableObj;
    this.posX = x;  this.posY = y;  this.width = w; this.height = h;
    this.mRender.getXform().setPosition(this.posX, this.posY);
    this.mRender.getXform().setSize(this.width, this.height);
    
    GameObject.call(this,this.mRender);
}

gEngine.Core.inheritPrototype(UIButton, GameObject);

UIButton.prototype.update = function () {
    GameObject.prototype.update.call(this);
};
UIButton.prototype.draw = function (camera) {
    GameObject.prototype.draw.call(this,camera);
};