/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */


/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, SpriteRenderable: false, Camera: false, vec2: false,
  TextureRenderable: false, Renderable: false, SpriteAnimateRenderable, MyScene, gManager: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    this.kSpritesSheet_Path = "assets/spritesheet1.png";
}

gEngine.Core.inheritPrototype(MyGame, MyScene);

MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kSpritesSheet_Path);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kSpritesSheet_Path);
};

MyGame.prototype.initialize = function () {
    MyScene.prototype.initialize.call(this);
    
    var sprite = new GameObject(new TextureRenderable(this.kSpritesSheet_Path));
    sprite.getXform().setPosition(0,0);
    sprite.getXform().setSize(20,20);
    gManager.ObjectPool.addObject(sprite);
    
    var camera = new Camera(vec2.fromValues(0,0),
                            30,
                            [200,50,400,400]);
    gManager.CameraManager.registerCamera(camera,1);
};

MyGame.prototype.draw = function () {
    MyScene.prototype.draw.call(this);
    //var camera = gManager.CameraManager.getCamera(1);
    //camera.setupViewProjection();
    //this.sprite.draw(camera);
};

MyGame.prototype.update = function () {
    MyScene.prototype.update.call(this);
};