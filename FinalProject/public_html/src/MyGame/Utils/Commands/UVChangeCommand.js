/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global Command, gEngine */

function UVChangeCommand(){
    
    /*
     * 选取的目标方块
     */
    this.mTargetSquare = null;
    
    /*
     * 所要改变的对象
     */
    this.mTargetSprite = null;
}

gEngine.Core.inheritPrototype(UVChangeCommand,Command);

UVChangeCommand.prototype.initEvent = function(targetSquare,targetSprite){
    this.mTargetSquare = targetSquare;
    this.mTargetSprite = targetSprite;
};


/*
 * 重写excute函数
 */
UVChangeCommand.prototype.excute = function(){
    
    //this.mTargetSprite.setSpriteSequence();
    
    
    
    
};