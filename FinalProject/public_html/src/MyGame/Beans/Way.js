/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Way(spriteTexture, posX) {

    this.mBrain = new SpriteRenderable(spriteTexture);
    this.mBrain.setColor([1, 1, 1, 0]);
    this.mBrain.getXform().setPosition(posX, 0);
    this.mBrain.getXform().setSize(10, 10);

    GameObject.call(this, this.mBrain);

    this.setCurrentFrontDir(vec2.fromValues(-1, 0));
    this.setSpeed(0.20);
    this.posY = 0;

    var rigidShape = new RigidRectangle(this.getXform(), 30, 1.5);
    rigidShape.setMass(0);  // ensures no movements!
    rigidShape.setDrawBounds(true);
    rigidShape.setColor([1, 0.2, 0.2, 1]);
    rigidShape.mSides.getXform().setYPos(-4,0);
    this.setPhysicsComponent(rigidShape);

}
gEngine.Core.inheritPrototype(Way, GameObject);

//Way.prototype.setPositionX(posX){
//    this.mBrain.getXform().setPosition(15, 0);
//    
//}

Way.prototype.update = function () {
    GameObject.prototype.update.call(this);  // default moving forward
    var xf = this.getXform();
    if (xf.getPosition()[0] < -25) {
//        this.posY = (3*Math.random()-1)*15/16;    //-1---1
//        console.log(this.posY);
        xf.setPosition(25, this.posY);
    }
};
