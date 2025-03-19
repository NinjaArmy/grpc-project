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

const pluginManager = new PluginManager();

// Anfragen an das passende Plugin weiterleiten
const generateUI = async (call, callback) => {
    const { plugin_name } = call.request;

    try {
        const port = await pluginManager.loadPlugin(plugin_name);
        if (!port) {
            return callback({ code: grpc.status.NOT_FOUND, details: "Plugin konnte nicht gestartet werden." });
        }

        // Verbindung zum Plugin-Container erstellen
        const pluginClient = new pluginProto.PluginService(
            `localhost:${port}`,
            grpc.credentials.createInsecure()
        );

        // Anfrage weiterleiten
        pluginClient.GenerateUI(call.request, (error, response) => {
            if (error) {
                return callback(error);
            }
            callback(null, response);
        });

    } catch (error) {
        return callback({
            code: grpc.status.INTERNAL,
            details: error.message,
        });
    }
};

// gRPC-Server erstellen
const server = new grpc.Server();
server.addService(pluginProto.PluginService.service, { GenerateUI: generateUI });

const SERVER_ADDRESS = '0.0.0.0:50051';
server.bindAsync(SERVER_ADDRESS, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`Server läuft auf ${SERVER_ADDRESS}`);
    // Depracted - Start Call wird nicht mehr benötigt
    // server.start();
});
