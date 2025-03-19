const Docker = require('dockerode');
const docker = new Docker();

class PluginManager {
    constructor() {
        // Zum speichern von Container Ports
        this.plugins = {};
    }

    async loadPlugin(pluginName) {
        if (this.plugins[pluginName]) {
            console.log(`Plugin ${pluginName} läuft bereits auf Port ${this.plugins[pluginName]}`);
            return this.plugins[pluginName];
        }

        // Plugin laden von Dockerhub - TODO: Plugin anpassen
        const imageName = `joschime/grpc-plugin:tagname`;
        // Port für das Plugin (aktuell statisch, bei mehrere Plugins dynamisch machen)
        const port = 50052;

        try {
            console.log(`Pulling Plugin ${imageName} von DockerHub...`);
            await docker.pull(imageName, (err, stream) => {
                if (err) console.error("Docker Pull fehlerhaft:", err);
                docker.modem.followProgress(stream, (onFinished) => {
                    console.log(`Plugin ${imageName} erfolgreich geladen.`);
                });
            });

            console.log(`Starte Plugin ${pluginName} als Docker-Container...`);
            const container = await docker.createContainer({
                Image: imageName,
                name: `plugin_${pluginName}`,
                ExposedPorts: { "50051/tcp": {} },
                HostConfig: {
                    PortBindings: { "50051/tcp": [{ HostPort: `${port}` }] }
                }
            });

            await container.start();
            this.plugins[pluginName] = port;
            console.log(`Plugin ${pluginName} läuft auf Port ${port}`);
            return port;
        } catch (error) {
            console.error(`Fehler beim Starten des Plugins ${pluginName}:`, error);
            return null;
        }
    }
}

module.exports = PluginManager;
