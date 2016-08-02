/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global gMananger */

function FGController(sceneLoader){    
    
    /*
     * 背景列表
     */
    this.mForegrounds = [];
    
    this.mSceneLoader = sceneLoader;
    
    this.mMaxParticleNumber = 100;
    
    this.mCurrentParticleNumber = 0;

    this.mParticlePath = sceneLoader.GetNode("FGP_1","Rp");
    
    this.mInterval = 5;
    
    this.mReusePoolName = "particle";
    
}


FGController.prototype.update = function(){
    if(mInterval === 5 && mMaxParticleNumber > mCurrentParticleNumber){
        if(gMananger.ObjectPool.getReuseObject(this.mReusePoolName))
        var par = new GameObject(new TextureRenderable(this.mParticlePath));
        gMananger.ObjectPool.addObject()
    }
};

FGController.prototype.draw = function (aCamera) {

};