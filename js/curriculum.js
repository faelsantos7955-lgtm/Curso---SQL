/* =========================================================
   Currículo — 4 módulos, 12 aulas, ~40 exercícios
   Dataset: filmes (20 registros)
   ========================================================= */

const CURRICULUM = [

  // =========================================================
  // MÓDULO 1 — FUNDAMENTOS
  // =========================================================
  {
    id: 'M1',
    title: 'Fundamentos',
    lessons: [

      {
        id: '1.1',
        title: 'O que é SQL e um banco de dados?',
        theory: `
          <p><strong>SQL</strong> (Structured Query Language, ou "Linguagem de Consulta Estruturada") é a linguagem padrão para conversar com <strong>bancos de dados relacionais</strong> — sistemas como MySQL, PostgreSQL, SQLite, SQL Server e Oracle.</p>

          <h2>Para que serve?</h2>
          <p>Bancos de dados existem porque planilhas não escalam. Imagine uma loja com 10 milhões de pedidos — não cabe em Excel. SQL te deixa <em>pedir</em> informação específica em milissegundos:</p>
          <ul>
            <li>"Quais clientes compraram em janeiro?"</li>
            <li>"Qual o ticket médio por categoria?"</li>
            <li>"Quem são os 10 produtos mais vendidos esse mês?"</li>
          </ul>

          <h2>O que é "relacional"?</h2>
          <p>Significa que os dados são organizados em <strong>tabelas</strong>, e tabelas podem se <strong>relacionar</strong> entre si (ex: a tabela <code>pedidos</code> referencia a tabela <code>clientes</code>). Vamos chegar nessas relações no Módulo 5 (JOINs).</p>

          <div class="callout info">
            <div class="callout-title">Por que aprender SQL?</div>
            <p style="margin:0">É a linguagem mais antiga ainda em uso massivo na indústria (1974!). Toda área que lida com dados — análise, backend, ciência de dados, BI, marketing — usa SQL. É um investimento que paga dividendos pra carreira inteira.</p>
          </div>

          <h2>Como você vai aprender aqui</h2>
          <p>Este curso usa um <strong>banco real rodando no seu navegador</strong> (via SQLite compilado para WebAssembly). Você escreve queries de verdade, executa, vê o resultado. Toda aula tem teoria curta seguida de exercícios práticos.</p>
          <p>Nesta primeira aula não tem exercício — só leitura. A partir da próxima, mãos à obra.</p>
        `,
        exercises: []
      },

      {
        id: '1.2',
        title: 'Tabelas, linhas, colunas e tipos',
        theory: `
          <p>Um banco de dados é composto por uma ou mais <strong>tabelas</strong>. Cada tabela é uma estrutura tipo planilha, com:</p>
          <ul>
            <li><strong>Colunas</strong> (verticais) — as categorias de informação. Ex: <code>titulo</code>, <code>ano</code>, <code>nota</code>.</li>
            <li><strong>Linhas</strong> (horizontais) — cada linha é UM registro. Uma linha em <code>filmes</code> é UM filme.</li>
          </ul>

          <h2>Nossa tabela: <code>filmes</code></h2>
          <p>Durante este curso, você vai trabalhar com uma tabela chamada <code>filmes</code>, com 20 filmes brasileiros e internacionais:</p>

          <table class="theory-table">
            <thead><tr><th>id</th><th>titulo</th><th>ano</th><th>genero</th><th>nota</th><th>duracao_min</th><th>pais</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>Cidade de Deus</td><td>2002</td><td>Drama</td><td>8.6</td><td>130</td><td>Brasil</td></tr>
              <tr><td>2</td><td>Tropa de Elite</td><td>2007</td><td>Acao</td><td>8.0</td><td>115</td><td>Brasil</td></tr>
              <tr><td>...</td><td>...</td><td>...</td><td>...</td><td>...</td><td>...</td><td>...</td></tr>
              <tr><td>20</td><td>Interestelar</td><td>2014</td><td>Ficcao</td><td>8.7</td><td>169</td><td>EUA</td></tr>
            </tbody>
          </table>

          <h2>Tipos de dado</h2>
          <p>Cada coluna tem um <strong>tipo</strong>:</p>
          <ul>
            <li><code>INTEGER</code> — números inteiros (ex: <code>2002</code>, <code>130</code>)</li>
            <li><code>REAL</code> — números com decimal (ex: <code>8.6</code>)</li>
            <li><code>TEXT</code> — texto/strings (ex: <code>'Cidade de Deus'</code>)</li>
            <li><code>NULL</code> — ausência de valor (vazio, desconhecido)</li>
          </ul>

          <div class="callout tip">
            <div class="callout-title">A coluna <code>id</code></div>
            <p style="margin:0">Quase toda tabela tem uma coluna <code>id</code> (também chamada de "chave primária"). É um número único pra cada linha — o "RG" do registro. Serve pra identificar UMA linha específica sem ambiguidade.</p>
          </div>

          <p>Vamos confirmar que essa tabela existe? Faça o exercício abaixo.</p>
        `,
        exercises: [
          {
            prompt: 'Execute uma query que retorne TODAS as colunas e TODAS as 20 linhas da tabela <code>filmes</code>. Dica: o asterisco <code>*</code> significa "todas as colunas".',
            hint: 'Sintaxe básica: SELECT * FROM nome_da_tabela',
            solution: 'SELECT * FROM filmes;',
            expected: {
              orderMatters: false,
              columns: ['id', 'titulo', 'ano', 'genero', 'nota', 'duracao_min', 'pais'],
              rows: [
                [1, 'Cidade de Deus', 2002, 'Drama', 8.6, 130, 'Brasil'],
                [2, 'Tropa de Elite', 2007, 'Acao', 8, 115, 'Brasil'],
                [3, 'Central do Brasil', 1998, 'Drama', 8, 110, 'Brasil'],
                [4, 'O Auto da Compadecida', 2000, 'Comedia', 8.4, 104, 'Brasil'],
                [5, 'Bacurau', 2019, 'Suspense', 7.5, 132, 'Brasil'],
                [6, 'Que Horas Ela Volta?', 2015, 'Drama', 7.7, 114, 'Brasil'],
                [7, 'Aquarius', 2016, 'Drama', 7.4, 146, 'Brasil'],
                [8, 'Pixote', 1981, 'Drama', 7.9, 128, 'Brasil'],
                [9, 'Cinema Paradiso', 1988, 'Drama', 8.5, 155, 'Italia'],
                [10, 'O Senhor dos Aneis', 2001, 'Fantasia', 8.8, 178, 'EUA'],
                [11, 'Matrix', 1999, 'Ficcao', 8.7, 136, 'EUA'],
                [12, 'Pulp Fiction', 1994, 'Crime', 8.9, 154, 'EUA'],
                [13, 'Forrest Gump', 1994, 'Drama', 8.8, 142, 'EUA'],
                [14, 'O Poderoso Chefao', 1972, 'Crime', 9.2, 175, 'EUA'],
                [15, 'Coringa', 2019, 'Drama', 8.4, 122, 'EUA'],
                [16, 'Parasita', 2019, 'Suspense', 8.5, 132, 'Coreia'],
                [17, 'O Labirinto do Fauno', 2006, 'Fantasia', 8.2, 118, 'Espanha'],
                [18, 'Amelie Poulain', 2001, 'Comedia', 8.3, 122, 'Franca'],
                [19, 'A Origem', 2010, 'Ficcao', 8.8, 148, 'EUA'],
                [20, 'Interestelar', 2014, 'Ficcao', 8.7, 169, 'EUA']
              ]
            }
          }
        ]
      },

      {
        id: '1.3',
        title: 'Anatomia de uma query SQL',
        theory: `
          <p>Toda query de leitura em SQL tem o mesmo esqueleto:</p>
          <pre><code>SELECT &lt;colunas&gt;
FROM &lt;tabela&gt;;</code></pre>

          <p>Em português: <em>"Mostre tais colunas, da tal tabela."</em></p>

          <h2>Exemplo</h2>
          <pre><code>SELECT titulo, ano FROM filmes;</code></pre>
          <p>Tradução: <em>"Mostre o título e o ano de cada filme."</em></p>

          <h2>Regras importantes</h2>
          <ul>
            <li><strong>Não diferencia maiúsculas/minúsculas</strong> em palavras-chave. <code>SELECT</code>, <code>select</code> e <code>Select</code> funcionam igual. Por convenção, escrevemos keywords em MAIÚSCULAS para ficar legível.</li>
            <li><strong>Vírgulas separam as colunas</strong>: <code>SELECT a, b, c FROM ...</code></li>
            <li><strong>O ponto-e-vírgula no final é opcional</strong>, mas marca o fim da query. Boa prática usar.</li>
            <li><strong>Espaços e quebras de linha são livres</strong>. Você pode escrever tudo em uma linha ou quebrar em várias — o que ficar mais legível.</li>
          </ul>

          <div class="callout warning">
            <div class="callout-title">Cuidado: nomes de colunas SÃO sensíveis ao caso (às vezes)</div>
            <p style="margin:0">Em SQLite isso é flexível, mas em PostgreSQL <code>titulo</code> e <code>TITULO</code> podem ser diferentes. Sempre use o nome exato da coluna como aparece no schema.</p>
          </div>

          <h2>Comentários</h2>
          <p>Você pode anotar dentro da query, sem afetar o que ela faz:</p>
          <pre><code>-- isto é um comentário de uma linha
SELECT titulo  /* comentário no meio */
FROM filmes;</code></pre>
        `,
        exercises: [
          {
            prompt: 'Liste APENAS a coluna <code>titulo</code> de todos os filmes.',
            hint: 'SELECT nome_da_coluna FROM nome_da_tabela',
            solution: 'SELECT titulo FROM filmes;',
            expected: {
              orderMatters: false,
              columns: ['titulo'],
              rows: [
                ['Cidade de Deus'], ['Tropa de Elite'], ['Central do Brasil'],
                ['O Auto da Compadecida'], ['Bacurau'], ['Que Horas Ela Volta?'],
                ['Aquarius'], ['Pixote'], ['Cinema Paradiso'], ['O Senhor dos Aneis'],
                ['Matrix'], ['Pulp Fiction'], ['Forrest Gump'], ['O Poderoso Chefao'],
                ['Coringa'], ['Parasita'], ['O Labirinto do Fauno'], ['Amelie Poulain'],
                ['A Origem'], ['Interestelar']
              ]
            }
          },
          {
            prompt: 'Liste o <code>titulo</code> e o <code>ano</code> de cada filme.',
            hint: 'Separe as colunas por vírgula: SELECT a, b FROM ...',
            solution: 'SELECT titulo, ano FROM filmes;',
            expected: {
              orderMatters: false,
              columns: ['titulo', 'ano'],
              rows: [
                ['Cidade de Deus', 2002], ['Tropa de Elite', 2007], ['Central do Brasil', 1998],
                ['O Auto da Compadecida', 2000], ['Bacurau', 2019], ['Que Horas Ela Volta?', 2015],
                ['Aquarius', 2016], ['Pixote', 1981], ['Cinema Paradiso', 1988], ['O Senhor dos Aneis', 2001],
                ['Matrix', 1999], ['Pulp Fiction', 1994], ['Forrest Gump', 1994], ['O Poderoso Chefao', 1972],
                ['Coringa', 2019], ['Parasita', 2019], ['O Labirinto do Fauno', 2006], ['Amelie Poulain', 2001],
                ['A Origem', 2010], ['Interestelar', 2014]
              ]
            }
          },
          {
            prompt: 'Liste o <code>titulo</code>, o <code>genero</code> e a <code>nota</code> de cada filme.',
            hint: 'Três colunas separadas por vírgula.',
            solution: 'SELECT titulo, genero, nota FROM filmes;',
            expected: {
              orderMatters: false,
              columns: ['titulo', 'genero', 'nota'],
              rows: [
                ['Cidade de Deus', 'Drama', 8.6], ['Tropa de Elite', 'Acao', 8],
                ['Central do Brasil', 'Drama', 8], ['O Auto da Compadecida', 'Comedia', 8.4],
                ['Bacurau', 'Suspense', 7.5], ['Que Horas Ela Volta?', 'Drama', 7.7],
                ['Aquarius', 'Drama', 7.4], ['Pixote', 'Drama', 7.9],
                ['Cinema Paradiso', 'Drama', 8.5], ['O Senhor dos Aneis', 'Fantasia', 8.8],
                ['Matrix', 'Ficcao', 8.7], ['Pulp Fiction', 'Crime', 8.9],
                ['Forrest Gump', 'Drama', 8.8], ['O Poderoso Chefao', 'Crime', 9.2],
                ['Coringa', 'Drama', 8.4], ['Parasita', 'Suspense', 8.5],
                ['O Labirinto do Fauno', 'Fantasia', 8.2], ['Amelie Poulain', 'Comedia', 8.3],
                ['A Origem', 'Ficcao', 8.8], ['Interestelar', 'Ficcao', 8.7]
              ]
            }
          }
        ]
      }
    ]
  },

  // =========================================================
  // MÓDULO 2 — SELECT EM DETALHE
  // =========================================================
  {
    id: 'M2',
    title: 'SELECT em detalhe',
    lessons: [

      {
        id: '2.1',
        title: 'Apelidos com AS',
        theory: `
          <p>Às vezes você quer que a coluna apareça no resultado com um nome diferente do nome real no banco. Pra isso, use <code>AS</code>:</p>

          <pre><code>SELECT titulo AS nome_do_filme
FROM filmes;</code></pre>

          <p>No resultado, a coluna vai aparecer como <code>nome_do_filme</code> em vez de <code>titulo</code>.</p>

          <h2>Por que usar apelidos?</h2>
          <ul>
            <li><strong>Clareza no resultado</strong> — relatórios ficam mais legíveis</li>
            <li><strong>Necessário em colunas calculadas</strong> — <code>SELECT preco * 1.1 AS preco_com_taxa</code></li>
            <li><strong>Obrigatório em JOINs com colunas ambíguas</strong> (vamos ver no Módulo 5)</li>
          </ul>

          <h2>Apelidos com espaços</h2>
          <p>Se você quer apelidos com espaço ou caracteres especiais, use aspas duplas:</p>
          <pre><code>SELECT titulo AS "Nome do Filme",
       ano    AS "Ano de Lançamento"
FROM filmes;</code></pre>

          <div class="callout tip">
            <div class="callout-title">A palavra <code>AS</code> é opcional</div>
            <p style="margin:0">Você pode escrever <code>SELECT titulo nome_do_filme FROM filmes</code> sem o <code>AS</code> — funciona igual. Mas usar <code>AS</code> deixa a intenção CLARA pra quem lê depois (inclusive você daqui a 3 meses). Sempre use.</p>
          </div>
        `,
        exercises: [
          {
            prompt: 'Liste a coluna <code>titulo</code> com o apelido <code>nome_do_filme</code>.',
            hint: 'SELECT coluna AS apelido FROM tabela',
            solution: 'SELECT titulo AS nome_do_filme FROM filmes;',
            expected: {
              orderMatters: false,
              columns: ['nome_do_filme'],
              rows: [
                ['Cidade de Deus'], ['Tropa de Elite'], ['Central do Brasil'],
                ['O Auto da Compadecida'], ['Bacurau'], ['Que Horas Ela Volta?'],
                ['Aquarius'], ['Pixote'], ['Cinema Paradiso'], ['O Senhor dos Aneis'],
                ['Matrix'], ['Pulp Fiction'], ['Forrest Gump'], ['O Poderoso Chefao'],
                ['Coringa'], ['Parasita'], ['O Labirinto do Fauno'], ['Amelie Poulain'],
                ['A Origem'], ['Interestelar']
              ]
            }
          },
          {
            prompt: 'Liste <code>ano</code> com apelido <code>lancamento</code> e <code>duracao_min</code> com apelido <code>minutos</code>.',
            hint: 'Você pode dar apelidos pra várias colunas na mesma query.',
            solution: 'SELECT ano AS lancamento, duracao_min AS minutos FROM filmes;',
            expected: {
              orderMatters: false,
              columns: ['lancamento', 'minutos'],
              rows: [
                [2002, 130], [2007, 115], [1998, 110], [2000, 104], [2019, 132],
                [2015, 114], [2016, 146], [1981, 128], [1988, 155], [2001, 178],
                [1999, 136], [1994, 154], [1994, 142], [1972, 175], [2019, 122],
                [2019, 132], [2006, 118], [2001, 122], [2010, 148], [2014, 169]
              ]
            }
          }
        ]
      }
    ]
  },

  // =========================================================
  // MÓDULO 3 — FILTRANDO COM WHERE
  // =========================================================
  {
    id: 'M3',
    title: 'Filtrando com WHERE',
    lessons: [

      {
        id: '3.1',
        title: 'WHERE básico e operadores numéricos',
        theory: `
          <p>Até agora, todas as queries retornavam TODAS as 20 linhas. Pra filtrar, use <code>WHERE</code> seguido de uma condição:</p>

          <pre><code>SELECT titulo, nota
FROM filmes
WHERE nota &gt; 8.5;</code></pre>

          <p>Tradução: <em>"Mostre título e nota dos filmes cuja nota é maior que 8.5."</em></p>

          <h2>Operadores de comparação</h2>
          <table class="theory-table">
            <thead><tr><th>Operador</th><th>Significado</th><th>Exemplo</th></tr></thead>
            <tbody>
              <tr><td><code>=</code></td><td>igual a</td><td><code>ano = 2002</code></td></tr>
              <tr><td><code>&lt;&gt;</code> ou <code>!=</code></td><td>diferente de</td><td><code>ano &lt;&gt; 2002</code></td></tr>
              <tr><td><code>&gt;</code></td><td>maior que</td><td><code>nota &gt; 8</code></td></tr>
              <tr><td><code>&lt;</code></td><td>menor que</td><td><code>nota &lt; 7</code></td></tr>
              <tr><td><code>&gt;=</code></td><td>maior ou igual</td><td><code>ano &gt;= 2000</code></td></tr>
              <tr><td><code>&lt;=</code></td><td>menor ou igual</td><td><code>nota &lt;= 8</code></td></tr>
            </tbody>
          </table>

          <div class="callout warning">
            <div class="callout-title">Em SQL, igualdade é UM sinal de =</div>
            <p style="margin:0">Diferente de Python/JavaScript onde igualdade é <code>==</code>, em SQL é apenas <code>=</code>. Escrever <code>==</code> dá erro de sintaxe.</p>
          </div>

          <h2>Ordem das cláusulas</h2>
          <p>Lembre da ordem certa: <code>SELECT</code> → <code>FROM</code> → <code>WHERE</code>. O WHERE vem DEPOIS do FROM, sempre.</p>
        `,
        exercises: [
          {
            prompt: 'Liste o <code>titulo</code> e o <code>ano</code> dos filmes lançados em <strong>2019</strong>.',
            hint: 'WHERE coluna = valor',
            solution: 'SELECT titulo, ano FROM filmes WHERE ano = 2019;',
            expected: {
              orderMatters: false,
              columns: ['titulo', 'ano'],
              rows: [
                ['Bacurau', 2019], ['Coringa', 2019], ['Parasita', 2019]
              ]
            }
          },
          {
            prompt: 'Liste o <code>titulo</code> e a <code>nota</code> dos filmes com nota <strong>maior que 8.5</strong>.',
            hint: 'Use o operador >',
            solution: 'SELECT titulo, nota FROM filmes WHERE nota > 8.5;',
            expected: {
              orderMatters: false,
              columns: ['titulo', 'nota'],
              rows: [
                ['Cidade de Deus', 8.6], ['O Senhor dos Aneis', 8.8],
                ['Matrix', 8.7], ['Pulp Fiction', 8.9],
                ['Forrest Gump', 8.8], ['O Poderoso Chefao', 9.2],
                ['A Origem', 8.8], ['Interestelar', 8.7]
              ]
            }
          },
          {
            prompt: 'Liste o <code>titulo</code> e a <code>duracao_min</code> dos filmes com duração <strong>menor que 120 minutos</strong>.',
            hint: 'Use o operador <',
            solution: 'SELECT titulo, duracao_min FROM filmes WHERE duracao_min < 120;',
            expected: {
              orderMatters: false,
              columns: ['titulo', 'duracao_min'],
              rows: [
                ['Tropa de Elite', 115], ['Central do Brasil', 110],
                ['O Auto da Compadecida', 104], ['Que Horas Ela Volta?', 114],
                ['O Labirinto do Fauno', 118]
              ]
            }
          }
        ]
      },

      {
        id: '3.2',
        title: 'Filtrando texto',
        theory: `
          <p>Comparar texto funciona igual a comparar número — com uma diferença crucial: <strong>strings ficam entre aspas simples</strong>.</p>

          <pre><code>SELECT titulo
FROM filmes
WHERE pais = 'Brasil';</code></pre>

          <div class="callout warning">
            <div class="callout-title">Aspas SIMPLES, não duplas</div>
            <p style="margin:0">Em SQL padrão, aspas duplas (<code>"</code>) são pra identificar nomes de colunas/tabelas — não pra strings. Sempre use aspas simples (<code>'</code>) para texto. SQLite é mais permissivo, mas treine o hábito certo.</p>
          </div>

          <h2>Sensível ao caso</h2>
          <p>Comparações de texto são sensíveis ao caso por padrão:</p>
          <pre><code>WHERE pais = 'Brasil'   -- ✅ encontra "Brasil"
WHERE pais = 'brasil'   -- ❌ NÃO encontra "Brasil"</code></pre>

          <p>Pra ignorar caso, você pode usar funções como <code>LOWER()</code>:</p>
          <pre><code>WHERE LOWER(pais) = 'brasil'   -- ✅ encontra qualquer variação</code></pre>

          <h2>Strings com aspas dentro</h2>
          <p>Se o texto tem uma aspa simples (como "O'Brien"), você duplica pra escapar:</p>
          <pre><code>WHERE nome = 'O''Brien'</code></pre>
        `,
        exercises: [
          {
            prompt: 'Liste o <code>titulo</code> de todos os filmes do <strong>Brasil</strong>.',
            hint: "Strings entre aspas simples: WHERE pais = 'Brasil'",
            solution: "SELECT titulo FROM filmes WHERE pais = 'Brasil';",
            expected: {
              orderMatters: false,
              columns: ['titulo'],
              rows: [
                ['Cidade de Deus'], ['Tropa de Elite'], ['Central do Brasil'],
                ['O Auto da Compadecida'], ['Bacurau'], ['Que Horas Ela Volta?'],
                ['Aquarius'], ['Pixote']
              ]
            }
          },
          {
            prompt: 'Liste o <code>titulo</code> e <code>nota</code> de todos os filmes do gênero <strong>Drama</strong>.',
            hint: "WHERE genero = 'Drama'",
            solution: "SELECT titulo, nota FROM filmes WHERE genero = 'Drama';",
            expected: {
              orderMatters: false,
              columns: ['titulo', 'nota'],
              rows: [
                ['Cidade de Deus', 8.6], ['Central do Brasil', 8],
                ['Que Horas Ela Volta?', 7.7], ['Aquarius', 7.4],
                ['Pixote', 7.9], ['Cinema Paradiso', 8.5],
                ['Forrest Gump', 8.8], ['Coringa', 8.4]
              ]
            }
          },
          {
            prompt: 'Liste o <code>titulo</code> e <code>pais</code> de filmes <strong>que NÃO são dos EUA</strong>.',
            hint: 'Use o operador <> (diferente).',
            solution: "SELECT titulo, pais FROM filmes WHERE pais <> 'EUA';",
            expected: {
              orderMatters: false,
              columns: ['titulo', 'pais'],
              rows: [
                ['Cidade de Deus', 'Brasil'], ['Tropa de Elite', 'Brasil'],
                ['Central do Brasil', 'Brasil'], ['O Auto da Compadecida', 'Brasil'],
                ['Bacurau', 'Brasil'], ['Que Horas Ela Volta?', 'Brasil'],
                ['Aquarius', 'Brasil'], ['Pixote', 'Brasil'],
                ['Cinema Paradiso', 'Italia'], ['Parasita', 'Coreia'],
                ['O Labirinto do Fauno', 'Espanha'], ['Amelie Poulain', 'Franca']
              ]
            }
          }
        ]
      },

      {
        id: '3.3',
        title: 'Combinando com AND, OR, NOT',
        theory: `
          <p>Quase sempre você quer filtrar por MAIS de uma condição. Aí entram os operadores lógicos:</p>

          <h2><code>AND</code> — todas precisam ser verdade</h2>
          <pre><code>SELECT titulo
FROM filmes
WHERE pais = 'Brasil'
  AND nota &gt; 8;</code></pre>
          <p><em>"Filmes brasileiros COM nota acima de 8."</em></p>

          <h2><code>OR</code> — pelo menos uma sendo verdade</h2>
          <pre><code>SELECT titulo
FROM filmes
WHERE genero = 'Drama'
   OR genero = 'Crime';</code></pre>
          <p><em>"Filmes de Drama OU de Crime."</em></p>

          <h2><code>NOT</code> — inverte a condição</h2>
          <pre><code>WHERE NOT pais = 'EUA';
-- equivalente a:
WHERE pais &lt;&gt; 'EUA';</code></pre>

          <div class="callout warning">
            <div class="callout-title">Cuidado com a precedência</div>
            <p style="margin:0"><code>AND</code> "se liga" mais forte que <code>OR</code>. Quando misturar, use parênteses pra deixar a intenção clara:</p>
            <pre style="margin-top:8px"><code>WHERE pais = 'Brasil'
  AND (nota &gt; 8 OR ano &gt; 2010);</code></pre>
            <p style="margin:0">"Brasileiros que ou são bem avaliados OU são recentes."</p>
          </div>
        `,
        exercises: [
          {
            prompt: 'Liste o <code>titulo</code> dos filmes brasileiros que são do gênero <strong>Drama</strong>.',
            hint: 'Combine duas condições com AND.',
            solution: "SELECT titulo FROM filmes WHERE pais = 'Brasil' AND genero = 'Drama';",
            expected: {
              orderMatters: false,
              columns: ['titulo'],
              rows: [
                ['Cidade de Deus'], ['Central do Brasil'],
                ['Que Horas Ela Volta?'], ['Aquarius'], ['Pixote']
              ]
            }
          },
          {
            prompt: 'Liste o <code>titulo</code> e <code>genero</code> dos filmes que são de <strong>Drama</strong> OU de <strong>Crime</strong>.',
            hint: 'Use OR pra combinar.',
            solution: "SELECT titulo, genero FROM filmes WHERE genero = 'Drama' OR genero = 'Crime';",
            expected: {
              orderMatters: false,
              columns: ['titulo', 'genero'],
              rows: [
                ['Cidade de Deus', 'Drama'], ['Central do Brasil', 'Drama'],
                ['Que Horas Ela Volta?', 'Drama'], ['Aquarius', 'Drama'],
                ['Pixote', 'Drama'], ['Cinema Paradiso', 'Drama'],
                ['Pulp Fiction', 'Crime'], ['Forrest Gump', 'Drama'],
                ['O Poderoso Chefao', 'Crime'], ['Coringa', 'Drama']
              ]
            }
          },
          {
            prompt: 'Liste o <code>titulo</code>, <code>pais</code> e <code>nota</code> dos filmes que NÃO são brasileiros E têm nota maior que 8.7.',
            hint: 'Use AND e <> (ou NOT).',
            solution: "SELECT titulo, pais, nota FROM filmes WHERE pais <> 'Brasil' AND nota > 8.7;",
            expected: {
              orderMatters: false,
              columns: ['titulo', 'pais', 'nota'],
              rows: [
                ['O Senhor dos Aneis', 'EUA', 8.8],
                ['Pulp Fiction', 'EUA', 8.9],
                ['Forrest Gump', 'EUA', 8.8],
                ['O Poderoso Chefao', 'EUA', 9.2],
                ['A Origem', 'EUA', 8.8]
              ]
            }
          }
        ]
      },

      {
        id: '3.4',
        title: 'IN, BETWEEN e LIKE',
        theory: `
          <p>Três atalhos super úteis pra escrever WHEREs mais limpos.</p>

          <h2><code>IN</code> — múltiplos valores possíveis</h2>
          <p>Em vez de:</p>
          <pre><code>WHERE pais = 'Brasil'
   OR pais = 'Coreia'
   OR pais = 'Franca'</code></pre>
          <p>Escreva:</p>
          <pre><code>WHERE pais IN ('Brasil', 'Coreia', 'Franca')</code></pre>

          <h2><code>BETWEEN</code> — intervalo inclusivo</h2>
          <pre><code>WHERE ano BETWEEN 2000 AND 2010;
-- equivalente a:
WHERE ano &gt;= 2000 AND ano &lt;= 2010;</code></pre>
          <p>Atenção: <strong>BETWEEN é INCLUSIVO</strong> nos dois lados.</p>

          <h2><code>LIKE</code> — padrões de texto</h2>
          <p>Pra buscar strings parecidas, usa <code>LIKE</code> com curingas:</p>
          <ul>
            <li><code>%</code> — qualquer sequência de caracteres (até nenhuma)</li>
            <li><code>_</code> — exatamente UM caractere qualquer</li>
          </ul>
          <pre><code>WHERE titulo LIKE 'O %'      -- começa com "O " (filmes "O Senhor...", "O Poderoso...")
WHERE titulo LIKE '%Brasil%' -- contém "Brasil" em qualquer lugar
WHERE titulo LIKE '_atrix'   -- 5 letras: qualquer letra + "atrix" (encontra "Matrix")</code></pre>

          <div class="callout tip">
            <div class="callout-title">LIKE é sensível ao caso?</div>
            <p style="margin:0">Em SQLite, por padrão, NÃO é. <code>LIKE 'matrix'</code> encontra <code>'Matrix'</code>. Em PostgreSQL, é sensível — você usa <code>ILIKE</code> pra ignorar caso. Cuidado ao migrar entre bancos.</p>
          </div>
        `,
        exercises: [
          {
            prompt: 'Liste o <code>titulo</code> e <code>pais</code> dos filmes do <strong>Brasil, Coreia ou França</strong>. Use <code>IN</code>.',
            hint: "WHERE pais IN ('A', 'B', 'C')",
            solution: "SELECT titulo, pais FROM filmes WHERE pais IN ('Brasil', 'Coreia', 'Franca');",
            expected: {
              orderMatters: false,
              columns: ['titulo', 'pais'],
              rows: [
                ['Cidade de Deus', 'Brasil'], ['Tropa de Elite', 'Brasil'],
                ['Central do Brasil', 'Brasil'], ['O Auto da Compadecida', 'Brasil'],
                ['Bacurau', 'Brasil'], ['Que Horas Ela Volta?', 'Brasil'],
                ['Aquarius', 'Brasil'], ['Pixote', 'Brasil'],
                ['Parasita', 'Coreia'], ['Amelie Poulain', 'Franca']
              ]
            }
          },
          {
            prompt: 'Liste o <code>titulo</code> e <code>ano</code> dos filmes lançados <strong>entre 2000 e 2010</strong> (inclusive). Use <code>BETWEEN</code>.',
            hint: 'WHERE coluna BETWEEN x AND y',
            solution: 'SELECT titulo, ano FROM filmes WHERE ano BETWEEN 2000 AND 2010;',
            expected: {
              orderMatters: false,
              columns: ['titulo', 'ano'],
              rows: [
                ['Cidade de Deus', 2002], ['Tropa de Elite', 2007],
                ['O Auto da Compadecida', 2000], ['O Senhor dos Aneis', 2001],
                ['O Labirinto do Fauno', 2006], ['Amelie Poulain', 2001],
                ['A Origem', 2010]
              ]
            }
          },
          {
            prompt: 'Liste o <code>titulo</code> dos filmes cujo título <strong>começa com a letra "O"</strong>. Use <code>LIKE</code>.',
            hint: "WHERE titulo LIKE 'O%'",
            solution: "SELECT titulo FROM filmes WHERE titulo LIKE 'O%';",
            expected: {
              orderMatters: false,
              columns: ['titulo'],
              rows: [
                ['O Auto da Compadecida'], ['O Senhor dos Aneis'],
                ['O Poderoso Chefao'], ['O Labirinto do Fauno']
              ]
            }
          }
        ]
      }
    ]
  },

  // =========================================================
  // MÓDULO 4 — ORDENANDO E LIMITANDO
  // =========================================================
  {
    id: 'M4',
    title: 'Ordenando e Limitando',
    lessons: [

      {
        id: '4.1',
        title: 'ORDER BY e DISTINCT',
        theory: `
          <p>Por padrão, SQL <strong>não garante ordem nenhuma</strong> no resultado. Se você precisa ordenar, use <code>ORDER BY</code>:</p>

          <pre><code>SELECT titulo, nota
FROM filmes
ORDER BY nota;</code></pre>
          <p>Resultado: do menor pro maior <code>nota</code> (ordem crescente, padrão).</p>

          <h2>ASC vs DESC</h2>
          <ul>
            <li><code>ASC</code> — ascending (crescente). É o padrão.</li>
            <li><code>DESC</code> — descending (decrescente).</li>
          </ul>
          <pre><code>ORDER BY nota DESC    -- do mais alto pro mais baixo</code></pre>

          <h2>Múltiplas colunas (desempate)</h2>
          <p>Vários filmes podem ter a mesma nota. Pra ter ordem consistente, ordene por uma segunda coluna:</p>
          <pre><code>ORDER BY nota DESC, titulo ASC;</code></pre>
          <p>Primeiro ordena por nota (decrescente). Quando empata, desempata por título (alfabético).</p>

          <h2><code>DISTINCT</code> — eliminar duplicatas</h2>
          <p>Pra ver apenas valores únicos de uma coluna, use <code>SELECT DISTINCT</code>:</p>
          <pre><code>SELECT DISTINCT genero FROM filmes;</code></pre>
          <p>Mostra cada gênero <strong>uma única vez</strong>, mesmo se tem 8 dramas no banco.</p>

          <div class="callout info">
            <div class="callout-title">Ordem das cláusulas</div>
            <p style="margin:0"><code>SELECT</code> → <code>FROM</code> → <code>WHERE</code> → <code>ORDER BY</code>. ORDER BY vem por último (antes de LIMIT, que vamos ver na próxima).</p>
          </div>
        `,
        exercises: [
          {
            prompt: 'Liste o <code>titulo</code> e <code>nota</code> de TODOS os filmes, ordenados do <strong>maior pro menor</strong> nota. Em caso de empate, desempate por <code>titulo</code> em ordem alfabética.',
            hint: 'ORDER BY nota DESC, titulo ASC',
            solution: 'SELECT titulo, nota FROM filmes ORDER BY nota DESC, titulo ASC;',
            expected: {
              orderMatters: true,
              columns: ['titulo', 'nota'],
              rows: [
                ['O Poderoso Chefao', 9.2],
                ['Pulp Fiction', 8.9],
                ['A Origem', 8.8],
                ['Forrest Gump', 8.8],
                ['O Senhor dos Aneis', 8.8],
                ['Interestelar', 8.7],
                ['Matrix', 8.7],
                ['Cidade de Deus', 8.6],
                ['Cinema Paradiso', 8.5],
                ['Parasita', 8.5],
                ['Coringa', 8.4],
                ['O Auto da Compadecida', 8.4],
                ['Amelie Poulain', 8.3],
                ['O Labirinto do Fauno', 8.2],
                ['Central do Brasil', 8],
                ['Tropa de Elite', 8],
                ['Pixote', 7.9],
                ['Que Horas Ela Volta?', 7.7],
                ['Bacurau', 7.5],
                ['Aquarius', 7.4]
              ]
            }
          },
          {
            prompt: 'Liste os <strong>gêneros distintos</strong> presentes na tabela <code>filmes</code>.',
            hint: 'SELECT DISTINCT coluna FROM tabela',
            solution: 'SELECT DISTINCT genero FROM filmes;',
            expected: {
              orderMatters: false,
              columns: ['genero'],
              rows: [
                ['Drama'], ['Acao'], ['Comedia'], ['Suspense'],
                ['Fantasia'], ['Ficcao'], ['Crime']
              ]
            }
          },
          {
            prompt: 'Liste o <code>titulo</code> e <code>ano</code> de todos os filmes, ordenados do mais <strong>antigo pro mais novo</strong>.',
            hint: 'ORDER BY ano (sem DESC, pois é crescente)',
            solution: 'SELECT titulo, ano FROM filmes ORDER BY ano ASC, titulo ASC;',
            expected: {
              orderMatters: true,
              columns: ['titulo', 'ano'],
              rows: [
                ['O Poderoso Chefao', 1972],
                ['Pixote', 1981],
                ['Cinema Paradiso', 1988],
                ['Forrest Gump', 1994],
                ['Pulp Fiction', 1994],
                ['Central do Brasil', 1998],
                ['Matrix', 1999],
                ['O Auto da Compadecida', 2000],
                ['Amelie Poulain', 2001],
                ['O Senhor dos Aneis', 2001],
                ['Cidade de Deus', 2002],
                ['O Labirinto do Fauno', 2006],
                ['Tropa de Elite', 2007],
                ['A Origem', 2010],
                ['Interestelar', 2014],
                ['Que Horas Ela Volta?', 2015],
                ['Aquarius', 2016],
                ['Bacurau', 2019],
                ['Coringa', 2019],
                ['Parasita', 2019]
              ]
            }
          }
        ]
      },

      {
        id: '4.2',
        title: 'LIMIT e OFFSET',
        theory: `
          <p>Quando você só quer as primeiras N linhas do resultado, use <code>LIMIT</code>:</p>

          <pre><code>SELECT titulo, nota
FROM filmes
ORDER BY nota DESC
LIMIT 5;</code></pre>
          <p>Retorna os <strong>5 primeiros</strong> resultados — neste caso, os 5 melhores avaliados.</p>

          <div class="callout warning">
            <div class="callout-title">LIMIT sem ORDER BY é arriscado</div>
            <p style="margin:0">Sem <code>ORDER BY</code>, "os primeiros N" pode ser <strong>qualquer N</strong> — depende da implementação. Sempre combine com ORDER BY quando importa quais linhas vêm.</p>
          </div>

          <h2><code>OFFSET</code> — pulando o começo (paginação)</h2>
          <pre><code>SELECT titulo
FROM filmes
ORDER BY nota DESC
LIMIT 5 OFFSET 5;</code></pre>
          <p>Pula as 5 primeiras e pega as 5 seguintes — equivalente à "página 2" de um ranking.</p>

          <h2>Receita: TOP N</h2>
          <p>O padrão pra "os N maiores/menores de algo":</p>
          <pre><code>SELECT &lt;colunas&gt;
FROM &lt;tabela&gt;
WHERE &lt;filtros opcionais&gt;
ORDER BY &lt;coluna&gt; DESC    -- ou ASC para os menores
LIMIT N;</code></pre>

          <h2>Ordem completa das cláusulas</h2>
          <p>Agora você sabe quase todas:</p>
          <ol>
            <li><code>SELECT</code> colunas</li>
            <li><code>FROM</code> tabela</li>
            <li><code>WHERE</code> filtros</li>
            <li><code>ORDER BY</code> ordenação</li>
            <li><code>LIMIT</code> / <code>OFFSET</code></li>
          </ol>
          <p>Lembre dessa ordem — trocar é erro de sintaxe.</p>
        `,
        exercises: [
          {
            prompt: 'Liste o <code>titulo</code> e <code>nota</code> dos <strong>5 filmes mais bem avaliados</strong>. Desempate por título alfabético.',
            hint: 'ORDER BY nota DESC, titulo ASC LIMIT 5',
            solution: 'SELECT titulo, nota FROM filmes ORDER BY nota DESC, titulo ASC LIMIT 5;',
            expected: {
              orderMatters: true,
              columns: ['titulo', 'nota'],
              rows: [
                ['O Poderoso Chefao', 9.2],
                ['Pulp Fiction', 8.9],
                ['A Origem', 8.8],
                ['Forrest Gump', 8.8],
                ['O Senhor dos Aneis', 8.8]
              ]
            }
          },
          {
            prompt: 'Liste o <code>titulo</code> e <code>duracao_min</code> dos <strong>3 filmes mais curtos</strong>. Desempate por título alfabético.',
            hint: 'ORDER BY duracao_min ASC, titulo ASC LIMIT 3',
            solution: 'SELECT titulo, duracao_min FROM filmes ORDER BY duracao_min ASC, titulo ASC LIMIT 3;',
            expected: {
              orderMatters: true,
              columns: ['titulo', 'duracao_min'],
              rows: [
                ['O Auto da Compadecida', 104],
                ['Central do Brasil', 110],
                ['Que Horas Ela Volta?', 114]
              ]
            }
          },
          {
            prompt: 'Liste o <code>titulo</code> e <code>ano</code> do <strong>filme mais antigo do Brasil</strong>.',
            hint: 'Filtre por país, ordene por ano, limite a 1.',
            solution: "SELECT titulo, ano FROM filmes WHERE pais = 'Brasil' ORDER BY ano ASC LIMIT 1;",
            expected: {
              orderMatters: true,
              columns: ['titulo', 'ano'],
              rows: [['Pixote', 1981]]
            }
          }
        ]
      }
    ]
  },

  // =========================================================
  // MÓDULO 5 — AGREGAÇÃO (COUNT, SUM, AVG, GROUP BY, HAVING)
  // =========================================================
  {
    id: 'M5',
    title: 'Agregação',
    lessons: [

      {
        id: '5.1',
        title: 'Funções agregadoras — colapsando linhas',
        theory: `
          <p>Até agora, suas queries retornavam <strong>uma linha pra cada linha do banco</strong>. Mas e quando você quer responder perguntas tipo "<em>quantos filmes existem?</em>" ou "<em>qual a nota média?</em>"</p>

          <p>Aí entram as <strong>funções agregadoras</strong>. Elas pegam <strong>várias linhas</strong> e devolvem <strong>UM número</strong>.</p>

          <h2>As 5 principais</h2>
          <table class="theory-table">
            <thead><tr><th>Função</th><th>O que faz</th><th>Exemplo</th></tr></thead>
            <tbody>
              <tr><td><code>COUNT(*)</code></td><td>Conta quantas linhas existem</td><td><code>COUNT(*)</code> → 20</td></tr>
              <tr><td><code>SUM(col)</code></td><td>Soma os valores de uma coluna numérica</td><td><code>SUM(duracao_min)</code> → 2730</td></tr>
              <tr><td><code>AVG(col)</code></td><td>Calcula a média aritmética</td><td><code>AVG(nota)</code> → 8.365</td></tr>
              <tr><td><code>MIN(col)</code></td><td>Retorna o menor valor</td><td><code>MIN(ano)</code> → 1972</td></tr>
              <tr><td><code>MAX(col)</code></td><td>Retorna o maior valor</td><td><code>MAX(nota)</code> → 9.2</td></tr>
            </tbody>
          </table>

          <h2>Sintaxe</h2>
          <pre><code>SELECT COUNT(*) FROM filmes;
SELECT AVG(nota) FROM filmes;
SELECT MIN(ano), MAX(ano) FROM filmes;</code></pre>

          <h2>Como pensar</h2>
          <p>Quando você ler uma pergunta em português, identifique a "métrica":</p>
          <ul>
            <li>"Quantos..." → <code>COUNT</code></li>
            <li>"Total de..." / "Soma de..." → <code>SUM</code></li>
            <li>"Média de..." → <code>AVG</code></li>
            <li>"O menor / mais antigo / mais curto..." → <code>MIN</code></li>
            <li>"O maior / mais novo / mais longo..." → <code>MAX</code></li>
          </ul>

          <div class="callout warning">
            <div class="callout-title">Cuidado: misturando agregação com colunas comuns</div>
            <p style="margin:0">Esta query DÁ ERRO:</p>
            <pre style="margin:6px 0"><code>SELECT titulo, COUNT(*) FROM filmes;  -- ❌</code></pre>
            <p style="margin:0">Por quê? <code>COUNT(*)</code> reduz tudo a 1 linha, mas <code>titulo</code> tem 20 valores. Qual título mostrar? Quando misturar agregação com coluna comum, você precisa de <code>GROUP BY</code> (próxima aula).</p>
          </div>

          <h2>Combinando com WHERE</h2>
          <p>Você pode filtrar ANTES de agregar:</p>
          <pre><code>SELECT COUNT(*) FROM filmes WHERE pais = 'Brasil';
-- conta APENAS os filmes do Brasil</code></pre>

          <h2>COUNT(*) vs COUNT(coluna)</h2>
          <ul>
            <li><code>COUNT(*)</code> — conta TODAS as linhas, mesmo com NULL</li>
            <li><code>COUNT(coluna)</code> — conta linhas onde <code>coluna</code> NÃO é NULL</li>
            <li><code>COUNT(DISTINCT coluna)</code> — conta valores ÚNICOS de uma coluna</li>
          </ul>
          <pre><code>SELECT COUNT(DISTINCT genero) FROM filmes;
-- quantos gêneros diferentes existem na tabela → 7</code></pre>
        `,
        exercises: [
          {
            prompt: 'Quantos filmes existem no total na tabela? Retorne só o número.',
            hint: 'COUNT(*) conta todas as linhas.',
            solution: 'SELECT COUNT(*) FROM filmes;',
            expected: {
              orderMatters: false,
              rows: [[20]]
            }
          },
          {
            prompt: 'Qual a <strong>duração média</strong> (em minutos) de todos os filmes? Use <code>AVG</code>.',
            hint: 'AVG(coluna) calcula a média aritmética.',
            solution: 'SELECT AVG(duracao_min) FROM filmes;',
            expected: {
              orderMatters: false,
              rows: [[136.5]]
            }
          },
          {
            prompt: 'Qual a soma total da <code>duracao_min</code> de todos os filmes?',
            hint: 'SUM(coluna).',
            solution: 'SELECT SUM(duracao_min) FROM filmes;',
            expected: {
              orderMatters: false,
              rows: [[2730]]
            }
          },
          {
            prompt: 'Quantos filmes do Brasil existem? Combine COUNT com WHERE.',
            hint: 'SELECT COUNT(*) ... WHERE pais = ...',
            solution: "SELECT COUNT(*) FROM filmes WHERE pais = 'Brasil';",
            expected: {
              orderMatters: false,
              rows: [[8]]
            }
          },
          {
            prompt: 'Quantos <strong>gêneros DISTINTOS</strong> existem na tabela? Use <code>COUNT(DISTINCT ...)</code>.',
            hint: 'COUNT(DISTINCT coluna) conta valores únicos.',
            solution: 'SELECT COUNT(DISTINCT genero) FROM filmes;',
            expected: {
              orderMatters: false,
              rows: [[7]]
            }
          },
          {
            prompt: 'Em uma única query, retorne o ano do filme mais antigo (<code>MIN(ano)</code>) E o ano do mais recente (<code>MAX(ano)</code>) na tabela.',
            hint: 'Você pode chamar duas funções no mesmo SELECT: SELECT MIN(...), MAX(...) FROM ...',
            solution: 'SELECT MIN(ano), MAX(ano) FROM filmes;',
            expected: {
              orderMatters: false,
              rows: [[1972, 2019]]
            }
          }
        ]
      },

      {
        id: '5.2',
        title: 'GROUP BY — agregando por categoria',
        theory: `
          <p>A pergunta do aprendiz: "<em>Show, sei contar TUDO. Mas e se eu quiser contar SEPARADAMENTE — quantos filmes por país? Ou nota média por gênero?</em>"</p>

          <p>Aí entra <code>GROUP BY</code>. Ele faz exatamente isso: <strong>agrupa as linhas que compartilham um valor</strong> e aplica a agregação <strong>por grupo</strong>.</p>

          <h2>Modelo mental</h2>
          <p>Imagina que SQL pega todas as 20 linhas da tabela e <strong>separa em pilhas</strong> — uma pilha por valor único de <code>pais</code>:</p>
          <ul>
            <li>Pilha "Brasil" → 8 filmes</li>
            <li>Pilha "EUA" → 8 filmes</li>
            <li>Pilha "Italia" → 1 filme</li>
            <li>Pilha "Coreia" → 1 filme</li>
            <li>Pilha "Espanha" → 1 filme</li>
            <li>Pilha "Franca" → 1 filme</li>
          </ul>
          <p>Aí <code>COUNT(*)</code> conta os filmes <strong>de cada pilha separadamente</strong>.</p>

          <h2>Sintaxe</h2>
          <pre><code>SELECT pais, COUNT(*) AS qtd_filmes
FROM filmes
GROUP BY pais;</code></pre>
          <p>Resultado:</p>
          <table class="theory-table">
            <thead><tr><th>pais</th><th>qtd_filmes</th></tr></thead>
            <tbody>
              <tr><td>Brasil</td><td>8</td></tr>
              <tr><td>EUA</td><td>8</td></tr>
              <tr><td>Italia</td><td>1</td></tr>
              <tr><td>...</td><td>...</td></tr>
            </tbody>
          </table>

          <h2>A regra de ouro do GROUP BY</h2>
          <div class="callout warning">
            <div class="callout-title">Toda coluna no SELECT que NÃO é agregada precisa estar no GROUP BY</div>
            <p style="margin:0">Se <code>SELECT pais, genero, COUNT(*)</code>, então tem que <code>GROUP BY pais, genero</code>. Se você listar <code>titulo</code> sem agregar e sem agrupar por ele, é erro (ou SQLite faz algo imprevisível).</p>
          </div>

          <h2>Agrupando por múltiplas colunas</h2>
          <pre><code>SELECT pais, genero, COUNT(*) AS qtd
FROM filmes
GROUP BY pais, genero;</code></pre>
          <p>Cria pilhas pra cada COMBINAÇÃO de país+gênero. Brasil/Drama = 5 filmes, Brasil/Acao = 1, EUA/Crime = 2, etc.</p>

          <h2>Como pensar</h2>
          <p>Quando ler "<em>X por Y</em>" na pergunta (ex: "filmes por país", "nota média por gênero"), pense:</p>
          <ul>
            <li><strong>X</strong> = a agregação (<code>COUNT(*)</code>, <code>AVG(nota)</code>, etc.)</li>
            <li><strong>Y</strong> = a coluna no <code>GROUP BY</code></li>
          </ul>
          <p>Receita: <code>SELECT Y, agg(...) FROM tabela GROUP BY Y;</code></p>
        `,
        exercises: [
          {
            prompt: 'Quantos filmes existem <strong>por país</strong>? Retorne <code>pais</code> e <code>qtd_filmes</code>.',
            hint: 'GROUP BY pais. Use COUNT(*) AS qtd_filmes.',
            solution: 'SELECT pais, COUNT(*) AS qtd_filmes FROM filmes GROUP BY pais;',
            expected: {
              orderMatters: false,
              columns: ['pais', 'qtd_filmes'],
              rows: [
                ['Brasil', 8], ['Italia', 1], ['EUA', 8],
                ['Coreia', 1], ['Espanha', 1], ['Franca', 1]
              ]
            }
          },
          {
            prompt: 'Qual a <strong>soma da duração</strong> em minutos <strong>por país</strong>? Retorne <code>pais</code> e <code>total_minutos</code>.',
            hint: 'SUM em vez de COUNT.',
            solution: 'SELECT pais, SUM(duracao_min) AS total_minutos FROM filmes GROUP BY pais;',
            expected: {
              orderMatters: false,
              columns: ['pais', 'total_minutos'],
              rows: [
                ['Brasil', 979], ['Italia', 155], ['EUA', 1224],
                ['Coreia', 132], ['Espanha', 118], ['Franca', 122]
              ]
            }
          },
          {
            prompt: 'Quantos filmes existem <strong>por gênero</strong>? Retorne <code>genero</code> e <code>qtd</code>.',
            hint: 'GROUP BY genero',
            solution: 'SELECT genero, COUNT(*) AS qtd FROM filmes GROUP BY genero;',
            expected: {
              orderMatters: false,
              columns: ['genero', 'qtd'],
              rows: [
                ['Drama', 8], ['Acao', 1], ['Comedia', 2],
                ['Suspense', 2], ['Fantasia', 2], ['Ficcao', 3], ['Crime', 2]
              ]
            }
          },
          {
            prompt: 'O <strong>ano do filme mais antigo</strong> de cada país. Retorne <code>pais</code> e <code>ano_mais_antigo</code>.',
            hint: 'MIN(ano) com GROUP BY pais.',
            solution: 'SELECT pais, MIN(ano) AS ano_mais_antigo FROM filmes GROUP BY pais;',
            expected: {
              orderMatters: false,
              columns: ['pais', 'ano_mais_antigo'],
              rows: [
                ['Brasil', 1981], ['Italia', 1988], ['EUA', 1972],
                ['Coreia', 2019], ['Espanha', 2006], ['Franca', 2001]
              ]
            }
          }
        ]
      },

      {
        id: '5.3',
        title: 'HAVING — filtrando grupos',
        theory: `
          <p>Você já sabe filtrar linhas com <code>WHERE</code>. Mas como filtrar GRUPOS DEPOIS da agregação?</p>
          <p>Exemplo: "<em>Quais países têm MAIS DE 1 filme na tabela?</em>" Você precisa primeiro contar (<code>GROUP BY pais COUNT(*)</code>), depois descartar grupos onde a contagem é ≤ 1.</p>

          <p>WHERE não funciona aqui — ele filtra ANTES da agregação. Pra filtrar DEPOIS, use <code>HAVING</code>.</p>

          <h2>Sintaxe</h2>
          <pre><code>SELECT pais, COUNT(*) AS qtd
FROM filmes
GROUP BY pais
HAVING COUNT(*) &gt; 1;</code></pre>

          <h2>WHERE vs HAVING — a diferença essencial</h2>
          <table class="theory-table">
            <thead><tr><th></th><th>WHERE</th><th>HAVING</th></tr></thead>
            <tbody>
              <tr><td><strong>O que filtra</strong></td><td>linhas individuais</td><td>grupos inteiros</td></tr>
              <tr><td><strong>Quando age</strong></td><td>antes do GROUP BY</td><td>depois do GROUP BY</td></tr>
              <tr><td><strong>Pode usar agregação?</strong></td><td>NÃO</td><td>SIM</td></tr>
              <tr><td><strong>Exemplo</strong></td><td><code>WHERE ano &gt; 2000</code></td><td><code>HAVING COUNT(*) &gt; 1</code></td></tr>
            </tbody>
          </table>

          <div class="callout info">
            <div class="callout-title">Ordem das cláusulas</div>
            <p style="margin:0"><code>SELECT</code> → <code>FROM</code> → <code>WHERE</code> → <code>GROUP BY</code> → <code>HAVING</code> → <code>ORDER BY</code> → <code>LIMIT</code></p>
            <p style="margin:6px 0 0">Sempre nessa ordem. Trocar é erro de sintaxe.</p>
          </div>

          <h2>Combinando WHERE + HAVING</h2>
          <p>Você pode usar OS DOIS na mesma query. Cada um cumpre seu papel:</p>
          <pre><code>SELECT pais, COUNT(*) AS qtd
FROM filmes
WHERE ano &gt; 2000          -- filtra LINHAS: só filmes pós-2000
GROUP BY pais
HAVING COUNT(*) &gt;= 2;     -- filtra GRUPOS: só países com 2+ filmes pós-2000</code></pre>

          <h2>Como pensar</h2>
          <p>Quando a pergunta tem <strong>uma condição sobre uma métrica agregada</strong>, é HAVING:</p>
          <ul>
            <li>"Países com mais de 3 filmes" → <code>HAVING COUNT(*) &gt; 3</code></li>
            <li>"Gêneros com nota média acima de 8" → <code>HAVING AVG(nota) &gt; 8</code></li>
            <li>"Categorias que somam mais de 1000" → <code>HAVING SUM(...) &gt; 1000</code></li>
          </ul>
          <p>Quando a condição é sobre uma <strong>coluna comum (não agregada)</strong>, é WHERE.</p>
        `,
        exercises: [
          {
            prompt: 'Liste os <strong>países que têm mais de 1 filme</strong> na tabela. Retorne <code>pais</code> e <code>qtd</code>.',
            hint: 'GROUP BY pais HAVING COUNT(*) > 1',
            solution: 'SELECT pais, COUNT(*) AS qtd FROM filmes GROUP BY pais HAVING COUNT(*) > 1;',
            expected: {
              orderMatters: false,
              columns: ['pais', 'qtd'],
              rows: [['Brasil', 8], ['EUA', 8]]
            }
          },
          {
            prompt: 'Liste os <strong>gêneros que têm 2 ou mais filmes</strong>. Retorne <code>genero</code> e <code>qtd</code>.',
            hint: 'HAVING COUNT(*) >= 2',
            solution: 'SELECT genero, COUNT(*) AS qtd FROM filmes GROUP BY genero HAVING COUNT(*) >= 2;',
            expected: {
              orderMatters: false,
              columns: ['genero', 'qtd'],
              rows: [
                ['Drama', 8], ['Comedia', 2], ['Suspense', 2],
                ['Fantasia', 2], ['Ficcao', 3], ['Crime', 2]
              ]
            }
          },
          {
            prompt: 'Listar países cuja <strong>soma total de duração</strong> seja MAIOR que 500 minutos. Retorne <code>pais</code> e <code>total_min</code>.',
            hint: 'HAVING SUM(duracao_min) > 500',
            solution: 'SELECT pais, SUM(duracao_min) AS total_min FROM filmes GROUP BY pais HAVING SUM(duracao_min) > 500;',
            expected: {
              orderMatters: false,
              columns: ['pais', 'total_min'],
              rows: [['Brasil', 979], ['EUA', 1224]]
            }
          },
          {
            prompt: 'Considerando APENAS filmes lançados depois de 2000, quais países têm <strong>2 ou mais</strong> filmes nesse período? Retorne <code>pais</code> e <code>qtd</code>. (Aqui você usa WHERE E HAVING juntos!)',
            hint: 'WHERE filtra ano > 2000 antes de agrupar; HAVING filtra grupos com COUNT >= 2.',
            solution: 'SELECT pais, COUNT(*) AS qtd FROM filmes WHERE ano > 2000 GROUP BY pais HAVING COUNT(*) >= 2;',
            expected: {
              orderMatters: false,
              columns: ['pais', 'qtd'],
              rows: [['Brasil', 5], ['EUA', 4]]
            }
          }
        ]
      },

      {
        id: '5.4',
        title: 'Query de relatório — tudo combinado',
        theory: `
          <p>Você tem todas as peças agora. Vamos montar a "<em>query padrão de relatório</em>" — a forma mais comum de query em qualquer trabalho de dados.</p>

          <h2>O padrão completo</h2>
          <pre><code>SELECT
  &lt;coluna de agrupamento&gt;,
  &lt;agregação (COUNT/SUM/AVG...)&gt;
FROM &lt;tabela&gt;
WHERE &lt;filtros sobre LINHAS&gt;
GROUP BY &lt;coluna de agrupamento&gt;
HAVING &lt;filtros sobre GRUPOS&gt;
ORDER BY &lt;coluna ou agregação&gt; DESC
LIMIT &lt;N&gt;;</code></pre>

          <h2>Como construir uma query de relatório — 5 passos</h2>
          <ol>
            <li><strong>Identifique a métrica</strong>: o que você está medindo? (contagem, soma, média...)</li>
            <li><strong>Identifique o agrupamento</strong>: "por o que?" (por país, por gênero, por mês...)</li>
            <li><strong>Identifique filtros de linha</strong>: precisa restringir o universo? (só 2019, só Brasil...)</li>
            <li><strong>Identifique filtros de grupo</strong>: o grupo precisa atender uma condição? (com mais de X, média acima de Y...)</li>
            <li><strong>Ordenação e limite</strong>: top N? menor primeiro?</li>
          </ol>

          <h2>Exemplo trabalhado</h2>
          <p><strong>Pergunta:</strong> "<em>Dos filmes pós-2000, mostre os 3 países com maior soma de durações. Considere só países com 2+ filmes.</em>"</p>

          <p>Vamos quebrar:</p>
          <ol>
            <li><strong>Métrica:</strong> "soma de durações" → <code>SUM(duracao_min)</code></li>
            <li><strong>Agrupamento:</strong> "por país" → <code>GROUP BY pais</code></li>
            <li><strong>Filtros de linha:</strong> "pós-2000" → <code>WHERE ano &gt; 2000</code></li>
            <li><strong>Filtros de grupo:</strong> "2+ filmes" → <code>HAVING COUNT(*) &gt;= 2</code></li>
            <li><strong>Ordem/limite:</strong> "top 3 com maior soma" → <code>ORDER BY SUM(duracao_min) DESC LIMIT 3</code></li>
          </ol>

          <p>Montando:</p>
          <pre><code>SELECT pais, SUM(duracao_min) AS total
FROM filmes
WHERE ano &gt; 2000
GROUP BY pais
HAVING COUNT(*) &gt;= 2
ORDER BY total DESC
LIMIT 3;</code></pre>

          <div class="callout tip">
            <div class="callout-title">Dica de pro: você pode ordenar por um alias</div>
            <p style="margin:0">Repare em <code>ORDER BY total</code> — funciona porque <code>total</code> é o alias que demos pra <code>SUM(duracao_min)</code>. Mais legível que repetir a expressão inteira.</p>
          </div>

          <h2>Como pensar antes de digitar</h2>
          <p>Vale o exercício mental: <strong>antes de tocar no teclado, escreva a query em português</strong> usando os 5 passos acima. Quando estiver claro, traduza pra SQL. Não pule essa etapa — é o que separa quem "decora SQL" de quem "pensa em SQL".</p>
        `,
        exercises: [
          {
            prompt: 'Liste os <strong>3 países com mais filmes</strong>, ordenados do maior pro menor. Desempate por nome do país alfabético. Retorne <code>pais</code> e <code>qtd</code>.',
            hint: 'GROUP BY + ORDER BY qtd DESC, pais ASC + LIMIT 3.',
            solution: 'SELECT pais, COUNT(*) AS qtd FROM filmes GROUP BY pais ORDER BY qtd DESC, pais ASC LIMIT 3;',
            expected: {
              orderMatters: true,
              columns: ['pais', 'qtd'],
              rows: [['Brasil', 8], ['EUA', 8], ['Coreia', 1]]
            }
          },
          {
            prompt: 'Liste os gêneros que têm <strong>3 ou mais filmes</strong>, junto com a quantidade. Ordenado pela quantidade decrescente.',
            hint: 'HAVING COUNT(*) >= 3 + ORDER BY qtd DESC',
            solution: 'SELECT genero, COUNT(*) AS qtd FROM filmes GROUP BY genero HAVING COUNT(*) >= 3 ORDER BY qtd DESC, genero ASC;',
            expected: {
              orderMatters: true,
              columns: ['genero', 'qtd'],
              rows: [['Drama', 8], ['Ficcao', 3]]
            }
          },
          {
            prompt: 'Pra cada país <strong>com 2+ filmes pós-2000</strong>, retorne <code>pais</code>, <code>qtd</code> de filmes pós-2000 e a <code>nota_minima</code> deles. Ordenado pelo país alfabético.',
            hint: 'WHERE ano > 2000 + GROUP BY + HAVING COUNT(*) >= 2 + MIN(nota)',
            solution: 'SELECT pais, COUNT(*) AS qtd, MIN(nota) AS nota_minima FROM filmes WHERE ano > 2000 GROUP BY pais HAVING COUNT(*) >= 2 ORDER BY pais ASC;',
            expected: {
              orderMatters: true,
              columns: ['pais', 'qtd', 'nota_minima'],
              rows: [['Brasil', 5, 7.4], ['EUA', 4, 8.4]]
            }
          },
          {
            prompt: 'Liste o gênero <strong>com mais filmes brasileiros</strong>. Retorne <code>genero</code> e <code>qtd</code>. Considere SÓ filmes brasileiros.',
            hint: 'WHERE pais = Brasil + GROUP BY genero + ORDER BY qtd DESC + LIMIT 1.',
            solution: "SELECT genero, COUNT(*) AS qtd FROM filmes WHERE pais = 'Brasil' GROUP BY genero ORDER BY qtd DESC LIMIT 1;",
            expected: {
              orderMatters: true,
              columns: ['genero', 'qtd'],
              rows: [['Drama', 5]]
            }
          }
        ]
      }
    ]
  },

  // =========================================================
  // MÓDULO 6 — JOINS (conectando tabelas)
  // =========================================================
  {
    id: 'M6',
    title: 'JOINs',
    lessons: [

      {
        id: '6.1',
        title: 'Por que JOINs existem — relacionamentos entre tabelas',
        tabelas: ['filmes', 'diretores'],
        theory: `
          <p>Até agora você trabalhou com uma única tabela. Mas bancos de dados de verdade têm <strong>várias tabelas relacionadas</strong>. E o melhor: agora nossa tabela <code>filmes</code> tem uma nova coluna chamada <code>diretor_id</code>, que aponta pra uma nova tabela <code>diretores</code>.</p>

          <h2>Por que separar em duas tabelas?</h2>
          <p>Imagine se a tabela <code>filmes</code> tivesse uma coluna <code>diretor_nome</code> direto. Aí "Christopher Nolan" apareceria escrito DUAS vezes (ele dirigiu "A Origem" e "Interestelar"). Se você digitasse errado em uma — "Cristopher Nolan" — viraria uma inconsistência: o mesmo diretor com dois nomes diferentes.</p>

          <p>A solução é <strong>normalização</strong>: separar em duas tabelas.</p>

          <ul>
            <li>Tabela <code>diretores</code> guarda dados dos diretores (id, nome, nacionalidade, ano_nascimento)</li>
            <li>Tabela <code>filmes</code> guarda só o <code>diretor_id</code> — uma referência ao id da outra tabela</li>
          </ul>

          <h2>Chave Primária e Chave Estrangeira</h2>
          <ul>
            <li><strong>Chave primária</strong> (Primary Key, PK) — coluna que identifica unicamente cada linha. Em <code>diretores</code>, é o <code>id</code>.</li>
            <li><strong>Chave estrangeira</strong> (Foreign Key, FK) — coluna que aponta pra chave primária de OUTRA tabela. Em <code>filmes</code>, é o <code>diretor_id</code>.</li>
          </ul>

          <div class="callout info">
            <div class="callout-title">A nova tabela <code>diretores</code></div>
            <p style="margin:0">19 diretores cadastrados. Atenção: <strong>Pedro Almodóvar</strong> (id 19) está cadastrado mas NÃO dirigiu nenhum dos 20 filmes da nossa tabela. Vamos usá-lo pra estudar LEFT JOIN nas próximas aulas.</p>
          </div>

          <h2>O problema</h2>
          <p>Como ver o NOME do diretor de "Cidade de Deus"? A tabela <code>filmes</code> só tem o <code>diretor_id = 1</code>. Pra ver "Fernando Meirelles", a gente precisa LIGAR <code>filmes</code> com <code>diretores</code>. Essa "ligação" é o JOIN. Vamos chegar lá na próxima aula. Por enquanto, vamos só conhecer a nova tabela.</p>
        `,
        exercises: [
          {
            prompt: 'Liste TODAS as colunas e TODAS as linhas da tabela <code>diretores</code>.',
            hint: 'SELECT * FROM diretores',
            solution: 'SELECT * FROM diretores;',
            expected: {
              orderMatters: false,
              columns: ['id', 'nome', 'nacionalidade', 'ano_nascimento'],
              rows: [
                [1, 'Fernando Meirelles', 'Brasileira', 1955],
                [2, 'Jose Padilha', 'Brasileira', 1967],
                [3, 'Walter Salles', 'Brasileira', 1956],
                [4, 'Guel Arraes', 'Brasileira', 1953],
                [5, 'Kleber Mendonca Filho', 'Brasileira', 1968],
                [6, 'Anna Muylaert', 'Brasileira', 1964],
                [7, 'Hector Babenco', 'Argentina', 1946],
                [8, 'Giuseppe Tornatore', 'Italiana', 1956],
                [9, 'Peter Jackson', 'Neozelandesa', 1961],
                [10, 'Lana Wachowski', 'Americana', 1965],
                [11, 'Quentin Tarantino', 'Americana', 1963],
                [12, 'Robert Zemeckis', 'Americana', 1951],
                [13, 'Francis Ford Coppola', 'Americana', 1939],
                [14, 'Todd Phillips', 'Americana', 1970],
                [15, 'Bong Joon-ho', 'Coreana', 1969],
                [16, 'Guillermo del Toro', 'Mexicana', 1964],
                [17, 'Jean-Pierre Jeunet', 'Francesa', 1953],
                [18, 'Christopher Nolan', 'Britanica', 1970],
                [19, 'Pedro Almodovar', 'Espanhola', 1949]
              ]
            }
          },
          {
            prompt: 'Quantos diretores existem com nacionalidade <strong>Brasileira</strong>?',
            hint: 'COUNT + WHERE.',
            solution: "SELECT COUNT(*) FROM diretores WHERE nacionalidade = 'Brasileira';",
            expected: {
              orderMatters: false,
              rows: [[6]]
            }
          },
          {
            prompt: 'Liste <code>id</code> e <code>nome</code> dos diretores <strong>americanos</strong>, ordenados por <code>nome</code> alfabético.',
            hint: "WHERE nacionalidade = 'Americana' ORDER BY nome",
            solution: "SELECT id, nome FROM diretores WHERE nacionalidade = 'Americana' ORDER BY nome;",
            expected: {
              orderMatters: true,
              columns: ['id', 'nome'],
              rows: [
                [13, 'Francis Ford Coppola'],
                [10, 'Lana Wachowski'],
                [11, 'Quentin Tarantino'],
                [12, 'Robert Zemeckis'],
                [14, 'Todd Phillips']
              ]
            }
          }
        ]
      },

      {
        id: '6.2',
        title: 'INNER JOIN — conectando duas tabelas',
        tabelas: ['filmes', 'diretores'],
        theory: `
          <p>Chegou a hora. Pra ver o nome do diretor de "Cidade de Deus", você precisa combinar as duas tabelas usando o campo em comum: <code>filmes.diretor_id</code> e <code>diretores.id</code>.</p>

          <h2>Sintaxe básica do INNER JOIN</h2>
          <pre><code>SELECT filmes.titulo, diretores.nome
FROM filmes
INNER JOIN diretores
  ON filmes.diretor_id = diretores.id;</code></pre>

          <p>Tradução em português: "<em>Pra cada filme, encontre o diretor cuja id bate com o diretor_id do filme, e mostre título do filme + nome do diretor.</em>"</p>

          <h2>Anatomia</h2>
          <ul>
            <li><code>FROM filmes</code> — começa com a tabela "esquerda"</li>
            <li><code>INNER JOIN diretores</code> — anuncia que vai combinar com a tabela "direita"</li>
            <li><code>ON filmes.diretor_id = diretores.id</code> — diz COMO conectar (qual coluna bate com qual)</li>
          </ul>

          <h2>Alias de tabela — encurtando o código</h2>
          <p>Escrever <code>filmes.titulo</code> e <code>diretores.nome</code> toda vez é cansativo. Use <strong>aliases curtos</strong>:</p>
          <pre><code>SELECT f.titulo, d.nome
FROM filmes f
INNER JOIN diretores d ON f.diretor_id = d.id;</code></pre>
          <p>Aqui <code>f</code> é apelido pra <code>filmes</code>, <code>d</code> pra <code>diretores</code>. Quase todo SQL profissional usa aliases.</p>

          <div class="callout warning">
            <div class="callout-title">Por que qualificar com prefixo (<code>f.</code>, <code>d.</code>)?</div>
            <p style="margin:0">Porque podem existir colunas com o mesmo nome nas duas tabelas (ex: ambas têm <code>id</code>). O prefixo elimina ambiguidade. Mesmo quando não há ambiguidade, é boa prática.</p>
          </div>

          <h2>INNER JOIN = "match nos dois lados"</h2>
          <p>INNER JOIN só retorna linhas onde a condição do ON é satisfeita <strong>nos dois lados</strong>. Se um filme tem <code>diretor_id</code> nulo ou apontando pra um id que não existe, ele <strong>não aparece</strong> no resultado. Se um diretor não tem filme, ele também <strong>não aparece</strong>.</p>

          <p>É a interseção dos dois conjuntos.</p>

          <h2>A palavra INNER é opcional</h2>
          <p><code>JOIN</code> sozinho = <code>INNER JOIN</code>. Escrever <code>INNER</code> explicitamente é boa prática (deixa claro pra quem lê), mas funciona sem.</p>

          <h2>Como pensar — receita pra JOIN</h2>
          <ol>
            <li>Qual coluna está em uma tabela mas eu quero ver junto da outra? (ex: <code>nome</code> do diretor junto do <code>titulo</code> do filme)</li>
            <li>Qual o "link" entre as duas tabelas? (campo que aparece nas duas, mesmo significado — aqui <code>filmes.diretor_id</code> = <code>diretores.id</code>)</li>
            <li>Escreva: <code>FROM tabela_a a JOIN tabela_b b ON a.fk = b.pk</code></li>
            <li>Depois adicione WHERE/GROUP BY/ORDER BY normalmente.</li>
          </ol>
        `,
        exercises: [
          {
            prompt: 'Para cada filme, liste <code>titulo</code> e o <code>nome</code> do diretor. Use INNER JOIN.',
            hint: 'FROM filmes f JOIN diretores d ON f.diretor_id = d.id',
            solution: 'SELECT f.titulo, d.nome FROM filmes f INNER JOIN diretores d ON f.diretor_id = d.id;',
            expected: {
              orderMatters: false,
              columns: ['titulo', 'nome'],
              rows: [
                ['Cidade de Deus', 'Fernando Meirelles'],
                ['Tropa de Elite', 'Jose Padilha'],
                ['Central do Brasil', 'Walter Salles'],
                ['O Auto da Compadecida', 'Guel Arraes'],
                ['Bacurau', 'Kleber Mendonca Filho'],
                ['Que Horas Ela Volta?', 'Anna Muylaert'],
                ['Aquarius', 'Kleber Mendonca Filho'],
                ['Pixote', 'Hector Babenco'],
                ['Cinema Paradiso', 'Giuseppe Tornatore'],
                ['O Senhor dos Aneis', 'Peter Jackson'],
                ['Matrix', 'Lana Wachowski'],
                ['Pulp Fiction', 'Quentin Tarantino'],
                ['Forrest Gump', 'Robert Zemeckis'],
                ['O Poderoso Chefao', 'Francis Ford Coppola'],
                ['Coringa', 'Todd Phillips'],
                ['Parasita', 'Bong Joon-ho'],
                ['O Labirinto do Fauno', 'Guillermo del Toro'],
                ['Amelie Poulain', 'Jean-Pierre Jeunet'],
                ['A Origem', 'Christopher Nolan'],
                ['Interestelar', 'Christopher Nolan']
              ]
            }
          },
          {
            prompt: 'Liste o <code>titulo</code> dos filmes dirigidos por diretores de nacionalidade <strong>Brasileira</strong>.',
            hint: 'INNER JOIN + WHERE d.nacionalidade = ...',
            solution: "SELECT f.titulo FROM filmes f INNER JOIN diretores d ON f.diretor_id = d.id WHERE d.nacionalidade = 'Brasileira';",
            expected: {
              orderMatters: false,
              columns: ['titulo'],
              rows: [
                ['Cidade de Deus'],
                ['Tropa de Elite'],
                ['Central do Brasil'],
                ['O Auto da Compadecida'],
                ['Bacurau'],
                ['Que Horas Ela Volta?'],
                ['Aquarius']
              ]
            }
          },
          {
            prompt: 'Liste o <code>titulo</code> e <code>ano</code> dos filmes dirigidos por <strong>Christopher Nolan</strong>. Ordene por ano crescente.',
            hint: "WHERE d.nome = 'Christopher Nolan'",
            solution: "SELECT f.titulo, f.ano FROM filmes f INNER JOIN diretores d ON f.diretor_id = d.id WHERE d.nome = 'Christopher Nolan' ORDER BY f.ano;",
            expected: {
              orderMatters: true,
              columns: ['titulo', 'ano'],
              rows: [
                ['A Origem', 2010],
                ['Interestelar', 2014]
              ]
            }
          },
          {
            prompt: 'Quantos filmes cada nacionalidade de diretor tem? Retorne <code>nacionalidade</code> e <code>qtd</code>, ordenado por <code>qtd</code> DESC e desempate por <code>nacionalidade</code> alfabético.',
            hint: 'INNER JOIN + GROUP BY d.nacionalidade + COUNT.',
            solution: 'SELECT d.nacionalidade, COUNT(*) AS qtd FROM filmes f INNER JOIN diretores d ON f.diretor_id = d.id GROUP BY d.nacionalidade ORDER BY qtd DESC, d.nacionalidade ASC;',
            expected: {
              orderMatters: true,
              columns: ['nacionalidade', 'qtd'],
              rows: [
                ['Americana', 5],
                ['Brasileira', 7],
                ['Argentina', 1],
                ['Britanica', 2],
                ['Coreana', 1],
                ['Francesa', 1],
                ['Italiana', 1],
                ['Mexicana', 1],
                ['Neozelandesa', 1]
              ].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
            }
          }
        ]
      },

      {
        id: '6.3',
        title: 'LEFT JOIN — preservando linhas sem par',
        tabelas: ['filmes', 'diretores'],
        theory: `
          <p>INNER JOIN só retorna linhas que têm par. Mas e se você quer ver <strong>TODOS os diretores</strong>, mesmo os que ainda não dirigiram nenhum filme da tabela?</p>

          <p>Aí entra o <code>LEFT JOIN</code>. Ele mantém TODAS as linhas da tabela da <strong>esquerda</strong> (FROM), mesmo as sem correspondência na direita. Onde não há par, os campos da direita ficam <code>NULL</code>.</p>

          <h2>Sintaxe</h2>
          <pre><code>SELECT d.nome, f.titulo
FROM diretores d
LEFT JOIN filmes f ON d.id = f.diretor_id;</code></pre>

          <p>Resultado: 21 linhas. Cada diretor com 1 filme aparece uma vez; Kleber e Nolan (que têm 2 filmes cada) aparecem 2 vezes; Pedro Almodóvar (sem filme) aparece UMA vez com <code>titulo = NULL</code>.</p>

          <h2>INNER vs LEFT — visualizando</h2>
          <table class="theory-table">
            <thead><tr><th></th><th>INNER JOIN</th><th>LEFT JOIN</th></tr></thead>
            <tbody>
              <tr><td>Linhas da esquerda SEM par</td><td>❌ excluídas</td><td>✅ mantidas (com NULL na direita)</td></tr>
              <tr><td>Linhas da direita SEM par</td><td>❌ excluídas</td><td>❌ excluídas</td></tr>
              <tr><td>Quando usar?</td><td>"Quero APENAS itens com correspondência"</td><td>"Quero TUDO da esquerda, com info extra quando existir"</td></tr>
            </tbody>
          </table>

          <h2>Padrão clássico: encontrar quem NÃO tem par</h2>
          <p>Diretores sem nenhum filme cadastrado:</p>
          <pre><code>SELECT d.nome
FROM diretores d
LEFT JOIN filmes f ON d.id = f.diretor_id
WHERE f.id IS NULL;</code></pre>
          <p>O <code>WHERE f.id IS NULL</code> filtra apenas linhas onde o LEFT JOIN não achou par.</p>

          <div class="callout tip">
            <div class="callout-title">RIGHT JOIN existe, mas raramente é usado</div>
            <p style="margin:0">É o "espelho": preserva todas as linhas da direita. Você quase nunca vê na prática — geralmente vale a pena reescrever como LEFT JOIN trocando a ordem das tabelas. SQLite nem suporta RIGHT JOIN em todas as versões.</p>
          </div>

          <h2>Cuidado com COUNT(*) em LEFT JOIN</h2>
          <p>Se você quer contar quantos filmes cada diretor tem (incluindo zero), use <code>COUNT(f.id)</code>, NÃO <code>COUNT(*)</code>:</p>
          <pre><code>-- ❌ ERRADO: COUNT(*) conta a linha (mesmo com NULL), retorna 1 pra quem não tem filme
SELECT d.nome, COUNT(*) FROM diretores d LEFT JOIN filmes f ON d.id = f.diretor_id GROUP BY d.id;

-- ✅ CERTO: COUNT(f.id) ignora NULL, retorna 0 corretamente
SELECT d.nome, COUNT(f.id) FROM diretores d LEFT JOIN filmes f ON d.id = f.diretor_id GROUP BY d.id;</code></pre>
        `,
        exercises: [
          {
            prompt: 'Liste o <code>nome</code> de TODOS os diretores e o <code>titulo</code> de cada filme deles (use LEFT JOIN partindo de <code>diretores</code>). Diretores sem filme aparecem com <code>NULL</code>. Retorne 21 linhas.',
            hint: 'FROM diretores d LEFT JOIN filmes f ON d.id = f.diretor_id',
            solution: 'SELECT d.nome, f.titulo FROM diretores d LEFT JOIN filmes f ON d.id = f.diretor_id;',
            expected: {
              orderMatters: false,
              columns: ['nome', 'titulo'],
              rows: [
                ['Fernando Meirelles', 'Cidade de Deus'],
                ['Jose Padilha', 'Tropa de Elite'],
                ['Walter Salles', 'Central do Brasil'],
                ['Guel Arraes', 'O Auto da Compadecida'],
                ['Kleber Mendonca Filho', 'Bacurau'],
                ['Kleber Mendonca Filho', 'Aquarius'],
                ['Anna Muylaert', 'Que Horas Ela Volta?'],
                ['Hector Babenco', 'Pixote'],
                ['Giuseppe Tornatore', 'Cinema Paradiso'],
                ['Peter Jackson', 'O Senhor dos Aneis'],
                ['Lana Wachowski', 'Matrix'],
                ['Quentin Tarantino', 'Pulp Fiction'],
                ['Robert Zemeckis', 'Forrest Gump'],
                ['Francis Ford Coppola', 'O Poderoso Chefao'],
                ['Todd Phillips', 'Coringa'],
                ['Bong Joon-ho', 'Parasita'],
                ['Guillermo del Toro', 'O Labirinto do Fauno'],
                ['Jean-Pierre Jeunet', 'Amelie Poulain'],
                ['Christopher Nolan', 'A Origem'],
                ['Christopher Nolan', 'Interestelar'],
                ['Pedro Almodovar', null]
              ]
            }
          },
          {
            prompt: 'Liste o <code>nome</code> dos diretores que <strong>NÃO dirigiram nenhum filme</strong> na nossa tabela. (Use LEFT JOIN + IS NULL.)',
            hint: 'WHERE f.id IS NULL',
            solution: 'SELECT d.nome FROM diretores d LEFT JOIN filmes f ON d.id = f.diretor_id WHERE f.id IS NULL;',
            expected: {
              orderMatters: false,
              columns: ['nome'],
              rows: [['Pedro Almodovar']]
            }
          },
          {
            prompt: 'Quantos filmes cada diretor tem? <strong>Inclua diretores sem filme</strong> (com qtd = 0). Retorne <code>nome</code> e <code>qtd</code>, ordenado por <code>qtd</code> DESC e desempate por <code>nome</code> ASC.',
            hint: 'LEFT JOIN + GROUP BY + COUNT(f.id) — não COUNT(*)!',
            solution: 'SELECT d.nome, COUNT(f.id) AS qtd FROM diretores d LEFT JOIN filmes f ON d.id = f.diretor_id GROUP BY d.id, d.nome ORDER BY qtd DESC, d.nome ASC;',
            expected: {
              orderMatters: true,
              columns: ['nome', 'qtd'],
              rows: [
                ['Christopher Nolan', 2],
                ['Kleber Mendonca Filho', 2],
                ['Anna Muylaert', 1],
                ['Bong Joon-ho', 1],
                ['Fernando Meirelles', 1],
                ['Francis Ford Coppola', 1],
                ['Giuseppe Tornatore', 1],
                ['Guel Arraes', 1],
                ['Guillermo del Toro', 1],
                ['Hector Babenco', 1],
                ['Jean-Pierre Jeunet', 1],
                ['Jose Padilha', 1],
                ['Lana Wachowski', 1],
                ['Peter Jackson', 1],
                ['Quentin Tarantino', 1],
                ['Robert Zemeckis', 1],
                ['Todd Phillips', 1],
                ['Walter Salles', 1],
                ['Pedro Almodovar', 0]
              ]
            }
          }
        ]
      },

      {
        id: '6.4',
        title: 'Múltiplas tabelas — apresentando o case real',
        tabelas: ['tb_termos', 'tb_codigo_link', 'tb_hierarquia'],
        theory: `
          <p>Bom, agora você sabe JOIN. Vamos largar os filmes por um momento e começar a trabalhar com as <strong>3 tabelas reais do seu case</strong>. Elas já estão importadas no banco — você consegue ver no schema panel à direita.</p>

          <h2>As 3 tabelas</h2>
          <ul>
            <li><code>tb_termos</code> — cada linha é uma venda. Tem <code>codigo_termo</code> (PK), <code>codigo_link</code> (FK), <code>codigo_executivo</code> (FK) e <code>data_termo</code>.</li>
            <li><code>tb_codigo_link</code> — os produtos. Tem <code>codigo_link</code> (PK), <code>taxa_do_link</code> e <code>tpv_negociado</code>.</li>
            <li><code>tb_hierarquia</code> — os executivos. Tem <code>codigo_executivo</code> (PK), <code>nome_executivo</code>, <code>carteira</code> e <code>coordenador</code>.</li>
          </ul>

          <h2>O grafo de relacionamentos</h2>
          <pre><code>tb_termos
  ├── codigo_link    ──→ tb_codigo_link.codigo_link
  └── codigo_executivo ──→ tb_hierarquia.codigo_executivo</code></pre>

          <h2>Padrão de JOIN com 3 tabelas</h2>
          <pre><code>SELECT t.codigo_termo, h.nome_executivo, l.tpv_negociado
FROM tb_termos t
INNER JOIN tb_hierarquia   h ON t.codigo_executivo = h.codigo_executivo
INNER JOIN tb_codigo_link  l ON t.codigo_link = l.codigo_link;</code></pre>

          <p>Cada novo <code>JOIN ... ON ...</code> conecta uma nova tabela. Você pode encadear quantas precisar.</p>

          <h2>Combinando JOIN com GROUP BY (o caso da Pergunta 1)</h2>
          <p>A primeira pergunta do seu case pede: "<em>ranking de executivos com mais termos por mês</em>". Sem extrair mês (M7), por enquanto vamos focar em: "<em>quantos termos cada executivo fez?</em>".</p>
          <pre><code>SELECT h.nome_executivo, COUNT(*) AS qtd_termos
FROM tb_termos t
INNER JOIN tb_hierarquia h ON t.codigo_executivo = h.codigo_executivo
GROUP BY h.codigo_executivo, h.nome_executivo
ORDER BY qtd_termos DESC;</code></pre>
          <p>Isso responde 80% da Pergunta 1 do seu case real. Falta só a parte de extrair o mês — vem em M7.</p>

          <div class="callout tip">
            <div class="callout-title">Você já conseguiria resolver isso sozinho?</div>
            <p style="margin:0">Releia a query acima sem olhar a explicação. Consegue acompanhar cada cláusula? Se sim, parabéns — você passou do estágio "decora SQL" pro "lê SQL". Os exercícios abaixo são a prática.</p>
          </div>
        `,
        exercises: [
          {
            prompt: 'Para cada termo, liste <code>codigo_termo</code> e o <code>nome_executivo</code> de quem fez. Junte <code>tb_termos</code> com <code>tb_hierarquia</code>.',
            hint: 'INNER JOIN ON t.codigo_executivo = h.codigo_executivo',
            solution: 'SELECT t.codigo_termo, h.nome_executivo FROM tb_termos t INNER JOIN tb_hierarquia h ON t.codigo_executivo = h.codigo_executivo;',
            expected: {
              orderMatters: false,
              columns: ['codigo_termo', 'nome_executivo'],
              rows: [
                [1, 'Teste'],
                [2, 'Executivo 555'],
                [3, 'Teste'],
                [4, 'Teste'],
                [5, 'Executivo 555'],
                [6, 'Executivo 128'],
                [7, 'Teste'],
                [8, 'Executivo 555'],
                [9, 'Executivo 555']
              ]
            }
          },
          {
            prompt: 'Quantos termos cada executivo fez? Retorne <code>nome_executivo</code> e <code>qtd_termos</code>, ordenado por <code>qtd_termos</code> DESC e desempate por <code>nome_executivo</code> ASC.',
            hint: 'JOIN + GROUP BY h.codigo_executivo, h.nome_executivo + COUNT(*) + ORDER BY',
            solution: 'SELECT h.nome_executivo, COUNT(*) AS qtd_termos FROM tb_termos t INNER JOIN tb_hierarquia h ON t.codigo_executivo = h.codigo_executivo GROUP BY h.codigo_executivo, h.nome_executivo ORDER BY qtd_termos DESC, h.nome_executivo ASC;',
            expected: {
              orderMatters: true,
              columns: ['nome_executivo', 'qtd_termos'],
              rows: [
                ['Executivo 555', 4],
                ['Teste', 4],
                ['Executivo 128', 1]
              ]
            }
          },
          {
            prompt: 'Para cada termo, mostre <code>codigo_termo</code>, <code>nome_executivo</code> E <code>tpv_negociado</code> do link associado. Aqui você junta as 3 tabelas.',
            hint: 'Encadeie 2 JOINs: termos + hierarquia + codigo_link',
            solution: 'SELECT t.codigo_termo, h.nome_executivo, l.tpv_negociado FROM tb_termos t INNER JOIN tb_hierarquia h ON t.codigo_executivo = h.codigo_executivo INNER JOIN tb_codigo_link l ON t.codigo_link = l.codigo_link;',
            expected: {
              orderMatters: false,
              columns: ['codigo_termo', 'nome_executivo', 'tpv_negociado'],
              rows: [
                [1, 'Teste', 10000],
                [2, 'Executivo 555', 10000],
                [3, 'Teste', 10000],
                [4, 'Teste', 10000],
                [5, 'Executivo 555', 7000],
                [6, 'Executivo 128', 7000],
                [7, 'Teste', 7000],
                [8, 'Executivo 555', 5000],
                [9, 'Executivo 555', 5000]
              ]
            }
          },
          {
            prompt: 'Calcule o <strong>TPV total negociado por cada executivo</strong> (soma de <code>tpv_negociado</code> de TODOS os termos dele). Retorne <code>nome_executivo</code> e <code>tpv_total</code>, ordenado por <code>tpv_total</code> DESC.',
            hint: '3 JOINs + GROUP BY executivo + SUM(l.tpv_negociado)',
            solution: 'SELECT h.nome_executivo, SUM(l.tpv_negociado) AS tpv_total FROM tb_termos t INNER JOIN tb_hierarquia h ON t.codigo_executivo = h.codigo_executivo INNER JOIN tb_codigo_link l ON t.codigo_link = l.codigo_link GROUP BY h.codigo_executivo, h.nome_executivo ORDER BY tpv_total DESC;',
            expected: {
              orderMatters: true,
              columns: ['nome_executivo', 'tpv_total'],
              rows: [
                ['Teste', 37000],
                ['Executivo 555', 27000],
                ['Executivo 128', 7000]
              ]
            }
          }
        ]
      }
    ]
  },

  // =========================================================
  // MÓDULO 7 — MANIPULANDO DADOS (CASE, strings, datas, NULL)
  // =========================================================
  {
    id: 'M7',
    title: 'Manipulando Dados',
    lessons: [

      {
        id: '7.1',
        title: 'CASE WHEN — condicional dentro do SELECT',
        tabelas: ['filmes', 'tb_hierarquia'],
        theory: `
          <p>Até agora, suas colunas no <code>SELECT</code> retornaram valores diretos da tabela. <code>CASE WHEN</code> permite que você <strong>calcule</strong> um valor baseado em condições — tipo um IF/ELSE dentro da query.</p>

          <h2>Sintaxe</h2>
          <pre><code>SELECT
  titulo,
  CASE
    WHEN nota >= 8.5 THEN 'Excelente'
    WHEN nota >= 8.0 THEN 'Bom'
    ELSE 'Regular'
  END AS classificacao
FROM filmes;</code></pre>

          <p>Pra cada linha, o SQL avalia os WHENs <strong>em ordem</strong>. O primeiro que for verdade ganha. Se nenhum for verdade, usa o <code>ELSE</code> (ou <code>NULL</code> se ELSE não tiver).</p>

          <h2>Casos clássicos de uso</h2>
          <ul>
            <li><strong>Categorizar valores</strong>: "Caro / Médio / Barato" baseado em preço</li>
            <li><strong>Normalizar dados</strong>: mapear "A Plus" → "A" (caso do seu trabalho)</li>
            <li><strong>Contar condicional</strong>: <code>SUM(CASE WHEN ... THEN 1 ELSE 0 END)</code> conta linhas que satisfazem uma condição</li>
          </ul>

          <h2>CASE simples (single-value)</h2>
          <p>Existe outra forma quando você compara UMA coluna com vários valores:</p>
          <pre><code>CASE genero
  WHEN 'Drama'   THEN 'Sério'
  WHEN 'Comedia' THEN 'Leve'
  ELSE 'Outro'
END</code></pre>

          <div class="callout tip">
            <div class="callout-title">Sempre coloque ELSE</div>
            <p style="margin:0">Sem ELSE, se nenhum WHEN bate, o resultado é NULL — e queries com NULL inesperado dão dor de cabeça. Inclua sempre, mesmo que seja <code>ELSE 'desconhecido'</code>.</p>
          </div>
        `,
        exercises: [
          {
            prompt: 'Para cada filme, retorne <code>titulo</code> e uma coluna <code>era</code> que classifica: <code>"Antigo"</code> se <code>ano &lt; 2000</code>, <code>"Anos 2000"</code> se ano <code>BETWEEN 2000 AND 2009</code>, ou <code>"Recente"</code> se ano <code>&gt;= 2010</code>. Use CASE WHEN.',
            hint: 'CASE WHEN ano < 2000 THEN ... WHEN ano <= 2009 THEN ... ELSE ... END AS era',
            solution: "SELECT titulo, CASE WHEN ano < 2000 THEN 'Antigo' WHEN ano <= 2009 THEN 'Anos 2000' ELSE 'Recente' END AS era FROM filmes;",
            expected: {
              orderMatters: false,
              columns: ['titulo', 'era'],
              rows: [
                ['Cidade de Deus', 'Anos 2000'],
                ['Tropa de Elite', 'Anos 2000'],
                ['Central do Brasil', 'Antigo'],
                ['O Auto da Compadecida', 'Anos 2000'],
                ['Bacurau', 'Recente'],
                ['Que Horas Ela Volta?', 'Recente'],
                ['Aquarius', 'Recente'],
                ['Pixote', 'Antigo'],
                ['Cinema Paradiso', 'Antigo'],
                ['O Senhor dos Aneis', 'Anos 2000'],
                ['Matrix', 'Antigo'],
                ['Pulp Fiction', 'Antigo'],
                ['Forrest Gump', 'Antigo'],
                ['O Poderoso Chefao', 'Antigo'],
                ['Coringa', 'Recente'],
                ['Parasita', 'Recente'],
                ['O Labirinto do Fauno', 'Anos 2000'],
                ['Amelie Poulain', 'Anos 2000'],
                ['A Origem', 'Recente'],
                ['Interestelar', 'Recente']
              ]
            }
          },
          {
            prompt: 'Liste <code>titulo</code> e <code>classificacao</code>: <code>"Excelente"</code> se <code>nota &gt;= 8.5</code>, <code>"Bom"</code> se <code>&gt;= 8.0</code>, senão <code>"Regular"</code>.',
            hint: 'Mesmo padrão de CASE com 3 níveis.',
            solution: "SELECT titulo, CASE WHEN nota >= 8.5 THEN 'Excelente' WHEN nota >= 8.0 THEN 'Bom' ELSE 'Regular' END AS classificacao FROM filmes;",
            expected: {
              orderMatters: false,
              columns: ['titulo', 'classificacao'],
              rows: [
                ['Cidade de Deus', 'Excelente'],
                ['Tropa de Elite', 'Bom'],
                ['Central do Brasil', 'Bom'],
                ['O Auto da Compadecida', 'Bom'],
                ['Bacurau', 'Regular'],
                ['Que Horas Ela Volta?', 'Regular'],
                ['Aquarius', 'Regular'],
                ['Pixote', 'Regular'],
                ['Cinema Paradiso', 'Excelente'],
                ['O Senhor dos Aneis', 'Excelente'],
                ['Matrix', 'Excelente'],
                ['Pulp Fiction', 'Excelente'],
                ['Forrest Gump', 'Excelente'],
                ['O Poderoso Chefao', 'Excelente'],
                ['Coringa', 'Bom'],
                ['Parasita', 'Excelente'],
                ['O Labirinto do Fauno', 'Bom'],
                ['Amelie Poulain', 'Bom'],
                ['A Origem', 'Excelente'],
                ['Interestelar', 'Excelente']
              ]
            }
          },
          {
            prompt: '<strong>(Usando o case real)</strong> Liste <code>nome_executivo</code> e <code>carteira_normalizada</code>: se <code>carteira = "A Plus"</code>, mostrar <code>"A"</code>; senão, mostrar o valor original. Use tabela <code>tb_hierarquia</code>.',
            hint: "CASE WHEN carteira = 'A Plus' THEN 'A' ELSE carteira END",
            solution: "SELECT nome_executivo, CASE WHEN carteira = 'A Plus' THEN 'A' ELSE carteira END AS carteira_normalizada FROM tb_hierarquia;",
            expected: {
              orderMatters: false,
              columns: ['nome_executivo', 'carteira_normalizada'],
              rows: [
                ['Teste', 'A'],
                ['Executivo 555', 'B1'],
                ['Executivo 128', 'C2']
              ]
            }
          }
        ]
      },

      {
        id: '7.2',
        title: 'Funções de string — manipulando texto',
        tabelas: ['filmes', 'diretores'],
        theory: `
          <p>SQL tem funções nativas pra manipular texto. As mais usadas:</p>

          <table class="theory-table">
            <thead><tr><th>Função</th><th>O que faz</th><th>Exemplo</th></tr></thead>
            <tbody>
              <tr><td><code>LOWER(s)</code></td><td>Tudo minúsculo</td><td><code>LOWER('Matrix')</code> → 'matrix'</td></tr>
              <tr><td><code>UPPER(s)</code></td><td>Tudo MAIÚSCULO</td><td><code>UPPER('matrix')</code> → 'MATRIX'</td></tr>
              <tr><td><code>LENGTH(s)</code></td><td>Número de caracteres</td><td><code>LENGTH('Matrix')</code> → 6</td></tr>
              <tr><td><code>SUBSTR(s, ini, n)</code></td><td>Pega <code>n</code> caracteres a partir da posição <code>ini</code> (1-indexed)</td><td><code>SUBSTR('Matrix', 1, 3)</code> → 'Mat'</td></tr>
              <tr><td><code>REPLACE(s, a, b)</code></td><td>Substitui todas ocorrências de <code>a</code> por <code>b</code></td><td><code>REPLACE('a-b-c','-','/')</code> → 'a/b/c'</td></tr>
              <tr><td><code>TRIM(s)</code></td><td>Remove espaços das pontas</td><td><code>TRIM('  oi  ')</code> → 'oi'</td></tr>
              <tr><td><code>||</code></td><td><strong>Concatena strings</strong> (SQLite/Postgres)</td><td><code>'oi' || ' mundo'</code> → 'oi mundo'</td></tr>
            </tbody>
          </table>

          <div class="callout warning">
            <div class="callout-title">Concatenação varia por banco</div>
            <p style="margin:0">SQLite e PostgreSQL usam <code>||</code>. MySQL usa <code>CONCAT(a, b, c)</code>. SQL Server usa <code>+</code>. Quando migrar entre bancos, isso é uma das primeiras coisas a ajustar.</p>
          </div>

          <h2>Combinando com outras cláusulas</h2>
          <p>Funções de string podem aparecer em qualquer lugar — SELECT, WHERE, ORDER BY:</p>
          <pre><code>-- Filmes cujo titulo começa com 'O' (alternativa ao LIKE)
SELECT titulo FROM filmes WHERE SUBSTR(titulo, 1, 1) = 'O';

-- Ordenar por tamanho do título
SELECT titulo FROM filmes ORDER BY LENGTH(titulo);</code></pre>
        `,
        exercises: [
          {
            prompt: 'Liste cada filme com o título em MAIÚSCULAS. Retorne uma só coluna <code>titulo_maiusculo</code>.',
            hint: 'SELECT UPPER(titulo) AS titulo_maiusculo FROM ...',
            solution: 'SELECT UPPER(titulo) AS titulo_maiusculo FROM filmes;',
            expected: {
              orderMatters: false,
              columns: ['titulo_maiusculo'],
              rows: [
                ['CIDADE DE DEUS'], ['TROPA DE ELITE'], ['CENTRAL DO BRASIL'],
                ['O AUTO DA COMPADECIDA'], ['BACURAU'], ['QUE HORAS ELA VOLTA?'],
                ['AQUARIUS'], ['PIXOTE'], ['CINEMA PARADISO'], ['O SENHOR DOS ANEIS'],
                ['MATRIX'], ['PULP FICTION'], ['FORREST GUMP'], ['O PODEROSO CHEFAO'],
                ['CORINGA'], ['PARASITA'], ['O LABIRINTO DO FAUNO'], ['AMELIE POULAIN'],
                ['A ORIGEM'], ['INTERESTELAR']
              ]
            }
          },
          {
            prompt: 'Para cada filme, concatene título e ano no formato <code>"Titulo (ano)"</code>. Retorne uma só coluna <code>filme_com_ano</code>. Use <code>||</code>.',
            hint: "titulo || ' (' || ano || ')'",
            solution: "SELECT titulo || ' (' || ano || ')' AS filme_com_ano FROM filmes;",
            expected: {
              orderMatters: false,
              columns: ['filme_com_ano'],
              rows: [
                ['Cidade de Deus (2002)'], ['Tropa de Elite (2007)'], ['Central do Brasil (1998)'],
                ['O Auto da Compadecida (2000)'], ['Bacurau (2019)'], ['Que Horas Ela Volta? (2015)'],
                ['Aquarius (2016)'], ['Pixote (1981)'], ['Cinema Paradiso (1988)'],
                ['O Senhor dos Aneis (2001)'], ['Matrix (1999)'], ['Pulp Fiction (1994)'],
                ['Forrest Gump (1994)'], ['O Poderoso Chefao (1972)'], ['Coringa (2019)'],
                ['Parasita (2019)'], ['O Labirinto do Fauno (2006)'], ['Amelie Poulain (2001)'],
                ['A Origem (2010)'], ['Interestelar (2014)']
              ]
            }
          },
          {
            prompt: 'Liste <code>nome</code> e o <code>tamanho</code> (LENGTH) do nome de cada diretor. Ordenado pelo tamanho DESC, desempate por nome ASC.',
            hint: 'SELECT nome, LENGTH(nome) AS tamanho FROM diretores ORDER BY tamanho DESC, nome ASC',
            solution: 'SELECT nome, LENGTH(nome) AS tamanho FROM diretores ORDER BY LENGTH(nome) DESC, nome ASC;',
            expected: {
              orderMatters: true,
              columns: ['nome', 'tamanho'],
              rows: [
                ['Kleber Mendonca Filho', 21],
                ['Francis Ford Coppola', 20],
                ['Fernando Meirelles', 18],
                ['Giuseppe Tornatore', 18],
                ['Jean-Pierre Jeunet', 18],
                ['Guillermo del Toro', 18],
                ['Christopher Nolan', 17],
                ['Quentin Tarantino', 17],
                ['Robert Zemeckis', 15],
                ['Hector Babenco', 14],
                ['Pedro Almodovar', 15],
                ['Lana Wachowski', 14],
                ['Walter Salles', 13],
                ['Anna Muylaert', 13],
                ['Bong Joon-ho', 12],
                ['Jose Padilha', 12],
                ['Peter Jackson', 13],
                ['Todd Phillips', 13],
                ['Guel Arraes', 11]
              ].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
            }
          }
        ]
      },

      {
        id: '7.3',
        title: 'Funções de data — extraindo e formatando',
        tabelas: ['tb_termos'],
        theory: `
          <p>Em SQLite, datas são guardadas como <strong>texto no formato ISO</strong>: <code>'YYYY-MM-DD'</code> ou <code>'YYYY-MM-DD HH:MM:SS'</code>. Isso tem uma vantagem grande: comparações alfabéticas funcionam como cronológicas (<code>'2025-01-01' &lt; '2025-12-31'</code>).</p>

          <p>Pra <strong>extrair partes</strong> de uma data ou <strong>formatá-la</strong>, use <code>STRFTIME</code>.</p>

          <h2>STRFTIME — o canivete suíço de datas</h2>
          <pre><code>STRFTIME('%Y', data)     -- ano (2025)
STRFTIME('%m', data)     -- mês (01-12)
STRFTIME('%d', data)     -- dia (01-31)
STRFTIME('%Y-%m', data)  -- ano-mês (2025-01)
STRFTIME('%d/%m/%Y', data) -- formato brasileiro (28/01/2025)
STRFTIME('%w', data)     -- dia da semana (0=domingo, 6=sábado)</code></pre>

          <h2>Exemplo prático</h2>
          <pre><code>SELECT
  codigo_termo,
  data_termo,
  STRFTIME('%Y-%m', data_termo) AS mes,
  STRFTIME('%d/%m/%Y', data_termo) AS data_br
FROM tb_termos;</code></pre>

          <h2>Outras funções úteis</h2>
          <ul>
            <li><code>DATE('now')</code> — data atual no formato ISO</li>
            <li><code>DATE(data, '+7 days')</code> — soma 7 dias</li>
            <li><code>DATE(data, 'start of month')</code> — primeiro dia do mês</li>
            <li><code>JULIANDAY(d1) - JULIANDAY(d2)</code> — diferença em dias entre 2 datas</li>
          </ul>

          <div class="callout tip">
            <div class="callout-title">Para o seu case</div>
            <p style="margin:0">A Pergunta 2 do seu case real pede a primeira e última data de termo no formato <strong>DD/MM/YYYY</strong>. Isso é exatamente <code>STRFTIME('%d/%m/%Y', MIN(data_termo))</code>.</p>
          </div>
        `,
        exercises: [
          {
            prompt: 'Para cada termo da tabela <code>tb_termos</code>, liste <code>codigo_termo</code>, <code>data_termo</code> original, e uma coluna <code>data_br</code> no formato DD/MM/YYYY.',
            hint: "STRFTIME('%d/%m/%Y', data_termo) AS data_br",
            solution: "SELECT codigo_termo, data_termo, STRFTIME('%d/%m/%Y', data_termo) AS data_br FROM tb_termos;",
            expected: {
              orderMatters: false,
              columns: ['codigo_termo', 'data_termo', 'data_br'],
              rows: [
                [1, '2025-01-01', '01/01/2025'],
                [2, '2025-01-15', '15/01/2025'],
                [3, '2025-01-15', '15/01/2025'],
                [4, '2025-01-13', '13/01/2025'],
                [5, '2025-01-28', '28/01/2025'],
                [6, '2025-01-04', '04/01/2025'],
                [7, '2025-01-25', '25/01/2025'],
                [8, '2025-01-26', '26/01/2025'],
                [9, '2025-01-26', '26/01/2025']
              ]
            }
          },
          {
            prompt: 'Conte quantos termos foram feitos em cada dia (do mês). Retorne <code>dia</code> e <code>qtd</code>. Ordenado por <code>dia</code> ASC.',
            hint: "STRFTIME('%d', data_termo) AS dia + GROUP BY",
            solution: "SELECT STRFTIME('%d', data_termo) AS dia, COUNT(*) AS qtd FROM tb_termos GROUP BY dia ORDER BY dia ASC;",
            expected: {
              orderMatters: true,
              columns: ['dia', 'qtd'],
              rows: [
                ['01', 1], ['04', 1], ['13', 1], ['15', 2],
                ['25', 1], ['26', 2], ['28', 1]
              ]
            }
          },
          {
            prompt: 'Liste <code>codigo_executivo</code> e a <code>data_primeiro_termo</code> (a mais antiga) de cada executivo, formatada como DD/MM/YYYY.',
            hint: "STRFTIME('%d/%m/%Y', MIN(data_termo)) + GROUP BY codigo_executivo",
            solution: "SELECT codigo_executivo, STRFTIME('%d/%m/%Y', MIN(data_termo)) AS data_primeiro_termo FROM tb_termos GROUP BY codigo_executivo;",
            expected: {
              orderMatters: false,
              columns: ['codigo_executivo', 'data_primeiro_termo'],
              rows: [
                [123, '01/01/2025'],
                [555, '15/01/2025'],
                [128, '04/01/2025']
              ]
            }
          }
        ]
      },

      {
        id: '7.4',
        title: 'COALESCE — substituindo NULL',
        tabelas: ['filmes', 'diretores'],
        theory: `
          <p>NULL representa <strong>ausência de valor</strong>. Aparece quando: um campo nunca foi preenchido, ou um LEFT JOIN não achou par.</p>

          <h2>O problema com NULL</h2>
          <p>NULL contamina cálculos. <code>5 + NULL = NULL</code>. <code>'oi' || NULL = NULL</code>. Comparações com NULL retornam UNKNOWN (nem true nem false).</p>

          <h2>COALESCE — primeiro valor não-NULL</h2>
          <pre><code>COALESCE(valor1, valor2, valor3, ...)</code></pre>
          <p>Retorna o <strong>primeiro argumento que NÃO é NULL</strong>. Útil pra fornecer valor padrão:</p>
          <pre><code>SELECT COALESCE(telefone, 'sem-telefone') FROM clientes;
-- se telefone é NULL, mostra 'sem-telefone'; senão, mostra o telefone</code></pre>

          <h2>IFNULL — versão simples (SQLite)</h2>
          <p>SQLite oferece <code>IFNULL(a, b)</code> que é só açúcar pra <code>COALESCE(a, b)</code>. Idêntico, mas só com 2 argumentos.</p>

          <h2>Aplicação clássica: LEFT JOIN + COALESCE</h2>
          <p>Lembra do LEFT JOIN onde diretores sem filme apareciam com <code>titulo = NULL</code>? COALESCE deixa essa saída bonita:</p>
          <pre><code>SELECT
  d.nome,
  COALESCE(f.titulo, 'Sem filme cadastrado') AS titulo
FROM diretores d
LEFT JOIN filmes f ON d.id = f.diretor_id;</code></pre>

          <div class="callout warning">
            <div class="callout-title">Sempre IS NULL, nunca = NULL</div>
            <p style="margin:0">Pra testar se uma coluna é NULL, use <code>WHERE col IS NULL</code>. <code>WHERE col = NULL</code> NÃO funciona — comparação com NULL nunca é verdadeira (nem mesmo NULL = NULL).</p>
          </div>
        `,
        exercises: [
          {
            prompt: 'Liste o <code>nome</code> de todos os diretores e o <code>titulo</code> de cada filme. Para diretores SEM filme, mostre <code>"Sem filme cadastrado"</code> em vez de NULL.',
            hint: "LEFT JOIN + COALESCE(f.titulo, 'Sem filme cadastrado') AS titulo",
            solution: "SELECT d.nome, COALESCE(f.titulo, 'Sem filme cadastrado') AS titulo FROM diretores d LEFT JOIN filmes f ON d.id = f.diretor_id;",
            expected: {
              orderMatters: false,
              columns: ['nome', 'titulo'],
              rows: [
                ['Fernando Meirelles', 'Cidade de Deus'],
                ['Jose Padilha', 'Tropa de Elite'],
                ['Walter Salles', 'Central do Brasil'],
                ['Guel Arraes', 'O Auto da Compadecida'],
                ['Kleber Mendonca Filho', 'Bacurau'],
                ['Kleber Mendonca Filho', 'Aquarius'],
                ['Anna Muylaert', 'Que Horas Ela Volta?'],
                ['Hector Babenco', 'Pixote'],
                ['Giuseppe Tornatore', 'Cinema Paradiso'],
                ['Peter Jackson', 'O Senhor dos Aneis'],
                ['Lana Wachowski', 'Matrix'],
                ['Quentin Tarantino', 'Pulp Fiction'],
                ['Robert Zemeckis', 'Forrest Gump'],
                ['Francis Ford Coppola', 'O Poderoso Chefao'],
                ['Todd Phillips', 'Coringa'],
                ['Bong Joon-ho', 'Parasita'],
                ['Guillermo del Toro', 'O Labirinto do Fauno'],
                ['Jean-Pierre Jeunet', 'Amelie Poulain'],
                ['Christopher Nolan', 'A Origem'],
                ['Christopher Nolan', 'Interestelar'],
                ['Pedro Almodovar', 'Sem filme cadastrado']
              ]
            }
          },
          {
            prompt: 'Conte quantos filmes cada diretor tem (incluindo zero). Retorne <code>nome</code> e <code>qtd</code>. Use <code>COALESCE(qtd, 0)</code> NÃO é necessário porque COUNT já retorna 0 — mas use <code>IFNULL</code> em outro contexto: filtre só diretores cujo <code>ano_nascimento</code> NÃO é NULL. Retorne nome e ano_nascimento.',
            hint: 'Use WHERE ano_nascimento IS NOT NULL',
            solution: 'SELECT nome, ano_nascimento FROM diretores WHERE ano_nascimento IS NOT NULL ORDER BY ano_nascimento;',
            expected: {
              orderMatters: true,
              columns: ['nome', 'ano_nascimento'],
              rows: [
                ['Francis Ford Coppola', 1939],
                ['Hector Babenco', 1946],
                ['Pedro Almodovar', 1949],
                ['Robert Zemeckis', 1951],
                ['Guel Arraes', 1953],
                ['Jean-Pierre Jeunet', 1953],
                ['Fernando Meirelles', 1955],
                ['Giuseppe Tornatore', 1956],
                ['Walter Salles', 1956],
                ['Peter Jackson', 1961],
                ['Quentin Tarantino', 1963],
                ['Anna Muylaert', 1964],
                ['Guillermo del Toro', 1964],
                ['Lana Wachowski', 1965],
                ['Jose Padilha', 1967],
                ['Kleber Mendonca Filho', 1968],
                ['Bong Joon-ho', 1969],
                ['Christopher Nolan', 1970],
                ['Todd Phillips', 1970]
              ]
            }
          }
        ]
      }
    ]
  },

  // =========================================================
  // MÓDULO 8 — QUERIES COMPLEXAS (Subqueries, CTEs, Window Functions)
  // =========================================================
  {
    id: 'M8',
    title: 'Queries Complexas',
    lessons: [

      {
        id: '8.1',
        title: 'Subqueries — query dentro de query',
        tabelas: ['filmes', 'diretores'],
        theory: `
          <p>Uma <strong>subquery</strong> é uma query <em>dentro</em> de outra query. O resultado da subquery vira input pra query externa.</p>

          <h2>Subquery escalar (retorna 1 valor)</h2>
          <p>Use quando você quer comparar com um valor calculado:</p>
          <pre><code>-- Filmes com nota acima da média geral
SELECT titulo, nota
FROM filmes
WHERE nota > (SELECT AVG(nota) FROM filmes);</code></pre>

          <p>O SQL primeiro executa a subquery (resultado: 8.365). Depois usa esse valor como se fosse <code>WHERE nota > 8.365</code>.</p>

          <h2>Subquery de lista (retorna várias linhas) — IN</h2>
          <pre><code>-- Diretores que dirigiram pelo menos um filme
SELECT nome
FROM diretores
WHERE id IN (SELECT DISTINCT diretor_id FROM filmes);</code></pre>

          <h2>Subquery EXISTS — testa se há linhas</h2>
          <pre><code>SELECT nome FROM diretores d
WHERE EXISTS (
  SELECT 1 FROM filmes f WHERE f.diretor_id = d.id
);</code></pre>
          <p>EXISTS é mais eficiente que IN em alguns casos (banco para na primeira linha que bate).</p>

          <h2>Subquery NOT IN — "que NÃO estão na lista"</h2>
          <pre><code>-- Diretores SEM filmes (alternativa ao LEFT JOIN IS NULL)
SELECT nome FROM diretores
WHERE id NOT IN (SELECT diretor_id FROM filmes WHERE diretor_id IS NOT NULL);</code></pre>

          <div class="callout warning">
            <div class="callout-title">NOT IN tem pegadinha com NULL</div>
            <p style="margin:0">Se a subquery do <code>NOT IN</code> retornar QUALQUER NULL, o resultado fica vazio. Sempre filtre NULLs na subquery: <code>NOT IN (SELECT col FROM ... WHERE col IS NOT NULL)</code>. Por isso muita gente prefere LEFT JOIN + IS NULL.</p>
          </div>

          <h2>Quando usar?</h2>
          <p>Subqueries são úteis quando você precisa de um valor que depende de outra query. Mas frequentemente JOIN ou CTE (próxima aula) é mais legível. Use subquery escalar livremente; pense duas vezes antes de subquery de lista — JOIN costuma ser mais claro.</p>
        `,
        exercises: [
          {
            prompt: 'Liste <code>titulo</code> e <code>nota</code> dos filmes com nota <strong>acima da média geral</strong>. Use subquery escalar.',
            hint: 'WHERE nota > (SELECT AVG(nota) FROM filmes)',
            solution: 'SELECT titulo, nota FROM filmes WHERE nota > (SELECT AVG(nota) FROM filmes);',
            expected: {
              orderMatters: false,
              columns: ['titulo', 'nota'],
              rows: [
                ['Cidade de Deus', 8.6],
                ['O Auto da Compadecida', 8.4],
                ['Cinema Paradiso', 8.5],
                ['O Senhor dos Aneis', 8.8],
                ['Matrix', 8.7],
                ['Pulp Fiction', 8.9],
                ['Forrest Gump', 8.8],
                ['O Poderoso Chefao', 9.2],
                ['Coringa', 8.4],
                ['Parasita', 8.5],
                ['A Origem', 8.8],
                ['Interestelar', 8.7]
              ]
            }
          },
          {
            prompt: 'Encontre o <code>titulo</code> do filme com a maior nota da tabela. Use subquery escalar com MAX.',
            hint: 'WHERE nota = (SELECT MAX(nota) FROM filmes)',
            solution: 'SELECT titulo FROM filmes WHERE nota = (SELECT MAX(nota) FROM filmes);',
            expected: {
              orderMatters: false,
              columns: ['titulo'],
              rows: [['O Poderoso Chefao']]
            }
          },
          {
            prompt: 'Liste o <code>nome</code> dos diretores que dirigiram pelo menos um filme. Use subquery com <code>IN</code>.',
            hint: 'WHERE id IN (SELECT DISTINCT diretor_id FROM filmes)',
            solution: 'SELECT nome FROM diretores WHERE id IN (SELECT DISTINCT diretor_id FROM filmes);',
            expected: {
              orderMatters: false,
              columns: ['nome'],
              rows: [
                ['Fernando Meirelles'], ['Jose Padilha'], ['Walter Salles'],
                ['Guel Arraes'], ['Kleber Mendonca Filho'], ['Anna Muylaert'],
                ['Hector Babenco'], ['Giuseppe Tornatore'], ['Peter Jackson'],
                ['Lana Wachowski'], ['Quentin Tarantino'], ['Robert Zemeckis'],
                ['Francis Ford Coppola'], ['Todd Phillips'], ['Bong Joon-ho'],
                ['Guillermo del Toro'], ['Jean-Pierre Jeunet'], ['Christopher Nolan']
              ]
            }
          }
        ]
      },

      {
        id: '8.2',
        title: 'CTEs com WITH — quebrando queries em passos',
        tabelas: ['filmes', 'diretores'],
        theory: `
          <p>Quando uma query fica grande e aninhada, vira <em>spaghetti</em>. CTEs (Common Table Expressions) deixam você quebrar a query em <strong>passos nomeados</strong> que ficam claros.</p>

          <h2>Sintaxe</h2>
          <pre><code>WITH nome_da_cte AS (
  SELECT ...
  FROM ...
)
SELECT ... FROM nome_da_cte;</code></pre>

          <p>A CTE existe SÓ dentro da query. Você usa o nome como se fosse uma tabela.</p>

          <h2>Exemplo: refazendo um IN com CTE</h2>
          <pre><code>WITH diretores_ativos AS (
  SELECT DISTINCT diretor_id FROM filmes
)
SELECT d.nome
FROM diretores d
JOIN diretores_ativos a ON d.id = a.diretor_id;</code></pre>

          <h2>Múltiplas CTEs encadeadas</h2>
          <pre><code>WITH
  stats_por_pais AS (
    SELECT pais, COUNT(*) AS qtd, AVG(nota) AS nota_media
    FROM filmes GROUP BY pais
  ),
  top_paises AS (
    SELECT pais FROM stats_por_pais WHERE qtd >= 2
  )
SELECT s.*
FROM stats_por_pais s
JOIN top_paises t ON s.pais = t.pais;</code></pre>

          <p>Cada CTE é um "passo". Você pode referenciar uma CTE anterior na próxima.</p>

          <h2>CTE vs Subquery — qual escolher?</h2>
          <table class="theory-table">
            <thead><tr><th></th><th>Subquery</th><th>CTE</th></tr></thead>
            <tbody>
              <tr><td>Legibilidade</td><td>Pior em queries grandes</td><td>Melhor — cada passo nomeado</td></tr>
              <tr><td>Reutilização</td><td>Precisa repetir o código</td><td>Define uma vez, usa várias</td></tr>
              <tr><td>Debugging</td><td>Difícil — tudo aninhado</td><td>Fácil — pode testar cada CTE isolada</td></tr>
            </tbody>
          </table>

          <div class="callout tip">
            <div class="callout-title">Pra resolver o seu case</div>
            <p style="margin:0">A Pergunta 2 pede uma "tabela temporária" — CTE é exatamente isso. Você vai usar WITH no capstone.</p>
          </div>
        `,
        exercises: [
          {
            prompt: 'Usando CTE: defina <code>filmes_top</code> como filmes com nota >= 8.5. Depois, no SELECT principal, retorne <code>titulo</code> e <code>nota</code> dessa CTE. Ordene por nota DESC, desempate por título.',
            hint: 'WITH filmes_top AS (SELECT titulo, nota FROM filmes WHERE nota >= 8.5) SELECT * FROM filmes_top ORDER BY nota DESC, titulo ASC',
            solution: 'WITH filmes_top AS (SELECT titulo, nota FROM filmes WHERE nota >= 8.5) SELECT titulo, nota FROM filmes_top ORDER BY nota DESC, titulo ASC;',
            expected: {
              orderMatters: true,
              columns: ['titulo', 'nota'],
              rows: [
                ['O Poderoso Chefao', 9.2],
                ['Pulp Fiction', 8.9],
                ['A Origem', 8.8],
                ['Forrest Gump', 8.8],
                ['O Senhor dos Aneis', 8.8],
                ['Interestelar', 8.7],
                ['Matrix', 8.7],
                ['Cidade de Deus', 8.6],
                ['Cinema Paradiso', 8.5],
                ['Parasita', 8.5]
              ]
            }
          },
          {
            prompt: 'Use uma CTE chamada <code>contagem</code> que conta filmes por diretor (incluindo zero). Depois, no SELECT principal, mostre só os diretores com 2+ filmes. Retorne <code>nome</code> e <code>qtd</code>, ordenado por qtd DESC, desempate por nome.',
            hint: 'WITH contagem AS (SELECT d.nome, COUNT(f.id) AS qtd FROM diretores d LEFT JOIN filmes f ON d.id = f.diretor_id GROUP BY d.id, d.nome) SELECT * FROM contagem WHERE qtd >= 2',
            solution: 'WITH contagem AS (SELECT d.nome, COUNT(f.id) AS qtd FROM diretores d LEFT JOIN filmes f ON d.id = f.diretor_id GROUP BY d.id, d.nome) SELECT nome, qtd FROM contagem WHERE qtd >= 2 ORDER BY qtd DESC, nome ASC;',
            expected: {
              orderMatters: true,
              columns: ['nome', 'qtd'],
              rows: [
                ['Christopher Nolan', 2],
                ['Kleber Mendonca Filho', 2]
              ]
            }
          }
        ]
      },

      {
        id: '8.3',
        title: 'Window Functions — vendo "janelas" de linhas',
        tabelas: ['filmes'],
        theory: `
          <p>GROUP BY <strong>colapsa</strong> linhas em uma só por grupo. Window functions são diferentes: <strong>cada linha permanece</strong>, mas você adiciona uma coluna calculada vendo as linhas "vizinhas" — uma <em>janela</em> de linhas.</p>

          <h2>Sintaxe básica</h2>
          <pre><code>SELECT
  titulo,
  nota,
  ROW_NUMBER() OVER (ORDER BY nota DESC) AS posicao
FROM filmes;</code></pre>

          <p>Resultado: cada filme com o número da sua posição no ranking de notas. Sem colapsar linhas.</p>

          <h2>As funções principais</h2>
          <ul>
            <li><code>ROW_NUMBER()</code> — número sequencial único (1, 2, 3, ...). Em empate, ainda assim números diferentes.</li>
            <li><code>RANK()</code> — em empate, mesmo número e depois <strong>pula</strong> (1, 2, 2, 4, ...).</li>
            <li><code>DENSE_RANK()</code> — em empate, mesmo número mas <strong>não pula</strong> (1, 2, 2, 3, ...).</li>
            <li><code>SUM/AVG/COUNT() OVER (...)</code> — agregados acumulados ou por janela.</li>
            <li><code>LAG(col, n)</code> / <code>LEAD(col, n)</code> — valor da linha N posições antes / depois.</li>
          </ul>

          <h2>PARTITION BY — separando em grupos</h2>
          <p>Sem PARTITION BY, a janela é toda a tabela. Com PARTITION BY, recomeça a contagem dentro de cada grupo:</p>
          <pre><code>SELECT
  genero,
  titulo,
  nota,
  ROW_NUMBER() OVER (
    PARTITION BY genero
    ORDER BY nota DESC
  ) AS rank_no_genero
FROM filmes;</code></pre>

          <p>Pra cada <code>genero</code>, ROW_NUMBER reinicia em 1. Resultado: ranking de filmes <em>dentro de cada gênero</em>.</p>

          <h2>O padrão "TOP N por grupo"</h2>
          <p>Uma das aplicações mais comuns: pegar os N melhores de cada categoria.</p>
          <pre><code>WITH ranked AS (
  SELECT
    titulo, genero, nota,
    ROW_NUMBER() OVER (PARTITION BY genero ORDER BY nota DESC) AS rn
  FROM filmes
)
SELECT titulo, genero, nota FROM ranked WHERE rn = 1;</code></pre>
          <p>Retorna o <strong>melhor filme de cada gênero</strong>. Usando WHERE rn <= 3 daria os 3 melhores de cada.</p>

          <div class="callout tip">
            <div class="callout-title">Diferença visual: GROUP BY vs Window</div>
            <p style="margin:0"><code>SELECT genero, AVG(nota) FROM filmes GROUP BY genero</code> → 1 linha por gênero (colapsado).<br>
            <code>SELECT titulo, genero, AVG(nota) OVER (PARTITION BY genero) FROM filmes</code> → 20 linhas (cada filme), cada uma com a média do seu gênero.</p>
          </div>
        `,
        exercises: [
          {
            prompt: 'Atribua um número de ranking a cada filme baseado na nota (do maior pro menor). Retorne <code>titulo</code>, <code>nota</code> e <code>posicao</code>. Em empate, desempate por título alfabético. Ordene por posição.',
            hint: 'ROW_NUMBER() OVER (ORDER BY nota DESC, titulo ASC) AS posicao',
            solution: 'SELECT titulo, nota, ROW_NUMBER() OVER (ORDER BY nota DESC, titulo ASC) AS posicao FROM filmes ORDER BY posicao;',
            expected: {
              orderMatters: true,
              columns: ['titulo', 'nota', 'posicao'],
              rows: [
                ['O Poderoso Chefao', 9.2, 1],
                ['Pulp Fiction', 8.9, 2],
                ['A Origem', 8.8, 3],
                ['Forrest Gump', 8.8, 4],
                ['O Senhor dos Aneis', 8.8, 5],
                ['Interestelar', 8.7, 6],
                ['Matrix', 8.7, 7],
                ['Cidade de Deus', 8.6, 8],
                ['Cinema Paradiso', 8.5, 9],
                ['Parasita', 8.5, 10],
                ['Coringa', 8.4, 11],
                ['O Auto da Compadecida', 8.4, 12],
                ['Amelie Poulain', 8.3, 13],
                ['O Labirinto do Fauno', 8.2, 14],
                ['Central do Brasil', 8, 15],
                ['Tropa de Elite', 8, 16],
                ['Pixote', 7.9, 17],
                ['Que Horas Ela Volta?', 7.7, 18],
                ['Bacurau', 7.5, 19],
                ['Aquarius', 7.4, 20]
              ]
            }
          },
          {
            prompt: 'Pra cada filme, mostre <code>titulo</code>, <code>genero</code> e <code>rank_genero</code> (ranking DENTRO do gênero por nota DESC, desempate por titulo ASC). Ordene por gênero ASC, depois rank ASC.',
            hint: 'ROW_NUMBER() OVER (PARTITION BY genero ORDER BY nota DESC, titulo ASC) AS rank_genero',
            solution: 'SELECT titulo, genero, ROW_NUMBER() OVER (PARTITION BY genero ORDER BY nota DESC, titulo ASC) AS rank_genero FROM filmes ORDER BY genero ASC, rank_genero ASC;',
            expected: {
              orderMatters: true,
              columns: ['titulo', 'genero', 'rank_genero'],
              rows: [
                ['Tropa de Elite', 'Acao', 1],
                ['O Auto da Compadecida', 'Comedia', 1],
                ['Amelie Poulain', 'Comedia', 2],
                ['O Poderoso Chefao', 'Crime', 1],
                ['Pulp Fiction', 'Crime', 2],
                ['Forrest Gump', 'Drama', 1],
                ['Cidade de Deus', 'Drama', 2],
                ['Cinema Paradiso', 'Drama', 3],
                ['Coringa', 'Drama', 4],
                ['Central do Brasil', 'Drama', 5],
                ['Pixote', 'Drama', 6],
                ['Que Horas Ela Volta?', 'Drama', 7],
                ['Aquarius', 'Drama', 8],
                ['O Senhor dos Aneis', 'Fantasia', 1],
                ['O Labirinto do Fauno', 'Fantasia', 2],
                ['A Origem', 'Ficcao', 1],
                ['Interestelar', 'Ficcao', 2],
                ['Matrix', 'Ficcao', 3],
                ['Parasita', 'Suspense', 1],
                ['Bacurau', 'Suspense', 2]
              ]
            }
          }
        ]
      },

      {
        id: '8.4',
        title: 'Padrão "TOP N por grupo" — combinando tudo',
        tabelas: ['filmes'],
        theory: `
          <p>Esse é um dos padrões mais úteis em análise de dados, e cai em entrevista o tempo todo:</p>
          <p><em>"Pra cada categoria X, encontre o melhor item de Y."</em></p>

          <h2>Exemplos no mundo real</h2>
          <ul>
            <li>Melhor vendedor de cada região (vendas)</li>
            <li>Produto mais vendido em cada loja (varejo)</li>
            <li>Filme mais bem avaliado em cada gênero (nosso exemplo)</li>
            <li><strong>Link mais vendido por cada executivo</strong> ← Pergunta 3 do seu case!</li>
          </ul>

          <h2>A receita</h2>
          <ol>
            <li>Use <code>ROW_NUMBER() OVER (PARTITION BY categoria ORDER BY metrica DESC)</code> numa CTE</li>
            <li>Filtre <code>WHERE rn = 1</code> (ou <code>rn &lt;= N</code> pra top N)</li>
          </ol>

          <pre><code>WITH ranked AS (
  SELECT
    titulo,
    genero,
    nota,
    ROW_NUMBER() OVER (PARTITION BY genero ORDER BY nota DESC, titulo ASC) AS rn
  FROM filmes
)
SELECT titulo, genero, nota
FROM ranked
WHERE rn = 1;</code></pre>

          <h2>Por que precisa do desempate?</h2>
          <p>Se 2 filmes empatam em nota dentro do mesmo gênero (ex: A Origem e Interestelar têm nota próxima), <code>ROW_NUMBER</code> escolheria <em>arbitrariamente</em>. Sempre inclua um desempate (titulo ASC) pra ter ordem determinística.</p>

          <h2>RANK vs ROW_NUMBER no padrão TOP N</h2>
          <p>Se você quer "todos os filmes empatados na 1ª posição", use <code>RANK()</code> em vez de <code>ROW_NUMBER()</code>. <code>RANK</code> dá 1 a empatados; <code>ROW_NUMBER</code> dá números diferentes (1, 2, ...) arbitrariamente.</p>

          <div class="callout tip">
            <div class="callout-title">Capstone à vista</div>
            <p style="margin:0">Esse padrão é exatamente a Pergunta 3 do seu case. Você já consegue resolver — basta substituir "filmes" pelas suas tabelas e "genero" por "codigo_executivo".</p>
          </div>
        `,
        exercises: [
          {
            prompt: 'Encontre o filme com a maior nota em CADA gênero. Retorne <code>genero</code>, <code>titulo</code> e <code>nota</code>. Em caso de empate na nota, escolha o titulo ASC primeiro. Ordene o resultado por gênero ASC.',
            hint: 'CTE com ROW_NUMBER() OVER (PARTITION BY genero ORDER BY nota DESC, titulo ASC) → WHERE rn = 1',
            solution: 'WITH ranked AS (SELECT genero, titulo, nota, ROW_NUMBER() OVER (PARTITION BY genero ORDER BY nota DESC, titulo ASC) AS rn FROM filmes) SELECT genero, titulo, nota FROM ranked WHERE rn = 1 ORDER BY genero ASC;',
            expected: {
              orderMatters: true,
              columns: ['genero', 'titulo', 'nota'],
              rows: [
                ['Acao', 'Tropa de Elite', 8],
                ['Comedia', 'O Auto da Compadecida', 8.4],
                ['Crime', 'O Poderoso Chefao', 9.2],
                ['Drama', 'Forrest Gump', 8.8],
                ['Fantasia', 'O Senhor dos Aneis', 8.8],
                ['Ficcao', 'A Origem', 8.8],
                ['Suspense', 'Parasita', 8.5]
              ]
            }
          },
          {
            prompt: 'Encontre os 2 filmes mais bem avaliados em CADA país. Retorne <code>pais</code>, <code>titulo</code>, <code>nota</code> e a posição. Desempate por titulo ASC. Ordene por país ASC, depois posição ASC.',
            hint: 'PARTITION BY pais + rn <= 2',
            solution: 'WITH ranked AS (SELECT pais, titulo, nota, ROW_NUMBER() OVER (PARTITION BY pais ORDER BY nota DESC, titulo ASC) AS rn FROM filmes) SELECT pais, titulo, nota, rn FROM ranked WHERE rn <= 2 ORDER BY pais ASC, rn ASC;',
            expected: {
              orderMatters: true,
              columns: ['pais', 'titulo', 'nota', 'rn'],
              rows: [
                ['Brasil', 'Cidade de Deus', 8.6, 1],
                ['Brasil', 'O Auto da Compadecida', 8.4, 2],
                ['Coreia', 'Parasita', 8.5, 1],
                ['EUA', 'O Poderoso Chefao', 9.2, 1],
                ['EUA', 'Pulp Fiction', 8.9, 2],
                ['Espanha', 'O Labirinto do Fauno', 8.2, 1],
                ['Franca', 'Amelie Poulain', 8.3, 1],
                ['Italia', 'Cinema Paradiso', 8.5, 1]
              ]
            }
          }
        ]
      }
    ]
  },

  // =========================================================
  // MÓDULO 9 — CAPSTONE: RESOLVENDO O CASE REAL
  // =========================================================
  {
    id: 'M9',
    title: 'Capstone — Case Real',
    lessons: [

      {
        id: '9.1',
        title: 'Pergunta 1 — Ranking de executivos por mês',
        tabelas: ['tb_termos', 'tb_codigo_link', 'tb_hierarquia'],
        theory: `
          <p>Esta é a primeira pergunta do seu case real. Vamos resolver passo a passo — sem IA, usando só o que você aprendeu nos módulos anteriores.</p>

          <h2>O enunciado</h2>
          <blockquote style="border-left:3px solid var(--primary);padding:10px 16px;background:var(--surface-2);margin:12px 0;font-style:italic">
            "Criar um ranking com nome dos executivos com mais termos por mês, em ordem decrescente. Retorne o ano/mês da venda e o valor total por mês."
          </blockquote>

          <h2>Quebrando em partes (a mais importante das habilidades)</h2>
          <ol>
            <li><strong>"nome dos executivos"</strong> → JOIN com <code>tb_hierarquia</code> pra pegar o nome.</li>
            <li><strong>"mais termos"</strong> → <code>COUNT(*)</code> de <code>tb_termos</code>.</li>
            <li><strong>"por mês"</strong> → <code>GROUP BY</code> incluindo <code>STRFTIME('%Y-%m', data_termo)</code>.</li>
            <li><strong>"em ordem decrescente"</strong> → <code>ORDER BY qtd_termos DESC</code>.</li>
            <li><strong>"valor total por mês"</strong> → <code>SUM(tpv_negociado)</code>, então JOIN com <code>tb_codigo_link</code>.</li>
          </ol>

          <h2>O esqueleto da query</h2>
          <pre><code>SELECT
  h.nome_executivo,
  STRFTIME('%Y-%m', t.data_termo) AS ano_mes,
  COUNT(*)                        AS qtd_termos,
  SUM(l.tpv_negociado)            AS tpv_total
FROM tb_termos t
JOIN tb_hierarquia   h ON t.codigo_executivo = h.codigo_executivo
JOIN tb_codigo_link  l ON t.codigo_link       = l.codigo_link
GROUP BY h.codigo_executivo, h.nome_executivo, ano_mes
ORDER BY qtd_termos DESC, ano_mes ASC, h.nome_executivo ASC;</code></pre>

          <h2>Por que o GROUP BY tem 3 colunas?</h2>
          <p><strong>Regra de ouro</strong>: toda coluna no SELECT que NÃO é agregada (COUNT/SUM/AVG) precisa estar no GROUP BY. Aqui temos <code>nome_executivo</code> e <code>ano_mes</code> não-agregados, então ambos no GROUP BY. <code>codigo_executivo</code> também entra pra evitar problema se 2 executivos tiverem mesmo nome.</p>

          <div class="callout tip">
            <div class="callout-title">Antes de olhar a solução, tente</div>
            <p style="margin:0">Pegue papel e caneta. Escreva a query INTEIRA do zero antes de tentar no editor. Quando estiver convicto, transcreve. Se errar, releia o que você escreveu — quase sempre é uma cláusula faltando ou nome de coluna trocado. Esse é o caminho pra autonomia.</p>
          </div>
        `,
        exercises: [
          {
            prompt: 'Resolva a Pergunta 1. Retorne <code>nome_executivo</code>, <code>ano_mes</code> (formato AAAA-MM), <code>qtd_termos</code> e <code>tpv_total</code>. Ordenado por <code>qtd_termos</code> DESC, <code>ano_mes</code> ASC, <code>nome_executivo</code> ASC.',
            hint: 'JOIN das 3 tabelas + STRFTIME + GROUP BY + ORDER BY',
            solution: "SELECT h.nome_executivo, STRFTIME('%Y-%m', t.data_termo) AS ano_mes, COUNT(*) AS qtd_termos, SUM(l.tpv_negociado) AS tpv_total FROM tb_termos t JOIN tb_hierarquia h ON t.codigo_executivo = h.codigo_executivo JOIN tb_codigo_link l ON t.codigo_link = l.codigo_link GROUP BY h.codigo_executivo, h.nome_executivo, ano_mes ORDER BY qtd_termos DESC, ano_mes ASC, h.nome_executivo ASC;",
            expected: {
              orderMatters: true,
              columns: ['nome_executivo', 'ano_mes', 'qtd_termos', 'tpv_total'],
              rows: [
                ['Executivo 555', '2025-01', 4, 27000],
                ['Teste',         '2025-01', 4, 37000],
                ['Executivo 128', '2025-01', 1, 7000]
              ]
            }
          }
        ]
      },

      {
        id: '9.2',
        title: 'Pergunta 2 — Tabela combinada com várias métricas',
        tabelas: ['tb_termos', 'tb_codigo_link', 'tb_hierarquia'],
        theory: `
          <p>A Pergunta 2 do seu case é a mais complexa. Pede uma tabela com 9 colunas por executivo, combinando agregação + CASE WHEN + datas formatadas. Vamos quebrar.</p>

          <h2>O enunciado</h2>
          <blockquote style="border-left:3px solid var(--primary);padding:10px 16px;background:var(--surface-2);margin:12px 0;font-style:italic">
            Criar uma tabela contendo: Código do Executivo, Nome do executivo, Carteira (se carteira "A Plus" chamar de A, senão o nome da carteira), Coordenador, Quantidade total de termos, Quantidade total de links (distintos), Quantidade vendida entre 12/01/2025 e 28/01/2025, Data do primeiro e último termo (formato DD/MM/YYYY).
          </blockquote>

          <h2>Quebrando em 9 partes</h2>
          <ol>
            <li><code>codigo_executivo</code> — coluna direta de <code>tb_hierarquia</code></li>
            <li><code>nome_executivo</code> — direta</li>
            <li><code>carteira_normalizada</code> — <code>CASE WHEN carteira = 'A Plus' THEN 'A' ELSE carteira END</code></li>
            <li><code>coordenador</code> — direta</li>
            <li><code>qtd_termos</code> — <code>COUNT(*)</code> de tb_termos</li>
            <li><code>qtd_links_distintos</code> — <code>COUNT(DISTINCT codigo_link)</code></li>
            <li><code>qtd_periodo</code> — <code>SUM(CASE WHEN data_termo BETWEEN '2025-01-12' AND '2025-01-28' THEN 1 ELSE 0 END)</code></li>
            <li><code>primeiro_termo</code> — <code>STRFTIME('%d/%m/%Y', MIN(data_termo))</code></li>
            <li><code>ultimo_termo</code> — <code>STRFTIME('%d/%m/%Y', MAX(data_termo))</code></li>
          </ol>

          <h2>A estratégia: CTE pra organizar</h2>
          <p>Pra ficar legível, calcule as métricas de <code>tb_termos</code> numa CTE, depois JOIN com <code>tb_hierarquia</code> pra pegar os dados pessoais.</p>

          <pre><code>WITH stats AS (
  SELECT
    codigo_executivo,
    COUNT(*)                                    AS qtd_termos,
    COUNT(DISTINCT codigo_link)                  AS qtd_links_distintos,
    SUM(CASE WHEN data_termo BETWEEN '2025-01-12' AND '2025-01-28'
             THEN 1 ELSE 0 END)                  AS qtd_periodo,
    STRFTIME('%d/%m/%Y', MIN(data_termo))        AS primeiro_termo,
    STRFTIME('%d/%m/%Y', MAX(data_termo))        AS ultimo_termo
  FROM tb_termos
  GROUP BY codigo_executivo
)
SELECT
  h.codigo_executivo,
  h.nome_executivo,
  CASE WHEN h.carteira = 'A Plus' THEN 'A' ELSE h.carteira END AS carteira,
  h.coordenador,
  s.qtd_termos,
  s.qtd_links_distintos,
  s.qtd_periodo,
  s.primeiro_termo,
  s.ultimo_termo
FROM tb_hierarquia h
JOIN stats s ON h.codigo_executivo = s.codigo_executivo;</code></pre>

          <div class="callout tip">
            <div class="callout-title">Atenção: SUM com CASE WHEN</div>
            <p style="margin:0">O padrão <code>SUM(CASE WHEN cond THEN 1 ELSE 0 END)</code> conta linhas que satisfazem uma condição DENTRO de um GROUP BY. Equivalente a <code>COUNT</code> condicional. Memorize — vai usar muito.</p>
          </div>
        `,
        exercises: [
          {
            prompt: 'Resolva a Pergunta 2 completa. Retorne as 9 colunas exatamente como descritas: <code>codigo_executivo</code>, <code>nome_executivo</code>, <code>carteira</code>, <code>coordenador</code>, <code>qtd_termos</code>, <code>qtd_links_distintos</code>, <code>qtd_periodo</code>, <code>primeiro_termo</code>, <code>ultimo_termo</code>.',
            hint: 'Use uma CTE com stats por executivo, depois JOIN com tb_hierarquia.',
            solution: "WITH stats AS (SELECT codigo_executivo, COUNT(*) AS qtd_termos, COUNT(DISTINCT codigo_link) AS qtd_links_distintos, SUM(CASE WHEN data_termo BETWEEN '2025-01-12' AND '2025-01-28' THEN 1 ELSE 0 END) AS qtd_periodo, STRFTIME('%d/%m/%Y', MIN(data_termo)) AS primeiro_termo, STRFTIME('%d/%m/%Y', MAX(data_termo)) AS ultimo_termo FROM tb_termos GROUP BY codigo_executivo) SELECT h.codigo_executivo, h.nome_executivo, CASE WHEN h.carteira = 'A Plus' THEN 'A' ELSE h.carteira END AS carteira, h.coordenador, s.qtd_termos, s.qtd_links_distintos, s.qtd_periodo, s.primeiro_termo, s.ultimo_termo FROM tb_hierarquia h JOIN stats s ON h.codigo_executivo = s.codigo_executivo;",
            expected: {
              orderMatters: false,
              columns: ['codigo_executivo', 'nome_executivo', 'carteira', 'coordenador', 'qtd_termos', 'qtd_links_distintos', 'qtd_periodo', 'primeiro_termo', 'ultimo_termo'],
              rows: [
                [123, 'Teste',         'A',  'Coordenador A1', 4, 2, 3, '01/01/2025', '25/01/2025'],
                [555, 'Executivo 555', 'B1', 'Coordenador B1', 4, 3, 4, '15/01/2025', '28/01/2025'],
                [128, 'Executivo 128', 'C2', 'Coordenador C2', 1, 1, 0, '04/01/2025', '04/01/2025']
              ]
            }
          }
        ]
      },

      {
        id: '9.3',
        title: 'Pergunta 3 — Link mais vendido por executivo',
        tabelas: ['tb_termos', 'tb_codigo_link', 'tb_hierarquia'],
        theory: `
          <p>A Pergunta 3 é o padrão <strong>"TOP 1 por grupo"</strong> que você aprendeu em M8.4. Vamos aplicar nas suas tabelas reais.</p>

          <h2>O enunciado</h2>
          <blockquote style="border-left:3px solid var(--primary);padding:10px 16px;background:var(--surface-2);margin:12px 0;font-style:italic">
            "Identificar o link mais vendido (em quantidade) por cada executivo. Exibir nome do executivo, código do link e quantidade de vendas."
          </blockquote>

          <h2>Estratégia em 2 passos com CTEs</h2>
          <ol>
            <li><strong>CTE 1</strong>: Contar quantas vendas cada par (executivo, link) tem.</li>
            <li><strong>CTE 2</strong>: Adicionar <code>ROW_NUMBER()</code> particionando por executivo e ordenando por qtd_vendas DESC.</li>
            <li><strong>SELECT final</strong>: Filtrar <code>WHERE rn = 1</code> pra pegar só o top de cada.</li>
          </ol>

          <pre><code>WITH vendas_por_link AS (
  SELECT
    h.codigo_executivo,
    h.nome_executivo,
    l.codigo_link,
    COUNT(*) AS qtd_vendas
  FROM tb_termos t
  JOIN tb_hierarquia  h ON t.codigo_executivo = h.codigo_executivo
  JOIN tb_codigo_link l ON t.codigo_link       = l.codigo_link
  GROUP BY h.codigo_executivo, h.nome_executivo, l.codigo_link
),
ranked AS (
  SELECT
    *,
    ROW_NUMBER() OVER (
      PARTITION BY codigo_executivo
      ORDER BY qtd_vendas DESC, codigo_link ASC
    ) AS rn
  FROM vendas_por_link
)
SELECT nome_executivo, codigo_link, qtd_vendas
FROM ranked
WHERE rn = 1
ORDER BY nome_executivo ASC;</code></pre>

          <h2>Por que o desempate por codigo_link ASC?</h2>
          <p>Se um executivo vendeu 2 links com a mesma quantidade, ROW_NUMBER escolheria arbitrariamente. O <code>ORDER BY ... codigo_link ASC</code> torna a escolha determinística (sempre o menor código). Em entrevista, mencionar isso impressiona.</p>

          <div class="callout tip">
            <div class="callout-title">Você chegou!</div>
            <p style="margin:0">Resolvendo esse exercício, você completou as 3 perguntas do seu case original — sozinho, sem IA. Da próxima vez que aparecer algo parecido, você sabe quebrar em CTEs, aplicar window function, e juntar tudo. <strong>Esse é o objetivo do curso inteiro.</strong></p>
          </div>
        `,
        exercises: [
          {
            prompt: 'Resolva a Pergunta 3. Retorne <code>nome_executivo</code>, <code>codigo_link</code> (o mais vendido por ele) e <code>qtd_vendas</code>. Ordene por <code>nome_executivo</code> ASC.',
            hint: 'Duas CTEs: uma com COUNT, outra com ROW_NUMBER. Filtro final rn = 1.',
            solution: 'WITH vendas_por_link AS (SELECT h.codigo_executivo, h.nome_executivo, l.codigo_link, COUNT(*) AS qtd_vendas FROM tb_termos t JOIN tb_hierarquia h ON t.codigo_executivo = h.codigo_executivo JOIN tb_codigo_link l ON t.codigo_link = l.codigo_link GROUP BY h.codigo_executivo, h.nome_executivo, l.codigo_link), ranked AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY codigo_executivo ORDER BY qtd_vendas DESC, codigo_link ASC) AS rn FROM vendas_por_link) SELECT nome_executivo, codigo_link, qtd_vendas FROM ranked WHERE rn = 1 ORDER BY nome_executivo ASC;',
            expected: {
              orderMatters: true,
              columns: ['nome_executivo', 'codigo_link', 'qtd_vendas'],
              rows: [
                ['Executivo 128', 2, 1],
                ['Executivo 555', 3, 2],
                ['Teste',         1, 3]
              ]
            }
          }
        ]
      }
    ]
  }
];

/** Helper: find a lesson by ID. */
function findLesson(id) {
  for (const m of CURRICULUM) {
    for (const l of m.lessons) {
      if (l.id === id) return { module: m, lesson: l };
    }
  }
  return null;
}

/** Helper: find next/previous lesson. */
function adjacentLessons(currentId) {
  const flat = [];
  for (const m of CURRICULUM) for (const l of m.lessons) flat.push(l);
  const idx = flat.findIndex(l => l.id === currentId);
  return {
    prev: idx > 0 ? flat[idx - 1] : null,
    next: idx < flat.length - 1 ? flat[idx + 1] : null
  };
}

/** Helper: first lesson of the curriculum. */
function firstLesson() {
  return CURRICULUM[0].lessons[0];
}
