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
    
    var bg1 = new GameObject(new TextureRenderable(BgPath));
    bg1.getXform().setPosition(0,0);
    bg1.getXform().setSize(80,20);
    
    this.mBackgrounds.push(bg1);
    
    var bg2 = new GameObject(new TextureRenderable(BgPath));
    bg2.getXform().setPosition(80,0);
    bg2.getXform().setSize(80,20);
    
    this.mBackgrounds.push(bg2);
}


BGController.prototype.update = function(){
    
    if(this.mBackgrounds[0].getXform().getXPos() < -80) this.mBackgrounds[0].getXform().setXPos(79.5);
    if(this.mBackgrounds[1].getXform().getXPos() < -80) this.mBackgrounds[1].getXform().setXPos(79.5);
    this.mBackgrounds[0].getXform().setXPos(this.mBackgrounds[0].getXform().getXPos() - 0.1);
    this.mBackgrounds[1].getXform().setXPos(this.mBackgrounds[1].getXform().getXPos() - 0.1);
    

    
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