/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * File: Running_Physics.js 
 * Relaxation support for behaviors
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, CollisionInfo, MyGame, RigidCircle, RigidRectangle, Transform, Minion, GameObjectSet, vec2, gManager, RunningScene */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

RunningScene.prototype._physicsSimulation = function() {
    
    // Hero Against with 
    var hero = this.mHero;
    var land = gManager.ObjectPool.getObjectsByLayer(3);
   // var block = gManager.ObjectPool.getObjectsByLayer(); 
    
    gEngine.Physics.processObjSet(hero, land);
//    gEngine.Physics.processObjSet(hero, block);
//    
//    gEngine.Physics. processSetSet(land, block);
   
};


