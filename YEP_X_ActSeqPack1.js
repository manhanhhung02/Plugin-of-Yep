//=============================================================================
// Yanfly Engine Plugins - Battle Engine Extension - Action Sequence Pack 1
// YEP_X_ActSeqPack1.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_ActSeqPack1 = true;

var Yanfly = Yanfly || {};
Yanfly.ASP1 = Yanfly.ASP1 || {};

//=============================================================================
 /*:
 * @plugindesc v1.10 (É necessário ter YEP_BattleEngineCore.js) Funções
 * básicas são adicionadas às sequências de ações do BEC.
 * @author Yanfly Engine Plugins
 *
 * @param Default Volume
 * @desc Esse será o volume do BGM que vai tocar.
 * @default 90
 *
 * @param Default Pitch
 * @desc Esse será o pitch do BGM que vai tocar.
 * @default 100
 *
 * @param Default Pan
 * @desc Esse será o pan do BGM que vai tocar.
 * @default 0
 *
 * @help
 * ============================================================================
 * Introdução
 * ============================================================================
 *
 * O plugin Action Sequence Pack 1 é um plugin de extensão para o Battle
 * Engine Core do Yanfly Engine Plugins. Esse plugin de extensão não
 * irá funcionar sem o plugin principal.
 *
 * Esse plugin de extensão contém as funções mais básicas usadas para
 * personalizar sequências de ações numa escala técnica. Aqui, você é
 * capaz de mudar switches, operar variáveis, adicionar states, mudar
 * taxas de dano, e mais.
 *
 * ============================================================================
 * Sequências de Ações - ala Melody
 * ============================================================================
 *
 * O Battle Engine Core inclui o sistema Battle Engine do Yanfly Engine Melody,
 * onde cada um dos aspectos dos efeitos de habilidade e itens podem ser
 * controlados a um certo ponto. Esses são chamados de Sequências de Ações,
 * onde cada comando na sequência de ação causa o jogo a realizar uma ação
 * individual distinta.
 *
 * Cada habilidade e item consiste de cinco diferentes sequências de ações.
 * Elas são as seguintes:
 *
 * 1. Acões de Set Up
 *   Eles preparam o combatente ativo antes de executar a ação e os seus
 * efeitos individuais. Normalmente o que você vê aqui são coisas como
 * o combatente ativo mover um pouco para frente, desembainhando sua arma, etc.
 * Essa etapa irá ocorrer antes que o combatente ativo gaste o custo de
 * sua habilidade ou item.
 *
 * 2. Acões Inteiras
 *   Essas ações vão afetar todos os alvos simultâneamente. Embora essa seção
 * não precisa ser usada, a maioria das ações vão usar isso para mostrar
 * animações sobre todos os inimigos. Essa etapa ocorre depois do custo de
 * habilidade e item.
 *
 * 3. Ações de Alvo
 *   Essa seção irá afetar todos os alvos individualmente. Usada primeiramente
 * por ataques físicos que irão entregar mais formas de dano. Ações que
 * ocorrem aqui não irão afetar outros alvos a não ser que seja ordenado
 * especificamente para afetar.
 *
 * 4. Ações de Seguir
 *   Essa seção irá se dedicar a trabalhos de cleanup depois das ações de
 * alvos individuais. Aqui, ela fará coisas como remover flags imortais,
 * começar eventos comuns, e mais.
 *
 * 5. Ações Terminadas
 *   Essa seção vai ter o close up das sequências de ações do combatente ativo.
 * Normalmente coisas como fazer esperar e aguardar no último minuto para
 * habilidades e itens, mover de volta para o lugar, e outros.
 *
 * Agora que você sabe cada um dos cinco passos de cada sequência de ação, aqui
 * estão os tags que você pode inserir dentro das habilidades e itens. Preste
 * atenção para cada nome de tag.
 *
 * 1. <setup action>                                5. <finish action>
 *     action list                                      action list
 *     action list                                      action list
 *    </setup action>                                  </finish action>
 *
 * 2. <whole action>       3. <target action>       4. <follow action>
 *     action list             action list              action list
 *     action list             action list              action list
 *    </whole action>         </target action>         </follow action>
 *
 * Eles irão fazer seus respectivos conjunto de ações. Os métodos para inserir
 * para a lista de ações podem ser achados embaixo no core do Help Manual.
 *
 * Além disso,  para prevenir que cada um dos seus noteboxes de item de seu
 * banco de dados esteja cheia de listas de sequências de ações, há um
 * atalho que você pode fazer para copiar todas as ações de set up, ações
 * inteiras, ações de alvo, ações de seguir, e ações terminadas com apenas
 * uma linha.
 *
 * <action copy: x:y>
 *
 * Substitua x com "item" ou "skill" para estabelecer o tipo para o código de
 * lista de ações para copiar diretamente. O número inteiro y é então o ID
 * atribuído para àquele específico tipo de objeto. Por exemplo, para copiar
 * as sequências de ações da 45º habilidade, o código seria
 * <action copy: skill:45> para qualquer coisa que irá aceitar esses códigos
 * de ações. Se você realmente usar esse notetag, ele levará prioridade sobre
 * qualquer outro custom que você pôs no notebox.
 *
 * ============================================================================
 * Digitamento de Alvo
 * ============================================================================
 *
 * Você pode perceber que em algumas das ações abaixo irá dizer "refer to
 * target typing" que é essa seção bem aqui. Aqui está uma rápida lista dos
 * vários alvos que você pode selecionar.
 *
 *   user; Isso irá selecionar o combatente ativo.
 *   target, targets; Isso irá selecionar os combatentes ativos em questão.
 *   actors, existing actors; Isso irá selecionar todos os personagens vivos.
 *   all actors; Isso irá selecionar todos personagens, incluindo os mortos.
 *   dead actors: Isso irá selecionar apenas os personagens mortos.
 *   actors not user; Isso irá selecionar todos os personagens vivos menos
 *   o usuário.
 *   actor x; Isso irá selecionar o personagem no slot x.
 *   character x; Isso irá selecionar o personagem específico com o ID de
 *     personagem de x
 *   enemies, existing enemies; Isso irá selecionar todos os inimigos vivos.
 *   all enemies; Isso irá selecionar todos os inimigos, incluindo os mortos.
 *   dead enemies: Isso irá selecionar apenas os inimigos mortos.
 *   enemies not user; Isso irá selecionar todos os inimigos menos o usuário.
 *   enemy x; Isso irá selecionar o inimigo no slot x.
 *   friends; Isso irá selecionar os aliados vivos do combatente.
 *   all friends; Isso irá selecionar todos os aliados do combatente, até os
 *     mortos.
 *   dead friends; Isso irá selecionar os aliados mortos do combatente.
 *   friends not user; Isso irá selecionar os aliados do combatente, menos
 *     ele mesmo.
 *   friend x: Isso irá selecionar o aliado do combatente no slot x.
 *   opponents; Isso irá selecionar os oponentes vivos do combatente.
 *   all opponents; Isso irá selecionar todos os oponentes do combatente.
 *   dead opponents; Isso irá selecionar os oponentes mortos do combatente.
 *   opponent x: Isso irá selecionar o oponente do combatente no slot x.
 *   all alive; Seleciona todos os personagens e inimigos vivos.
 *   all members; Seleciona todos os personagens e inimigos vivos e mortos.
 *   all dead; Seleciona todos os personagens e inimigos mortos.
 *   all not user; Isso irá selecionar todos os combatentes vivos menos o
 *     usuário.
 *   focus;  Seleciona o combatente ativo e seus alvos.
 *   not focus; Seleciona tudo menos o combatente ativo e seus alvos.
 *
 * ============================================================================
 * Sequência de Ações - Lista de Ações
 * ============================================================================
 *
 * Aqui contém a lista de ações que você pode usar dentro das cinco
 * sequências de ações. Cada ação tem uma função única e requer certos
 * formatos para operar propriamente.
 *
 *=============================================================================
 * ACTION ANIMATION
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Reproduz a animação atribuída da habilidade/item. A animação irá
 * selecionar automaticamente os alvos abtribuídos da habilidade/item.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: action animation
 *=============================================================================
 *
 *=============================================================================
 * ACTION COMMON EVENT
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Reproduz o evento comum achado dentro da lista de traits da habilidade/item.
 * Isso só irá reproduzir o último evento comum da lista, seguindo o processo
 * original do game engine. Nada mais irá continuar na lista de ações até que
 * o evento comum termine.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: action common event
 *=============================================================================
 *
 *=============================================================================
 * ACTION EFFECT: target
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Causa o(s) alvo(s) a levar(em) dano/cura da habilidade/item e
 * incorre qualquer mudança feita para o(s) alvo(s) como buffs e states.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: action effect
 *=============================================================================
 *
 *=============================================================================
 * ADD stat BUFF: target, (turns), (show)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Afeta o alvo com o buff 'stat'. Substitua 'stat' por 'hp', 'mp',
 * 'atk', 'def', 'mat', 'mdf', 'agi', ou 'luk'. Se você incluir um
 * número depois do alvo, ele irá buff o alvo por essa quantidade
 * de rodadas. Inclua 'show' e ele irá mostrar o alvo conseguindo
 * o buff aplicado no log de batalha.
 *
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: add atk buff: user, 3, show
 *                 add def buff: target, 8
 *=============================================================================
 *
 *=============================================================================
 * ADD stat DEBUFF: target, (turns), (show)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Afeta o alvo com o debuff 'stat'. Substitua 'stat' por 'hp', 'mp',
 * 'atk', 'def', 'mat', 'mdf', 'agi', ou 'luk'. Se você incluir um
 * número depois do alvo, ele irá debuff o alvo por essa quantidade
 * de rodadas. Inclua 'show' e ele irá mostrar o alvo conseguindo
 * o debuff aplicado no log de batalha.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: add atk debuff: user, 3, show
 *                 add def debuff: target, 8
 *=============================================================================
 *
 *=============================================================================
 * ADD STATE X: target, (show)
 * ADD STATE X, Y, Z: target (show)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Afeta o alvo com o estado X (incluindo Y e Z se usado nesse formato).
 * Se 'show' estiver incluído, ele irá mostrar qualquer mensagem
 * relacionada a estado.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: add state 5: target
 *                 add state 6, 7, 8: user, show
 *=============================================================================
 *
 *=============================================================================
 * ANIMATION X: target, (mirror)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Reproduz a animação X no alvo. 'Mirror' causará a animação a aparecer
 * espelhada. Tenha em mente que animações reproduzidas em personagens
 * vão automaticamente ser espelhadas e configurando a opção mirror
 * irá revertê-la, fazendo com que ela apareça sem o efeito espelhado.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: animation 5: user
 *                 animation 6: target, mirror
 *=============================================================================
 *
 *=============================================================================
 * ANIMATION WAIT: X
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Espera x frames de animação. Cada frame para uma animação não dura um frame
 * de jogo, mas em vez disso, várias. Para facilitar, você pode usar isso
 * para fazer o jogo esperar x frames reproduzidas para a animação.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: animation 5: user
 *                 animation 6: target, mirror
 *=============================================================================
 *
 *=============================================================================
 * BGM: STOP
 * BGM: MEMORIZE
 * BGM: MEMORY
 * BGM: filename, (volume), (pitch), (pan)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Muda a música de fundo atual. 'Stop' vai parar qualquer BGM de ser
 * reproduzida. 'Memorize' vai memorizar o BGM atual. 'Memory' vai dar um
 * replay na BGM memorizada se houver uma tocando. Se você escolher um
 * filename (sem as extenções do filename), o jogo irá reproduzir
 * aquela BGM em vez disso. Usar essa opção abre acesso para o volume,
 * pitch, e pan control, sendo que todos são de uso opcionais. Se nenhum
 * dado for colocado  para o volume, pitch, e pan, o jogo irá usar as
 * configurações dos parâmetros desse plugin.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: bgm: stop
 *                 bgm: memorize
 *                 bgm: memory
 *                 bgm: Battle7
 *                 bgm: Theme2, 80, 100, 0
 *=============================================================================
 *
 *=============================================================================
 * BGS: STOP
 * BGS: MEMORIZE
 * BGS: MEMORY
 * BGS: filename, (volume), (pitch), (pan)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Muda a som de fundo atual. 'Stop' vai parar qualquer BGS de ser
 * reproduzido. 'Memorize' vai memorizar o BGS atual. 'Memory' vai dar um
 * replay na BGS memorizada se houver uma tocando. Se você escolher um
 * filename (sem as extenções do filename), o jogo irá reproduzir
 * aquela BGS em vez disso. Usar essa opção abre acesso para o volume,
 * pitch, e pan control, sendo que todos são de uso opcionais. Se nenhum
 * dado for colocado  para o volume, pitch, e pan, o jogo irá usar as
 * configurações dos parâmetros desse plugin.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: bgs: stop
 *                 bgs: memorize
 *                 bgs: memory
 *                 bgs: City
 *                 bgs: Darkness, 80, 100, 0
 *=============================================================================
 *
 *=============================================================================
 * BREAK ACTION
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Se você quiser forçar a morte de um alvo, inclua o comando 'force' depois
 * dos alvos.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: break action
 *=============================================================================
 *
 *=============================================================================
 * CAST ANIMATION
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Reproduz uma animação na habilidade do usuário. Não irá ocorrer se
 * a ação for um item ou o ataque normal padrão do usuário.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: cast animation
 *=============================================================================
 *
 *=============================================================================
 * CLEAR BATTLE LOG
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Limpa todas as mensagens no topo da tela.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: clear battle log
 *=============================================================================
 *
 *=============================================================================
 * CHANGE SWITCH X: on/off/toggle/switch z
 * CHANGE SWITCH X..Y: on/off/toggle/switch z
 * CHANGE SWITCH X TO Y: on/off/toggle/switch z
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Muda o Game Switch para on, off, toggle (mudando entre on/off), ou
 * para qualquer for a valor do switch y.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: change switch 1: on
 *                 change switch 2..4: off
 *                 change switch 5 to 8: toggle
 *                 change switch 9: switch 5
 *=============================================================================
 *
 *=============================================================================
 * CHANGE VARIABLE X = Y
 * CHANGE VARIABLE X += Y
 * CHANGE VARIABLE X -= Y
 * CHANGE VARIABLE X *= Y
 * CHANGE VARIABLE X /= Y
 * CHANGE VARIABLE X %= Y
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Muda a variável X no meio da sequência de ação para ser modificada
 * pelo valor Y. Y pode ser tanto um número inteiro ou um pedaço de
 * código.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: change variable 1 = 2
 *                 change variable 3 += 4
 *                 change variable 5 -= 6
 *                 change variable 7 *= 8
 *                 change variable 9 /= 10
 *                 change variable 11 %= 12
 *=============================================================================
 *
 *=============================================================================
 * COLLAPSE: target, (force)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Se o alvo já estiver morto nesse ponto, isso será o ponto na sequência de
 * ação onde você pode prompt o jogo a matar o alvo desde que ele tenha
 * 0 de HP. Se você quiser forçar a morte de um alvo, inclua o comando
 * 'force' depois dos alvos.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: collapse: user
 *                 collapse: target, force
 *=============================================================================
 *
 *=============================================================================
 * COMMON EVENT: X
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Reproduz o evento comum X naquele ponto na sequência de ação. Nada mais
 * continuará até que o evento comum termine.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: common event: 1
 *=============================================================================
 *
 *=============================================================================
 * DEATH BREAK
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Se um usuário morrer por qualquer motivo durante uma habilidade (tanto
 * por contra-ataque ou reflexão), isso irá forçar as sequências de ações
 * restantes para a parte da habilidade/item para serem desligadas e puladas.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: death break
 *=============================================================================
 *
 *=============================================================================
 * DISPLAY ACTION
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Mostra o nome da ação no topo do log de batalha. Ele permanecerá lá até
 * que o log de batalha seja limpado.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: display action
 *=============================================================================
 *
 *=============================================================================
 * EVAL: code
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Para aqueles que queiram fazer algo que o atual Battle Engine não suporta,
 * vocês podem usar uma função eval para que um pedaço de código ocorra.
 * Mas cuidado, aqueles que não são familiarizados com JavaScript deveriam
 * evitar mexer com esse comando de sequência de ação.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: eval: $gameParty.loseItem($dataItems[3], 10)
 *=============================================================================
 *
 *=============================================================================
 * GAIN ITEM X: Y           LOSE ITEM X: Y
 * GAIN WEAPON X: Y         LOSE WEAPON X: Y
 * GAIN ARMOR X: Y          LOSE ARMOR X: Y
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Sua party irá ganhar/perder item x, arma x, ou armadura x na quantidade
 * y. Se você escolher omitir y, ele terá o padrão 1.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: gain item 1: 20
 *                 lose weapon 2
 *                 gain armor 3: 50
 *=============================================================================
 *
 *=============================================================================
 * GOLD +x
 * GOLD -x
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Sua party irá ganhar/perder ouro no meio da batalha pela quantidade x.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: gold +2000
 *                 gold -500
 *=============================================================================
 *
 *=============================================================================
 * IF ... ELSE STATEMENTS
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Para os que são familiarizados com programação, você pode fazer
 * declarações if...else para realizar diferentes ações baseadas em
 * condições diferentes. Use 'if' para especificar um pedaço de código
 * para ser executado, se uma condição específicada for verdadeira.
 * Use 'else' para especificar um pedaço de código para ser executado,
 * se a mesma condição for falsa. Use 'else if' para especificar uma
 * nova condição para testar, se a primeira condição for falsa. Use
 * 'end' para especificar onde as condições vão terminar.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso:
 *     if $gameSwitches.value(1)
 *         action effect
 *     else if $gameSwitches.value(2)
 *         action effect
 *         action effect
 *     else
 *         action effect
 *         action effect
 *         action effect
 *     end
 *
 * *Nota: Você não precisa indentar o código para fazê-lo funcionar. Ele
 * apenas fica com uma aparência melhor nas suas sequências de ações.
 *=============================================================================
 *
 *=============================================================================
 * IMMORTAL: targets, true/false
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Estabelece os alvos a um estado de imortalidade para que eles não morram
 * no meio de um ataque. Isso é para garantir que cada efeito de ação aconteça.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: immortal: targets true
 *=============================================================================
 *
 *=============================================================================
 * HP +X: target, (show)
 * HP -X: target, (show)
 * HP +X%: target, (show)
 * HP -X%: target, (show)
 * HP +VARIABLE X: target, (show)
 * HP -VARIABLE X: target, (show)
 * HP +VARIABLE X%: target, (show)
 * HP -VARIABLE X%: target, (show)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Alvo(s) ganha(m) HP igual aos valores de X. Para mostrar o popup, insira
 * 'show' depois do alvo na linha de sequência de ação. Incluir 'show' é
 * inteiramente opcional. Se 'show' for omitido, nenhum popup será mostrado.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: hp +500: user
 *                 hp -variable 5: target
 *                 hp +25%: target
 *                 hp -variable 7: user
 *=============================================================================
 *
 *=============================================================================
 * ME: STOP
 * ME: filename, (volume), (pitch), (pan)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Causa a batalha a reproduzir uma música ME. 'Stop' vai parar qualquer
 * ME de ser reproduzido. Se você escolher um filename (sem as extenções
 * do filename), o jogo irá reproduzir aquele ME em vez disso. Usar essa
 * opção abre acesso para o volume, pitch, e pan control, sendo que
 * todos são de uso opcionais. Se nenhum dado for colocado  para o
 * volume, pitch, e pan, o jogo irá usar as configurações dos parâmetros
 * desse plugin.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: me: stop
 *                 me: Victory1
 *                 me: Darkness, 80, 100, 0
 *=============================================================================
 *
 *=============================================================================
 * MOTION WAIT: target
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Faz o jogo esperar 12 frames se o(s) alvo(s) realizando a ação for um
 * personagem. Se o(s) alvo(s) não for(em) um personagem, nenhuma espera
 * acontecerá.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: motion wait: user
 *=============================================================================
 *
 *=============================================================================
 * MP +X: target, (show)
 * MP -X: target, (show)
 * MP +X%: target, (show)
 * MP -X%: target, (show)
 * MP +VARIABLE X: target, (show)
 * MP -VARIABLE X: target, (show)
 * MP +VARIABLE X%: target, (show)
 * MP -VARIABLE X%: target, (show)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Alvo(s) ganha(m) MP igual aos valores de X. Para mostrar o popup, insira
 * 'show' depois do alvo na linha de sequência de ação. Incluir 'show' é
 * inteiramente opcional. Se 'show' for omitido, nenhum popup será mostrado.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: mp +500: user
 *                 mp -variable 5: target
 *                 mp +25%: target
 *                 mp -variable 7: user
 *=============================================================================
 *
 *=============================================================================
 * PERFORM ACTION
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Causa os personagens a dar um passo a frente e balançar sua arma,
 * impulsioná-la, porém o movimento que é determinado é automaticamente
 * feito pelo jogo.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: perform action
 *=============================================================================
 *
 *=============================================================================
 * PERFORM FINISH
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Causa o personagem a se mover de volta para seu local inicial.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: perform finish
 *=============================================================================
 *
 *=============================================================================
 * PERFORM START
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Causa o personagem a se mover a frente de seu local inicial.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: perform start
 *=============================================================================
 *
 *=============================================================================
 * REFRESH STATUS
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Refresca a janela de status no meio de uma sequência de ação.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: refresh status
 *=============================================================================
 *
 *=============================================================================
 * REMOVE stat BUFF: target, (show)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Remove o buff 'stat' do alvo. Substitua 'stat' por 'hp', 'mp', 'atk',
 * 'def, 'mat', 'mdf', 'agi', ou 'luk'. Inclua 'show' e ele irá mostrar o
 * alvo tendo o buff removido no log de batalha.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: remove atk buff: user, show
 *                 remove def buff: target
 *=============================================================================
 *
 *=============================================================================
 * REMOVE stat DEBUFF: target, (show)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Remove o debuff 'stat' do alvo. Substitua 'stat' por 'hp', 'mp', 'atk',
 * 'def, 'mat', 'mdf', 'agi', ou 'luk'. Inclua 'show' e ele irá mostrar o
 * alvo tendo o debuff removido no log de batalha.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: remove atk debuff: user, show
 *                 remove def debuff: target
 *=============================================================================
 *
 *=============================================================================
 * REMOVE STATE X: target (show)
 * REMOVE STATE X, Y, Z: target (show)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Remove o estado X (incluindo Y e Z se usado nesse formato) do alvo.
 * Se 'show' for incluído, ele irá mostrar qualquer mensagem relacionada
 * a estado.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: remove state 5: target
 *                 remove state 6, 7, 8: user, show
 *=============================================================================
 *
 *=============================================================================
 * SE: filename, (volume), (pitch), (pan)
 * SE: PLAY OK
 * SE: PLAY CURSOR
 * SE: PLAY CANCEL
 * SE: PLAY BUZZER
 * SE: PLAY EQUIP
 * SE: PLAY SAVE
 * SE: PLAY LOAD
 * SE: PLAY BATTLE START
 * SE: PLAY ESCAPE
 * SE: PLAY ENEMY ATTACK
 * SE: PLAY ENEMY DAMAGE
 * SE: PLAY ENEMY COLLAPSE
 * SE: PLAY BOSS COLLAPSE 1
 * SE: PLAY BOSS COLLAPSE 2
 * SE: PLAY ACTOR DAMAGE
 * SE: PLAY ACTOR COLLAPSE
 * SE: PLAY RECOVERY
 * SE: PLAY MISS
 * SE: PLAY EVASION
 * SE: PLAY MAGIC EVASION
 * SE: PLAY REFLECTION
 * SE: PLAY SHOP
 * SE: PLAY USE ITEM
 * SE: PLAY USE SKILL
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Causa a batalha a reproduzir um Sound Effect. Se você escolher um
 * filename (sem as extenções do filename), o jogo irá reproduzir
 * aquele ME em vez disso. Usar essa opção abre acesso para o volume,
 * pitch, e pan control, sendo que todos são de uso opcionais. Se nenhum
 * dado for colocado  para o volume, pitch, e pan, o jogo irá usar as
 * configurações dos parâmetros desse plugin. Usar as sequências de
 * ações com 'play x' nelas causará o jogo a reproduzir um sistema
 * de som estabelecido dentro do banco de dados do RPG Maker.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: se: play enemy attack
 *                 se: Ice1
 *                 se: Laser2, 80, 100, 0
 *=============================================================================
 *
 *=============================================================================
 * TP +X: target, (show)
 * TP -X: target, (show)
 * TP +X%: target, (show)
 * TP -X%: target, (show)
 * TP +VARIABLE X: target, (show)
 * TP -VARIABLE X: target, (show)
 * TP +VARIABLE X%: target, (show)
 * TP -VARIABLE X%: target, (show)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Alvo(s) ganha(m) TP igual aos valores de X. Para mostrar o popup,
 * insira 'show' depois do alvo na linha de sequência de ação. Incluir
 * 'show' é inteiramente opcional. Se 'show' for omitido, nenhum popup
 * será mostrado. Para que TP mostre popups, outro plugin será necessário.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: tp +500: user
 *                 tp -variable 5: target
 *                 tp +25%: target
 *                 tp -variable 7: user
 *=============================================================================
 *
 *=============================================================================
 * WAIT: frames
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Faz o jogo esperar uma certa quantidade de frames antes de ir para
 * a próxima ação na sequência de ações.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: wait: 60
 *=============================================================================
 *
 *=============================================================================
 * WAIT FOR ANIMATION
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Espera todas as animações terminarem antes de ir para a próxima
 * ação na sequência de ações.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: wait for animation
 *=============================================================================
 *
 *=============================================================================
 * WAIT FOR EFFECT
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Espera todos os efeitos terminarem de executar antes de continuar.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: wait for effect
 *=============================================================================
 *
 *=============================================================================
 * WAIT FOR MOVEMENT
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Espera todos os movimentos do combatente terminarem antes de ir para a
 * próxima ação na sequência de ações.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: wait for movement
 *=============================================================================
 *
 *=============================================================================
 * WAIT FOR NEW LINE
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Espera uma nova linha aparecer na janela de log antes de ir para a
 * próxima ação na sequência de ações.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: wait for new line
 *=============================================================================
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.10:
 * - Changed the 'Change Variable' action sequence to read more effectively.
 *
 * Version 1.09:
 * - Fixed a bug that didn't allow for HP and MP buff/debuff removal.
 *
 * Version 1.08:
 * - Added 'Break Action' action sequence effect to completely cancel out all
 * of the remaining action effects.
 *
 * Version 1.07:
 * - Fixed a bug with the forcing a Collapse action sequence.
 *
 * Version 1.06:
 * - If using the Add State action sequence to add the Death state, it will
 * remove immortality settings.
 *
 * Version 1.05:
 * - Optimized status window to refresh at a minimum.
 *
 * Version 1.04:
 * - Updated help file to include Character X for target typing.
 *
 * Version 1.03:
 * - Fixed a bug that didn't make the sounds played work properly (again).
 *
 * Version 1.02:
 * - Fixed a bug that didn't make the sounds played work properly.
 *
 * Version 1.01:
 * - Fixed a small bug that didn't allow Change Variable to work properly with
 * evaluated strings.
 *
 * Version 1.00:
 * - Finished plugin!
 */
//=============================================================================

if (Imported.YEP_BattleEngineCore) {

//=============================================================================
// Parameters
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_ActSeqPack1');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.SoundVolume = Number(Yanfly.Parameters['Default Volume']);
Yanfly.Param.SoundPitch = Number(Yanfly.Parameters['Default Pitch']);
Yanfly.Param.SoundPan = Number(Yanfly.Parameters['Default Pan']);

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.ASP1.BattleManager_processActionSequence =
    BattleManager.processActionSequence;
BattleManager.processActionSequence = function(actionName, actionArgs) {
  // ADD X BUFF
  if (actionName.match(/ADD[ ](.*)[ ]BUFF/i)) {
    return this.actionAddBuff(actionName, actionArgs);
  }
  // ADD X DEBUFF
  if (actionName.match(/ADD[ ](.*)[ ]DEBUFF/i)) {
    return this.actionAddDebuff(actionName, actionArgs);
  }
  // ADD STATE X
  if (actionName.match(/(?:ADD_STATE|ADD STATE)[ ](\d+(?:\s*,\s*\d+)*)/i)) {
    return this.actionAddState(actionName, actionArgs);
  }
  // ANIMATION X
  if (actionName.match(/ANIMATION[ ](\d+)/i)) {
    return this.actionAnimation(parseInt(RegExp.$1), actionArgs);
  }
  // BGM, MUSIC, SONG
  if (['BGM', 'MUSIC', 'SONG'].contains(actionName)) {
    return this.actionBgmPlay(actionArgs);
  }
  // BGS, AMBIENCE
  if (['BGS', 'AMBIENCE'].contains(actionName)) {
    return this.actionBgsPlay(actionArgs);
  }
  // BREAK ACTION
  if (actionName === 'BREAK ACTION') {
    return this.actionBreakAction();
  }
  // COLLAPSE: target, (force)
  if (actionName === 'COLLAPSE') {
    return this.actionCollapse(actionArgs);
  }
  // COMMON EVENT: event id
  if (actionName === 'COMMON EVENT') {
    return this.actionCommonEvent(actionArgs[0]);
  }
  // CHANGE SWITCH X
  if (actionName.match(/CHANGE[ ]SWITCH[ ](.*)/i)) {
    return this.actionChangeSwitch(actionName, actionArgs);
  }
  // CHANGE VARIABLE X
  if (actionName.match(/CHANGE[ ]VARIABLE[ ](.*)/i)) {
    return this.actionChangeVariable(actionName);
  }
  // EVAL, SCRIPT
  if (['EVAL', 'SCRIPT'].contains(actionName)) {
    return this.actionEval(actionArgs);
  }
  // GAIN ITEM (item, weapon, armor) X
  if (actionName.match(/GAIN[ ](.*)[ ](\d+)/i) ||
  actionName.match(/LOSE[ ](.*)[ ](\d+)/i)) {
    return this.actionGainItem(actionName, actionArgs);
  }
  // GOLD +/- VALUE
  if (actionName.match(/GOLD[ ]([\+\-]\d+)/i)) {
    return this.actionGoldModify(parseInt(RegExp.$1));
  }
  // ME, FANFARE
  if (['ME', 'FANFARE'].contains(actionName)) {
    return this.actionMePlay(actionArgs);
  }
  // REFRESH STATUS, REFRESH WINDOW
  if (['REFRESH STATUS', 'REFRESH WINDOW'].contains(actionName)) {
    return this.actionRefreshStatus();
  }
  // REMOVE X BUFF
  if (actionName.match(/REMOVE[ ](.*)[ ]BUFF/i)) {
    return this.actionRemoveBuff(actionName, actionArgs);
  }
  // REMOVE X DEBUFF
  if (actionName.match(/REMOVE[ ](.*)[ ]DEBUFF/i)) {
    return this.actionRemoveDebuff(actionName, actionArgs);
  }
  // REMOVE STATE X
  if
  (actionName.match(/(?:REMOVE_STATE|REMOVE STATE)[ ](\d+(?:\s*,\s*\d+)*)/i)) {
    return this.actionRemoveState(actionName, actionArgs);
  }
  // SE, SOUND, SFX
  if (['SE', 'SOUND', 'SFX'].contains(actionName)) {
    return this.actionSePlay(actionArgs);
  }
  // HP +/- VALUE
  if (actionName.match(/HP[ ](.*)/i)) {
    return this.actionHpModify(actionName, actionArgs);
  }
  // MP +/- VALUE
  if (actionName.match(/MP[ ](.*)/i)) {
    return this.actionMpModify(actionName, actionArgs);
  }
  // TP +/- VALUE
  if (actionName.match(/TP[ ](.*)/i)) {
    return this.actionTpModify(actionName, actionArgs);
  }
  return Yanfly.ASP1.BattleManager_processActionSequence.call(this,
    actionName, actionArgs);
};

BattleManager.getParamId = function(stat) {
    switch (stat) {
    case 'HP':
    case 'MAXHP':
    case 'MAX HP':
      return 0;
      break;
    case 'MP':
    case 'MAXMP':
    case 'MAX MP':
    case 'SP':
    case 'MAXSP':
    case 'MAX SP':
      return 1;
      break;
    case 'ATK':
    case 'STR':
      return 2;
      break;
    case 'DEF':
      return 3;
      break;
    case 'MAT':
    case 'INT' || 'SPI':
      return 4;
      break;
    case 'MDF':
    case 'RES':
      return 5;
      break;
    case 'AGI':
    case 'SPD':
      return 6;
      break;
    case 'LUK':
      return 7;
      break;
    }
    return -1;
};

BattleManager.actionAddBuff = function(actionName, actionArgs) {
  var targets = this.makeActionTargets(actionArgs[0]);
  if (targets.length < 1) return false;
  var show = false;
  for (var i = 0; i < actionArgs.length; ++i) {
    var actionArg = actionArgs[i];
    if (actionArg.toUpperCase() === 'SHOW') show = true;
  }
  if (actionName.match(/ADD[ ](.*)[ ]BUFF/i)) {
    var paramId = this.getParamId(String(RegExp.$1).toUpperCase());
  } else {
    return true;
  }
  if (actionArgs[1] && parseInt(actionArgs[1]) > 0) {
    var turns = parseInt(actionArgs[1]);
  } else {
    var turns = 5;
  }
  if (paramId < 0) return true;
  targets.forEach(function(target) {
    target.addBuff(paramId, turns);
    if (show) this._logWindow.displayActionResults(this._subject, target);
  }, this);
  return true;
};

BattleManager.actionAddDebuff = function(actionName, actionArgs) {
  var targets = this.makeActionTargets(actionArgs[0]);
  if (targets.length < 1) return false;
  var show = false;
  for (var i = 0; i < actionArgs.length; ++i) {
    var actionArg = actionArgs[i];
    if (actionArg.toUpperCase() === 'SHOW') show = true;
  }
  if (actionName.match(/ADD[ ](.*)[ ]DEBUFF/i)) {
    var paramId = this.getParamId(String(RegExp.$1).toUpperCase());
  } else {
    return true;
  }
  if (actionArgs[1] && parseInt(actionArgs[1]) > 0) {
    var turns = parseInt(actionArgs[1]);
  } else {
    var turns = 5;
  }
  if (paramId < 0) return true;
  targets.forEach(function(target) {
    target.addDebuff(paramId, turns);
    if (show) this._logWindow.displayActionResults(this._subject, target);
  }, this);
  return true;
};

BattleManager.actionAddState = function(actionName, actionArgs) {
  var targets = this.makeActionTargets(actionArgs[0]);
  if (targets.length < 1) return false;
  var show = false;
  for (var i = 0; i < actionArgs.length; ++i) {
    var actionArg = actionArgs[i];
    if (actionArg.toUpperCase() === 'SHOW') show = true;
  }
  if (actionName.match(/(?:ADD_STATE|ADD STATE)[ ](\d+(?:\s*,\s*\d+)*)/i)) {
    var states = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
  } else {
    return true;
  }
  targets.forEach(function(target) {
    for (var i = 0; i < states.length; ++i) {
      stateId = states[i];
      if (stateId === target.deathStateId()) {
        if (target._prevImmortalState === false) target.forceRemoveImmortal();
      }
      target.addState(stateId);
      if (show) this._logWindow.displayActionResults(this._subject, target);
    }
  }, this);
  return true;
};

BattleManager.actionAnimation = function(aniId, actionArgs) {
  if (aniId <= 0) return;
  var targets = this.makeActionTargets(actionArgs[0]);
  if (targets.length < 1) return false;
  var mirror = false;
  if (actionArgs[1] && actionArgs[1].toUpperCase() === 'MIRROR') mirror = true;
  this._logWindow.showNormalAnimation(targets, aniId, mirror);
  return true;
};

BattleManager.actionBgmPlay = function(actionArgs) {
  if (actionArgs.length < 1) return true;
  if (actionArgs[0].toUpperCase() === 'STOP') {
    AudioManager.stopBgm();
  } else if (actionArgs[0].toUpperCase() === 'MEMORIZE') {
    this._battleMemorizedBgm = AudioManager.saveBgm();
    return true;
  } else if (actionArgs[0].toUpperCase() === 'MEMORY') {
    if (this._battleMemorizedBgm) {
      AudioManager.replayBgm(this._battleMemorizedBgm);
    }
  } else {
    var name = actionArgs[0];
    if (!name) return true;
    var vol = actionArgs[1] || Yanfly.Param.SoundVolume;
    var pitch = actionArgs[2] || Yanfly.Param.SoundPitch;
    var pan = actionArgs[3] || Yanfly.Param.SoundPan;
    var bgm = {
      name: name,
      volume: vol,
      pitch: pitch,
      pan: pan
    };
    AudioManager.playBgm(bgm);
  }
  return true;
};

BattleManager.actionBgsPlay = function(actionArgs) {
  if (actionArgs.length < 1) return true;
  if (actionArgs[0].toUpperCase() === 'STOP') {
    AudioManager.stopBgs();
  } else if (actionArgs[0].toUpperCase() === 'MEMORIZE') {
    this._battleMemorizedBgs = AudioManager.saveBgs();
    return true;
  } else if (actionArgs[0].toUpperCase() === 'MEMORY') {
    if (this._battleMemorizedBgs) {
      AudioManager.replayBgs(this._battleMemorizedBgs);
    }
  } else {
    var name = actionArgs[0];
    if (!name) return true;
    var vol = actionArgs[1] || Yanfly.Param.SoundVolume;
    var pitch = actionArgs[2] || Yanfly.Param.SoundPitch;
    var pan = actionArgs[3] || Yanfly.Param.SoundPan;
    var bgs = {
      name: name,
      volume: vol,
      pitch: pitch,
      pan: pan
    };
    AudioManager.playBgs(bgs);
  }
  return true;
};

BattleManager.actionBreakAction = function() {
    this._targets = [];
    this._actionList = [];
    this._individualTargets = [];
    this._phase = 'phaseChange';
    return false;
};

BattleManager.actionCollapse = function(actionArgs) {
  var targets = this.makeActionTargets(actionArgs[0]);
  var force = false;
  if (actionArgs[1]) var force = (actionArgs[1].toUpperCase() === 'FORCE');
  targets.forEach(function(target) {
    if (force) {
      target.removeImmortal();
      target.addState(target.deathStateId());
    }
    if (target.isDeathStateAffected()) target.performCollapse();

  }, this);
  return false;
};

BattleManager.actionCommonEvent = function(id) {
  $gameTemp.reserveCommonEvent(id);
  return false;
};

BattleManager.actionChangeSwitch = function(actionName, actionArgs) {
  var subject = this._subject;
  var user = this._subject;
  var target = this._targets[0];
  var targets = this._targets;
  var action = this._action;
  var item = this._action.item();
  var switches = [];
  if (actionName.match(/SWITCH[ ](\d+)/i)) {
    switches = [parseInt(RegExp.$1)];
  } else if (actionName.match(/SWITCH[ ](\d+)..(\d+)/i)) {
    switches = [getRange(parseInt(RegExp.$1), parseInt(RegExp.$2))];
  } else if (actionName.match(/SWITCH[ ](\d+)[ ]TO[ ](\d+)/i)) {
      switches = [getRange(parseInt(RegExp.$1), parseInt(RegExp.$2))];
  } else {
    return true;
  }
  var result = actionArgs[0].toUpperCase();
  var value;
  if (['ON', 'TRUE'].contains(result)) {
    value = true;
  } else if (['OFF', 'FALSE'].contains(result)) {
    value = false;
  } else if (['TOGGLE', 'OPPOSITE', 'REVERSE'].contains(result)) {
    value = 'toggle';
  } else if (result.match(/SWITCH[ ](\d+)/i)) {
    value = $gameSwitches.value(parseInt(RegExp.$1));
  }
  switches.forEach(function(switchId) {
    if (value === 'toggle') {
      $gameSwitches.setValue(switchId, !$gameSwitches.value(switchId));
    } else {
      $gameSwitches.setValue(switchId, value);
    }
  }, this);
  return true;
};

BattleManager.actionChangeVariable = function(actionName) {
  var cV1 =
  /CHANGE[ ](?:VARIABLE|VAR)[ ](\d+)[ ](.*)[ ](?:VARIABLE|VAR)[ ](\d+)/i;
  var cV2 = /CHANGE[ ](?:VARIABLE|VAR)[ ](\d+)[ ](.*?)[ ](.*)/i;
  var subject = this._subject;
  var user = this._subject;
  var target = this._targets[0];
  var targets = this._targets;
  var action = this._action;
  var item = this._action.item();
  if (this._actSeq[0].match(cV1)) {
    var mainVar = parseInt(RegExp.$1);
    var operation = String(RegExp.$2);
    var editVar = $gameVariables.value(parseInt(RegExp.$3));
  } else if (this._actSeq[0].match(cV2)) {
    var mainVar = parseInt(RegExp.$1);
    var operation = String(RegExp.$2);
    var editVar = eval(String(RegExp.$3));
  } else {
    return true;
  }
  var mainValue = $gameVariables.value(mainVar);
  if (['='].contains(operation)) {
    $gameVariables.setValue(mainVar, eval(editVar));
  } else if (['+=', '+'].contains(operation)) {
    $gameVariables.setValue(mainVar, mainValue + eval(editVar));
  } else if (['-=', '-'].contains(operation)) {
    $gameVariables.setValue(mainVar, mainValue - eval(editVar));
  } else if (['*=', '*'].contains(operation)) {
    $gameVariables.setValue(mainVar, mainValue * eval(editVar));
  } else if (['/=', '/'].contains(operation)) {
    $gameVariables.setValue(mainVar, mainValue / eval(editVar));
  } else if (['%=', '%'].contains(operation)) {
    $gameVariables.setValue(mainVar, mainValue % eval(editVar));
  }
  return true;
};

BattleManager.actionEval = function(actionArgs) {
    if (actionArgs.length < 1) return true;
    var subject = this._subject;
    var user = this._subject;
    var target = this._targets[0];
    var targets = this._targets;
    var action = this._action;
    var item = this._action.item();
    var text = String(actionArgs[0]);
    for (var i = 1; i < actionArgs.length; ++i) {
        text = text + ', ' + String(actionArgs[i]);
    }
    eval(text);
    return false;
};

BattleManager.actionGainItem = function(actionName, actionArgs) {
    var gainItem;
    var type;
    var itemId;
    if (actionName.match(/GAIN[ ](.*)[ ](\d+)/i)) {
      gainItem = true;
      type = String(RegExp.$1).toUpperCase();
      itemId = parseInt(RegExp.$2);
    } else if (actionName.match(/LOSE[ ](.*)[ ](\d+)/i)) {
      gainItem = false;
      type = String(RegExp.$1).toUpperCase();
      itemId = parseInt(RegExp.$2);
    } else {
      return true;
    }
    var item;
    if (type === 'ITEM') {
      item = $dataItems[itemId];
    } else if (['WPN', 'WEAPON'].contains(type)) {
      item = $dataWeapons[itemId];
    } else if (['ARM', 'ARMOR', 'ARMOUR'].contains(type)) {
      item = $dataArmors[itemId];
    } else {
      return true;
    }
    var amount = Math.max(1, parseInt(actionArgs[0]));
    if (isNaN(amount)) amount = 1;
    if (gainItem)  $gameParty.gainItem(item, amount);
    if (!gainItem) $gameParty.loseItem(item, amount);
    return true;
};

BattleManager.actionGoldModify = function(value) {
    $gameParty.gainGold(value);
    return true;
};

BattleManager.actionHpModify = function(actionName, actionArgs) {
    var targets = this.makeActionTargets(actionArgs[0]);
    if (targets.length < 1) return false;
    var change;
    var percent;
    if (actionName.match(/HP[ ]([+-])(?:VARIABLE|VAR)[ ](\d+)/i)) {
      change = parseInt($gameVariables.value(parseInt(RegExp.$2)));
      if (String(RegExp.$1) === '-') change *= -1;
      percent = false;
    } else if
    (actionName.match(/HP[ ]([+-])(?:VARIABLE|VAR)[ ](\d+)([%％])/i)) {
      change = parseInt($gameVariables.value(parseInt(RegExp.$2)));
      if (String(RegExp.$1) === '-') change *= -1;
      percent = true;
    } else if (actionName.match(/HP[ ]([\+\-]\d+)([%％])/i)) {
      change = parseInt(RegExp.$1);
      percent = true;
    } else if (actionName.match(/HP[ ]([\+\-]\d+)/i)) {
      change = parseInt(RegExp.$1);
      percent = false;
    } else {
      return false;
    }
    var show = false;
    for (var i = 0; i < actionArgs.length; ++i) {
      var actionArg = actionArgs[i];
      if (actionArg.toUpperCase() === 'SHOW') show = true;
    }
    var value;
    targets.forEach(function(target) {
      target.clearResult();
      value = percent ? (target.mhp * change * 0.01) : change;
      target.gainHp(parseInt(value));
      if (show) {
        target.startDamagePopup();
        this._logWindow.displayActionResults(this._subject, target);
      }
    }, this);
    return true;
};

BattleManager.actionMePlay = function(actionArgs) {
  if (actionArgs.length < 1) return true;
  if (actionArgs[0].toUpperCase() === 'STOP') {
    AudioManager.stopMe();
  } else {
    var name = actionArgs[0];
    if (!name) return true;
    var vol = actionArgs[1] || Yanfly.Param.SoundVolume;
    var pitch = actionArgs[2] || Yanfly.Param.SoundPitch;
    var pan = actionArgs[3] || Yanfly.Param.SoundPan;
    var me = {
      name: name,
      volume: vol,
      pitch: pitch,
      pan: pan
    };
    AudioManager.playMe(me);
  }
  return true;
};

BattleManager.actionMpModify = function(actionName, actionArgs) {
    var targets = this.makeActionTargets(actionArgs[0]);
    if (targets.length < 1) return false;
    var change;
    var percent;
    if (actionName.match(/MP[ ]([+-])(?:VARIABLE|VAR)[ ](\d+)/i)) {
      change = parseInt($gameVariables.value(parseInt(RegExp.$2)));
      if (String(RegExp.$1) === '-') change *= -1;
      percent = false;
    } else if
    (actionName.match(/MP[ ]([+-])(?:VARIABLE|VAR)[ ](\d+)([%％])/i)) {
      change = parseInt($gameVariables.value(parseInt(RegExp.$2)));
      if (String(RegExp.$1) === '-') change *= -1;
      percent = true;
    } else if (actionName.match(/MP[ ]([\+\-]\d+)([%％])/i)) {
      change = parseInt(RegExp.$1);
      percent = true;
    } else if (actionName.match(/MP[ ]([\+\-]\d+)/i)) {
      change = parseInt(RegExp.$1);
      percent = false;
    } else {
      return false;
    }
    var show = false;
    for (var i = 0; i < actionArgs.length; ++i) {
      var actionArg = actionArgs[i];
      if (actionArg.toUpperCase() === 'SHOW') show = true;
    }
    var value;
    targets.forEach(function(target) {
      target.clearResult();
      value = percent ? (target.mmp * change * 0.01) : change;
      target.gainMp(parseInt(value));
      if (show) {
        target.startDamagePopup();
        this._logWindow.displayActionResults(this._subject, target);
      }
    }, this);
    return true;
};

BattleManager.actionRefreshStatus = function() {
    this._statusWindow.refresh();
    return false;
};

BattleManager.actionRemoveBuff = function(actionName, actionArgs) {
  var targets = this.makeActionTargets(actionArgs[0]);
  if (targets.length < 1) return false;
  var show = false;
  for (var i = 0; i < actionArgs.length; ++i) {
    var actionArg = actionArgs[i];
    if (actionArg.toUpperCase() === 'SHOW') show = true;
  }
  if (actionName.match(/REMOVE[ ](.*)[ ]BUFF/i)) {
    var paramId = this.getParamId(String(RegExp.$1).toUpperCase());
  } else {
    return true;
  }
  if (paramId < 0) return true;
  targets.forEach(function(target) {
    if (target.isBuffAffected(paramId)) {
      target.removeBuff(paramId);
      if (show) this._logWindow.displayActionResults(this._subject, target);
    }
  }, this);
  return true;
};

BattleManager.actionRemoveDebuff = function(actionName, actionArgs) {
  var targets = this.makeActionTargets(actionArgs[0]);
  if (targets.length < 1) return false;
  var show = false;
  for (var i = 0; i < actionArgs.length; ++i) {
    var actionArg = actionArgs[i];
    if (actionArg.toUpperCase() === 'SHOW') show = true;
  }
  if (actionName.match(/REMOVE[ ](.*)[ ]DEBUFF/i)) {
    var paramId = this.getParamId(String(RegExp.$1).toUpperCase());
  } else {
    return true;
  }
  if (paramId < 0) return true;
  targets.forEach(function(target) {
    if (target.isDebuffAffected(paramId)) {
      target.removeBuff(paramId);
      if (show) this._logWindow.displayActionResults(this._subject, target);
    }
  }, this);
  return true;
};

BattleManager.actionRemoveState = function(actionName, actionArgs) {
  var targets = this.makeActionTargets(actionArgs[0]);
  if (targets.length < 1) return false;
  var show = false;
  for (var i = 0; i < actionArgs.length; ++i) {
    var actionArg = actionArgs[i];
    if (actionArg.toUpperCase() === 'SHOW') show = true;
  }
  if
  (actionName.match(/(?:REMOVE_STATE|REMOVE STATE)[ ](\d+(?:\s*,\s*\d+)*)/i)) {
    var states = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
  } else {
    return true;
  }
  targets.forEach(function(target) {
    for (var i = 0; i < states.length; ++i) {
      stateId = states[i];
      if (target.isStateAffected(stateId)) {
        target.removeState(stateId);
        if (show) this._logWindow.displayActionResults(this._subject, target);
      }
    }
  }, this);
  return true;
};

BattleManager.actionSePlay = function(actionArgs) {
  if (actionArgs.length < 1) return true;
  if (actionArgs[0].toUpperCase() === 'PLAY CURSOR') {
    SoundManager.playCursor();
  } else if (actionArgs[0].toUpperCase() === 'PLAY OK') {
    SoundManager.playOk();
  } else if (actionArgs[0].toUpperCase() === 'PLAY CANCEL') {
    SoundManager.playCancel();
  } else if (actionArgs[0].toUpperCase() === 'PLAY BUZZER') {
    SoundManager.playBuzzer();
  } else if (actionArgs[0].toUpperCase() === 'PLAY EQUIP') {
    SoundManager.playEquip();
  } else if (actionArgs[0].toUpperCase() === 'PLAY SAVE') {
    SoundManager.playSave();
  } else if (actionArgs[0].toUpperCase() === 'PLAY LOAD') {
    SoundManager.playLoad();
  } else if (actionArgs[0].toUpperCase() === 'PLAY BATTLE START') {
    SoundManager.playBattleStart();
  } else if (actionArgs[0].toUpperCase() === 'PLAY ESCAPE') {
    SoundManager.playEscape();
  } else if (actionArgs[0].toUpperCase() === 'PLAY ENEMY ATTACK') {
    SoundManager.playEnemyAttack();
  } else if (actionArgs[0].toUpperCase() === 'PLAY ENEMY DAMAGE') {
    SoundManager.playEnemyDamage();
  } else if (actionArgs[0].toUpperCase() === 'PLAY ENEMY COLLAPSE') {
    SoundManager.playEnemyCollapse();
  } else if (actionArgs[0].toUpperCase() === 'PLAY BOSS COLLAPSE 1') {
    SoundManager.playBossCollapse1();
  } else if (actionArgs[0].toUpperCase() === 'PLAY BOSS COLLAPSE 2') {
    SoundManager.playBossCollapse2();
  } else if (actionArgs[0].toUpperCase() === 'PLAY ACTOR DAMAGE') {
    SoundManager.playActorDamage();
  } else if (actionArgs[0].toUpperCase() === 'PLAY ACTOR COLLAPSE') {
    SoundManager.playActorCollapse();
  } else if (actionArgs[0].toUpperCase() === 'PLAY RECOVERY') {
    SoundManager.playRecovery();
  } else if (actionArgs[0].toUpperCase() === 'PLAY MISS') {
    SoundManager.playMiss();
  } else if (actionArgs[0].toUpperCase() === 'PLAY EVASION') {
    SoundManager.playEvasion();
  } else if (actionArgs[0].toUpperCase() === 'PLAY MAGIC EVASION') {
    SoundManager.playMagicEvasion();
  } else if (actionArgs[0].toUpperCase() === 'PLAY REFLECTION') {
    SoundManager.playReflection();
  } else if (actionArgs[0].toUpperCase() === 'PLAY SHOP') {
    SoundManager.playShop();
  } else if (actionArgs[0].toUpperCase() === 'PLAY USE ITEM') {
    SoundManager.playUseItem();
  } else if (actionArgs[0].toUpperCase() === 'PLAY USE SKILL') {
    SoundManager.playUseSkill();
  } else {
    var name = actionArgs[0];
    if (!name) return true;
    var vol = actionArgs[1] || Yanfly.Param.SoundVolume;
    var pitch = actionArgs[2] || Yanfly.Param.SoundPitch;
    var pan = actionArgs[3] || Yanfly.Param.SoundPan;
    var se = {
      name: name,
      volume: vol,
      pitch: pitch,
      pan: pan
    };
    AudioManager.playSe(se);
  }
  return true;
};

BattleManager.actionTpModify = function(actionName, actionArgs) {
    var targets = this.makeActionTargets(actionArgs[0]);
    if (targets.length < 1) return false;
    var change;
    var percent;
    if (actionName.match(/TP[ ]([+-])(?:VARIABLE|VAR)[ ](\d+)/i)) {
      change = parseInt($gameVariables.value(parseInt(RegExp.$2)));
      if (String(RegExp.$1) === '-') change *= -1;
      percent = false;
    } else if
    (actionName.match(/TP[ ]([+-])(?:VARIABLE|VAR)[ ](\d+)([%％])/i)) {
      change = parseInt($gameVariables.value(parseInt(RegExp.$2)));
      if (String(RegExp.$1) === '-') change *= -1;
      percent = true;
    } else if (actionName.match(/TP[ ]([\+\-]\d+)([%％])/i)) {
      change = parseInt(RegExp.$1);
      percent = true;
    } else if (actionName.match(/TP[ ]([\+\-]\d+)/i)) {
      change = parseInt(RegExp.$1);
      percent = false;
    } else {
      return false;
    }
    var show = false;
    for (var i = 0; i < actionArgs.length; ++i) {
      var actionArg = actionArgs[i];
      if (actionArg.toUpperCase() === 'SHOW') show = true;
    }
    var value;
    targets.forEach(function(target) {
      target.clearResult();
      value = percent ? (target.maxTp() * change * 0.01) : change;
      target.gainTp(parseInt(value));
      if (show) {
        target.startDamagePopup();
        this._logWindow.displayActionResults(this._subject, target);
      }
    }, this);
    return true;
};

//=============================================================================
// End of File
//=============================================================================
};
