/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global gEngine, GameObjectSet */

function BGController(BgPath){    
    
    /*
     * 背景列表
     */
    this.mBackgrounds = [];
    
    var bg = new GameObject(new TextureRenderable(BgPath));
    bg.getXform().setPosition(0,0);
    bg.getXform().setSize(20,20);
    
    this.mBackgrounds.push(bg);
}


BGController.prototype.update = function(){
    
    this.mBackgrounds[0].getXform().setXPos(this.mBackgrounds[0].getXform().getXPos() - 0.01);
    
    for(var i = 0 ; i < this.mBackgrounds.length ; i++){
        if(this.mBackgrounds[i])
            this.mBackgrounds[i].update();
    }
};

BGController.prototype.draw = function (aCamera) {
    for(var i = 0 ; i < this.mBackgrounds.length ; i++){
        if(this.mBackgrounds[i])
            this.mBackgrounds[i].draw(aCamera);
    }
};