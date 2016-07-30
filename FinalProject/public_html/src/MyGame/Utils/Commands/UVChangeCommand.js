/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global Command, gEngine, vec2, SpriteAnimateRenderable */

function UVChangeCommand(){
    
    /*
     * 为了完成作业这里把坐标和大小写死了
     */
    this.mCameraSize = [800,400];
    
    this.mTextureSize = [1024,512];
    
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
    
    var frameNumber = 0;
    var oringeVPCoord = this._WCCoordtoTexCoord(this.mTargetSquare.getXPos(),this.mTargetSquare.getYPos());
    while((oringeVPCoord[0] + this._WCLengthtoTexLength(this.mTargetSquare.getWidth() * frameNumber)) < this.mCameraSize[0]) 
        frameNumber++;
    
    console.log(oringeVPCoord[0] + this._WCCoordtoTexCoord(this.mTargetSquare.getHeight()));
    console.log(oringeVPCoord[1] - this._WCCoordtoTexCoord(this.mTargetSquare.getWidth()));
    this.mTargetSprite.setSpriteSequence(oringeVPCoord[0] + this._WCCoordtoTexCoord(this.mTargetSquare.getHeight()),
                                            oringeVPCoord[1] - this._WCCoordtoTexCoord(this.mTargetSquare.getWidth()),
                                          this._WCLengthtoTexLength(this.mTargetSquare.getWidth()),this._WCLengthtoTexLength(this.mTargetSquare.getHeight()),
                                          frameNumber,
                                          0);
    this.mTargetSprite.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mTargetSprite.setAnimationSpeed(20);
    
};

UVChangeCommand.prototype._WCCoordtoTexCoord = function(x,y){
    /*
     * 为了简便
     * 算法假设相机中心为0,0不变化（世界坐标）
     * 相机的宽度为40，缩放比例为8 : 7
     */
    var ry = this.mTextureSize[0] / 20 * (x + 10);
    var rx = this.mTextureSize[1] / 10 * (-y + 5);
    return vec2.fromValues(rx,ry);
};

UVChangeCommand.prototype._WCLengthtoTexLength = function(length){
    return (length)* 51.2;
};