node-red-contrib-azure-iot
=====================

<a href="http://nodered.org" target="_new">Node-RED</a> nodes to talk to Azure IoT Hub.

Some code of Azure are under MIT License.

Install
-------

Run the following command in your Node-RED user directory - typically `~/.node-red`

        npm install node-red-contrib-azure-iot

Usage
-----

Provides two nodes - one to receive messages (output), and one to send (input).

### Input

Azure input node. Can be used to send a message to Azure IoT Hub:

 - Suports AMQP, MQTT and HTTP protocols
 - Suports RegistryManager

Use `msg.payload` to send a string with all data what you want to send to Azure.

Ex: 'msg.paylod' -> "temp: 25, lum: 30, hum: 20)

Read more about Azure IoT Hub on <a href="https://azure.microsoft.com/en-us/documentation/services/iot-hub/">Azure IoT Hub</a>.


### Output

Azure output node. Can be used to read a message from Azure IoT Hub:

 - Suports AMQP, MQTT and HTTP protocols

When the connector read something, it will pass <code>msg.payload</code> as output message with content.

Read more about Azure IoT Hub on <a href="https://azure.microsoft.com/en-us/documentation/services/iot-hub/">Azure IoT Hub</a>.
