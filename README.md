# 🍲 Sabor de Casa – Comida Caseira com Amor

Uma plataforma web moderna e responsiva desenvolvida para o restaurante **Sabor de Casa**, especializado em culinária típica piauiense. O projeto combina uma interface elegante com funcionalidades avançadas de front-end e integração com serviços de back-end.

## 👥 Participantes do Grupo

| Nome | 
|------|
| Eduardo Castelo Branco Lima |
| Gabriel Marques |
| Vinicius Gomes de Oliveira |
| Clidenor de Carvalho Moura Junior |

## 📋 Sobre o Projeto

Este projeto foi construído com o objetivo de unir a tradição da comida caseira com a modernidade das tecnologias web. Ele serve como uma demonstração técnica de habilidades em manipulação de DOM, consumo de APIs externas e persistência de dados em tempo real.

## ✨ Funcionalidades

- **Cardápio Dinâmico:** Listagem de pratos gerada via JavaScript a partir de uma base de dados interna, facilitando a manutenção.
- **Filtros Inteligentes:** Categorização por Pratos Principais, Porções, Vegetarianos e Sobremesas.
- **Sistema de Pedidos:** Modal interativo para realização de pedidos com personalizações e escolha de forma de pagamento.
- **Validação de Formulários:** Verificação em tempo real de nomes (bloqueio de números) e telefones (bloqueio de letras) para garantir dados limpos.
- **Integração ViaCEP API:** Busca automática de endereço (Rua, Bairro, Cidade) ao informar o CEP, utilizando `Fetch API` e `async/await`.
- **Back-end com Firebase:** Armazenamento persistente de todos os pedidos realizados diretamente no **Google Firebase Firestore**.
- **Painel de Gestão (Admin):** Interface para o gerente controlar a disponibilidade de cada prato em tempo real.
- **Responsividade Total:** Layout adaptável para dispositivos móveis, tablets e desktops utilizando CSS Grid e Flexbox.

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estrutura semântica para melhor acessibilidade e SEO.
- **CSS3:** Estilização avançada com variáveis nativas, Flexbox e CSS Grid.
- **JavaScript (ES6+):** Lógica de interatividade, manipulação do DOM e funções assíncronas.
- **Firebase Firestore:** Banco de dados NoSQL para persistência de pedidos.
- **ViaCEP API:** API pública para consulta de endereços brasileiros.

## 🚀 Como Executar o Projeto

1.  **Clonagem/Download:** Baixe os arquivos do projeto para sua máquina local.
2.  **Configuração do Firebase:**
    -   Crie um projeto no [Console do Firebase](https://console.firebase.google.com/).
    -   Ative o **Firestore Database** em "Modo de Teste".
    -   Crie uma Web App e copie as chaves de configuração.
    -   Substitua o objeto `firebaseConfig` no topo do arquivo `script.js` pelas suas chaves.
3.  **Execução:** Abra o arquivo `index.html` em qualquer navegador moderno.

## 📁 Estrutura de Arquivos

```text
/SaborDeCasa
│
├── index.html     # Estrutura principal e seções do site
├── style.css      # Estilização, layout responsivo e animações
├── script.js     # Lógica do cardápio, validações, API e Firebase
└── /img           # Pasta contendo as imagens dos pratos e equipe
```