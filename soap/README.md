# 🧪 Mini Desafio SOAP --- Node.js

Este projeto faz parte de uma apresentação técnica sobre SOAP.

A ideia é criar um desafio prático e simples para entender:

-   ✅ Como o WSDL define o contrato
-   ✅ Como adicionar novas operações ao serviço
-   ✅ A relação entre WSDL e implementação no servidor

Este desafio foi pensado para ser resolvido em **10--15 minutos**.

Sem banco de dados.\
Sem autenticação.\
Sem arquitetura complexa.\
Apenas os fundamentos do SOAP.

------------------------------------------------------------------------

# 📦 Pré-requisitos

Certifique-se de ter instalado:

-   Node.js (recomendado v16+)
-   npm
-   Postman (recomendado para testes)

------------------------------------------------------------------------

# 🚀 Como Rodar o Projeto

## 1️⃣ Instalar dependências

Dentro da pasta do projeto:

```bash
npm install
```

## 2️⃣ Iniciar o servidor

```bash
npm run start:soap
```

Você deverá ver:

```
SOAP server listening on http://localhost:8080/ws/greeting
WSDL disponível em: http://localhost:8080/ws/greeting?wsdl
HTTP server listening on port 8080
```

O servidor estará rodando em:

```
http://localhost:8080/ws/greeting
```

------------------------------------------------------------------------

# 🧪 Testando com Postman (Recomendado)

👉 Todas as chamadas do desafio devem ser feitas usando o Postman.

Como parte do desafio, vocês também deverão:

- Descobrir as operações via `?wsdl` (GET http://localhost:8080/ws/greeting?wsdl)
- Configurar os headers (`Content-Type: text/xml`, `SOAPAction`)
- Montar o body XML para cada operação
- Garantir que o request está no formato correto

---

### 1️⃣ Descobrir o WSDL

1. Crie uma requisição **GET**
2. URL: `http://localhost:8080/ws/greeting?wsdl`
3. Analise a estrutura: `GreetingService`, operações disponíveis, tipos de entrada/saída

------------------------------------------------------------------------

### 2️⃣ Criar uma Requisição SOAP

1. Crie uma requisição **POST**
2. URL: `http://localhost:8080/ws/greeting`
3. Descubra os headers e o formato do body necessários

------------------------------------------------------------------------

# 🎯 O Desafio

Você receberá um projeto SOAP já configurado com `SayHello` e `SayHelloMultiple`.

Sua missão:

**Adicionar uma nova operação** ao `GreetingService`.

------------------------------------------------------------------------

## 🔹 O que fazer

Crie uma operação chamada:

    SayGoodbye

Regras:

-   Receber o parâmetro `name`
-   Retornar uma mensagem de despedida no formato:

```
Goodbye, {name}! See you soon.
```

------------------------------------------------------------------------

# 🧠 Objetivos de Aprendizado

Ao finalizar o desafio, você deve entender:

-   Como o arquivo WSDL define o contrato do serviço
-   Onde declarar novas operações (portType, binding, types)
-   Como mapear a operação no servidor Node.js

------------------------------------------------------------------------

# 📚 Conceitos Extras (para explorar)

O projeto inclui exemplos de funcionalidades adicionais do SOAP:

| Conceito | Onde ver | O que é |
|----------|----------|---------|
| **Tipos complexos** | `GetGreeting` | Operação com múltiplos params (name, language) e retorno (greeting, timestamp). WSDL em `<types>` com `complexType`. |
| **SOAP Fault** | `ValidateName` | Retorna erro estruturado quando `name` vazio. Use `callback(new Error("..."))` para gerar Fault. |
| **Cliente SOAP** | `soap/client.js` | Consumir o serviço via `soap.createClient(url)`. Rode `npm run client:soap` (servidor deve estar ativo). |

------------------------------------------------------------------------

🔥 Agora é com você. Bom desafio!
