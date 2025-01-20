class PluginClass {
    generateUI() {
        return [
            { type: "button", label: "Click Me!", action: "button_click" },
            { type: "input", label: "Enter your name", action: "input_submit" },
        ];
    }
}

module.exports = PluginClass;
