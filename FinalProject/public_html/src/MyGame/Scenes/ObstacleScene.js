/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global gEngine, MyScene, gManager, vec2 */

function ObstacleScene(){
    this.kBgPath = "assets/BG_1.jpg";
    this.kFgPath = "assets/FG_1.png";
    this.kSceneDataFile = "assets/SceneData/Start_Scene.xml";
    
    this.kUIBanner_Path = "assets/UIBanner.png";
    
    this.mWayImg = "assets/platform.png";
    this.mWay = null;
}

gEngine.Core.inheritPrototype(ObstacleScene,MyScene);

ObstacleScene.prototype.loadScene = function(){
    gEngine.Textures.loadTexture(this.mWayImg);
    
    gEngine.Textures.loadTexture(this.kBgPath);
    gEngine.Textures.loadTexture(this.kFgPath);
    gEngine.Textures.loadTexture(this.kUIBanner_Path);
    gEngine.TextFileLoader.loadTextFile(this.kSceneDataFile,gEngine.TextFileLoader.eTextFileType.eXMLFile);
};

ObstacleScene.prototype.unloadScene = function(){
    gEngine.Textures.unloadTexture(this.mWayImg);
    
    gEngine.Textures.unloadTexture(this.kBgPath);
    gEngine.Textures.unloadTexture(this.kFgPath);
    gEngine.TextFileLoader.unloadTextFile(this.kSceneDataFile);
};

ObstacleScene.prototype.initialize = function(){
    MyScene.prototype.initialize.call(this);
    
    
    this.mWay = new Way(this.mWayImg,-15);
    this.mWay1 = new Way(this.mWayImg,-5);
    this.mWay2 = new Way(this.mWayImg,5);
    this.mWay3 = new Way(this.mWayImg,15);
    this.mWay4 = new Way(this.mWayImg,25);
    
    
    var sceneLoader = new SceneDataLoader(this.kSceneDataFile);
    
    gManager.UIManager.initManager(sceneLoader);
    
    var controller = new BGController(sceneLoader);
    gManager.ObjectPool.addObject(controller,0);
    
    gManager.ObjectPool.addObject(this.mWay,2);
    gManager.ObjectPool.addObject(this.mWay1,2);
    gManager.ObjectPool.addObject(this.mWay2,2);
    gManager.ObjectPool.addObject(this.mWay3,2);
    gManager.ObjectPool.addObject(this.mWay4,2);
    
    gManager.CameraManager.registerCamera(sceneLoader.LoadCamera("Camera_Main"),1);
};

ObstacleScene.prototype.draw = function(){
    MyScene.prototype.draw.call(this);
};

ObstacleScene.prototype.update = function(){
    MyScene.prototype.update.call(this);  //updateAll();
};
