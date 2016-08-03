/* 
 * Created by 周玮皓 on 2016/8/1.
 * WelcomeScene用来加载开场动画
 */

/* global gEngine, Scene, MyScene, vec2, gManager */

function WelcomeScene(){
    
    this.kLogo = "assets/logo.png";
    this.kSceneFile_Path = "assets/SceneData/Welcome_Scene.xml";
    this.mColor = null;
    
    this.mTimeNow = 0;
    this.mTimeShow = 120;
    this.mTimeOff = 240;
    this.mTimeTurn = 360;
}

gEngine.Core.inheritPrototype(WelcomeScene, MyScene);

WelcomeScene.prototype.initialize = function(){
    MyScene.prototype.initialize.call(this);
    
    var sceneLoader = new SceneDataLoader(this.kSceneFile_Path);
    
    gManager.UIManager.initManager(sceneLoader);
    
    gManager.CameraManager.registerCamera(sceneLoader.LoadCamera("Camera_Main"),1);
    
    this.mColor = gManager.UIManager.getElementbyNum(0).getRenderable().getColor();
    this.mColor[3] = 1;
};

WelcomeScene.prototype.loadScene = function () {
    // 加载场景
    gEngine.Textures.loadTexture(this.kLogo);
    gEngine.TextFileLoader.loadTextFile(this.kSceneFile_Path,gEngine.TextFileLoader.eTextFileType.eXMLFile);
};

WelcomeScene.prototype.unloadScene = function () {
    // 卸载场景
    gEngine.Textures.unloadTexture(this.kLogo);
    gEngine.TextFileLoader.unloadTextFile(this.kSceneFile_Path,gEngine.TextFileLoader.eTextFileType.eXMLFile);
};

WelcomeScene.prototype.update = function(){
    
    this.mTimeNow++;
    if(this.mTimeShow > this.mTimeNow){
        this.mColor[3] = 1 - (this.mTimeNow / this.mTimeShow);
    }else if(this.mTimeOff > this.mTimeNow){
        this.mColor[3] = (this.mTimeNow - 120) / this.mTimeShow;
    }else if(this.mTimeTurn < this.mTimeNow){
        gEngine.Core.startScene(new BeginningScene());
    }
    
    MyScene.prototype.update.call(this);
};

WelcomeScene.prototype.draw = function(){
    MyScene.prototype.draw.call(this);
};
