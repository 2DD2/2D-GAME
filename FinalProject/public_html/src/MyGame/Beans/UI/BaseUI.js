/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global GameObject, gEngine, GameObect */

function BaseUI(renderable,showpos,hidepos){
    
    GameObject.call(this,renderable);
    
    GameObject.prototype.getXform.call(this).setPosition(this,hidepos);
    
    this.mShowPosition = showpos;
    
    this.mHidePosition = hidepos;
    
    /*
     * 当前状态
     */
    this.mState = false;
    
    this.mLinarRate = 10;
};

gEngine.Core.inheritPrototype(BaseUI,GameObject);

BaseUI.prototype.setState = function(show){
    this.mState = show;
};

BaseUI.prototype.update = function(){
    
    var trans = GameObject.prototype.getXform.call(this);
    var currentPos = trans.getPosition(this);
    if(this.mState){
        currentPos += (this.mShowPosition - currentPos) / this.mLinarRate;
        trans.setPosition(this,currentPos);
    }else{
        currentPos += (this.mHidePosition - currentPos) / this.mLinarRate;
        trans.setPosition(this,currentPos);
    }
    
    GameObject.prototype.update.call(this);
};

BaseUI.prototype.draw = function(aCamera){
    GameObject.prototype.draw.call(this,aCamera);
};

