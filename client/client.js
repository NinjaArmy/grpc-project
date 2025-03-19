const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

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

// Client verbindet sich mit dem Haupt-gRPC-Server
const client = new pluginProto.PluginService('localhost:50051', grpc.credentials.createInsecure());

function generateUI(pluginName) {
    client.GenerateUI({ plugin_name: pluginName }, (error, response) => {
        if (error) {
            console.error('Fehler:', error);
            return;
        }
        console.log("UI-Elemente des Plugins:");
        response.ui_component.forEach(uiElement => {
            renderUI(uiElement);
        });
    });
}

function renderUI(uiComponent) {
    if (uiComponent.type === 'button') {
        console.log(`[Button]: ${uiComponent.label}`);
        if (uiComponent.action === 'button_click') {
            console.log('Button clicked!');
        }
    } else if (uiComponent.type === 'input') {
        console.log(`[Input]: ${uiComponent.label}`);
        if (uiComponent.action === 'input_submit') {
            console.log('John Doe'); 
        }
    }
}

// Teste das Plugin von DockerHub
generateUI('grpc-plugin');