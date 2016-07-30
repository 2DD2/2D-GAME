/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */


/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, SpriteRenderable: false, Camera: false, vec2: false,
  TextureRenderable: false, Renderable: false, SpriteAnimateRenderable, MyScene: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {

}

gEngine.Core.inheritPrototype(MyGame, MyScene);

MyGame.prototype.loadScene = function () {

};

MyGame.prototype.unloadScene = function () {

};

MyGame.prototype.initialize = function () {
    
};

MyGame.prototype.draw = function () {
    MyScene.prototype.draw.call(this);
};

MyGame.prototype.update = function () {
    MyScene.prototype.update.call(this);
};