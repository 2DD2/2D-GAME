/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global gEngine, MyScene, gManager, vec2 */

function TestScene(){
    this.kBgPath = "assets/BG_1.jpg";
    this.kFgPath = "assets/FG_1.png";
    this.kSceneDataFile = "assets/SceneData/Test_Scene.xml";
    this.kParticleTexture = "assets/FGP_1.png";
    this.kUIBanner_Path = "assets/UIBanner.png";
}

gEngine.Core.inheritPrototype(TestScene,MyScene);

TestScene.prototype.loadScene = function(){
    gEngine.Textures.loadTexture(this.kBgPath);
    gEngine.Textures.loadTexture(this.kFgPath);
    gEngine.Textures.loadTexture(this.kUIBanner_Path);
    gEngine.Textures.loadTexture(this.kParticleTexture);
    gEngine.TextFileLoader.loadTextFile(this.kSceneDataFile,gEngine.TextFileLoader.eTextFileType.eXMLFile);
};

TestScene.prototype.unloadScene = function(){
    gEngine.Textures.unloadTexture(this.kBgPath);
    gEngine.Textures.unloadTexture(this.kFgPath);
    gEngine.TextFileLoader.unloadTextFile(this.kSceneDataFile);
    gEngine.Textures.unloadTexture(this.kParticleTexture);
};

TestScene.prototype.initialize = function(){
    MyScene.prototype.initialize.call(this);
    
    var sceneLoader = new SceneDataLoader(this.kSceneDataFile);
    
    //gManager.UIManager.initManager(sceneLoader);
    
    var controller = new BGController(sceneLoader);
    gManager.ObjectPool.addObject(controller,0);
    controller = new FGController(sceneLoader);
    gManager.ObjectPool.addObject(controller,3);
    
    gManager.CameraManager.registerCamera(sceneLoader.LoadCamera("Camera_Main"),1);
};

TestScene.prototype.draw = function(){
    MyScene.prototype.draw.call(this);
};

TestScene.prototype.update = function(){
    MyScene.prototype.update.call(this);
};
