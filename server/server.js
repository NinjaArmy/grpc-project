const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const PluginManager = require('./plugin_manager');

// Load the proto file
const PROTO_PATH = path.join(__dirname, '../protos/plugin_service.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const pluginProto = grpc.loadPackageDefinition(packageDefinition).plugin;

// Plugin manager instance
const pluginManager = new PluginManager();

// Generate UI method
const generateUI = (call, callback) => {
    const { plugin_name, source } = call.request;
    const plugin = pluginManager.loadPlugin(plugin_name, source);

    if (!plugin) {
        return callback({
            code: grpc.status.NOT_FOUND,
            details: "Plugin not found",
        });
    }

    callback(null, { ui_component: plugin.generateUI() });
};

// Create server
const server = new grpc.Server();
server.addService(pluginProto.PluginService.service, { GenerateUI: generateUI });

const SERVER_ADDRESS = '0.0.0.0:50051';
server.bindAsync(SERVER_ADDRESS, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`Server running at ${SERVER_ADDRESS}`);
    server.start();
});
