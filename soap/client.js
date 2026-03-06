const soap = require("soap");

const WSDL_URL = "http://localhost:8080/ws/greeting?wsdl";

const nome = "Taiga";

soap.createClient(WSDL_URL, (err, client) => {
	if (err) {
		console.error("Erro ao criar cliente SOAP:", err);
		return;
	}

	client.SayHello({ name: nome }, (err, result) => {
		if (err) {
			console.error("Erro na chamada SayHello:", err.message);
			return;
		}

		console.log(`SayHello respondeu:`);
		console.log(result);
	});

	client.GetGreeting({ name: nome, language: "PT-BR" }, (err, result) => {
		if (err) {
			console.error("Erro na chamada SayHello:", err.message);
			return;
		}

		const { greeting, timestamp } = result;
		const dataBR = new Date(timestamp).toLocaleString("pt-BR");

		console.log("\nGetGreeting respondeu:");
		console.log({
			greeting: greeting,
			timestamp: dataBR,
		});
	});

	client.ValidateName({ name: "" }, (err, result) => {
		if (err) {
			console.error("\nAlgo deu errado validando o nome: ", err.message);
			return;
		}

		console.log(`ValidateName respondeu:`);
		console.log(result);
	});
});
