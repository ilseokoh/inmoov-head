// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

// The device connection string to authenticate the device with your IoT hub.
//
// NOTE:
// For simplicity, this sample sets the connection string in code.
// In a production environment, the recommended approach is to use
// an environment variable to make it available to your application
// or use an HSM or an x509 certificate.
// https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-security
//
// Using the Azure CLI:
// az iot hub device-identity show-connection-string --hub-name {YourIoTHubName} --device-id MyNodeDevice --output table
var connectionString = 'HostName=adtholhothub005.azure-devices.net;DeviceId=head;SharedAccessKey=L9aS+YYDvAkwWi9r3Crf+E54gRujEdJTPPAiB7THSPI=';

// Using the Node.js Device SDK for IoT Hub:
//   https://github.com/Azure/azure-iot-sdk-node
// The sample connects to a device-specific MQTT endpoint on your IoT Hub.
var Mqtt = require('azure-iot-device-mqtt').Mqtt;
var DeviceClient = require('azure-iot-device').Client;
var Message = require('azure-iot-device').Message;

var client = DeviceClient.fromConnectionString(connectionString, Mqtt);

// Create a message and send it to the IoT hub every second
setInterval(function(){
  // Simulate telemetry.
  var jawAngle = 20 + (Math.random() * 15);
  var neckAngle = 0 + (Math.random() * 10);
  var eyelrAngle = 0 + (Math.random() * 10);
  var message = new Message(JSON.stringify({
    "neckAngle": Math.ceil(neckAngle),
    "eyesLRAngle": Math.ceil(eyelrAngle),
    "eyesUpDownAngle": 0,
    "jawAngle": Math.ceil(jawAngle)
  }));

  console.log('Sending message: ' + message.getData());

  // Send the message.
  client.sendEvent(message, function (err) {
    if (err) {
      console.error('send error: ' + err.toString());
    } else {
      console.log('message sent');
    }
  });
}, 5000);