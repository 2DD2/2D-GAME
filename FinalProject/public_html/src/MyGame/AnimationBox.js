/* File: animationBox.js 
 *
 * Creates and initializes the animationBox (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable, SpriteAnimateRenderable, Command: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  

   
function AnimationBox(spriteTexture,obj) {
    //initial 
    this.mAnimationBox = new SpriteAnimateRenderable(spriteTexture);
    this.bindBox = obj; //bind to position of a object
    this.mAnimationBox.setColor([0, 1, 1, 0]);
    this.mAnimationBox.getXform().setPosition(30, 30);
    
    //this.mAnimationBox.getXform().setSize(this.bindBox.getWidth(), this.bindBox.getHeight());
    this.mAnimationBox.getXform().setSize(10, 10);
    this.mAnimationBox.setElementPixelPositions(0, 1024, 0, 512);
    // if the sprite is not 1024*512 , we will see nothing

    // calculate some value
    this.spW = 1024;  //the width of the sprite
    this.spH = 512;

    // THE 40 is the length you have set to the sprite(outside this class)
    // that sprite is a big one but it's 40*20 while this sprite is 1024*512
    // so I calculate it , if we want to change it
    //remember there are lots of thing to modify
    // THE obj/this.bindBox is the small box

    this.aniTop = this.spH/2+(this.bindBox.getYPos()+this.bindBox.getHeight()/2)* ( 1024 / 40);
    this.aniLeft = this.spW/2+(this.bindBox.getXPos()-this.bindBox.getWidth()/2)* ( 512 / 20 ) ;
    this.aniW = (this.bindBox.getWidth()/40)*1024; // the width of the animation part
    this.aniH = (this.bindBox.getHeight()/20)*512;
    this.aniNum = parseInt((this.spW-this.aniLeft)/this.aniW);
    
    this.mAnimationBox.setSpriteSequence(this.aniTop,this.aniLeft,
                                          this.aniW,this.aniH,
                                          this.aniNum,0);
 
    this.mAnimationBox.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mAnimationBox.setAnimationSpeed(60);


    // this function have not been test 
    // when we modify the setSpriteSequence ,the animation will stop
    // maybe we have better method

    // this.boxMove = function(){
    //     this.aniTop = this.spH/2+(this.bindBox.getYPos()+this.bindBox.getHeight()/2)* ( 1024 / 40);
    //     this.aniLeft = this.spW/2+(this.bindBox.getXPos()-this.bindBox.getWidth()/2)* ( 512 / 20 ) ;
    //     this.aniNum = parseInt((this.spW-this.aniLeft)/this.aniW);
    
    //     this.mAnimationBox.setSpriteSequence(this.aniTop,this.aniLeft,
    //                                       this.aniW,this.aniH,
    //                                       this.aniNum,0);
    //     console.log("move");
    // };
    

    GameObject.call(this, this.mAnimationBox);
}

gEngine.Core.inheritPrototype(AnimationBox, GameObject);

AnimationBox.prototype.update = function () {

    // remember to update this.mMinion's animation
    this.mAnimationBox.updateAnimation();
};
AnimationBox.prototype.getFrameNum = function(){
    return this.aniNum;
};


// command implentation

function MoveAnimation(){
    this.source = null;
    this.target = null;
    this.msg = null;
}


gEngine.Core.inheritPrototype(MoveAnimation,Command);


MoveAnimation.prototype.initEvent = function(s,t,m){
    this.source = s;              //boundBox
    this.target = t.mAnimationBox;//animation spite
    this.msg = m;

    this.spW = 1024;  //the width of the sprite
    this.spH = 512;
    this.aniW = (this.source.getWidth()/40)*1024; // the width of the animation part
    this.aniH = (this.source.getHeight()/20)*512;
    this.aniNum = parseInt( (this.spW-this.aniLeft) / this.aniW);
    this.aniTop = this.spH/2 + (this.source.getYPos()+this.source.getHeight()/2)* ( 1024 / 40);
    this.aniLeft = this.spW/2 + (this.source.getXPos()-this.source.getWidth()/2)* ( 512 / 20 ) ;
};


MoveAnimation.prototype.excute = function(){ 
    this.spW = 1024;  //the width of the sprite
    this.spH = 512;
    this.aniW = (this.source.getWidth()/40)*1024; // the width of the animation part
    this.aniH = (this.source.getHeight()/20)*512;
    //change the animation position
    this.aniTop = this.spH/2 + (this.source.getYPos()+this.source.getHeight()/2)* ( 1024 / 40);
    this.aniLeft = this.spW/2 + (this.source.getXPos()-this.source.getWidth()/2)* ( 512 / 20 ) ;
    this.aniNum = parseInt( (this.spW-this.aniLeft) / this.aniW);
    
    this.target.setSpriteSequence(this.aniTop,this.aniLeft,this.aniW,this.aniH,this.aniNum,0);                                 

};