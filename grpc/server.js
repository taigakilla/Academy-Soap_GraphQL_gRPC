const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = path.join(__dirname, "protos", "greeting.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const proto = grpc.loadPackageDefinition(packageDefinition);

/*
  ==================================================
  🧪 gRPC MINI CHALLENGE
  ==================================================

  👉 IMPORTANT:
  You are only allowed to modify the logic inside:
    - sayHello
    - sayHelloStream

  Do NOT change:
    - Imports
    - Server setup
    - Service registration
    - Function signatures

  --------------------------------------------------

  🎯 OBJECTIVE

  1) Unary (sayHello)
     - Read the parameter "name"
     - Return:
       "Hello, {name}! Welcome to gRPC."

  2) Server Streaming (sayHelloStream)
     - Read the parameter "name"
     - Send 3 messages
     - Wait 1 second between each
     - End the stream correctly

  Good luck 🚀
*/

// 🔹 Unary RPC
function sayHello(call, callback) {
  /*
    TODO:

    Step 1: Get the name from call.request
    Step 2: Build the message string
    Step 3: Return the response using callback(null, { message: ... })

    Example format:
    "Hello, Davi! Welcome to gRPC."
  */

  callback(new Error("Not implemented"));
}

// Helper function (you may use it)
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 🔹 Server Streaming RPC
async function sayHelloStream(call) {
  /*
    TODO:

    Step 1: Get the name from call.request
    Step 2: Create 3 different messages using the name
    Step 3: For each message:
            - call.write({ message: ... })
            - wait 5 seconds
    Step 4: Call call.end()

    Expected behavior:
    The client should receive 3 messages, one per second.
  */

  call.emit("error", new Error("Not implemented"));
}

function main() {
  const server = new grpc.Server();

  server.addService(proto.greeting.GreetingService.service, {
    SayHello: sayHello,
    SayHelloStream: sayHelloStream,
  });

  const address = "0.0.0.0:5001";

  server.bindAsync(
    address,
    grpc.ServerCredentials.createInsecure(),
    (err) => {
      if (err) throw err;
      console.log(`gRPC server listening on ${address}`);
      server.start();
    }
  );
}

main();