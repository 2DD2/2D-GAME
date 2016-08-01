/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global Command, gEngine, gManager */
function Show(obj,obj2,obj3,obj4){  //id in the objectpool
      this.mTarget1 = obj;
      this.mTarget2 = obj2;
      this.mTarget3 = obj3;
      this.mTarget4 = obj4;
      this.mTag = false;
};

gEngine.Core.inheritPrototype(Show,Command);

Show.prototype.excute = function(){ 
    
    
    if(this.mTag){
        gManager.ObjectPool.removeObject(this.mTarget1);
        gManager.ObjectPool.removeObject(this.mTarget3);
        gManager.ObjectPool.addObject(this.mTarget2);
        gManager.ObjectPool.addObject(this.mTarget4);
    }else{
        gManager.ObjectPool.removeObject(this.mTarget2);
        gManager.ObjectPool.removeObject(this.mTarget4);
        gManager.ObjectPool.addObject(this.mTarget1);
        gManager.ObjectPool.addObject(this.mTarget3);
    }
    this.mTag = !this.mTag;
    
//    this.mTarget.setCount();
//    this.mTarget.setVisible(true);
};