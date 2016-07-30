/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global gEngine, Scene, gManager, vec2 */

function MyScene(){
}

gEngine.Core.inheritPrototype(MyScene,Scene);

MyScene.prototype.initialize = function(){

    gManager.CameraManager.initManager();

};

MyScene.prototype.draw = function(){
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

MyScene.prototype.update = function(){

    // 更新输入

    // 更新物体池内物体
    gManager.ObjectPool.updateAll();

    // 更新相机
};