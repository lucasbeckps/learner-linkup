# Arquitetura do Projeto 🌐

**Decisão da Arquitetura Utilizada:** Optei por um mono-repositório utilizando Yarn Berry, visando o aprimoramento do 
gerenciamento de dependências e a facilitação do compartilhamento de código entre back-end e front-end. A utilização de 
um mono-repositório promove uma integração e manutenção simplificadas, além de unificar a configuração de ferramentas 
usadas em comum entre as diferentes camadas da aplicação.

## Backend 🖥️
Implementei o back-end com NestJS, adotando a estrutura modular sugerida pela própria CLI do framework. Esta estrutura 
promove uma organização clara e facilita a manutenção e escalabilidade do serviço de API.

## Frontend 🎨
Para o front-end, escolhi o Vuetify conforme solicitado, organizando os componentes por contexto. Isso permite uma 
maior clareza nas responsabilidades de cada componente dentro da aplicação.

## Bibliotecas e Ferramentas Utilizadas 🛠️

### Backend
- **NestJS:** Framework para construção de aplicações Node.js escaláveis.
- **TypeORM:** ORM para interação com bancos de dados PostgreSQL.
- **Jest:** Utilizado para testes unitários.
- **JWT e Bcrypt:** Empregados para autenticação e segurança.
- **Class-Validator e dotenv:** Para validação de dados e gerenciamento de variáveis de ambiente.

### Frontend
- **Vue.js e Vuetify:** Para construção de interfaces de usuário interativas.
- **Vue Router e Axios:** Gerenciamento de rotas e requisições HTTP.
- **Tanstack/vue-query:** Para gerenciamento de estado e dados.
- **Lodash Debounce e Maska:** Utilizados para funções de debounce e máscaras de input.
- **Vue-Toast-Notification:** Para exibição de notificações ao usuário.

### Global
- **Yarn Berry:** Gerenciador de pacotes que facilita o uso de mono-repositórios.
- **Docker:** Utilizado para containerização da aplicação.
- **Concurrently:** Permite a execução de múltiplos comandos simultaneamente.
- **Prettier e ESLint:** Ferramentas para assegurar a padronização de código.

## Melhorias Futuras 🌟
Durante o desenvolvimento do projeto, empenhei esforços na codificação manual das funcionalidades, assegurando a 
qualidade e a robustez do sistema. No entanto, para os testes unitários, recorri temporariamente à 
geração automática com IA para otimizar o tempo, dada a complexidade do desenvolvimento em 
múltiplas camadas da aplicação. Com mais tempo, eu priorizaria a substituição desses testes automáticos por abordagens 
manuais, permitindo uma validação mais detalhada e adaptada às especificidades de cada funcionalidade, reforçando a 
integridade e a confiabilidade do sistema.

# Considerações Finais 💬
Este projeto foi uma oportunidade para demonstrar minhas habilidades em desenvolvimento full stack, especialmente no 
que diz respeito ao detalhe nas interfaces do front-end, onde apliquei uma atenção especial à experiência do usuário e 
à estética visual. Estou disponível para discutir qualquer aspecto do desenvolvimento e para 
aprofundar em áreas que requiram maior clarificação ou revisão.
