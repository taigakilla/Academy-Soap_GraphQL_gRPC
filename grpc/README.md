# 🧪 Mini Desafio gRPC --- Node.js

Este projeto faz parte de uma apresentação técnica sobre gRPC.

A ideia é criar um desafio prático e simples para entender:

-   ✅ Unary RPC
-   ✅ Server Streaming RPC
-   ✅ A diferença entre resposta única e múltiplas respostas

Este desafio foi pensado para ser resolvido em **10--15 minutos**.

Sem banco de dados.\
Sem autenticação.\
Sem arquitetura complexa.\
Apenas os fundamentos do gRPC.

------------------------------------------------------------------------

# 📦 Pré-requisitos

Certifique-se de ter instalado:

-   Node.js (recomendado v16+)
-   npm
-   Postman (recomendado para testes)
-   grpcurl (opcional)

------------------------------------------------------------------------

# 🚀 Como Rodar o Projeto

## 1️⃣ Instalar dependências

Dentro da pasta do projeto:

``` bash
npm install
```

## 2️⃣ Iniciar o servidor

``` bash
npm start
```

Você deverá ver:

    gRPC server listening on 0.0.0.0:5001

O servidor estará rodando em:

    localhost:5001

------------------------------------------------------------------------

# 🧪 Testando com Postman (Recomendado)

👉 Todas as chamadas do desafio devem ser feitas usando o Postman.

Como parte do desafio, vocês também deverão:

- Descobrir como se conectar corretamente a uma API gRPC utilizando o Postman
- Importar ou configurar o `.proto` corretamente
- Entender como enviar o parâmetro `name`
- Garantir que o request está sendo feito no formato correto

---

### 1️⃣ Criar uma Requisição gRPC

1. Abra o **Postman**
2. Clique em **New**
3. Escolha **gRPC**
4. Informe o endereço:
------------------------------------------------------------------------

## 2️⃣ Importar o Arquivo .proto

1.  Clique em **Select a method**
2.  Importe:

```{=html}
<!-- -->
```
    proto/greeting.proto

Você verá:

    greeting.GreetingService

Com os métodos: - SayHello - SayHelloStream

------------------------------------------------------------------------

# 🎯 O Desafio

Você receberá um projeto gRPC já configurado.

Sua missão:

Implementar os métodos do serviço.

------------------------------------------------------------------------

## 🔹 Parte 1 --- Unary RPC

Implemente:

    SayHello(call, callback)

Regras:

-   Receber o nome
-   Retornar:

```{=html}
<!-- -->
```
    Hello, {name}! Welcome to gRPC.

------------------------------------------------------------------------

## 🔹 Parte 2 --- Server Streaming

Implemente:

    SayHelloStream(call)

Regras:

-   Responder 3 mensagens para o client
  - `Hello, ${name}! 👋`,
  - `Nice to see you, ${name}!`,
  - `Welcome to gRPC streaming, ${name}! 🚀`,
-   Esperar 5 segundo entre cada mensagem
-   Finalizar corretamente a stream

------------------------------------------------------------------------

# 🧠 Objetivos de Aprendizado

Ao finalizar o desafio, você deve entender:

-   Como o arquivo `.proto` define o contrato
-   Como o service é mapeado para funções no servidor
-   A diferença entre:
    -   `callback()` → Unary
    -   `call.write()` + `call.end()` → Streaming

------------------------------------------------------------------------

🔥 Agora é com você. Bom desafio!
