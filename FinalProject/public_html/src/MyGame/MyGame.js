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
    this.kBoundBox_Path = "assets/Bound.png";
    this.kSpritesSheet_Path = "assets/spritesheet1.png";
    this.kSceneData_Path = "assets/SceneData/Test_Scene.xml";
}

gEngine.Core.inheritPrototype(MyGame, MyScene);

MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kSpritesSheet_Path);
    gEngine.Textures.loadTexture(this.kBoundBox_Path);
    gEngine.TextFileLoader.loadTextFile(this.kSceneData_Path, gEngine.TextFileLoader.eTextFileType.eXMLFile);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kSpritesSheet_Path);
    gEngine.Textures.unloadTexture(this.kBoundBox_Path);
    gEngine.TextFileLoader.unloadTextFile(this.kSceneData_Path, gEngine.TextFileLoader.eTextFileType.eXMLFile);
};

MyGame.prototype.initialize = function () {
    MyScene.prototype.initialize.call(this);
    
    var sprite = new GameObject(new TextureRenderable(this.kSpritesSheet_Path));
    sprite.getXform().setPosition(0,0);
    sprite.getXform().setSize(40,20);
    gManager.ObjectPool.addObject(sprite);
    
    var box = new BoundBox(this.kBoundBox_Path);
    gManager.ObjectPool.addObject(box.mBoundBox);
    
    var renderSprite = new GameObject(new SpriteAnimaateRenderable);
           
    
    var loader = new SceneDataLoader(this.kSceneData_Path);
    for(var i = 1; i <= loader.GetNumber("Camera_Num"); i++){
        var camera = loader.LoadCamera("Camera_" + i);
        gManager.CameraManager.registerCamera(camera,i);
    }
};


MyGame.prototype.draw = function () {
    MyScene.prototype.draw.call(this);
};

MyGame.prototype.update = function () {
    MyScene.prototype.update.call(this);
};