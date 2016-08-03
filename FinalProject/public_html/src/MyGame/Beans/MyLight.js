/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global Light, gEngine */

function MyLight(target){
    
    this.mLight = new Light();
    this.mLight.setColor([0.8,0.6,0.0,1.0]);
    this.mLight.setXPos(0);
    this.mLight.setYPos(0);
    this.mLight.setZPos(2);
    this.mLight.setNear(20);
    this.mLight.setFar(40);
    this.mLight.setIntensity(10);
    
    this.mTarget = target;
    this.mLinarRate = 30;
};

gEngine.Core.inheritPrototype(MyLight,Light);

MyLight.prototype.getLight = function(){
    return this.mLight;
};

MyLight.prototype.draw = function(aCamera){
    
};

MyLight.prototype.update = function(){
    
    var current = this.mLight.getPosition();
    var target = this.mTarget.getXform().getPosition();
    var deltaX = target[0] - current[0] - 23;
    var deltaY = target[1] - current[1];

    console.log(current[0]);
    if(Math.abs(deltaX) > 0.1 || Math.abs(deltaY) > 0.1){
        this.mLight.set2DPosition([current[0] + deltaX / this.mLinarRate,current[1] + deltaY / this.mLinarRate]);
    }
};