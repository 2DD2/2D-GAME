/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 *  ========================================
 *  created by yangqihua 2016-08-01 14:50:45
 *  ========================================
 */
/* global gEngine */

var gManager = gManager || {};

gManager.SceneManager = (function () {
    var curScene = null;

    var replaceScene = function (desScene) {
        stopScene(curScene);
        startScene(desScene);
    };

    var startScene = function (desScene) {
        gEngine.Core.startScene(desScene);
        curScene = firstScene;
    };

    var stopScene = function (desScene) {
        gEngine.GameLoop.stop();
    };
    
    var initManager = function (firstScene){
        gEngine.Core.initializeEngineCore('GLCanvas', firstScene);
        curScene = firstScene;
    };

    var mPublic = {
        replaceScene: replaceScene,
        startScene: showScene,
        stopScene: stopScene,
        initManager: initManager
    };
    return mPublic;
}());


