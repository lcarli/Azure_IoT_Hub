/**
 * Copyright 2013, 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function(RED) {
    function Azure_IoT_Hub_IN(config) {
        RED.nodes.createNode(this,config);
        //required
        var device = require('azure-iot-device');
        var Protocol;
        var ProtocolHTTP = require('azure-iot-device-http').Http; 
        var ProtocolAMQP = require('azure-iot-device-amqp').Amqp;
        var ProtocolMQTT = require('azure-iot-device-mqtt').Mqtt;

        //getting from HTML
        var connectionString = config.connectionString;
        var deviceID = config.deviceID;
        var timer = config.timer; 
        var method = config.method;

        //global variables
        var values;
        var msgSent = { payload:"sent" }
        
        //getting infos from up-stream nodes in a flow
        this.on('input', function(msg) {
            values = msg.payload;    
        });
            
        //Conection with Azure IoT Hub
        if (method == "AMQP")
        {
            Protocol = ProtocolAMQP;
        }
        else if (method == "MQTT")
        {
            Protocol = ProtocolMQTT;
        }
        else
        {
            Protocol = ProtocolHTTP;
        }
        
        var client = new device.Client.fromConnectionString(connectionString, Protocol);

        // Create a message and send it to the IoT Hub every x ms (timer)
        setInterval(function(){
        var data = JSON.stringify({ deviceId: deviceID, Data: values});
        var message = new device.Message(data);
        message.properties.add('Data', values);
        client.sendEvent(message, this.send(msgSent));
        }, timer);
     }
     RED.nodes.registerType("Azure",Azure_IoT_Hub_IN);
}
