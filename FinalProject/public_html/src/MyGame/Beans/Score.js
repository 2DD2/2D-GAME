/* File: Score.js 
 * Created by 周玮皓 2016/8/2
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, gManager: false */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Score(renderableObj, x, y, c, h) {
    this.posX = x; this.posY = y; this.color = c; this.height = h;
    this.mFontRender = renderableObj;
    this._initText(this.mFontRender, this.posX, this.posY, this.color, this.height);
    

    GameObject.call(this,this.mFontRender);
}
gEngine.Core.inheritPrototype(Score, GameObject);

Score.prototype.update = function () {
    GameObject.prototype.update.call(this);
    this.mFontRender.setText(String(gManager.DefaultOptions.score));
};

Score.prototype.draw = function (camera) {
    GameObject.prototype.draw.call(this,camera);
};

Score.prototype._initText = function (font, posX, posY, color, textH) {
    font.setColor(color);
    font.getXform().setPosition(posX, posY);
    font.setTextHeight(textH);
};
