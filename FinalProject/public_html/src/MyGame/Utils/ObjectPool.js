/* global addProject */
//  Global variable ObjectPool
//  By lijilan
//  the following syntax enforces there can only be one instance of ObjectPool
"use strict"; 
// Operate in Strict mode such that variables must be declared before used!

var gManager = gManager || {};

gManager.ObjectPool = (function () {
    
     // define pool  mObjectArray[layer][index]
     // Initialize the object set
     var mObjectArray = [];
     for (var i =0; i<10 ; i++){
        mObjectArray[i] = new GameObjectSet() ;
     }
                           
     // define the initial size
     var MAX_SIZE = 60; 
     // the current number of obj
     var mSize = 0;

     // set the max size if needed
     var setMaxSize =function(size){
          MAX_SIZE = size;
     };

     // get the size of current object Array
     var getSize = function() {
          return mSize;
     };
     
     // add obj and set the initial state
     var addObject = function(obj,layer) {
          // add new project into this pool
          // and layer number of this obj
           if(layer){
               this.mLayer=layer;
           }else{
               this.mLayer=1;
           }
          mObjectArray[this.mLayer].addToSet(obj);
          mSize ++ ;
            // console.log("The objectPool can only have "+MAX_SIZE+" obj and overflowed!!!");
     };

     //remove the obj
     var removeObject = function(ob,layer){
         mObjectArray[layer].removeObject(ob);  
     };
     
     // fist layer 0 to last layer 10 
     var renderAll = function(camera){
        for(var j = 0 ; j <10 ; j++){
            if(mObjectArray[j].size){
                mObjectArray[j].draw(camera);
            }
        }
     };   
    var updateAll = function(){
        for(var j = 0 ; j <10 ; j++){
            if(mObjectArray[j].size){
                mObjectArray[j].update();
            }
        }
    };

    var mPubulic={
          setMaxSize:setMaxSize,   //set the largest size of this pool
        
          getSize:getSize,        //get the current size of this pool
          addObject : addObject,   //add obj with (obj,layer)
         
          removeObject: removeObject,//remove (obj,layer)
        
          renderAll:renderAll,     //render all obj
          updateAll: updateAll
     };    

     return mPubulic;
}());

