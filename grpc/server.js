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
	const name = call.request.name;

	callback(null, { message: `Hello ${name}, Welcome to gRPC` });
}

// Helper function (you may use it)
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// 🔹 Server Streaming RPC
async function sayHelloStream(call) {
	const name = call.request.name;

	call.write({ message: `Welcome ${name}` });
	sleep(5000);

	call.write({ message: `Your name is ${name}` });
	sleep(5000);

	call.write({ message: `Three mensages for ${name}` });
	sleep(5000);

	call.end();
}

function main() {
	const server = new grpc.Server();

	server.addService(proto.greeting.GreetingService.service, {
		SayHello: sayHello,
		SayHelloStream: sayHelloStream,
	});

	const address = "0.0.0.0:5001";

	server.bindAsync(address, grpc.ServerCredentials.createInsecure(), (err) => {
		if (err) throw err;
		console.log(`gRPC server listening on ${address}`);
	});
}

main();
