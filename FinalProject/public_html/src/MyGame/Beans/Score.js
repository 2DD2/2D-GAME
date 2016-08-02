/* File: Score.js 
 * Created by 周玮皓 2016/8/2
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


function Score(renderableObj) {
 
    this.mRender = renderableObj;
    this.mRender.getXform().setSize(1.5,3);
    this.mRender.getXform().setPosition(0, -5);

    GameObject.call(this,this.mRender);
}

gEngine.Core.inheritPrototype(Score, GameObject);


Score.prototype.update = function () {
    GameObject.prototype.update.call(this);
};
Score.prototype.draw = function (camera) {
    GameObject.prototype.draw.call(this,camera);
};