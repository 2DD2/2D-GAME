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
    var camera = new Camera(vec2.fromValues(0,0),
                             40,
                             [0,0,1200,600]);
    camera.setBackgroundColor([0.8,0.8,0.8,1]);
    gManager.CameraManager.registerCamera(camera,0);
    
    var UICamera = new Camera(vec2.fromValues(0,0),
                                40,
                                [20,20,400,400]);
    gManager.UIManager.setRenderringCamera(UICamera);

};

TestScene.prototype.draw = function(){
    MyScene.prototype.draw.call(this);
    
};

TestScene.prototype.update = function(){
    MyScene.prototype.update.call(this);
};
