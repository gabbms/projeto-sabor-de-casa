# 🍽️ Sabor de Casa

> **Comida caseira com amor e cuidado de sempre**  
> Site institucional e sistema de pedidos online para o restaurante Sabor de Casa, especializado em culinária piauiense e maranhense com ingredientes frescos da região.

---

## 📋 Sobre o Projeto

O **Sabor de Casa** é uma aplicação web desenvolvida para o restaurante homônimo, localizado em Teresina – PI. O sistema oferece uma vitrine digital completa para o negócio, integrando cardápio interativo, sistema de pedidos e painel administrativo com autenticação.

---

## ✨ Funcionalidades

- **Página Inicial** — Hero com estatísticas do restaurante e seção de destaques do dia
- **Cardápio Interativo** — Listagem de pratos com filtro por categoria (Pratos Principais, Porções, Vegetarianos, Sobremesas)
- **Sistema de Pedidos** — Modal completo com:
  - Personalizações por prato
  - Validação de campos (nome, telefone)
  - Seleção de tipo de entrega (Retirada ou Delivery)
  - Busca automática de endereço por CEP (via ViaCEP)
  - Opções de pagamento (Dinheiro, PIX, Crédito, Débito)
- **Nossa História** — Página institucional com história, filosofia e apresentação da equipe
- **Painel Administrativo** — Área protegida por login com gerenciamento de disponibilidade dos pratos em tempo real
- **Toast de notificações** — Feedback visual para ações do usuário

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Finalidade |
|---|---|
| HTML5 | Estrutura das páginas |
| CSS3 | Estilização e layout responsivo |
| JavaScript (Vanilla) | Lógica da aplicação e interatividade |
| Firebase Firestore | Banco de dados em tempo real |
| Firebase Authentication | Autenticação do painel admin |
| Google Fonts | Tipografia (Playfair Display + Lato) |
| ViaCEP API | Busca de endereço por CEP |

---

## 📁 Estrutura do Projeto

```
sabor-de-casa/
├── index.html        # Estrutura principal da aplicação
├── style.css         # Estilos globais e componentes
├── script.js         # Lógica da aplicação, Firebase e renderização
└── img/              # Imagens dos pratos e ícones
```

---

## 🚀 Como Executar

1. Clone ou baixe o repositório
2. Configure as credenciais do Firebase em `script.js` com seu próprio projeto
3. Abra o `index.html` em um servidor local (ex: Live Server no VS Code)

> ⚠️ **Atenção:** As credenciais do Firebase devem ser protegidas com restrições de domínio no console do Firebase. Nunca exponha chaves de conta de serviço no código-fonte.

---

## 🔐 Acesso Administrativo

A seção de **Gestão** é protegida por autenticação via Firebase Auth. O login exige e-mail e senha cadastrados previamente no console do Firebase Authentication. 

**e-mail de acesso: admin@sabordecasa.com**
**senha: 12345678**

---

## 📦 Cardápio

O sistema conta com **10 pratos cadastrados**, organizados nas categorias:

- 🫘 **Pratos Principais** — Feijoada Completa, Escondidinho de Carne Seca, Arroz de Cuxá, Moqueca de Peixe, Baião de Dois
- 🥙 **Porções** — Bolinho de Bacalhau, Carne de Sol na Chapa, Macaxeira Frita
- 🥗 **Vegetarianos** — Salada Verde da Roça, Prato Vegetariano do Dia
- 🍮 **Sobremesas** — Pudim de Leite, Canjica com Coco

---

## 👥 Equipe de Desenvolvimento

| Nome | Papel |
|---|---|
| **Eduardo Castelo Branco Lima** | Desenvolvimento |
| **Gabriel Marques Sousa** | Desenvolvimento |
| **Vinicius Gomes de Oliveira** | Desenvolvimento |
| **Clidenor de Carvalho Moura Junior** | Desenvolvimento |

---