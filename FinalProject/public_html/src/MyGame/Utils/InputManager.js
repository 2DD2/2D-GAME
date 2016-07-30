

var gManager = gManager || {};

gManager.InputManager = (function () {

    var onClickedMap = {};

    var onPressedMap = {};

    var initManager = function () {
        var keyMap = gEngine.Input.keys;
        for (key in keyMap) {
            onClickedMap[key] = new EventList();
        }
        for (key in keyMap) {
            onPressedMap[key] = new EventList();
        }
    };

    var bindCommand = function (eventName, keyCode, commandName) {
        console.log(onClickedMap[keyCode]);
        if (eventName == "click") {
            onClickedMap[keyCode].registerEvent(commandName);
            return;
        }
        if (eventName == "press") {
            onPressedMap[keyCode].registerEvent(commandName);
        }
    };

    var unBindCommand = function (eventName, keyCode, index) {
        if (eventName == "click") {
            onClickedMap[keyCode].unRegisterEvent(index);
            return;
        }
        if (eventName == "press") {
            onPressedMap[keyCode].unRegisterEvent(index);
        }
    }

    var update = function () {
        var keyMap = gEngine.Input.keys;
        for (var key in keyMap) {
            if (gEngine.Input.isKeyClicked(key)) {
                onClickedMap[keyMap[key]].excuteEvent();
            }
            if (gEngine.Input.isKeyPressed(key)) {
                onPressedMap[keyMap[key]].excuteEvent();
            }
        }
    };

    var mPublic = {
        bindCommand: bindCommand,
        unBindCommand: unBindCommand,
        update: update,
        initManager: initManager
    };

    return mPublic;
}());