/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global Command, gEngine */
function Hide(){  //id in the objectpool
    this.mTargetID = null;
};

gEngine.Core.inheritPrototype(Hide,Command);

Hide.prototype.initEvent = function(id,obj){ 
    this.mTargetID = id;
    this.mTarget= obj;
};
Hide.prototype.excute = function(){ 
    gManager.ObjectPool.resetState(this.mTargetID);

};