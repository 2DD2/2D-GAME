/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global gEngine, MyScene, gManager, vec2 */

function TestScene(){
    
}

gEngine.Core.inheritPrototype(TestScene,MyScene);

TestScene.prototype.loadScene = function(){
    
};

TestScene.prototype.unloadScene = function(){
    
};

TestScene.prototype.initialize = function(){
    MyScene.prototype.initialize.call(this);
    
    var camera = new Camera(vec2.fromValues(0,0),
                             20,
                             [20,20,400,400]);
    camera.setBackgroundColor([0.8,0.8,0.8,1]);
    
    gManager.CameraManager.registerCamera(camera,0);
    
    var UICamera = new Camera(vec2.fromValues(0,0),
                                20,
                                [20,20,400,400]);
    gManager.UIManager.setRenderringCamera(UICamera);
};

TestScene.prototype.draw = function(){
    MyScene.prototype.draw.call(this);
};

TestScene.prototype.update = function(){
    MyScene.prototype.update.call(this);
};
