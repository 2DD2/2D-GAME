/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global gMananger, gManager, vec2 */

function FGController(sceneLoader){    
    
    /*
     * 背景列表
     */
    this.mForegrounds = [];
    
    this.mSceneLoader = sceneLoader;
    
    this.mMaxParticleNumber = 100;

    this.mParticlePath = sceneLoader.GetNode("FGP_1","Rp");
    
    this.mInterval = 5;
    
    this.mParticleLayer = 8;
    
    this.mReusePoolName = "particle";
    
}


FGController.prototype.update = function(){
    
    var parSet = gManager.ObjectPool.getObjectsByLayer(this.mParticleLayer);
    if(this.mInterval === 5 && this.mMaxParticleNumber > parSet.size()){
        
        var par = gManager.ObjectPool.getReuseObject(this.mReusePoolName);
        
        if(!par) par = new Snow(new TextureRenderable(this.mParticlePath));
        
        par.getXform().setPosition(gManager.DefaultOptions.FULL_SCREEN_WCWIDTH / 2,
                                   5 + gManager.DefaultOptions.FULL_SCREEN_WCWIDTH / 4 * Math.random() - gManager.DefaultOptions.FULL_SCREEN_WCWIDTH / 2 * Math.random());
        par.setspeed([-0.3 * Math.random(),-0.1 * Math.random()]);
        gManager.ObjectPool.addObject(par,this.mParticleLayer);
        console.log(par.getXform().getYPos());
    }
    
    for(var i = 0 ; i < parSet.size();i++){
        var par = parSet.getObjectAt(i);
        if(par.getXform().getXPos() < -gManager.DefaultOptions.SCREEN_WIDTH / 2 || par.getXform().getXPos() < -gManager.DefaultOptions.SCREEN_HEIGHT / 2)
            gManager.ObjectPool.addtoReusePoolandRemove(par,this.mReusePoolName,this.mParticleLayer);
    }
};

FGController.prototype.draw = function (aCamera) {
    
};