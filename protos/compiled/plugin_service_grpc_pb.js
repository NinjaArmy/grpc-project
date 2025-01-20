// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var plugin_service_pb = require('./plugin_service_pb.js');

function serialize_plugin_GenerateUIRequest(arg) {
  if (!(arg instanceof plugin_service_pb.GenerateUIRequest)) {
    throw new Error('Expected argument of type plugin.GenerateUIRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_plugin_GenerateUIRequest(buffer_arg) {
  return plugin_service_pb.GenerateUIRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_plugin_GenerateUIResponse(arg) {
  if (!(arg instanceof plugin_service_pb.GenerateUIResponse)) {
    throw new Error('Expected argument of type plugin.GenerateUIResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_plugin_GenerateUIResponse(buffer_arg) {
  return plugin_service_pb.GenerateUIResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_plugin_ProcessDataRequest(arg) {
  if (!(arg instanceof plugin_service_pb.ProcessDataRequest)) {
    throw new Error('Expected argument of type plugin.ProcessDataRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_plugin_ProcessDataRequest(buffer_arg) {
  return plugin_service_pb.ProcessDataRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_plugin_ProcessDataResponse(arg) {
  if (!(arg instanceof plugin_service_pb.ProcessDataResponse)) {
    throw new Error('Expected argument of type plugin.ProcessDataResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_plugin_ProcessDataResponse(buffer_arg) {
  return plugin_service_pb.ProcessDataResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var PluginServiceService = exports.PluginServiceService = {
  generateUI: {
    path: '/plugin.PluginService/GenerateUI',
    requestStream: false,
    responseStream: false,
    requestType: plugin_service_pb.GenerateUIRequest,
    responseType: plugin_service_pb.GenerateUIResponse,
    requestSerialize: serialize_plugin_GenerateUIRequest,
    requestDeserialize: deserialize_plugin_GenerateUIRequest,
    responseSerialize: serialize_plugin_GenerateUIResponse,
    responseDeserialize: deserialize_plugin_GenerateUIResponse,
  },
  processData: {
    path: '/plugin.PluginService/ProcessData',
    requestStream: false,
    responseStream: false,
    requestType: plugin_service_pb.ProcessDataRequest,
    responseType: plugin_service_pb.ProcessDataResponse,
    requestSerialize: serialize_plugin_ProcessDataRequest,
    requestDeserialize: deserialize_plugin_ProcessDataRequest,
    responseSerialize: serialize_plugin_ProcessDataResponse,
    responseDeserialize: deserialize_plugin_ProcessDataResponse,
  },
};

exports.PluginServiceClient = grpc.makeGenericClientConstructor(PluginServiceService);
