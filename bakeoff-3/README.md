## Bake-off #3 - Escrita em Smartwatches

**Disponível:** 10 de Maio de 2021  

**Entrega:**  até dia 4 de Junho às 23h59 através do Fénix  

**Desafio:** diminuir o tempo de escrita numa interface para  _smartwatches_  

**Resultado esperado:** interface que minimize o tempo de escrita de texto num  _smartwatch_  com uma área de 4x4cm  

**Avaliação:** 0-20 valores; 10 valores pelo processo de desenho, 10 valores pelo tempo médio de palavras por minuto e respetiva taxa de sucesso  

**1. Desafio**

O objetivo deste  _bake-off_  é desenhar e implementar uma técnica de escrita de texto para  _smartwatches_. É disponibilizado um  [código-fonte](https://editor.p5js.org/AugustoEst/sketches/39guyjyRi)[](https://editor.p5js.org/AugustoEst/sketches/39guyjyRi)  em  [p5.js](https://p5js.org/)  que:

-   **A.**  Mostra um teclado navegacional 2D e simulação o dedo do utilizador (_fat finger_);

-   **B.** Indica qual a frase a transcrever (_Target_), o estado atual da frase do utilizador (_Entered_), e o botão de  _ACCEPT_ para confirmar este  _input_ (Figura 1);

-   **C.**  Quantifica o desempenho do utilizador com base no tempo de escrita (i.e., palavras por minuto,  _words per minute_, WPM),  _penalty_ (com base na diferença entre o  _Target_ e  _Entered_), e  **WPM +  _penalty_**.

  

Para vencerem este  _bake-off_ têm de alterar o código-fonte fornecido de maneira a que os vossos utilizadores escrevam o texto  _Target_ o mais rapidamente possível (**atenção a diferenças entre o  _Target_ e  _Entered_ acima de 5%**).

  

![](https://lh5.googleusercontent.com/BedwC8-U1B_sZHpANBkO3TnV6B3VK75LrO__XrWP9fTVB3olrc2E4KGIFLMA3DpuXDlkBFXPYdmYnj_rvtvmhxxFCUybcXKsonYcLzXX11VZR8jmwkmg54ydBXTQACE0V0398AEU)

**Figura 1.**  A interface disponibilizada no código-fonte.

  

Têm também de calcular e  **imprimir uma métrica adicional**: caracteres por segundo (CPS). Só precisam de ter em conta os caracteres presentes na frase final (_Entered_) que é submetida após o  _ACCEPT_ (incluindo “espaços”).

  

**2. Funcionamento**

O  _bake-off_  é um desafio de design em aberto. É crucial que iniciem um  **processo iterativo**  de geração e teste de ideias desde o primeiro dia.  **A vossa solução tem de obedecer às seguintes regras**:

  

1.  **Não podem**  alterar o tamanho do ecrã (4x4cm) ou da área de  _input_ (4x3cm). Dito isto,  **podem** alterar o  _layout_ das mesmas (moverem a área de  _input_ do fundo para o topo do ecrã, etc.) e incluir algum tipo de  _feedback_ na área não interativa (4x1cm);
    
2.  **Não podem**  alterar as componentes descritas em B acima (_layout_, tamanho, etc.);
    
3.  **Não podem**  alterar o desenho ou  _layout_ do braço e dedo do utilizador;
    
4.  **Não podem**  aceder à frase objetivo (_Target_) ou ao corpus de frases (_phrases.txt_). Dito isto, o vosso teclado não necessita incluir acentos dado as que frases estão todas em inglês (i.e., para além de letras necessitam apenas do “espaço” e algum modo de apagar o que foi escrito);
    
5.  **Têm** obrigatoriamente que usar o botão esquerdo do rato para indicar um toque /  _tap_ do dedo no ecrã do  _smartwatch_.  **Têm** também que manter o botão esquerdo do rato premido na simulação de um  _press_ no ecrã;
    
6.  O espaço de  _input_ e  _output_ do  _smartwatch_ é o seguinte: _touch input_  (4x3cm) e  _output_ visual (4x4cm) e sonoro.  **Não podem**  criar interações impossíveis neste espaço, por exemplo: desenhar sobre o dedo ou braço do utilizador; incluírem o estado de  _hover_; etc.;
    
7.  **Podem** implementar algoritmos de texto preditivo desde que: (i) tenhamos acesso à vossa implementação (i.e. não são permitidas soluções  _black-box_); e (ii) que o vosso algoritmo não aceda ao  _phrases.txt_  (Regra 4). De igual modo, não podem treinar um modelo de  _machine learning_  com base nas iterações com os vossos participantes (_overfitting_ ao  _phrases.txt_). Recomendamos os recursos descritos abaixo em “4. Recursos e Ferramentas”.
    

  

**3. Recomendações**

Confirmem com o docente do laboratório ou através do Discord (#bake-off-3) se não tiverem a certeza se uma das vossas decisões de desenho quebra alguma das regras descritas acima.

  

Lembrem-se, o vosso objetivo de desenho é minimizar o tempo de escrita. Vejam com atenção ambas as aulas sobre “Dispositivos Móveis” (23 de Março), "Interacção Computacional" (18 de Maio), e “Introdução de Texto” (20 de Maio).

  

**4. Recursos e Ferramentas**

A vossa aplicação será desenvolvida através do p5.js, uma biblioteca JavaScript _open-source_  para código criativo. Isto com base no código-base seguinte:  [https://editor.p5js.org/AugustoEst/sketches/39guyjyRi](https://editor.p5js.org/AugustoEst/sketches/39guyjyRi)

  

Para evitarmos problemas de acesso e  _hosting_ recomendamos o seguinte editor web:  [https://editor.p5js.org/](https://editor.p5js.org/). Dito isto, podem optar por fazer host da vossa aplicação em qualquer domínio (desde que seja acessível aos vossos participantes no dia do bake-off).

  

-   Learn:  [https://p5js.org/learn/](https://p5js.org/learn/)
    
-   Referência da linguagem:  [https://p5js.org/reference/](https://p5js.org/reference/)
    
-   Exemplos:  [https://p5js.org/examples/](https://p5js.org/examples/)
    
-   Bibliotecas:  [https://p5js.org/libraries/](https://p5js.org/libraries/)
    

  

Para exercícios com **texto preditivo**  recomendados os vários ficheiros de texto disponíveis em  [Natural Language Corpus Data: Beautiful Data](https://norvig.com/ngrams/):

  

-   [count_1w.txt](https://norvig.com/ngrams/count_1w.txt): 1/3 milhões das palavras mais frequentes (por ordem de frequência);
    
-   [spell-errors.txt](https://norvig.com/ngrams/spell-errors.txt): coleção das correções mais frequentes (palavra correta: erro comum #1, erro comum #2)
    
-   etc.
    

  

**5. Competição**

O bake-off termina com uma competição que será realizada na aula de laboratório da **semana de 31 de Maio**. Cada aluno irá testar todos os projetos do seu turno. Estes testes serão realizados de forma remota, mas terão que terminar dentro do período de aula.

  

É da responsabilidade de cada grupo preparar a solução e o link de acesso à aplicação p5.js. A ordem de execução dos projetos por cada aluno será aleatória e da responsabilidade do docente do laboratório. Aos alunos pede-se que não interajam com os autores dos projetos durante o  _bake-off_, que concluam as tarefas sem distrações e com máximo de concentração possível, e que **usem um computador com rato** por uma questão de consistência e justiça dos resultados.

  

**Comportamentos desonestos (menos éticos) resultam na desqualificação da competição (cotação de 0.0v).**  Tempos médios de seleção dois desvios padrões acima ou abaixo da média serão descartados. Alunos com 3 ou mais avaliações descartadas serão penalizados com 0.5v. A mesma penalização será aplicada a alunos que não completem todas as avaliações dentro do tempo de aula.

  

Reportem algum projeto que quebre as regras definidas “2. Funcionamento” ao docente do laboratório. Finalmente, usem o vosso  **nome** (primeiro e último) e  **grupo** no Zoom.

  

**6. Submissão**

A submissão tem de ser feita  **até dia 4 de Junho às 23h59 via Fenix**. Apenas um membro do grupo terá que realizar esta entrega; um documento com o seguinte formato  _IPM2011132646L04_Grupo42.txt_  e contendo apenas  **dois links**:

  

1.  _Link_ para a aplicação p5.js (_File > Share > Edit_). Se não optaram pelo editor web do p5.js a vossa submissão tem que incluir obrigatoriamente o vosso código-fonte (GitHub, etc.).
    

  

2.  Link para  **vídeo** YouTube (_Unlisted_) com a descrição do processo de desenho e solução final (com  _captions_ ou  _voice-over_). A captação de vídeo com o telemóvel é suficiente já que a avaliação não contempla a qualidade de gravação ou edição. Por outro lado, o vídeo deve conter:
    

-   **Ideias iniciais**: quais foram? Um descrição rápida ou demonstração de esboços/protótipos é suficiente;
    
-   **Três iterações sobre a aplicação**. Cada iteração deve descrever:
    
-   -   As novas ideias e o porquê destas (com base nos resultados da iteração anterior)
        
    -   O número e descrição dos participantes (pelo menos cinco por iteração)
        
    -   A descrição da metodologia (testes sumativos se optaram por apenas comparar a performance dos vossos utilizadores; observação;  _debriefing_, etc.)
        
    -   O tempo médio de escrita (WPM +  _penalty_)
        
-   **Solução final**: demonstrem a solução final e expliquem as vossas opções de desenho finais;
    
-   O vídeo não deve ultrapassar os **3 minutos**.
    

  

Avaliação

1.  **10.0v, Processo de Desenho**: demonstrado através da submissão vídeo;
    
2.  **10.0v, Tempo médio de escrita (WPM +  _penalty_)**. Esta componente será calculada através dos resultados dos testes com utilizadores durante o _bake-off._  A métrica é calculada automaticamente pelo código-fonte fornecido e submetida para uma base de dados (_Firebase_). O tempo de escrita (com penalização) será associado à seguinte nota:
    

-   0.0v: <= 3.0 palavra por minuto (WPM)
    
-   2.0v: ]3.0 ; 5.25[
    
-   4.0v: [5.25 ; 7.5[
    
-   6.0v: [7.5 ; 9.75[
    
-   8.0v: [9.75 ; 12.0[
    
-   10.0v: >= 12.0 WPM
    

3.  **1.0v, Utilizador mais rápido (bónus)**. O utilizador mais rápido de cada turno de laboratório receberá uma bonificação de 1.0v na nota final do  _bake-off_  (WPM +  _penalty_).
    
4.  **-2.0v**, Caracteres por segundo (CPS). Grupos que não calculem o CPS ou não os enviem para a nossa base de dados terão uma penalização de 2.0v. Erro neste cálculo acarreta uma penalização de 0.5v.
    

  

**Caso não seja submetido o vídeo terão 0.0v nas primeiras duas componentes descritas acima (1. e 2.). Caso não submetam o projeto p5.js serão apenas avaliados na componente 1. (máximo 10.0v).**

  

**Grupos ou elementos que não compareçam na sessão de bake-off terão cotação de 0.0v na componente 2**., com exceção de casos com falta justificada (por ex. declaração médica).

  

Finalmente,  **grupos que quebram as regras definidas acima em “2. Funcionamento” terão cotação de 0.0v na componente 2.**
