/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global gEngine, MyScene, gManager, vec2 */

function TestScene(){
    this.kBgPath = "assets/BG_1.jpg";
    this.kSceneData_Path = "assets/SceneData/Test_Scene.xml";
}

gEngine.Core.inheritPrototype(TestScene,MyScene);

TestScene.prototype.loadScene = function(){
    gEngine.Textures.loadTexture(this.kBgPath);
    gEngine.TextFileLoader.loadTextFile(this.kSceneData_Path,gEngine.TextFileLoader.eTextFileType.eXMLFile);
};

TestScene.prototype.unloadScene = function(){
    gEngine.Textures.unloadTexture(this.kBgPath);
    gEngine.TextFileLoader.unloadTextFile(this.kSceneData_Path);
};

TestScene.prototype.initialize = function(){
    MyScene.prototype.initialize.call(this);
    
    var sceneLoader = new SceneDataLoader(this.kSceneData_Path);
    // 加载背景
    var controller = new BGController(sceneLoader);
    gManager.ObjectPool.addObject(controller,0);
    
    // 加载相机
    gManager.CameraManager.registerCamera(sceneLoader.LoadCamera("Camera_Main"),0);
};

TestScene.prototype.draw = function(){
    MyScene.prototype.draw.call(this);
};

TestScene.prototype.update = function(){
    MyScene.prototype.update.call(this);
};
