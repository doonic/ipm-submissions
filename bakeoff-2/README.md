## Bake-off #2 - Seleção de Alvos e Fatores Humanos

**Disponível:** 12 de Abril de 2021  

**Entrega:** até dia 7 de Maio às 23h59 através do Fénix  

**Desafio:** diminuir o tempo de seleção de alvos numa interface abstrata  

**Resultado esperado:**  interface funcional que minimize o tempo de seleção de alvos circulares numa grelha de 4 x 4  

**Avaliação:** 0-20 valores; 10 valores pelo processo de desenho, 10 valores pelo tempo de seleção médio dos alvos e respetiva taxa de sucesso  

**1. Desafio**

O objetivo do segundo bake-off é diminuir o tempo de seleção de alvos numa interface abstrata. É disponibilizado um  [](https://editor.p5js.org/AugustoEst/sketches/maCvmB2XD)[código-fonte](https://editor.p5js.org/AugustoEst/sketches/maCvmB2XD)  em  [p5.js](https://p5js.org/)[](https://p5js.org/)  que:

  

1.  Mostra uma grelha de 4x4 alvos aos vossos utilizadores (Figura 1);
    
2.  Indica qual o alvo a selecionar;
    
3.  Quantifica o desempenho do utilizador com base na taxa de sucesso (accuracy, 0-100%), tempo total da tarefa (segundos), tempo médio por alvo (segundos), e  **tempo médio por alvo com penalização se a taxa de sucesso do vosso utilizador foi inferior a 95%**  (segundos) -- Figura 2;
    
4.  Guarda estas métricas de desempenho na plataforma  [Firebase](https://firebase.google.com/)[](https://firebase.google.com/).
    

  

Para vencerem este bake-off têm de alterar o código-fonte fornecido de maneira a que os vossos utilizadores selecionem os alvos o mais rapidamente possível (**atenção à penalização por taxas de sucesso abaixo dos 95%**).

  

![](https://lh5.googleusercontent.com/DD6QRrxe6ttyu5LHV1s7tmO67U5jquCMgabBpqqqO_ln_U4is7HRJ8aghFTdbtKxXXfSje8KsUwHsbxdhfNNyVSODwjXiWWWQDUYIzVB3JfP3YmM_8cd3uDBEvmw6cj5GXlyF-w5)

**Figura 1.**  Distribuição dos 16 alvos numa grelha de 4 x 4. Neste exemplo o alvo a selecionar é representado por uma borda branca.

  

Têm também de calcular e  **imprimir uma métrica adicional**: o  _Fitts Index of Performance_  (índice de dificuldade,  **ID**). Devem usar a fórmula proposta por  [](https://www.yorku.ca/mack/ijhcs2004.html)[Mackenzie](https://www.yorku.ca/mack/ijhcs2004.html): log2 (distância-ao-alvo desde a última seleção / largura-do-alvo + 1) -- ver aula teórica em “Fatores Humanos I” e o capítulo 2.1.4 (“O movimento”). Devem guardar cada ID na Firebase e opcionalmente imprimi-los no final da tarefa (Figura 2).

  

**2. Funcionamento**

O bake-off é um desafio de design em aberto. É crucial que iniciem um  **processo iterativo**  de geração e teste de ideias desde o primeiro dia. **A vossa solução tem de obedecer às seguintes regras**:

  

1.  Podem aceder à lista de alvos a selecionar. No entanto, a dado momento  **só podem aceder ao alvo atual (i), o próximo alvo (i+1), e o alvo anterior (i-1)**
    
2.  Não podem existir alvos invisíveis ou impossíveis de selecionar. Garantam que os alvos são visíveis comparando a cor de preenchimento (fill) e a cor de fundo da vossa aplicação.  **Este Δ deve ser no mínimo 50**:  [http://colormine.org/delta-e-calculator](http://colormine.org/delta-e-calculator)[](http://colormine.org/delta-e-calculator)
    
3.  Não podem alterar o  **tamanho** visual ou da hitbox dos alvos (1.5cm), o  **distanciamento** entre eles, nem o  **posicionamento** da grelha de alvos (isto é, esta tem que estar no centro do ecrã)
    
4.  Não podem fazer alterações ao comportamento do cursor que sejam dependentes do alvo a selecionar; isto é,  **alterações ao comportamento do cursor terão de ser uniformes para todos os alvos**
    
5.  Não podem usar hardware adicional para além de um  **rato convencional**
    
6.  Não podem modificar o código que calcula as métricas de desempenho descritas em C., nem o código referente à Firebase em D.
    

  

![](https://lh5.googleusercontent.com/FDuHm4GynqcMHLlOPMj1srNbtDa7uMvrwgim3C8mFDswNe0Ps5aMFrnaidDMfbPdLSeWBKT2H_EiIL6WjFbyvB0zdNNekB7tYRDXur4aiEqFzsqAEJJ8r8fd04qxH5i7LkUKOV_C)

**Figura 2.**  Exemplo do ecrã de resultados com o _Index of Performance_ para cada alvo.

  

**3. Recomendações**

Confirmem com o docente do laboratório ou através do Discord (#bake-off-2) se não tiverem a certeza se uma das vossas decisões de desenho quebra alguma das regras descritas acima.

  

Lembrem-se, o vosso objetivo de desenho é  **minimizar o tempo de seleção**. Vejam com atenção ambas as aulas sobre Fatores Humanos, e ambos os capítulos 2 (“Nós, os Humanos”) e 9.3 (“Avaliação preditiva”).

  

**4. Recursos e Ferramentas**

A vossa aplicação será desenvolvida através do  [](https://p5js.org/)[p5.js](https://p5js.org/), uma biblioteca  _JavaScript open-source_  para código criativo. Isto com base no código-base seguinte:  [](https://editor.p5js.org/AugustoEst/sketches/maCvmB2XD)[https://editor.p5js.org/AugustoEst/sketches/maCvmB2XD](https://editor.p5js.org/AugustoEst/sketches/maCvmB2XD)

  

Para evitarmos problemas de acesso e  _hosting_ recomendamos o seguinte editor web:  [https://editor.p5js.org/](https://editor.p5js.org/). Dito isto, podem optar por fazer  _host_ da vossa aplicação em qualquer domínio (desde que seja acessível aos vossos participantes no dia do _bake-off_).

  

-   _Learn_:  [https://p5js.org/learn/](https://p5js.org/learn/)
    
-   Referência da linguagem:  [https://p5js.org/reference/](https://p5js.org/reference/)
    
-   Exemplos:  [https://p5js.org/examples/](https://p5js.org/examples/)
    
-   Bibliotecas:  [https://p5js.org/libraries/](https://p5js.org/libraries/)
    

**5. Competição**

O  _bake-off_  termina com uma competição que será realizada na aula de laboratório da  **semana de 3 de Maio**. Cada aluno irá testar todos os projetos do seu turno com a excepção do seu próprio projeto. Estes testes serão realizados de forma remota, mas terão que terminar dentro do período de aula.

  

É da responsabilidade de cada grupo preparar a solução e o link de acesso à aplicação p5.js. A ordem de execução dos projetos por cada aluno será aleatória e da responsabilidade do docente do laboratório. Aos alunos pede-se que não interajam com os autores dos projetos durante o  _bake-off_, que concluam as tarefas sem distrações e com máximo de concentração possível, e que **usem um computador com rato**  por uma questão de consistência e justiça dos resultados.

  

**Comportamentos desonestos (menos éticos) resultam na desqualificação da competição (cotação de 0.0v).**  Tempos médios de seleção dois desvios padrões acima ou abaixo da média serão descartados. Alunos com 3 ou mais avaliações descartadas serão penalizados com 0.5v. A mesma penalização será aplicada a alunos que não completem todas as avaliações dentro do tempo de aula.

  

Reportem algum projeto que quebre as regras definidas “2. Funcionamento” ao docente do laboratório. Finalmente, usem o vosso  **nome** (primeiro e último) e  **grupo** no Zoom.

  
  

**6. Submissão**

A submissão tem de ser feita  **até dia 7 de Maio às 23h59 via Fenix**. Apenas um membro do grupo terá que realizar esta entrega; um documento com o seguinte formato  _IPM2011132646L04_Grupo42.txt_  e contendo apenas  **dois links**:

  

1.  _Link_ para a aplicação p5.js (_File_ >  _Share_ >  _Edit_)
    

  

2.  Link para  **vídeo** YouTube (_Unlisted_) com a descrição do processo de desenho e solução final (com  _captions_ ou _voice-over_). A captação de vídeo com o telemóvel é suficiente já que a avaliação não contempla a qualidade de gravação ou edição. Por outro lado, o vídeo deve conter:
    

-   **Ideias iniciais**: quais foram? Um descrição rápida ou demonstração de esboços/protótipos é suficiente;
    
-   **Três iterações sobre a aplicação**. Cada iteração deve descrever:
    
-   -   As novas ideias e o porquê destas (com base nos resultados da iteração anterior)
        
    -   O número e descrição dos participantes (pelo menos cinco por iteração)
        
    -   Os tempo médios com penalização
        
-   **Solução final**: demonstrem a solução final e expliquem as vossas opções de desenho finais;
    
-   O vídeo não deve ultrapassar os  **3 minutos**.
    

  

**7. Avaliação**

1.  **10.0v, Processo de Desenho**: demonstrado através da submissão vídeo;
    
2.  **10.0v, Tempo médio de seleção de alvos (com penalização)**. Esta componente será calculada através dos resultados dos testes com utilizadores durante o  _bake-off_. A métrica é calculada automaticamente pelo código-fonte fornecido e submetida para uma base de dados (_Firebase_). O tempo médio de seleção (com penalização) será associado à seguinte nota:
    

-   0.0: >= 0.835s
    
-   2.0v: ]0.767s ; 0.835s[
    
-   4.0v: ]0.699s ; 0.767s]
    
-   6.0v: ]0.631s ; 0.699s]
    
-   8.0v: ]0.563s ; 0.631s]
    
-   10.0v: <= 0.563s
    

3.  **1.0v, Utilizador mais rápido (bónus)**. O utilizador mais rápido de cada turno de laboratório receberá uma bonificação de 1.0v na nota final do  _bake-off_  (tempo médio de seleção com penalização).
    
4.  **-2.0v**,  _**Fitts** **Performance Index**_. Grupos que não calculem o  _Fitts Performance Index_  ou não os enviem para a nossa base de dados terão uma penalização de 2.0v. Erro neste cálculo acarreta uma penalização de 0.5v.
    

  

**Caso não seja submetido o vídeo terão 0.0v nas primeiras duas componentes descritas acima (1. e 2.). Caso não submetam o projeto p5.js serão apenas avaliados na componente 1. (máximo 10.0v).**

  

**Grupos ou elementos que não compareçam na sessão de  _bake-off_  terão cotação de 0.0v na componente 2.**, com exceção de casos com falta justificada (por ex. declaração médica).

  

Finalmente,  **grupos que quebram as regras definidas acima em “2. Funcionamento” terão cotação de 0.0v na componente 2**. (alterarem o tamanho dos alvos etc).
