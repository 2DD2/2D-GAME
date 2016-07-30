/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global gEngine, vec2 */

function SceneDataLoader(sceneFilePath) {
    
    this.mSceneXml = gEngine.ResourceMap.retrieveAsset(sceneFilePath);
}

SceneDataLoader.prototype._getElm = function (tagElm) {
    var theElm = this.mSceneXml.getElementsByTagName(tagElm);
    if (theElm.length === 0) {
        console.error("Warning: Level element:[" + tagElm + "]: is not found!");
    }
    return theElm;
};

SceneDataLoader.prototype.LoadCamera = function (nameCma) {
    
    var camElm = this._getElm(nameCma);
    var cx = Number(camElm[0].getAttribute("CenterX"));
    var cy = Number(camElm[0].getAttribute("CenterY"));
    var w = Number(camElm[0].getAttribute("Width"));
    var viewport = camElm[0].getAttribute("Viewport").split(" ");
    var bgColor = camElm[0].getAttribute("BgColor").split(" ");
    var j;
    for (j = 0; j < 4; j++) {
        bgColor[j] = Number(bgColor[j]);
        viewport[j] = Number(viewport[j]);
    }

    var cam = new Camera(
        vec2.fromValues(cx, cy),  
        w,                        
        viewport                  
        );
    cam.setBackgroundColor(bgColor);
    return cam;
};
SceneDataLoader.prototype.GetNumber = function (nodeName){
    var elm = this._getElm(nodeName);
    return Number(elm[0].getAttribute("Number"));
};