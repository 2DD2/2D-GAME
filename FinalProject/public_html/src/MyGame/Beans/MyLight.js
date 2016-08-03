/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global Light, gEngine */

function MyLight(light,target){
    
    this.mLight = light;
    this.mTarget = target;
    this.mLinarRate = 30;
};

gEngine.Core.inheritPrototype(MyLight,Light);

MyLight.prototype.draw = function(aCamera){
};

MyLight.prototype.update = function(){
    
    var current = this.mTarget.getXform().getPosition();
    current[0] += 20;
    var deltaX = this.mTarget[0] - current[0];
    var deltaY = this.mTarget[0] - current[0];
    
   
    
    this.mLight.set2DPosition();
};