/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 *  ========================================
 *  created by yangqihua 2016-08-01 15:13:45
 *  ========================================
 */
function AntiCommand(hero) {
    this.mHero = hero;
}

gEngine.Core.inheritPrototype(AntiCommand, Command);

AntiCommand.prototype.excute = function(){
    console.log("hero is Jump");
    this.mHero.antiJump();
}

