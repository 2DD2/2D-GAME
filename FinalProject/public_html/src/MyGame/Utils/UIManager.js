/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var gManager = gManager || {};

gManager.UIManager = (function(){
    
    /* 
     * 当前的UI名
     */
    var mCurrentUIRootName = null;
    
    /*
     * 当前的UI列表
     */
    var mElementMapping = [];
    
    /*
     * UI相机
     */
    var mRenderringCamera = null;
    
    var initManager = function(){
        setUIRoot("asd");
    };
    
    var draw = function(){
        if(mRenderringCamera){
            mRenderringCamera.setupViewProjection(false);
            for (var i = 0 ; i < mElementMapping.length ; i++){
                if(mElementMapping[i])
                    mElementMapping[i].draw(mRenderringCamera);
            }
        }
    };
    
    var update = function(){
        for (var i = 0 ; i < mElementMapping.length ; i++){
            if(mElementMapping[i])
                mElementMapping[i].update();
        }
    };
    
    /*
     * 设置当前的渲染相机
     */
    var setRenderringCamera = function(camera){
        mRenderringCamera = camera;
    };
    
    var getElementbyNum = function(index){
        if(_containsKey(index)) 
            return mElementMapping[index];
        else 
            return null;
    };
    
    var _containsKey = function(index){
        if(index < 0) return false;
        
        if(mElementMapping[index]) return true;
        else return false;
    };
    
    var setUIRoot = function(name){
        mCurrentUIRootName = name;
        
        // 读取UI
        
    };
    
    
    var mPublic = {
        update : update,
        draw : draw,
        getElementbyNum : getElementbyNum,
        setRenderringCamera : setRenderringCamera,
        initManager : initManager
    };

    return mPublic;
}());



