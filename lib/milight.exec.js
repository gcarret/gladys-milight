var shared = require('./milight.shared.js');
var Milight = require('node-milight-promise').MilightController;
var commands = require('node-milight-promise').commandsV6;

module.exports = function(params) {
    var arr = params.deviceType.identifier.split(':');
    var bridgeId = arr[0];
    var zone = arr[1];

    if(!shared.bridges[bridgeId])
        return Promise.reject(new Error(`Bridge id n°${bridgeId} not found`));

    var light = new Milight({
        ip: shared.bridges[bridgeId],
        type: 'v6'
    });

    switch(params.deviceType.type){
        case 'binary': 
            if(params.state.value === 1){
                light.sendCommands(commands.fullColor.on(zone));    
            } else {
                light.sendCommands(commands.fullColor.off(zone));    
            }
        break;

        case 'brightness': 
            light.sendCommands(commands.fullColor.on(zone));
            light.sendCommands(commands.fullColor.brightness(params.state.value));
        break;

        case 'hue': 
            light.sendCommands(commands.fullColor.on(zone));
            light.sendCommands(commands.fullColor.hue(params.state.value));
        break;
    }

    light.pause(1000);

    return light.close();
};
