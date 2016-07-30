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
    sprite.getXform().setSize(40,20);
    gManager.ObjectPool.addObject(sprite);
    
    // TODO: 这里需要改下。从文件读取数据初始化
    var camera1 = new Camera(vec2.fromValues(0,0),
                            40,
                            [550,50,800,700]);
    var camera2 = new Camera(vec2.fromValues(0,0),
                            10,
                            [200,600,150,150]);
    var camera3 = new Camera(vec2.fromValues(0,0),
                            10,
                            [200,370,150,150]);
    var camera4 = new Camera(vec2.fromValues(0,0),
                            10,
                            [40,210,150,150]);
    var camera5 = new Camera(vec2.fromValues(0,0),
                            10,
                            [360,210,150,150]);
    var camera6 = new Camera(vec2.fromValues(0,0),
                            10,
                            [200,50,150,150]);
    gManager.CameraManager.registerCamera(camera1,1);
    gManager.CameraManager.registerCamera(camera2,2);
    gManager.CameraManager.registerCamera(camera3,3);
    gManager.CameraManager.registerCamera(camera4,4);
    gManager.CameraManager.registerCamera(camera5,5);
    gManager.CameraManager.registerCamera(camera6,6);
};

MyGame.prototype.draw = function () {
    MyScene.prototype.draw.call(this);
};

MyGame.prototype.update = function () {
    MyScene.prototype.update.call(this);
};