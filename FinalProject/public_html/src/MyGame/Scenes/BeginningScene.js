/* 
 * Created by 周玮皓 on 2016/8/1.
 * BeginningScene是开始场景
 */

/* global gEngine, Scene, MyScene */

function BeginningScene(){
    this.kTitleSprite = "";
    this.kStartSprite = "";
    this.kAboutUsSprite = "";
    
    this.mTitleSprite = null;
    this.mStartSprite = null;
    this.mAboutUsSprite = null;
    
    initialize();
}

gEngine.Core.inheritPrototype(BeginningScene, MyScene);

BeginningScene.prototype.initialize = function(){
    MyScene.prototype.initialize.call(this);
    
    this.mTitleSprite = new SpriteRenderable(this.kTitleSprite);
    this.mTitleSprite.setColor([1, 1, 1, 0]);
    this.mTitleSprite.getXform().setPosition(512, 384);
    this.mTitleSprite.getXform().setSize(400, 100);
    
    this.mStartSprite = new SpriteRenderable(this.kStartSprite);
    this.mStartSprite.setColor([1, 1, 1, 0]);
    this.mStartSprite.getXform().setPosition(256, 192);
    this.mStartSprite.getXform().setSize(200, 100);
    
    this.mAboutUsSprite = new SpriteRenderable(this.kAboutUsSprite);
    this.mAboutUsSprite.setColor([1, 1, 1, 0]);
    this.mAboutUsSprite.getXform().setPosition(256, 576);
    this.mAboutUsSprite.getXform().setSize(200, 100);
};

BeginningScene.prototype.loadScene = function () {
    // 加载场景
    gEngine.Textures.loadTexture(this.kTitleSprite);
    gEngine.Textures.loadTexture(this.kStartSprite);
    gEngine.Textures.loadTexture(this.kAboutUsSprite);
};

BeginningScene.prototype.unloadScene = function () {
    // 卸载场景
    gEngine.Textures.unloadTexture(this.kTitleSprite);
    gEngine.Textures.unloadTexture(this.kStartSprite);
    gEngine.Textures.unloadTexture(this.kAboutUsSprite);
};

BeginningScene.prototype.update = function(){
    MyScene.prototype.update.call(this);
    //按 空格 键切换到RunningScene
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        unloadScene();
        var nextScene = new RunningScene();
        gEngine.Core.startScene(nextScene);
    }
};

BeginningScene.prototype.draw = function(){
    MyScene.prototype.draw.call(this);
};
