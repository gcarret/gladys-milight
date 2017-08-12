var shared = require('./milight.shared.js');
var Milight = require('node-milight-promise').MilightController;
var commands = require('node-milight-promise').commandsV6;

module.exports = function(params) {
    var arr = params.deviceType.identifier.split(':');
    var bridgeId = arr[0];
    var zone = arr[1];

    if(!shared.bridges[bridgeId])
        return Promise.reject(new Error(`Bridge id n°${bridgeId} not found`));
	
	var bridgeParams= shared.bridges[bridgeId].split(':');

    var light = new Milight({
        ip: bridgeParams[0],
        type: bridgeParams[1]
    });

	
	if(zone=='bridge'){
		var myCommand=commands.bridge;		
	}else
	{
		var myCommand=commands.fullColor;
	}
	
		switch(params.deviceType.type){
			case 'binary': 
				if(params.state.value === 1){
					light.sendCommands(myCommand.on(zone));    
				} else {
					light.sendCommands(myCommand.off(zone));    
				}
			break;

			case 'brightness': 
				light.sendCommands(myCommand.on(zone));
				light.sendCommands(myCommand.brightness(zone,params.state.value));
			break;

			case 'hue': 
				light.sendCommands(myCommand.on(zone));
				light.sendCommands(myCommand.hue(zone,params.state.value));
			break;
		}
	
    light.pause(1000);

    return light.close();
};
