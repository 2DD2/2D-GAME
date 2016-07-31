/* global addProject */

//  Global variable ObjectPool
//  the following syntax enforces there can only be one instance of ObjectPool
"use strict"; 
// Operate in Strict mode such that variables must be declared before used!

var gManager = gManager || {};

gManager.ObjectPool = (function () {
     // Initialize the object set
     var mObjectArray = [];
     var mObjectState = []; //To define each object if it can be draw
                           
     // define the initial size
     var MAX_POOLSIZE = 10; 

     // set the max size if needed
     var setMaxSize =function(size){
          MAX_POOLSIZE = size;
     };

     // get the size of current object Array
     var getSize = function() {
          return mObjectArray.length;
     };
     
     // add obj and set the initial state
     var addObject = function(ob) {
          // add new project into this pool
          // and the project is not in use
          mObjectArray.push(ob);
          mObjectState.push(true);
     };

     //remove it
     var removeObject = function(ob){
          var index = mObjectArray.indexOf(ob);
               if (index > -1){
                    this.mObjectArray.splice(index, 1);
                    this.mObjectState.splice(index,1);
               }
     };
     var removeObjectAt = function(index){
          this.mObjectArray.splice(index, 1);
          this.mObjectState.splice(index,1);
     };

     // get the obj through id
     var getObjectAt = function (index) {
          return mObjectArray[index];
     };

     // use the obj
     var activeState = function(id){
          mObjectState[id] = true; // it is in use
     };

     // reset it
     var resetState = function(id){
          mObjectState[id] = false; // it can't be draw
     };

     var resetAll =function(){
        for(var i = 0;i < this.mObjectArray.length; i++){
            resetState(i);
          }
     };

     var renderAll = function(camera){
        for(var i = 0 ; i < mObjectArray.length; i++){
            if(mObjectState){
                mObjectArray[i].draw(camera);
            }
        }
     };   
    var updateAll = function(){
        for(var i =0;i < mObjectArray.length ; i++){
            if(mObjectState[i]){
                mObjectArray[i].update();
            }
        }
    };

    var mPubulic={
          setMaxSize:setMaxSize,   //set the largest size of this pool
          resetState:resetState,   //reset some state of the obj
          activeState:activeState, //active some state of the obj
          getSize:getSize,        //get the current size
          addObject : addObject,   //add
          getObjectAt:getObjectAt, //get one obj by id
          removeObjectAt:removeObjectAt,
          removeObject: removeObject,//remove
          resetAll:resetAll,       //reset all obj to state true
          renderAll:renderAll,     //render all obj
          updateAll: updateAll
     };    

     return mPubulic;
}());

