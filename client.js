const grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "./userInterface.proto";

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const UserInterfaceService = grpc.loadPackageDefinition(packageDefinition).UserInterfaceService;

const client = new UserInterfaceService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

module.exports = client;