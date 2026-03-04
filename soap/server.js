const http = require("http");
const path = require("path");
const soap = require("soap");
const fs = require("fs");

const WSDL_PATH = path.join(__dirname, "wsdl", "greeting.wsdl");

const greetingService = {
  GreetingService: {
    GreetingPort: {
      SayHello: function (args, callback) {
        const name = args.name || "World";
        callback(null, { message: `Hello, ${name}! Welcome to SOAP.` });
      },

      SayHelloMultiple: function (args, callback) {
        const name = args.name || "World";
        callback(null, {
          message1: `Hello, ${name}! 👋`,
          message2: `Nice to see you, ${name}!`,
          message3: `Welcome to SOAP streaming, ${name}! 🚀`,
        });
      },

      SayGoodbye: function (args, callback) {
        // TODO: Implementar (desafio)
        callback({
          Fault: {
            faultcode: "Server",
            faultstring: "Not implemented",
            statusCode: 501,
          },
        });
      },

      GetGreeting: function (args, callback) {
        const name = args.name || "World";
        const lang = (args.language || "en").toLowerCase();
        const greetings = { en: "Hello", pt: "Olá", es: "Hola" };
        const greeting = `${greetings[lang] || greetings.en}, ${name}!`;
        callback(null, {
          greeting,
          timestamp: new Date().toISOString(),
        });
      },

      ValidateName: function (args, callback) {
        const name = String(args.name || "").trim();
        if (!name) {
          return callback({
            Fault: {
              faultcode: "Client",
              faultstring: "Name inválido ou vazio",
              statusCode: 500,
            },
          });
        }
        callback(null, { valid: true });
      },
    },
  },
};

const server = http.createServer((req, res) => {
  if (!req.url.startsWith("/ws/greeting")) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

const PORT = 8080;
const SOAP_PATH = "/ws/greeting";
const wsdl = fs.readFileSync(WSDL_PATH, "utf8");

soap.listen(server, SOAP_PATH, greetingService, wsdl, (err) => {
  if (err) {
    console.error("Erro ao iniciar servidor SOAP:", err);
    process.exit(1);
  }
  console.log(`SOAP server listening on http://localhost:${PORT}${SOAP_PATH}`);
  console.log(`WSDL disponível em: http://localhost:${PORT}${SOAP_PATH}?wsdl`);
});

server.listen(PORT, () => {
  console.log(`HTTP server listening on port ${PORT}`);
});
