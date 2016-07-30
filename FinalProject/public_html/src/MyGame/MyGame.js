/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */


/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, SpriteRenderable: false, Camera: false, vec2: false,
  TextureRenderable: false, Renderable: false, SpriteAnimateRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    // textures: 
    this.kFontImage = "assets/Consolas-72.png";
    this.kMinionSprite = "assets/minion_sprite.png";  // Portal and Collector are embedded here
    this.kBound = "assets/Bound.png";

    // The camera to view the scene
    this.mCamera = null;
    this.mTempCamera = null;

    // the hero and the support objects
    this.mFontImage = null;
    this.mRightMinion = null;
    this.mLeftMinion = null;
    this.mSpriteSheet = null;
    this.mBound = null;
    this.mMinion = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    // loads the textures
    gEngine.Textures.loadTexture(this.kFontImage);
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kBound);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kFontImage);
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kBound);
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(512, 256), // position of the camera
        1024,                      // width of camera
        [20, 40, 600, 300]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    this.mTempCamera = new Camera(
        vec2.fromValues(512, 256), // position of the camera
        200,                       // width of camera
        [220, 350, 100, 100]       // viewport (orgX, orgY, width, height)
    );
    this.mTempCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);    // sets the background to gray

    // Step B: Create the support objects
    this.mSpriteSheet = new SpriteRenderable(this.kMinionSprite);
    this.mSpriteSheet.setColor([0, 0, 0, 0]);
    this.mSpriteSheet.getXform().setPosition(512, 256);
    this.mSpriteSheet.getXform().setSize(1024, 512);
    this.mSpriteSheet.setElementPixelPositions(0, 1024, 0, 512);
    
    this.mBound = new SpriteRenderable(this.kBound);
    this.mBound.setColor([0, 0, 0, 0]);
    this.mBound.getXform().setPosition(512, 256);
    this.mBound.getXform().setSize(204, 164);
    this.mBound.setElementPixelPositions(0, 512, 0, 512);

    // Step C: Create the font and minion images using sprite
    this.mFontImage = new SpriteRenderable(this.kFontImage);
    this.mFontImage.setColor([1, 1, 1, 0]);
    this.mFontImage.getXform().setPosition(13, 62);
    this.mFontImage.getXform().setSize(4, 4);

    // The right minion
    this.mRightMinion= new SpriteAnimateRenderable(this.kMinionSprite);
    this.mRightMinion.setColor([1, 1, 1, 0]);
    this.mRightMinion.getXform().setPosition(26, 56.5);
    this.mRightMinion.getXform().setSize(4, 3.2);
    this.mRightMinion.setSpriteSequence(512, 0,     // first element pixel position: top-left 512 is top of image, 0 is left of image
                                    204, 164,       // widthxheight in pixels
                                    5,              // number of elements in this sequence
                                    0);             // horizontal padding in between
    this.mRightMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mRightMinion.setAnimationSpeed(50);
                                // show each element for mAnimSpeed updates

    // the left minion
    this.mLeftMinion = new SpriteAnimateRenderable(this.kMinionSprite);
    this.mLeftMinion.setColor([1, 1, 1, 0]);
    this.mLeftMinion.getXform().setPosition(15, 56.5);
    this.mLeftMinion.getXform().setSize(4, 3.2);
    this.mLeftMinion.setSpriteSequence(348, 0,      // first element pixel position: top-right 164 from 512 is top of image, 0 is right of image
                                    204, 164,       // widthxheight in pixels
                                    5,              // number of elements in this sequence
                                    0);             // horizontal padding in between
    this.mLeftMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mLeftMinion.setAnimationSpeed(50);
                                // show each element for mAnimSpeed updates
    this.mMinion = new SpriteAnimateRenderable(this.kMinionSprite);
    this.mMinion.setColor([1, 1, 1, 0]);
    this.mMinion.getXform().setPosition(512, 256);
    this.mMinion.getXform().setSize(204, 164);
    this.mMinion.setSpriteSequence(this.mBound.getXform().getYPos()+this.mBound.getXform().getHeight()/2,
                                    this.mBound.getXform().getXPos()-this.mBound.getXform().getWidth()/2,       // first element pixel position: top-right 164 from 512 is top of image, 0 is right of image
                                    204, 164,       // widthxheight in pixels
                                    parseInt((1024-(this.mBound.getXform().getXPos()-this.mBound.getXform().getWidth()/2))/204),
                                    // number of elements in this sequence
                                    0);             // horizontal padding in between
//    this.mMinion.getXform().setPosition(this.mBound.getXform().getXPos(), this.mBound.getXform().getYPos());
//    this.mMinion.getXform().setSize(this.mBound.getXform().getWidth(), this.mBound.getXform().getHeight());
//    this.mLeftMinion.setSpriteSequence(this.mBound.getXform().getYPos()+this.mBound.getXform().getHeight()/2,
//                                    this.mBound.getXform().getXPos()-this.mBound.getXform().getWidth()/2,      // first element pixel position: top-right 164 from 512 is top of image, 0 is right of image
//                                    204, 164,       // widthxheight in pixels
//                                    3,              // number of elements in this sequence
//                                    0);             // horizontal padding in between
//console.log(parseInt((1024-(this.mBound.getXform().getXPos()-this.mBound.getXform().getWidth()/2))/204));
    this.mMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mMinion.setAnimationSpeed(30);
    
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();
    //this.mMinion.draw(this.mCamera.getVPMatrix());
    this.mSpriteSheet.draw(this.mCamera.getVPMatrix()); 
    this.mBound.draw(this.mCamera.getVPMatrix());
    this.mTempCamera.setupViewProjection();
    this.mMinion.draw(this.mTempCamera.getVPMatrix());
    //this.mSpriteSheet.draw(this.mTempCamera.getVPMatrix()); 
};

// The update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    // let's only allow the movement of hero, 
    // and if hero moves too far off, this level ends, we will
    // load the next level
    var deltaX = 1; var deltaY = 1;
    // New update code for changing the sub-texture regions being shown"
    var deltaT = 0.001;
    var xform = this.mBound.getXform();
    var xform2 = this.mMinion.getXform();
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
        var pos = xform.getPosition();
        xform.setPosition(pos[0], pos[1]+deltaY);
        this.mTempCamera.setWCCenter(pos[0], pos[1]+deltaY);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        var pos = xform.getPosition();
        xform.setPosition(pos[0]-deltaX, pos[1]);
        this.mTempCamera.setWCCenter(pos[0]-deltaX, pos[1]);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
        var pos = xform.getPosition();
        xform.setPosition(pos[0], pos[1]-deltaY);
        this.mTempCamera.setWCCenter(pos[0], pos[1]-deltaY);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        var pos = xform.getPosition();
        xform.setPosition(pos[0]+deltaX, pos[1]);
        this.mTempCamera.setWCCenter(pos[0]+deltaX, pos[1]);
    }

    // <editor-fold desc="The font image:">
    // zoom into the texture by updating texture coordinate
    // For font: zoom to the upper left corner by changing bottom right
    var texCoord = this.mFontImage.getElementUVCoordinateArray();
            // The 8 elements:
            //      mTexRight,  mTexTop,          // x,y of top-right
            //      mTexLeft,   mTexTop,
            //      mTexRight,  mTexBottom,
            //      mTexLeft,   mTexBottom
    var b = texCoord[SpriteRenderable.eTexCoordArray.eBottom] + deltaT;
    var r = texCoord[SpriteRenderable.eTexCoordArray.eRight] - deltaT;
    if (b > 1.0) {
        b = 0;
    }
    if (r < 0) {
        r = 1.0;
    }
    this.mFontImage.setElementUVCoordinate(
        texCoord[SpriteRenderable.eTexCoordArray.eLeft],
        r,
        b,
        texCoord[SpriteRenderable.eTexCoordArray.eTop]
    );
    // </editor-fold>

    // New code for controlling the sprite animation
    // <editor-fold desc="controlling the sprite animation:">
    // remember to update the minion's animation
    this.mRightMinion.updateAnimation();
    this.mLeftMinion.updateAnimation();
    this.mMinion.updateAnimation();
    // Animate left on the sprite sheet
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.One)) {
        this.mRightMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
        this.mLeftMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
    }

    // swing animation 
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Two)) {
        this.mRightMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
        this.mLeftMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    }

    // Animate right on the sprite sheet
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Three)) {
        this.mRightMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
        this.mLeftMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    }

    // decrease the duration of showing each sprite element, thereby speeding up the animation
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Four)) {
        this.mRightMinion.incAnimationSpeed(-2);
        this.mLeftMinion.incAnimationSpeed(-2);
    }

    // increase the duration of showing each sprite element, thereby slowing down the animation
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Five)) {
        this.mRightMinion.incAnimationSpeed(2);
        this.mLeftMinion.incAnimationSpeed(2);
    }
    // </editor-fold>
};