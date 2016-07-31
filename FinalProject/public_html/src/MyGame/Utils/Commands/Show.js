/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global Command, gEngine */
function Show(obj){  //id in the objectpool
      this.mTarget = obj;
};

gEngine.Core.inheritPrototype(Show,Command);

Show.prototype.excute = function(){ 
     console.log("excute");
   
    this.mTarget.setCount();
    this.mTarget.setVisible(true);
};