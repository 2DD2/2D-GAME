
/* global Command */

function JumpPressCom(hero) {
    this.mHero = hero;
};

gEngine.Core.inheritPrototype(JumpPressCom, Command);
 
JumpPressCom.prototype.excute = function(){
    this.mHero.IncFirstSpeed();
};