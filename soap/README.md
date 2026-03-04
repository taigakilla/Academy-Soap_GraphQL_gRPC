# 🧪 Mini Desafio SOAP --- Node.js

Este projeto faz parte de uma apresentação técnica sobre SOAP.

A ideia é criar um desafio prático e simples para entender:

-   ✅ Como consumir um serviço SOAP a partir do WSDL
-   ✅ Como o WSDL define o contrato e gera os métodos do cliente
-   ✅ Como tratar SOAP Fault nas respostas

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

# 🧪 Explorando o serviço (opcional)

Antes de codar, você pode explorar o WSDL e as operações:

- **WSDL:** GET `http://localhost:8080/ws/greeting?wsdl` — veja o contrato e as operações disponíveis
- **Postman:** Útil para testar as operações manualmente (POST, headers `Content-Type: text/xml` e `SOAPAction`)

------------------------------------------------------------------------

# 🎯 O Desafio

Você receberá um servidor SOAP já rodando com o `GreetingService`.

Sua missão:

**Criar um script Node.js que consuma o serviço SOAP** usando a biblioteca `soap`.

------------------------------------------------------------------------

## 🔹 O que fazer

Crie um arquivo (ex: `client.js`) que:

1. Conecte ao WSDL: `http://localhost:8080/ws/greeting?wsdl`
2. Chame `SayHello` com um nome e exiba a resposta
3. Chame `GetGreeting` com `name` e `language` e exiba o resultado
4. Chame `ValidateName` com `name` vazio e **trate o SOAP Fault** (não deixe quebrar)

------------------------------------------------------------------------

## 🔹 Dicas

- Use `soap.createClient(url, callback)` para criar o cliente
- O cliente expõe métodos em `client.GreetingService.GreetingPort.[NomeDaOperação]`
- Cada método recebe `(args, callback)` onde `args` é um objeto com os parâmetros
- O callback recebe `(err, result)` — em caso de Fault, `err` virá preenchido

------------------------------------------------------------------------

# 🧠 Objetivos de Aprendizado

Ao finalizar o desafio, você deve entender:

-   Como o WSDL permite gerar um cliente automaticamente
-   Como chamar operações SOAP a partir de código Node.js
-   Como tratar erros (SOAP Fault) nas respostas

------------------------------------------------------------------------

# 📚 O que você vai encontrar

Ao consumir o serviço, você lidará com:

| Conceito | Onde ver | O que é |
|----------|----------|---------|
| **Operações simples** | `SayHello` | Um parâmetro, uma resposta. |
| **Múltiplos parâmetros** | `GetGreeting` | Recebe `name` e `language`, retorna `greeting` e `timestamp`. |
| **SOAP Fault** | `ValidateName` com `name` vazio | O servidor retorna erro estruturado. O callback receberá `err` preenchido. |

------------------------------------------------------------------------

🔥 Agora é com você. Bom desafio!
