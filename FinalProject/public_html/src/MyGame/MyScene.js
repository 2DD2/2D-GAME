/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global gEngine, Scene, gManager, vec2 */

function Main(){
}

gEngine.Core.inheritPrototype(Main,Scene);

//Main.prototype.loadScene = function () {
//
//    gEngine.Textures.loadTexture(this.kSpritesSheet_Path);
//};
//
//Main.prototype.unloadScene = function () {
//
//    gEngine.Textures.unloadTexture(this.kSpritesSheet_Path);
//};

Main.prototype.initialize = function(){

//    this.mSprite = new GameObject(this.kSpritesSheet_Path);
//    this.mSprite.getXform().setPosition(0,0);
//    this.mSprite.getXform().setSize(20,20);
//    gManager.ObjectPool.addObject(this.mSprite);

    gManager.CameraManager.initManager();
    
//    var camera = new Camera(
//        vec2.fromValues(0,0),
//        50,
//        [20,20,400,400]
//    );
//    gManager.CameraManager.registerCamera(camera,2);

};

Main.prototype.draw = function(){
    while(true){
        // 得到当前的相机
        var camera = gManager.CameraManager.nextCamera();
        if(camera){
            // 渲染物体
            gManager.ObjectPool.renderAll(camera);
        }
        // 这一帧渲染结束
        else {
            gManager.CameraManager.moveIndexToHead();
            return;
        }
    }
};

Main.prototype.update = function(){

    // 更新输入

    // 更新物体池内物体

    // 更新相机
};