const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "./userInterface.proto";
var protoLoader = require("@grpc/proto-loader");

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const userInterfaceProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();
let userInterfaces = [
  { 
    id: 1,
    appliance_id: 1, 
    Layout: {
      id: 1,
      ApplianceType: {
        MANUFACTURER: "Bosch",
        MODEL: "X-3"
      },
      // Question here
      appliance_type: "",
      views: [1]
    },
    View: {
      id: 1,
      ViewType: {
        STANDBY: 1,  // 0==false || 1==true
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
        DOOR_OPEN: 0, // 0==false || 1==true
        PROGRAM_FINISHED: 1,  // 0==false || 1==true
        ADD_PROGRAM: "coffee",
        FUNCTION_NOT_AVAILABLE: "Don't know what this is for",
        EMPTY: 0, //  0==false || 1==true
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
      //  0==false || 1==true
      font_bold: 0,
      font_italic: 0,
      font_underline: 0,
    },
    categories: ["Coffee"],
    timestamp: "19.06.2022 - 22:44"
  },
  { 
    id: 2,
    appliance_id: 2, 
    Layout: {
      id: 1,
      ApplianceType: {
        MANUFACTURER: "Siemens",
        MODEL: "S12"
      },
      // Question here
      appliance_type: "",
      views: [1]
    },
    View: {
      id: 2,
      ViewType: {
        STANDBY: 0,  // 0==false || 1==true
        IDENTIFICATION: "home",
        HOMESCREEN: "standard",
        ACTIVE_PROGRAM: "espresso",
        LIBRARY: "siemens home",
        PROGRAM_SETTINGS: "standard",
      },
      type: "home",
      LayoutContainer: {
        id: 13,
        description: "test",
        components: ["button"],
        font_size: 12
      },
      container: ["LayoutContainer"]
    },
    Notification: {
      id: 2,
      NotificationType: {
        DOOR_OPEN: 0, // 0==false || 1==true
        PROGRAM_FINISHED: 1,  // 0==false || 1==true
        ADD_PROGRAM: "espresso",
        FUNCTION_NOT_AVAILABLE: "Don't know what this is for",
        EMPTY: 0, //  0==false || 1==true
      },
      type: "Success", // Success / Danger / Warning?
      topic: "espresso",
      description: "Makes a standard espresso"

    },
    UserInterfaceParameters: {
      font: "sans-serif",
      font_size_multiplier: 1,
      contrast: 3,
      element_size: 12,
      //  0==false || 1==true
      font_bold: 0,
      font_italic: 0,
      font_underline: 0,
    },

    categories: ["espresso"],
    timestamp: "21.06.2022 - 22:54"
  },
];

let components = [
  {
    parameter_id: 1,
    default_value: 1,
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
  {
    parameter_id: 2,
    default_value: 2,
    x: 2,
    y: 2,
    font_size: 12,
    value_maps: {
      "x": 2,
      "y": 2
    },
    progress_bar: true
  }
];

let wizards = [
  {
    title: "Standard",
    Page: {
      description: "Standard",
      MenuInterface: {
        options: ["Next", "Back"]
      }
    },
    x: 1,
    y: 1,
    font_size: 12
  },
  {
    title: "Progress",
    Page: {
      description: "Progressbar",
      MenuInterface: {
        options: "cancel"
      }
    },
    x: 1,
    y: 1,
    font_size: 12
  }
];

server.addService(userInterfaceProto.UserInterfaceService.service, {
  /* UserInterface */
  getAllUserInterface: (_, callback) => {
    callback(null, userInterfaces);
  },
  getUserInterface: (_, callback) => {
    const userInterfaceId = _.request.id;
    const userInterfaceItem = userInterfaces.find(({ id }) => userInterfaceId == id);
    callback(null, userInterfaceItem);
  },
  deleteUserInterface: (_, callback) => {
    const userInterfaceId = _.request.id;
    userInterfaces = userInterfaces.filter(({ id }) => id !== userInterfaceId);
    callback(null, {});
  },
  editUserInterface: (_, callback) => {
    const userInterfaceId = _.request.id;
    const userInterfaceItem = userInterfaces.find(({ id }) => userInterfaceId == id);
    
    /* timestamp probably not editable? */
    userInterfaceItem.appliance_id = _.request.appliance_id;
    userInterfaceItem.Layout = _.request.Layout;
    userInterfaceItem.Notification = _.request.Notification;
    userInterfaceItem.categories = _.request.categories;
    userInterfaceItem.UserInterfaceParameters = _.request.UserInterfaceParameters;
    callback(null, userInterfaceItem);
  },
  addUserInterface: (call, callback) => {
    let _userInterface = 
    {
      appliance_id: call.appliance_id,
      Layout: call.Layout,
      View: call.View,
      Notification: call.Notification,
      UserInterfaceParameters: call.UserInterfaceParameters,
      categories: call.categories,
      timestamp: call.timestamp
    }
  
    userInterfaces.push(_userInterface);
    callback(null, _userInterface);
  },

  /* Components */
  getAllComponents: (_, callback) => {
    callback(null, components);
  },
  getComponent: (_, callback) => {
    const componentId = _.request.id;
    const componentItem = components.find(({ id }) => componentId == id);
    callback(null, componentItem);
  },
  deleteComponent: (_, callback) => {
    const componentId = _.request.id;
    components = components.filter(({ id }) => id !== componentId);
    callback(null, {});
  },
  editComponent: (_, callback) => {
    const componentId = _.request.id;
    const componentItem = components.find(({ id }) => componentId == id);
    componentItem.parameter_id = _.request.parameter_id;
    componentItem.default_value = _.request.default_value;
    componentItem.x = _.request.x;
    componentItem.y = _.request.y;
    componentItem.font_size = _.request.font_size;
    componentItem.value_maps = _.value_maps.value_maps;

    if(componentItem.button) {
      componentItem.button_title = _.request.button_title;
      componentItem.icon = _.request.icon;
      componentItem.navigate_to = _.request.navigate_to;
      componentItem.executable = _.request.executable;
    }

    if(componentItem.drop_down) {
      componentItem.values = _.request.values;
    }

    if(componentItem.slider) {
      componentItem.id = _.request.id;
      componentItem.minimum = _.request.minimum;
      componentItem.maximum = _.request.maximum;
      componentItem.step = _.request.step;
      componentItem.vertical = _.request.vertical;
      componentItem.legend = _.request.legend;
      componentItem.counter_slider = _.request.counter_slider;
      componentItem.width = _.request.width;
      componentItem.unit = _.request.unit;
    }
    componentItem.time_selector = _.request.time_selector;
    callback(null, componentItem);
  },
  addComponent: (call, callback) => {
    let _component = 
    { 
     parameter_id: call.parameter_id,
     default_value: call.default_value,
     x: call.x,
     y: call.y,
     font_size: call.font_size,
     /* Button */
     button_title: call.button_title,
     icon: call.icon,
     navigate_to: call.navigate_to,
     executable: call.executable,
     program_id: call.program_id,
     /* DropDown Menu */
     values: call.values,
     drop_down: call.drop_down,
     /* Progressbar */
     progress_bar: call.progress_bar,
     /* slider */
     id: call.id,
     minimum: call.minimum,
     maximum: call.maximum,
     step: call.step,
     vertical: call.vertical,
     legend: call.legend,
     counter_slider: call.counter_slider,
     width: call.width,
     unit: call.unit,
     slider: call.slider,
     time_selector: call.time_selector
    };
    userInterfaces.push(_component);
    callback(null, _component);
  },

  /* Wizards */
  getAllWizards: (_, callback) => {
    callback(null, wizards);
  },
  getWizard: (_, callback) => {
    const wizardId = _.request.id;
    const wizardItem = wizards.find(({ id }) => wizardId == id);
    callback(null, wizardItem);
  },
  deleteWizard: (_, callback) => {
    const wizardId = _.request.id;
    wizards = wizards.filter(({ id }) => id !== wizardId);
    callback(null, {});
  },
  editWizard: (_, callback) => {
    const wizardId = _.request.id;
    const wizardItem = wizards.find(({ id }) => wizardId == id);
    wizardItem.title = _.request.title;
    wizardItem.Page = _.request.Page;
    wizardItem.pages = _.request.pages;
    wizardItem.x = _.request.x;
    wizardItem.y = _.request.y;
    wizardItem.font_size = _.request.font_size;
    callback(null, wizardItem);
  },
  addWizard: (call, callback) => {
    let _wizard = 
    { 
      title: call.title,
      Page: call.Page,
      x: call.x,
      y: call.y,
      font_size: call.font_size,
    };
    wizards.push(_wizard);
    callback(null, _wizard);
  },
});



server.bindAsync(
  "127.0.0.1:50051",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log("Server at port:", port);
    console.log("Server running at http://127.0.0.1:50051");
    server.start();
  }
);