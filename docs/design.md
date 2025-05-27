# 4. PROJETO DO DESIGN DE INTERAÇÃO

## 4.2 Mapa de Empatia

Foi desenvolvida uma persona e um mapa de empatia utilizando o Figma, com o objetivo de compreender profundamente as necessidades, desejos e comportamentos do público-alvo. Esses materiais foram criados para orientar o processo de design e garantir que as soluções propostas estejam alinhadas com as expectativas dos usuários.

Para visualizar os protótipos, acesse: https://www.figma.com/board/DjeYxh8Aenx3iCICNnGRyf/Mapa-de-empatia--Community-?node-id=0-1&t=XB9gIOwc1H1ZlsLB-1


## 4.3 Protótipos das Interfaces

Os protótipos das telas foram desenvolvidos no Figma: https://www.figma.com/design/uLi9Ljs5xh8YoNwaNdvMkm/Wireframe-de-M%C3%A9dia-Fidelidade---Projeto-1-DIO--Community-?node-id=0-1&t=sCjH8QK1xYfLPfdl-1, com o objetivo de criar interfaces intuitivas e eficazes. Cada tela foi projetada seguindo as 8 Regras de Ouro de Ben Shneiderman para garantir uma experiência de usuário consistente e amigável. Abaixo, detalhamos como essas regras foram aplicadas em 6 telas principais do projeto:


# Tela de Login

A tela de login do sistema apresenta uma interface simples e funcional. Composta por campos de e-mail e senha, além do botão de "Entrar", ela é responsável por autenticar o usuário no sistema.

Manter a consistência: Os elementos visuais como cores, logo, tipografia e alinhamento estão de acordo com o restante da aplicação. Isso contribui para a coerência visual e reduz o tempo de adaptação do usuário.

Permitir atalhos para usuários experientes: Seria interessante oferecer logins alternativos, como autenticação por redes sociais ou biometria em dispositivos móveis.

Oferecer feedback informativo: A interface não mostra mensagens de erro visualizadas. Deve-se implementar feedback visual para situações como senha incorreta ou e-mail inválido, com destaque em vermelho e mensagens claras.

Projetar diálogos que fechem: A tarefa de login é simples e direta. Os campos estão bem organizados e o botão de ação está em local esperado. Essa previsibilidade melhora a experiência.

Oferecer tratamento de erros simples: Recomenda-se que campos obrigatórios sejam identificados com asterisco e que mensagens de erro orientem o usuário sobre como resolver o problema.

Permitir desfazer ações: Embora o processo de login não requeira desfazer, um botão de "limpar campos" pode ser adicionado.

Manter o controle pelo usuário: Nenhuma ação é realizada sem o comando direto do usuário (clique em "Entrar").

Reduzir a carga de memória do usuário: A interface é minimalista e fácil de entender. Labels são claros e não exigem memorizacão.

# Tela de Cadastro

Essa tela possui campos de nome, email, senha e confirmação de senha, com um botão "Cadastrar".

Manter a consistência: Segue o padrão visual do login, o que facilita o reconhecimento e o conforto visual.

Permitir atalhos para usuários experientes: Poderia incluir opção de preenchimento automático e cadastro com Google/Facebook.

Oferecer feedback informativo: Ideal implementar mensagens de validação em tempo real (ex: "senha fraca", "email já cadastrado").

Projetar diálogos que fechem: O cadastro é feito em uma única tela, com campos bem organizados e linguagem objetiva.

Oferecer tratamento de erros simples: Deve haver destaques visuais nos campos com problemas, com mensagens em linguagem simples.

Permitir desfazer ações: Pode-se incluir um botão "Limpar" ou "Cancelar", evitando a necessidade de apagar campo por campo.

Manter o controle pelo usuário: O envio do formulário depende unicamente da ação consciente do usuário.

Reduzir a carga de memória do usuário: Todos os campos estão visíveis e os rótulos são autoexplicativos.

# Tela de Início (Home Page)

Essa tela é o ponto central de navegação e exibe conteúdo visual, links para grupos, menu, pesquisa e notícias.

Manter a consistência: Utiliza padrões visuais idênticos aos das demais telas, com menus, cards e headers alinhados com a identidade do sistema.

Permitir atalhos para usuários experientes: A barra de pesquisa e o menu superior oferecem navegação direta aos principais recursos.

Oferecer feedback informativo: Deve exibir mensagens como "carregando dados...", "nenhum resultado encontrado", etc.

Projetar diálogos que fechem: Os elementos da tela são autoexplicativos, e as ações levam diretamente a outras partes do sistema.

Oferecer tratamento de erros simples: A interface pode indicar quando há falha na conexão ou erro na busca de dados.

Permitir desfazer ações: O uso do histórico do navegador já permite voltar a telas anteriores facilmente.

Manter o controle pelo usuário: O sistema responde unicamente a cliques e comandos do usuário.

Reduzir a carga de memória do usuário: Com a organização em cards e categorias, não é preciso memorizar onde está cada recurso.

# Tela de Perfil

O perfil exibe informações pessoais, avatar, seguidores, participações e grupos.

Manter a consistência: Os elementos visuais estão dentro do padrão do restante do sistema, com header fixo, avatar circular e botões padronizados.

Permitir atalhos para usuários experientes: Oferece barra de pesquisa e acesso rápido às configurações de perfil.

Oferecer feedback informativo: Recomenda-se que ao editar ou atualizar dados do perfil, haja confirmações visuais (ex: "Perfil atualizado com sucesso").

Projetar diálogos que fechem: A apresentação das informações segue um fluxo lógico e organizado, de cima para baixo.

Oferecer tratamento de erros simples: Ao falhar o carregamento do perfil, uma mensagem deve informar o problema.

Permitir desfazer ações: Ideal haver opção de "cancelar alterações" e voltar ao estado anterior.

Manter o controle pelo usuário: O usuário decide quando alterar dados e o que exibir em seu perfil.

Reduzir a carga de memória do usuário: Os ícones de seguidores, grupos e participações auxiliam na compreensão visual imediata.

# Tela de Grupos

Lista de grupos com acesso visual aos cards e opções para entrar ou visualizar.

Manter a consistência: Os cards são idênticos aos da home, promovendo continuidade visual.

Permitir atalhos para usuários experientes: Poderia haver filtro por categoria, grupos favoritos ou acesso rápido a grupos frequentes.

Oferecer feedback informativo: Cada grupo poderia mostrar status (ativo, novo conteúdo, etc).

Projetar diálogos que fechem: A seleção de um grupo é imediata e leva diretamente à tela correspondente.

Oferecer tratamento de erros simples: Informação clara quando grupo está indisponível ou foi removido.

Permitir desfazer ações: Confirmações ao sair de grupos, com opção de cancelar.

Manter o controle pelo usuário: O usuário decide quais grupos entrar ou abandonar.

Reduzir a carga de memória do usuário: A representação visual dos grupos com imagem e nome facilita o reconhecimento imediato.

# Tela de Fórum (Mensagens)

Interface voltada à interação textual entre usuários em posts temáticos.

Manter a consistência: Cabeçalho, ícones e campos de resposta seguem o padrão visual do sistema.

Permitir atalhos para usuários experientes: Respostas rápidas com "Enter", atalhos para marcar usuários ou rolar até o mais recente.

Oferecer feedback informativo: Deve-se apresentar status como "comentário enviado", "erro de conexão", entre outros.

Projetar diálogos que fechem: O processo de leitura e resposta é fluido, com botão claro de envio.

Oferecer tratamento de erros simples: Deve-se alertar sobre erros de envio com sugestões de correção.

Permitir desfazer ações: Incluir "editar" ou "excluir" comentários dentro de um prazo.

Manter o controle pelo usuário: Nenhuma mensagem é enviada automaticamente, somente por ação do usuário.

Reduzir a carga de memória do usuário: O layout com avatares, nomes e datas facilita a navegação entre comentários.

# Conclusão

O protótipo de alta fidelidade desenvolvido para o sistema "Portal dos Mestres" mostra boa aplicação dos princípios das 8 Regras de Ouro de Shneiderman. Ainda há espaço para melhorias em termos de feedback e controle de erros. A implementação dessas melhorias aumentará significativamente a usabilidade, agradabilidade e acessibilidade da interface, tornando-a mais intuitiva e eficiente para o usuário final.


