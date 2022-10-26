const client = require("./client");

client.getAllUserInterface({}, (error, userInterfaces) => {
  if (!error) throw error;
  console.log(userInterfaces);
});

/* add userInterface */
client.addUserInterface(
  {
    appliance_id: 62, 
    Layout: {
      id: 1,
      ApplianceType: {
        MANUFACTURER: "Bosch",
        MODEL: "X-3"
      },
      appliance_type: "",
      views: [1]
    },
    View: {
      id: 1,
      ViewType: {
        STANDBY: 1,  
        IDENTIFICATION: "home",
        HOMESCREEN: "standard",
        ACTIVE_PROGRAM: "coffee",
        LIBRARY: "bosch home",
        PROGRAM_SETTINGS: "standard",
      },
      type: "home",
      LayoutContainer: {
        id: 12,
        description: "test",
        components: ["button"],
        font_size: 12
      },
      container: ["LayoutContainer"]
    },
    Notification: {
      id: 1,
      NotificationType: {
        DOOR_OPEN: 0, 
        PROGRAM_FINISHED: 1,  
        ADD_PROGRAM: "coffee",
        FUNCTION_NOT_AVAILABLE: "Don't know what this is for",
        EMPTY: 0,
      },
      type: "Success", // Success / Danger / Warning?
      topic: "coffee",
      description: "Makes a standard coffee"

    },
    UserInterfaceParameters: {
      font: "sans-serif",
      font_size_multiplier: 1,
      contrast: 3,
      element_size: 12,
      font_bold: 0,
      font_italic: 0,
      font_underline: 0,
    },
    categories: ["Coffee"],
    timestamp: "19.06.2022 - 22:44"
  },
  (error, userInterface) => {
    if (error) throw error;
    console.log("Successfully created a userInterface.");
  }
);

client.addComponent(
  {
    parameter_id: 3,
    default_value: 3,
    x: 1,
    y: 1,
    font_size: 12,
    value_maps: {
      "x": 1,
      "y": 1
    },
    button_title: "start",
    icon: "clock",
    navigate_to: "Progress Page",
    executable: true,
    program_id: 123,
    button: true
  },
  (error, components) => {
    if (error) throw error;
    console.log("Successfully created a component.");
  }
);

client.addWizard({
  title: "Wizard Magic",
  Page: {
    description: "magic happens here",
    MenuInterface: {
      options: "All options"
    }
  },
  x: 1,
  y: 1,
  font_size: 12
},
(error, wizards) => {
  if (error) throw error;
  console.log("Successfully created a Wizard.");
}

);


// delete a userInterface
client.deleteUserInterface(
  {
    id: 2,
  },
  (error, userInterface) => {
    if (error) throw error;
    console.log("Successfully deleted a userInterface.");
  }
);

client.deleteComponent(
  {
    parameter_id: 2,
  },
  (error, component) => {
    if (error) throw error;
    console.log("Successfully deleted a component.");
  }
);

client.deleteWizard(
  {
    title: "Standard",
  },
  (error, wizard) => {
    if (error) throw error;
    console.log("Successfully deleted a wizard.");
  }
);