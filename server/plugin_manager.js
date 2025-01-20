const { execSync } = require('child_process');
const path = require('path');

class PluginManager {
    constructor() {
        this.plugins = {};
    }

    loadPlugin(pluginName, source = 'local') {
        if (this.plugins[pluginName]) return this.plugins[pluginName];

        if (source === 'dockerhub') {
            try {
                const imageName = `your_dockerhub_username/${pluginName}:latest`;
                console.log(`Pulling plugin ${imageName}...`);
                execSync(`docker pull ${imageName}`);
                console.log(`Plugin ${pluginName} pulled successfully.`);
            } catch (error) {
                console.error('Failed to pull plugin:', error);
                return null;
            }
        }

        try {
            const pluginPath = path.join(__dirname, 'plugins', `${pluginName}.js`);
            const PluginClass = require(pluginPath);
            const pluginInstance = new PluginClass();
            this.plugins[pluginName] = pluginInstance;
            return pluginInstance;
        } catch (error) {
            console.error('Failed to load plugin:', error);
            return null;
        }
    }
}

module.exports = PluginManager;
