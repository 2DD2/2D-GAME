/* 
 * Created by 周玮皓 on 2016/8/1.
 * GameOverScene是游戏结束场景
 */

/* global gEngine, Scene, MyScene */

function GameOverScene(){
    this.kRank = "";            //排行榜图片
    this.kMenu = "";            //主菜单图片
    this.kRestart = "";         //重新开始图片
    
    this.mRankSprite = null;
    this.mRestartSprite = null;
    this.mMenuSprite = null;
    
    initialize();
}

gEngine.Core.inheritPrototype(GameOverScene, MyScene);

GameOverScene.prototype.initialize = function(){
    MyScene.prototype.initialize.call(this);
    
    this.mRankSprite = new SpriteRenderable(this.kRank);
    this.mRankSprite.setColor([1, 1, 1, 0]);
    this.mRankSprite.getXform().setPosition(512, 384);
    this.mRankSprite.getXform().setSize(400, 100);
    
    this.mMenuSprite = new SpriteRenderable(this.kMenu);
    this.mMenuSprite.setColor([1, 1, 1, 0]);
    this.mMenuSprite.getXform().setPosition(256, 192);
    this.mMenuSprite.getXform().setSize(200, 100);
    
    this.mRestartSprite = new SpriteRenderable(this.kRestart);
    this.mRestartSprite.setColor([1, 1, 1, 0]);
    this.mRestartSprite.getXform().setPosition(256, 576);
    this.mRestartSprite.getXform().setSize(200, 100);
};

GameOverScene.prototype.loadScene = function () {
    // 加载场景
    gEngine.Textures.loadTexture(this.kTitleSprite);
};

GameOverScene.prototype.unloadScene = function () {
    // 卸载场景
    gEngine.Textures.unloadTexture(this.kTitleSprite);
};

GameOverScene.prototype.update = function(){
    MyScene.prototype.update.call(this);
    //按 空格 键切换到RunningScene
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        unloadScene();
        var nextScene = new RunningScene();
        gEngine.Core.startScene(nextScene);
    }
};

GameOverScene.prototype.draw = function(){
    MyScene.prototype.draw.call(this);
};
