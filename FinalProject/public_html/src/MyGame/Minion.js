/* File: Minion.js 
 *
 * Creates and initializes the Minion
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable, SpriteAnimateRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Minion (spriteTexture,animateObj) {
    this.mBound = animateObj;
    this.mWidth = 1024;
    this.mHeight = 512;
    this.kMinionSprite = spriteTexture;
    this.mMinion = new SpriteAnimateRenderable(this.kMinionSprite);
    
    GameObject.call(this,this.mMinion);
    
    this.mMinion.setColor([1, 1, 1, 0]);
    this.mMinion.getXform().setPosition(this.mBound.getXPos(),this.mBound.getYPos());
    this.mMinion.getXform().setSize(1024, 512);
    this.mMinion.setSpriteSequence(this.mBound.getYPos()+this.mBound.getHeight()/2,
                                    this.mBound.getXPos()-this.mBound.getWidth()/2,       // first element pixel position: top-right 164 from 512 is top of image, 0 is right of image
                                    this.mBound.getWidth(), this.mBound.getHeight(),       // widthxheight in pixels
                                    parseInt((1024-(this.mBound.getXPos()-this.mBound.getWidth()/2))/204),// number of elements in this sequence
                                    0);             // horizontal padding in between
    this.mMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mMinion.setAnimationSpeed(30);
}

gEngine.Core.inheritPrototype(Minion, GameObject);

Minion.prototype.update = function () {
    GameObject.prototype.update.call(this);
    // var deltaX = 1; var deltaY = 1;
    // New update code for changing the sub-texture regions being shown"
   // var xform = this.mBound.getXform();
//    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
//        var pos = xform.getPosition();
//        xform.setPosition(pos[0], pos[1]+deltaY);
//        //this.mTempCamera.setWCCenter(pos[0], pos[1]+deltaY);
//        this.mMinion.setSpriteSequence(this.mBound.getXform().getYPos()+this.mBound.getXform().getHeight()/2,
//                                    this.mBound.getXform().getXPos()-this.mBound.getXform().getWidth()/2,       // first element pixel position: top-right 164 from 512 is top of image, 0 is right of image
//                                    204, 164,       // widthxheight in pixels
//                                    parseInt((1024-(this.mBound.getXform().getXPos()-this.mBound.getXform().getWidth()/2))/204),
//                                    // number of elements in this sequence
//                                    0);
//    }
//    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
//        var pos = xform.getPosition();
//        xform.setPosition(pos[0]-deltaX, pos[1]);
//        //this.mTempCamera.setWCCenter(pos[0]-deltaX, pos[1]);
//        this.mMinion.setSpriteSequence(this.mBound.getXform().getYPos()+this.mBound.getXform().getHeight()/2,
//                                    this.mBound.getXform().getXPos()-this.mBound.getXform().getWidth()/2,       // first element pixel position: top-right 164 from 512 is top of image, 0 is right of image
//                                    204, 164,       // widthxheight in pixels
//                                    parseInt((1024-(this.mBound.getXform().getXPos()-this.mBound.getXform().getWidth()/2))/204),
//                                    // number of elements in this sequence
//                                    0);
//    }
//    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
//        var pos = xform.getPosition();
//        xform.setPosition(pos[0], pos[1]-deltaY);
//        //this.mTempCamera.setWCCenter(pos[0], pos[1]-deltaY);
//        this.mMinion.setSpriteSequence(this.mBound.getXform().getYPos()+this.mBound.getXform().getHeight()/2,
//                                    this.mBound.getXform().getXPos()-this.mBound.getXform().getWidth()/2,       // first element pixel position: top-right 164 from 512 is top of image, 0 is right of image
//                                    204, 164,       // widthxheight in pixels
//                                    parseInt((1024-(this.mBound.getXform().getXPos()-this.mBound.getXform().getWidth()/2))/204),
//                                    // number of elements in this sequence
//                                    0);
//    }
//    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
//        var pos = xform.getPosition();
//        xform.setPosition(pos[0]+deltaX, pos[1]);
//        //this.mTempCamera.setWCCenter(pos[0]+deltaX, pos[1]);
//        this.mMinion.setSpriteSequence(this.mBound.getXform().getYPos()+this.mBound.getXform().getHeight()/2,
//                                    this.mBound.getXform().getXPos()-this.mBound.getXform().getWidth()/2,       // first element pixel position: top-right 164 from 512 is top of image, 0 is right of image
//                                    204, 164,       // widthxheight in pixels
//                                    parseInt((1024-(this.mBound.getXform().getXPos()-this.mBound.getXform().getWidth()/2))/204),
//                                    // number of elements in this sequence
//                                    0);
//    }
    // <editor-fold desc="The font image:">
    // zoom into the texture by updating texture coordinate
    // For font: zoom to the upper left corner by changing bottom right
    this.mMinion.updateAnimation();
    // Animate left on the sprite shee
    // </editor-fold>
};

