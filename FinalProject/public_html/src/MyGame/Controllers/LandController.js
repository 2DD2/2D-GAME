/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global gEngine, GameObjectSet */
/* 场景控制器*/
function LandController(sceneLoader){    
    
    //list of lands
    this.mLands = [];
    
    this.mSceneLoader = sceneLoader;
    for(var i = 1; i <= this.mSceneLoader.GetNumber("LAND_Num");i++){
        for(var k = 0; k < 2; k++){
            var land = sceneLoader.LoadBG("LAND_" + i);
            if(k === 0) land.getXform().setPosition(0,0);
            else land.getXform().setPosition(land.getXform().getWidth(),0);
            
            this.mLands.push(land);
        }
    }
}


LandController.prototype.update = function(){
   
    for(var i = 0; i < this.mSceneLoader.GetNumber("LAND_Num") * 2;i += 2){
        for(var k = 0; k < 4; k++){
            if(this.mLands[i + k].getXform().getXPos() < -80) this.mLands[i+k].getXform().setXPos(79.5);
            
            this.mLands[i + k].getXform().setXPos(this.mLands[i+k].getXform().getXPos() - 0.1);
        }
    }

    for(var i = 0 ; i < this.mLands.length ; i++){
        if(this.mLands[i])
            this.mLands[i].update();
    }
};

LandController.prototype.draw = function (aCamera) {
    for(var i = 0 ; i < this.mLands.length ; i++){
        if(this.mLands[i])
            this.mLands[i].draw(aCamera);
    }
};