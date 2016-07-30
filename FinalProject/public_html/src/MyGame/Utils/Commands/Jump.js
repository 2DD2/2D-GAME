


function Jump() {

}

gEngine.Core.inheritPrototype(Jump, Command);

Jump.prototype.excute = function(){
    console.log("this is Jump excute");
}