var shared = require('./milight.shared.js');
var Milight = require('node-milight-promise').MilightController;
var commandsV6= require('node-milight-promise').commandsV6;
var commands = require('node-milight-promise').commands2;

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

	if (bridgeParams[1]=='v6'){


		if(zone=='bridge'){
			var myCommand=commandsV6.bridge;	

			switch(params.deviceType.type){
				case 'binary': 
					if(params.state.value === 1){
						light.sendCommands(myCommand.on());    
					} else {
						light.sendCommands(myCommand.off());    
					}
				break;

				case 'brightness': 
					light.sendCommands(myCommand.on());
					light.sendCommands(myCommand.brightness(params.state.value));
				break;

				case 'hue': 
					light.sendCommands(myCommand.on());
					light.sendCommands(myCommand.hue(params.state.value)); 
				break;

				
				case 'whitemode':
					if(params.state.value==1){
						light.sendCommands(myCommand.on());
						light.sendCommands(myCommand.whiteMode());
					}
				break;
			
				case 'nightmode':
					if(params.state.value==1){
						light.sendCommands(myCommand.on());
						light.sendCommands(myCommand.nightMode());
					}
				break;
			}	
		}else
		{
			var myCommand=commandsV6.fullColor;
		
		
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

				case 'saturation':
					light.sendCommands(myCommand.on(zone));
					light.sendCommands(myCommand.saturation(zone, params.state.value, 1));
				break;
				
				case 'whitemode':
					if(params.state.value==1){
						light.sendCommands(myCommand.on(zone));
						light.sendCommands(myCommand.whiteMode(zone));
					}
				break;

				case 'whitetemp':
					light.sendCommands(myCommand.on(zone));
					light.sendCommands(myCommand.whiteTemperature(zone,params.state.value));
				break;
				
				
				case 'nightmode':
					if(params.state.value==1){
						light.sendCommands(myCommand.on(zone));
						light.sendCommands(myCommand.nightMode(zone));
					}
				break;
			}
		}
		
	    light.pause(1000);

	    return light.close();
	}
	else{  //We have a legacy bridge
   		switch(params.deviceType.type){
	        case 'binary': 
	            if(params.state.value === 1){
	                light.sendCommands(commands.rgbw.on(zone));    
	            } else {
	                light.sendCommands(commands.rgbw.off(zone));    
	            }
	        break;

	        case 'brightness': 
	            light.sendCommands(commands.rgbw.on(zone));
	            light.sendCommands(commands.rgbw.brightness(params.state.value));
	        break;

	        case 'hue': 
	            light.sendCommands(commands.rgbw.on(zone));
	            light.sendCommands(commands.rgbw.hue(params.state.value));
	        break;

	        case 'whitemode':
	        	if(params.state.value==1){
	        		light.sendCommands(commands.rgbw.on(zone));
	        		light.sendCommands(commands.rgbw.whiteMode(zone));
	        	}
	        break;

	        case 'nightmode':
	        	if(params.state.value==1){
	        		light.sendCommands(commands.rgbw.on(zone));
	        		light.sendCommands(commands.rgbw.nightMode(zone));
	       		}
	        break;
		}
	}

};
