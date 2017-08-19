WARNING : this is a WIP to add v6 compatibility. (upgrade to node-milight-promise v0.2.3)

What works for now (18/08/2017) :
- Detection of all kinds of bridges : Depending on its version, the bridge will have an identifier "IP_ADDRESS:v6" or "IP_ADDRESS:legacy" in Gladys.
- Full control of RGBW and RGB-CCT lamps on V6 bridge ( on/off, brightness, saturation and hue, whiteMode and nightMode).
To allow this control you need to add for your device the following deviceTypes (see the picture for the available ranges):

binary
brightness
saturation
hue
whitemode
nightmode

  
- Full control of Bridge Leds (if any). Create a Device with "BRIDGE_ID:bridge" as identifier to control it, with the same DeviceTypes as for lamps (except saturation, which can't be controlled).



Gladys Milight
=======================



This module allows you to control your milight lamps in Gladys.

### Installation

To install this module :

- Install the module in Gladys 
- Reboot Gladys 
- Go on the dashboard on "Module" view, then in the module list press the "config" button on the milight module.
- Your milight bridge should appear in the "Device" view. If not, you can press config again. Note the ID of the bridge device.
- Create a device for each Milight lamp you want to control with the following parameters: 
identifier: `BRIDGE_ID_IN_GLADYS:MILIGHT_ZONE`, protocol: `rf`, service: `milight`. Note that the protocol here is important.
Here is an example of a lamp in Zone 1 with bridge ID 12 : {identifier: `12:1`}
- Create foreach device these three deviceTypes :

![Gladys milight](http://kusi.fr/uploads/devicetypes-milight.PNG)
