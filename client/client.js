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

const client = new pluginProto.PluginService('localhost:50051', grpc.credentials.createInsecure());

function generateUI(pluginName, source = 'local') {
    client.GenerateUI({ plugin_name: pluginName, source }, (error, response) => {
        if (error) {
            console.error('Error:', error);
            return;
        }
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
            // Simulate user input
            console.log('John Doe'); 
        }

    }
}

// Test the client
generateUI('example_plugin', 'local');
