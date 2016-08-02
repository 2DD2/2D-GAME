/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global gMananger, gManager */

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
    
    var parSet = gMananger.ObjectPool.getObjectsByLayer(this.mParticleLayer);
    
    if(mInterval === 5 && mMaxParticleNumber > parSet.size()){
        
        var par = gMananger.ObjectPool.getReuseObject(this.mReusePoolName);
        
        if(!par) par = new GameObject(new TextureRenderable(this.mParticlePath));
        
        par.getXform().setPosition(gManager.DefaultOptions.SCREEN_HEIGHT / 2 * Math.random() - gManager.DefaultOptions.SCREEN_HEIGHT * Math.random());
        par.getSpeed(3 * Math.random(),Math.random());
        gMananger.ObjectPool.addObject(par,this.mParticleLayer);

    }
    
    
    for(var i = 0 ; i < parSet.size();i++){
        var par = parSet.getObjectAt(i);
        if(par.getXform().getXPos() < gManager.DefaultOptions.SCREEN_WIDTH / 2 || par.getXform().getXPos() < gManager.DefaultOptions.SCREEN_HEIGHT / 2)
            gMananger.ObjectPool.addtoReusePoolandRemove(par,this.mReusePoolName,this.mParticleLayer);
    }
    
    
    
    
    
    
};

FGController.prototype.draw = function (aCamera) {

};