# 3. DOCUMENTO DE ESPECIFICAÇÃO DE REQUISITOS DE SOFTWARE
Constarão a seguir os detalhamentos dos requisitos do sistema.

## 3.1 Objetivos deste documento
Descrever e especificar as necessidades dos Usuários que devem ser atendidas pela plataforma de jogos RPG e Geek.

## 3.2 Escopo do produto

### 3.2.1 Nome do produto e seus componentes principais

O produto será uma plataforma de jogos de RPG denominado Portal dos Mestres, um sistema web para unir os jogadores. Ela será composta pelos seguintes componentes (módulos do sistema):

- Módulo de gerenciamento de usuários
- Módulo de perfis com preferências e papéis de jogo (mestre/jogador)
- Módulo de busca por usuários, eventos e estabelecimentos
- Módulo de gerenciamento de eventos (campanhas são um tipo de evento)
- Módulo de gerenciamento de estabelecimentos
- Módulo de criação e participação em grupos ou eventos de RPG
- Módulo de avaliação e comentários

### 3.2.2 Missão do produto

Facilitar a conexão entre jogadores de RPG de mesa e mestres, promovendo a descoberta de eventos e espaços para a prática do RPG, incentivando a socialização e o crescimento da comunidade no Brasil.

### 3.2.3 Limites do produto

O Portal dos Mestres não fornece:

- Sistema de rolagem de dados ou virtualização de partidas
- Ferramentas para condução de RPG online (ex: mapas, fichas, etc.)
- Sistema de chat por voz ou vídeo
- Moderação de conteúdo automatizada
- Importação de campanhas ou personagens


### 3.2.4 Benefícios do produto

| #  | Benefício                                              | PRIORIDADE |
|----|---------------------------------------------------------|----------------------|
| 1  | Conexão com outros jogadores e mestres                 | Essencial            |
| 2  | Facilidade na descoberta de eventos e espaços sobre                   | Essencial            |
| 3  | Facilidade na organização de partidas presenciais                    | Essencial            |
| 4  | Avaliações de eventos e locais                         | Recomendável         |
| 5  | Interface amigável e responsiva                        | Recomendável         |


## 3.3 Descrição geral do produto

### 3.3.1 Requisitos Funcionais

| Código | Requisito Funcional (Funcionalidade)             | Descrição |
|--------|--------------------------------------------------|-----------|
| RF1    | Cadastrar e editar usuários                      | Permitir o cadastro e edição do usuário com informações pessoais (nome, idade, região) |
| RF2    | Autenticar Usuário                               | Realizar login e logout com suporte à e-mail/senha  |
| RF3    | Gerenciar Perfil                                 | Permitir editar informações do perfil, papéis (mestre/jogador, um mesmo usuário pode ter um perfil de mestre e um de jogador com condições diferentes) e preferências (gênero do RPG, etc.) |
| RF4    | Buscar Perfis                                  | Buscar outros jogadores por localização, papéis, estilos de RPG |
| RF5    | Criar Grupos de Jogo                             | Permitir criação e gerenciamento de grupos públicos ou privados |
| RF6    | Participar de Grupos                             | Permitir entrada ou solicitação para participar de grupos de RPG |
| RF7    | Cadastrar Estabelecimentos                       | Permitir o registro de espaços geek por donos/administradores |
| RF8    | Cadastrar Eventos                                | Permitir que organizadores registrem eventos com data, local, público e tags |
| RF9    | Buscar Eventos e Estabelecimentos                | Permitir pesquisa por nome, localização, tags e datas |
| RF10   | Avaliar Eventos e Estabelecimentos               | Permitir avaliação com comentários e notas de locais e eventos |
| RF11   | Gerenciar Notificações                           | Enviar alertas sobre eventos próximos, novos grupos ou mensagens recebidas |
| RF13   | Gerenciar Participações em Eventos               | Confirmr ou aprovar presença e acompanhar eventos de interesse |
| RF14   | Visualizar listagem de eventos e estabelecimentos recém-criados                      | Apresentar mural eventos recentes e postagens da comunidade |
| RF15   | Enviar Mensagens em grupos                       | Permitir comunicação entre usuários via mensagens em grupos |
| RF16   | Moderar Conteúdos                                | Permitir que administradores removam conteúdo ofensivo ou fora das regras |
| RF17   | Gerenciar administradores                        | Permitir que administradores sejam cadastrados, listados e removidos |
| RF18   | Publicar dúvidas, notícias ou discussões públicas  | Permitir que os alunos compartilhem novidades ou dúvidas e comentem através de postagens  |


### 3.3.2 Requisitos Não Funcionais

| Código | Requisito Não Funcional (Restrição) |
|--------------------|------------------------------------|
| RNF1 | Compatibilidade                     | A aplicação deve funcionar nos principais navegadores e dispositivos móveis |
| RNF2 | Segurança	| O produto deve restringir o acesso por meio de senhas individuais para o usuário. |
| RNF3 | Acessibilidade                      | A interface deverá ser compatível com leitores de tela |
| RNF4   | Desempenho                          | O sistema deve responder às requisições em até 2 segundos |


### 3.3.3 Usuários 

| Ator              | Descrição |
|------------------|-----------|
| Administrador     | Usuário com acesso total ao sistema, com permissão para editar, excluir e moderar qualquer conteúdo |
| Jogador           | Usuário que busca participar de eventos e grupos, interagir com outros jogadores, eventos e locais |
| Mestre            | Usuário que organiza e publica eventos do tipo campanhas, forma grupos e interage com jogadores |
| Lojista / Organizador   | Responsável pelo cadastro de espaços físicos e eventos de outros tipos |



## 3.4 Modelagem do Sistema

### 3.4.1 Diagrama de Casos de Uso
Como observado no diagrama de casos de uso da Figura 1, a secretária poderá gerenciar as matrículas e professores no sistema, enquanto o coordenador, além dessas funções, poderá gerenciar os cursos de aperfeiçoamento.

#### Figura 1: Diagrama de Casos de Uso do Sistema.


 
### 3.4.2 Descrições de Casos de Uso

Cada caso de uso deve ter a sua descrição representada nesta seção. Exemplo:

#### Cadastrar e editar usuários (CSU01)

Sumário: O Usuário realiza o cadastro na plataforma e pode posteriormente editar suas informações pessoais.

Ator Primário: Usuário.

Pré-condições: O Usuário deve estar com acesso ao sistema.

Fluxo Principal:

1) O Usuário acessa a funcionalidade de cadastro ou edição de conta.
2) O Sistema apresenta as operações possíveis: criação de uma nova conta ou edição de dados existentes.
3) O Usuário seleciona a operação desejada: Inclusão ou Alteração, ou opta por finalizar o caso de uso.
4) Se o Usuário desejar continuar, o caso de uso retorna ao passo 2; caso contrário, o caso de uso termina.

Fluxo Alternativo (1): Inclusão  
a) O Usuário requisita a criação de uma nova conta.  
b) O Sistema apresenta um formulário em branco solicitando nome, idade, e-mail, senha e localização.  
c) O Usuário fornece os dados solicitados.  
d) O Sistema valida os dados e verifica se o e-mail já está cadastrado.  
e) Se os dados forem válidos e o e-mail for único, o sistema realiza o cadastro e confirma o sucesso da operação; caso contrário, informa os erros e solicita correções.

Fluxo Alternativo (2): Alteração  
a) O Usuário acessa seu perfil e escolhe editar suas informações.  
b) O Sistema apresenta o formulário com os dados atuais.  
c) O Usuário edita os campos desejados e envia.  
d) O Sistema verifica a validade dos dados e, se forem válidos, atualiza o perfil e confirma a operação; caso contrário, exibe os erros encontrados.

Pós-condições: Um novo usuário foi criado, ou seus dados foram modificados com sucesso.

Requisitos: RF1

---

#### Autenticar Usuário (CSU02)

Sumário: O Usuário realiza login ou logout para acessar ou sair da plataforma.

Ator Primário: Usuário.

Pré-condições: O Usuário deve ter uma conta válida registrada.

Fluxo Principal:

1) O Usuário acessa a página de login.
2) O Sistema solicita e-mail e senha.
3) O Usuário preenche os campos e envia.
4) O Sistema verifica a validade das credenciais.
5) Se válidas, autentica o usuário e redireciona para o painel; caso contrário, exibe mensagem de erro.
6) O Usuário pode realizar logout a qualquer momento pelo menu da plataforma.

Pós-condições: O Usuário foi autenticado ou desconectado da plataforma.

Requisitos: RF2

---

#### Gerenciar Perfil (CSU03)

Sumário: O Usuário edita dados do seu perfil, define seus papéis (mestre, jogador ou ambos) e preferências de RPG.

Ator Primário: Usuário.

Pré-condições: O Usuário deve estar autenticado.

Fluxo Principal:

1) O Usuário acessa a área de perfil.
2) O Sistema exibe as informações atuais e opções de edição.
3) O Usuário escolhe as opções desejadas: papéis, estilos de RPG, tags, etc.
4) O Sistema valida os dados informados.
5) O Sistema salva as alterações e apresenta mensagem de sucesso.

Pós-condições: O perfil do usuário foi atualizado com sucesso.

Requisitos: RF1, RF3

---

#### Buscar Perfis (CSU04)

Sumário: O Usuário busca por outros jogadores e mestres com base em filtros como localização, papel e preferências de jogo.

Ator Primário: Usuário.

Pré-condições: O Usuário deve estar autenticado.

Fluxo Principal:

1) O Usuário acessa a funcionalidade de busca.
2) O Sistema apresenta filtros como localização, papel, estilo de jogo, entre outros.
3) O Usuário preenche os filtros desejados e inicia a busca.
4) O Sistema retorna a lista de perfis correspondentes.
5) O Usuário pode visualizar os detalhes de um perfil clicando no resultado.

Pós-condições: O Usuário acessou uma ou mais informações de outros perfis.

Requisitos: RF4

---

#### Gerenciar Grupos de Jogo (CSU05)

Sumário: O Usuário cria e administra grupos de RPG públicos ou privados.

Ator Primário: Usuário.

Pré-condições: O Usuário deve estar autenticado.

Fluxo Principal:

1) O Usuário acessa a área de grupos.
2) O Sistema exibe a lista de grupos e opção para criar novo grupo.
3) O Usuário seleciona "criar grupo".
4) O Sistema solicita informações como nome, descrição, visibilidade, temas e vagas.
5) O Usuário preenche os dados e envia.
6) O Sistema valida e registra o grupo, vinculando-o ao criador.

Fluxo Alternativo (1): Edição ou exclusão de grupo  
a) O Usuário acessa um grupo que administra.  
b) O Sistema exibe opções de edição ou exclusão.  
c) O Usuário realiza a ação desejada.  
d) O Sistema valida e atualiza o grupo conforme solicitado.

Pós-condições: Um novo grupo foi criado ou um grupo existente foi editado/removido.

Requisitos: RF5, RF6

---

#### Gerenciar Estabelecimentos e Eventos (CSU06)

Sumário: O Organizador (usuário ou responsável por espaço) realiza o cadastro e manutenção de estabelecimentos e eventos geek.

Ator Primário: Organizador / Estabelecimento.

Pré-condições: O Organizador deve estar autenticado.

Fluxo Principal:

1) O Organizador acessa a área de eventos/estabelecimentos.
2) O Sistema apresenta a lista de eventos/estabelecimentos do usuário e opção para cadastro.
3) O Organizador escolhe a operação desejada: inclusão, alteração ou exclusão.
4) O Sistema solicita e exibe os formulários necessários.
5) O Organizador preenche ou altera os dados e envia.
6) O Sistema valida e executa a operação solicitada.

Pós-condições: Um novo evento/estabelecimento foi cadastrado ou modificado.

Requisitos: RF7, RF8

---

#### Buscar Eventos e Estabelecimentos (CSU07)

Sumário: O Usuário busca por eventos e estabelecimentos cadastrados na plataforma.

Ator Primário: Usuário.

Pré-condições: O sistema deve estar acessível.

Fluxo Principal:

1) O Usuário acessa a funcionalidade de busca.
2) O Sistema apresenta campos e filtros de busca como nome, cidade, data, tags.
3) O Usuário preenche os filtros e inicia a busca.
4) O Sistema retorna os resultados e exibe os dados básicos.
5) O Usuário pode visualizar mais detalhes clicando no item.

Pós-condições: O Usuário acessou dados de eventos e/ou estabelecimentos.

Requisitos: RF9, RF14

---

#### Avaliar Eventos e Estabelecimentos (CSU08)

Sumário: O Usuário registra uma avaliação e comentário sobre eventos ou estabelecimentos frequentados.

Ator Primário: Usuário.

Pré-condições: O Usuário deve estar autenticado e ter participado de um evento ou visitado um estabelecimento.

Fluxo Principal:

1) O Usuário acessa a página do evento ou local.
2) O Sistema exibe a opção de avaliação.
3) O Usuário preenche nota, comentário e envia.
4) O Sistema salva os dados e exibe mensagem de sucesso.

Pós-condições: Uma avaliação foi registrada com sucesso.

Requisitos: RF10

---

#### Gerenciar Notificações e Participações (CSU09)

Sumário: O Sistema envia notificações ao usuário, que também pode confirmar presença ou se interessar por eventos.

Ator Primário: Usuário.

Pré-condições: O Usuário deve estar autenticado.

Fluxo Principal:

1) O Sistema identifica ações relevantes para o usuário (ex: evento próximo, mensagem recebida).
2) O Sistema gera notificações e exibe no painel do usuário.
3) O Usuário visualiza a notificação e pode acessar o conteúdo.
4) O Usuário acessa um evento e confirma participação.
5) O Sistema registra a presença ou interesse.

Pós-condições: Uma notificação foi exibida e a presença em um evento foi registrada.

Requisitos: RF11, RF13

---

#### Enviar Mensagens em Grupos (CSU10)

Sumário: O Usuário envia mensagens nos grupos de RPG dos quais participa.

Ator Primário: Usuário.

Pré-condições: O Usuário deve ser membro de pelo menos um grupo.

Fluxo Principal:

1) O Usuário acessa um grupo.
2) O Sistema exibe o chat e o histórico de mensagens.
3) O Usuário digita uma nova mensagem e envia.
4) O Sistema publica a mensagem no grupo e a disponibiliza para os demais membros.

Pós-condições: Uma nova mensagem foi enviada com sucesso em um grupo.

Requisitos: RF15

---

#### Moderar Conteúdos e Administradores (CSU11)

Sumário: O Administrador modera conteúdos reportados e gerencia outros administradores da plataforma.

Ator Primário: Administrador.

Pré-condições: O Administrador deve estar autenticado com privilégios adequados.

Fluxo Principal:

1) O Administrador acessa o painel de moderação.
2) O Sistema exibe conteúdos sinalizados e a lista de administradores ativos.
3) O Administrador seleciona uma ação: excluir conteúdo, suspender conta, adicionar/remover administrador.
4) O Sistema executa a ação e atualiza os registros.

Pós-condições: Um conteúdo foi moderado ou a lista de administradores foi atualizada.

Requisitos: RF16, RF17

### 3.4.3 Diagrama de Classes 

#### Figura 2: Diagrama de Classes do Sistema.
 
![image](https://github.com/user-attachments/assets/abc7591a-b46f-4ea2-b8f0-c116b60eb24e)


### 3.4.4 Descrições das Classes 

| # | Nome            | Descrição                                                                 |
|---|-----------------|---------------------------------------------------------------------------|
| 1 | User            | Armazena informações básicas de autenticação e localização do usuário.   |
| 2 | Admin           | Representa um usuário com privilégios administrativos no sistema.         |
| 3 | Profile         | Define perfis de usuário com nome, tipo (mestre, jogador) e tags.         |
| 4 | Event           | Representa eventos presenciais ou online cadastrados na plataforma.       |
| 5 | EventPresence   | Registra a presença e confirmação de usuários em eventos.                 |
| 6 | Store           | Representa locais/geek stores onde eventos podem ocorrer.                 |
| 7 | Group           | Estrutura de agrupamento entre perfis para organização de campanhas.      |
| 8 | GroupAccess     | Registra a associação entre perfis e grupos com controle de acesso.       |
| 9 | Posts           | Publicações feitas dentro dos grupos por perfis.                          |
| 10 | Comments       | Comentários feitos em posts por usuários.  
