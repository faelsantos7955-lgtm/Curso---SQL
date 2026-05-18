/* =========================================================
   Glossário SQL — Enciclopédia + tooltips
   ~55 termos cobrindo comandos, operadores, funções e conceitos.
   ========================================================= */

const GLOSSARY_CATEGORIES = [
  'Comando', 'Cláusula', 'Operador', 'Função', 'JOIN', 'Conceito', 'Tipo de Dado', 'Sintaxe'
];

const GLOSSARY = {

  // ============= COMANDOS =============
  'SELECT': {
    term: 'SELECT',
    category: 'Comando',
    short: 'Escolhe quais colunas retornar de uma consulta.',
    long: 'O comando principal de leitura em SQL. Especifica QUAIS colunas você quer ver no resultado. Usado em toda query que lê dados.',
    syntax: 'SELECT coluna1, coluna2 FROM tabela',
    example: 'SELECT titulo, ano FROM filmes;',
    exampleDesc: 'Lista título e ano de cada filme.',
    seeAlso: ['FROM', 'WHERE', 'DISTINCT', '*']
  },
  'FROM': {
    term: 'FROM',
    category: 'Cláusula',
    short: 'Especifica de qual tabela ler os dados.',
    long: 'Cláusula obrigatória em SELECTs. Indica de qual tabela (ou tabelas) os dados serão consultados.',
    syntax: 'SELECT ... FROM tabela',
    example: 'SELECT titulo FROM filmes;',
    seeAlso: ['SELECT', 'JOIN']
  },
  'WHERE': {
    term: 'WHERE',
    category: 'Cláusula',
    short: 'Filtra quais linhas aparecem no resultado.',
    long: 'Aplica uma condição: apenas linhas que satisfazem a condição entram no resultado. Vem DEPOIS de FROM, antes de ORDER BY.',
    syntax: 'SELECT ... FROM ... WHERE condicao',
    example: "SELECT titulo FROM filmes WHERE ano > 2010;",
    exampleDesc: 'Lista filmes lançados depois de 2010.',
    seeAlso: ['AND', 'OR', 'NOT', 'IN', 'BETWEEN', 'LIKE', 'IS NULL']
  },
  'ORDER BY': {
    term: 'ORDER BY',
    category: 'Cláusula',
    short: 'Ordena o resultado por uma ou mais colunas.',
    long: 'Sem ORDER BY, SQL não garante ordem nenhuma. Use ASC para crescente (padrão) ou DESC para decrescente.',
    syntax: 'ORDER BY coluna [ASC|DESC]',
    example: 'SELECT titulo, nota FROM filmes ORDER BY nota DESC;',
    exampleDesc: 'Filmes do mais bem avaliado pro pior.',
    seeAlso: ['ASC', 'DESC', 'LIMIT']
  },
  'GROUP BY': {
    term: 'GROUP BY',
    category: 'Cláusula',
    short: 'Agrupa linhas com mesmo valor para aplicar funções agregadoras.',
    long: 'Combina linhas que compartilham um valor em uma só, normalmente para usar funções como COUNT, SUM, AVG sobre cada grupo.',
    syntax: 'SELECT col, COUNT(*) FROM tabela GROUP BY col',
    example: 'SELECT genero, COUNT(*) FROM filmes GROUP BY genero;',
    exampleDesc: 'Quantos filmes existem em cada gênero.',
    seeAlso: ['HAVING', 'COUNT', 'SUM', 'AVG']
  },
  'HAVING': {
    term: 'HAVING',
    category: 'Cláusula',
    short: 'Filtra grupos depois do GROUP BY (não linhas individuais).',
    long: 'Funciona como WHERE, mas atua sobre os GRUPOS criados por GROUP BY. WHERE filtra linhas; HAVING filtra grupos.',
    syntax: 'GROUP BY col HAVING agregado > X',
    example: 'SELECT genero, COUNT(*) FROM filmes GROUP BY genero HAVING COUNT(*) > 2;',
    exampleDesc: 'Gêneros com mais de 2 filmes.',
    seeAlso: ['GROUP BY', 'WHERE']
  },
  'LIMIT': {
    term: 'LIMIT',
    category: 'Cláusula',
    short: 'Retorna no máximo N linhas do resultado.',
    long: 'Útil pra "top N" e paginação. Sempre combine com ORDER BY quando a ordem importa.',
    syntax: 'LIMIT n',
    example: 'SELECT titulo FROM filmes ORDER BY nota DESC LIMIT 3;',
    exampleDesc: 'Os 3 filmes mais bem avaliados.',
    seeAlso: ['OFFSET', 'ORDER BY']
  },
  'OFFSET': {
    term: 'OFFSET',
    category: 'Cláusula',
    short: 'Pula as primeiras N linhas — útil para paginação.',
    long: 'Combinado com LIMIT, permite paginação: LIMIT n OFFSET m pula m linhas e retorna n.',
    syntax: 'LIMIT n OFFSET m',
    example: 'SELECT titulo FROM filmes ORDER BY nota DESC LIMIT 5 OFFSET 5;',
    exampleDesc: 'Filmes da posição 6 a 10 no ranking.',
    seeAlso: ['LIMIT']
  },
  'DISTINCT': {
    term: 'DISTINCT',
    category: 'Cláusula',
    short: 'Remove duplicatas do resultado.',
    long: 'Retorna apenas valores únicos. Aplicado logo após SELECT.',
    syntax: 'SELECT DISTINCT coluna FROM tabela',
    example: 'SELECT DISTINCT genero FROM filmes;',
    exampleDesc: 'Cada gênero listado uma única vez.',
    seeAlso: ['SELECT']
  },
  'INSERT': {
    term: 'INSERT',
    category: 'Comando',
    short: 'Adiciona novas linhas a uma tabela.',
    long: 'Comando DML (Data Manipulation Language) que insere registros. Usado para popular tabelas.',
    syntax: 'INSERT INTO tabela (col1, col2) VALUES (val1, val2)',
    example: "INSERT INTO filmes (titulo, ano) VALUES ('Novo Filme', 2026);",
    seeAlso: ['UPDATE', 'DELETE']
  },
  'UPDATE': {
    term: 'UPDATE',
    category: 'Comando',
    short: 'Modifica valores de linhas existentes.',
    long: 'Use sempre com WHERE para não atualizar TUDO. Comando DML.',
    syntax: 'UPDATE tabela SET coluna = valor WHERE condicao',
    example: 'UPDATE filmes SET nota = 9.0 WHERE id = 1;',
    seeAlso: ['INSERT', 'DELETE', 'WHERE']
  },
  'DELETE': {
    term: 'DELETE',
    category: 'Comando',
    short: 'Remove linhas de uma tabela.',
    long: 'Use sempre com WHERE pra não apagar TUDO. Comando DML.',
    syntax: 'DELETE FROM tabela WHERE condicao',
    example: 'DELETE FROM filmes WHERE id = 1;',
    seeAlso: ['INSERT', 'UPDATE']
  },
  'CREATE TABLE': {
    term: 'CREATE TABLE',
    category: 'Comando',
    short: 'Cria uma nova tabela no banco.',
    long: 'Comando DDL (Data Definition Language) que define a estrutura: nome da tabela, colunas e tipos.',
    syntax: 'CREATE TABLE nome (coluna1 TIPO, coluna2 TIPO, ...)',
    example: 'CREATE TABLE filmes (id INTEGER PRIMARY KEY, titulo TEXT);',
    seeAlso: ['DROP TABLE', 'ALTER TABLE']
  },
  'DROP TABLE': {
    term: 'DROP TABLE',
    category: 'Comando',
    short: 'Apaga uma tabela inteira (estrutura + dados).',
    long: 'Comando destrutivo. Geralmente combinado com IF EXISTS para evitar erros.',
    syntax: 'DROP TABLE [IF EXISTS] nome',
    example: 'DROP TABLE IF EXISTS filmes;',
    seeAlso: ['CREATE TABLE', 'DELETE']
  },
  'ALTER TABLE': {
    term: 'ALTER TABLE',
    category: 'Comando',
    short: 'Modifica a estrutura de uma tabela existente.',
    long: 'Adiciona/remove colunas, renomeia, muda tipos. SQLite tem suporte limitado.',
    syntax: 'ALTER TABLE nome ADD COLUMN nova TIPO',
    example: 'ALTER TABLE filmes ADD COLUMN diretor TEXT;',
    seeAlso: ['CREATE TABLE']
  },

  // ============= JOINS =============
  'JOIN': {
    term: 'JOIN',
    category: 'JOIN',
    short: 'Combina linhas de duas tabelas baseado em uma condição.',
    long: 'Sem qualificador, JOIN é equivalente a INNER JOIN — retorna apenas linhas que TÊM correspondência nas duas tabelas.',
    syntax: 'tabela1 JOIN tabela2 ON tabela1.col = tabela2.col',
    example: 'SELECT f.titulo, d.nome FROM filmes f JOIN diretores d ON f.diretor_id = d.id;',
    seeAlso: ['INNER JOIN', 'LEFT JOIN', 'ON']
  },
  'INNER JOIN': {
    term: 'INNER JOIN',
    category: 'JOIN',
    short: 'Apenas linhas com correspondência em AMBAS as tabelas.',
    long: 'A intersecção entre as tabelas. Linhas sem par são excluídas.',
    syntax: 'A INNER JOIN B ON A.col = B.col',
    example: 'FROM filmes f INNER JOIN diretores d ON f.diretor_id = d.id',
    seeAlso: ['JOIN', 'LEFT JOIN', 'RIGHT JOIN']
  },
  'LEFT JOIN': {
    term: 'LEFT JOIN',
    category: 'JOIN',
    short: 'Todas as linhas da tabela esquerda + correspondências da direita.',
    long: 'Mantém TODAS as linhas da tabela esquerda. Linhas sem par na direita recebem NULL nas colunas dela.',
    syntax: 'A LEFT JOIN B ON A.col = B.col',
    example: 'FROM filmes f LEFT JOIN diretores d ON f.diretor_id = d.id',
    exampleDesc: 'Todos os filmes, mesmo os sem diretor cadastrado.',
    seeAlso: ['JOIN', 'INNER JOIN', 'RIGHT JOIN', 'NULL']
  },
  'RIGHT JOIN': {
    term: 'RIGHT JOIN',
    category: 'JOIN',
    short: 'Todas as linhas da tabela direita + correspondências da esquerda.',
    long: 'Espelho do LEFT JOIN. Raramente usado — geralmente prefere-se reescrever como LEFT JOIN trocando a ordem.',
    syntax: 'A RIGHT JOIN B ON A.col = B.col',
    example: 'FROM filmes f RIGHT JOIN diretores d ON f.diretor_id = d.id',
    seeAlso: ['LEFT JOIN', 'JOIN']
  },
  'FULL OUTER JOIN': {
    term: 'FULL OUTER JOIN',
    category: 'JOIN',
    short: 'Todas as linhas de ambas tabelas, com NULL onde não há par.',
    long: 'União completa: linhas sem correspondência em qualquer lado aparecem com NULL.',
    syntax: 'A FULL OUTER JOIN B ON A.col = B.col',
    seeAlso: ['LEFT JOIN', 'JOIN']
  },
  'ON': {
    term: 'ON',
    category: 'Cláusula',
    short: 'Especifica a condição de junção em um JOIN.',
    long: 'Define como duas tabelas se relacionam. Normalmente compara uma chave estrangeira com uma chave primária.',
    syntax: 'JOIN tabela ON condicao',
    example: 'JOIN diretores ON filmes.diretor_id = diretores.id',
    seeAlso: ['JOIN', 'Chave Estrangeira']
  },

  // ============= OPERADORES =============
  'AND': {
    term: 'AND',
    category: 'Operador',
    short: 'Conector lógico: ambas as condições precisam ser verdadeiras.',
    long: 'Se A AND B → resultado verdadeiro só se A E B forem verdadeiros. Tem precedência maior que OR.',
    example: "WHERE pais = 'Brasil' AND ano > 2000",
    seeAlso: ['OR', 'NOT', 'WHERE']
  },
  'OR': {
    term: 'OR',
    category: 'Operador',
    short: 'Conector lógico: pelo menos uma condição precisa ser verdadeira.',
    long: 'Se A OR B → resultado verdadeiro se A OU B for verdadeiro. Tem precedência menor que AND.',
    example: "WHERE genero = 'Drama' OR genero = 'Crime'",
    seeAlso: ['AND', 'NOT', 'IN']
  },
  'NOT': {
    term: 'NOT',
    category: 'Operador',
    short: 'Inverte uma condição (verdadeiro vira falso e vice-versa).',
    long: 'NOT pode prefixar qualquer condição. Comumente vem como NOT IN, NOT LIKE, IS NOT NULL.',
    example: "WHERE NOT pais = 'EUA'  -- equivalente a: WHERE pais <> 'EUA'",
    seeAlso: ['AND', 'OR']
  },
  'IN': {
    term: 'IN',
    category: 'Operador',
    short: 'Verifica se um valor está em uma lista.',
    long: 'Atalho para múltiplos OR. WHERE x IN (1, 2, 3) é o mesmo que WHERE x = 1 OR x = 2 OR x = 3.',
    syntax: 'coluna IN (valor1, valor2, ...)',
    example: "WHERE pais IN ('Brasil', 'Coreia', 'Franca')",
    seeAlso: ['OR', 'BETWEEN']
  },
  'BETWEEN': {
    term: 'BETWEEN',
    category: 'Operador',
    short: 'Verifica se um valor está em um intervalo (inclusivo).',
    long: 'BETWEEN é INCLUSIVO nos dois lados. x BETWEEN A AND B é equivalente a x >= A AND x <= B.',
    syntax: 'coluna BETWEEN valor1 AND valor2',
    example: 'WHERE ano BETWEEN 2000 AND 2010',
    seeAlso: ['IN', 'WHERE']
  },
  'LIKE': {
    term: 'LIKE',
    category: 'Operador',
    short: 'Compara texto usando padrões com curingas.',
    long: 'Curingas: % (qualquer sequência) e _ (exatamente um caractere). Em SQLite, LIKE é case-insensitive por padrão.',
    syntax: "coluna LIKE 'padrão'",
    example: "WHERE titulo LIKE 'O %'  -- títulos que começam com 'O '",
    seeAlso: ['WHERE']
  },
  'IS NULL': {
    term: 'IS NULL',
    category: 'Operador',
    short: 'Verifica se um valor é NULL (ausente).',
    long: 'Você NÃO pode usar = NULL — sempre use IS NULL. NULL não é igual a nada, nem a si mesmo.',
    syntax: 'coluna IS NULL',
    example: 'WHERE telefone IS NULL',
    seeAlso: ['IS NOT NULL', 'NULL', 'COALESCE']
  },
  'IS NOT NULL': {
    term: 'IS NOT NULL',
    category: 'Operador',
    short: 'Verifica se um valor NÃO é NULL.',
    syntax: 'coluna IS NOT NULL',
    example: 'WHERE email IS NOT NULL',
    seeAlso: ['IS NULL', 'NULL']
  },
  '=': {
    term: '=',
    category: 'Operador',
    short: 'Igualdade — verifica se dois valores são iguais.',
    long: 'Em SQL, igualdade é UM sinal de igual (não dois como em Python). Não funciona com NULL — para isso use IS NULL.',
    example: "WHERE ano = 2002",
    seeAlso: ['<>', 'IS NULL']
  },
  '<>': {
    term: '<>',
    category: 'Operador',
    short: 'Diferente — verifica se dois valores NÃO são iguais.',
    long: 'Alguns bancos aceitam != também, mas <> é o padrão SQL.',
    example: "WHERE pais <> 'EUA'",
    seeAlso: ['=', 'NOT']
  },

  // ============= FUNÇÕES AGREGADORAS =============
  'COUNT': {
    term: 'COUNT',
    category: 'Função',
    short: 'Conta quantas linhas existem (ou quantos valores não-nulos).',
    long: 'COUNT(*) conta TODAS as linhas. COUNT(coluna) conta linhas onde a coluna NÃO é NULL.',
    syntax: 'COUNT(*) ou COUNT(coluna)',
    example: 'SELECT COUNT(*) FROM filmes;',
    exampleDesc: 'Quantos filmes existem na tabela.',
    seeAlso: ['SUM', 'AVG', 'GROUP BY']
  },
  'SUM': {
    term: 'SUM',
    category: 'Função',
    short: 'Soma todos os valores de uma coluna numérica.',
    syntax: 'SUM(coluna)',
    example: 'SELECT SUM(duracao_min) FROM filmes;',
    exampleDesc: 'Total de minutos somando todos os filmes.',
    seeAlso: ['AVG', 'COUNT', 'GROUP BY']
  },
  'AVG': {
    term: 'AVG',
    category: 'Função',
    short: 'Calcula a média aritmética de uma coluna numérica.',
    syntax: 'AVG(coluna)',
    example: 'SELECT AVG(nota) FROM filmes;',
    exampleDesc: 'Nota média de todos os filmes.',
    seeAlso: ['SUM', 'COUNT', 'MIN', 'MAX']
  },
  'MIN': {
    term: 'MIN',
    category: 'Função',
    short: 'Retorna o menor valor de uma coluna.',
    syntax: 'MIN(coluna)',
    example: 'SELECT MIN(ano) FROM filmes;',
    exampleDesc: 'O ano mais antigo registrado.',
    seeAlso: ['MAX', 'AVG']
  },
  'MAX': {
    term: 'MAX',
    category: 'Função',
    short: 'Retorna o maior valor de uma coluna.',
    syntax: 'MAX(coluna)',
    example: 'SELECT MAX(nota) FROM filmes;',
    exampleDesc: 'A maior nota da tabela.',
    seeAlso: ['MIN', 'AVG']
  },

  // ============= FUNÇÕES DE STRING =============
  'LOWER': {
    term: 'LOWER',
    category: 'Função',
    short: 'Converte texto para minúsculas.',
    syntax: 'LOWER(texto)',
    example: "SELECT LOWER(titulo) FROM filmes;",
    seeAlso: ['UPPER', 'LIKE']
  },
  'UPPER': {
    term: 'UPPER',
    category: 'Função',
    short: 'Converte texto para maiúsculas.',
    syntax: 'UPPER(texto)',
    example: "SELECT UPPER(pais) FROM filmes;",
    seeAlso: ['LOWER']
  },
  'LENGTH': {
    term: 'LENGTH',
    category: 'Função',
    short: 'Retorna o número de caracteres de uma string.',
    syntax: 'LENGTH(texto)',
    example: "SELECT titulo, LENGTH(titulo) FROM filmes;",
    seeAlso: ['SUBSTR']
  },
  'SUBSTR': {
    term: 'SUBSTR',
    category: 'Função',
    short: 'Extrai parte de uma string.',
    long: 'SUBSTR(texto, inicio, [comprimento]). Em SQL, índices começam em 1.',
    syntax: 'SUBSTR(texto, inicio, comprimento)',
    example: "SELECT SUBSTR(titulo, 1, 3) FROM filmes;",
    exampleDesc: 'Primeiros 3 caracteres de cada título.',
    seeAlso: ['LENGTH']
  },
  'TRIM': {
    term: 'TRIM',
    category: 'Função',
    short: 'Remove espaços (ou caracteres) das pontas de uma string.',
    syntax: 'TRIM(texto)',
    example: "SELECT TRIM('  hello  ')  -- retorna 'hello'",
    seeAlso: ['LENGTH']
  },
  'COALESCE': {
    term: 'COALESCE',
    category: 'Função',
    short: 'Retorna o primeiro argumento que NÃO é NULL.',
    long: 'Útil para fornecer valores padrão quando uma coluna pode ser NULL.',
    syntax: 'COALESCE(valor1, valor2, ...)',
    example: "SELECT COALESCE(telefone, 'sem-telefone') FROM clientes;",
    seeAlso: ['NULL', 'IS NULL']
  },
  'CAST': {
    term: 'CAST',
    category: 'Função',
    short: 'Converte um valor para outro tipo.',
    syntax: 'CAST(valor AS tipo)',
    example: "SELECT CAST(nota AS INTEGER) FROM filmes;",
    exampleDesc: 'Converte nota (REAL) para INTEGER, truncando os decimais.',
    seeAlso: ['INTEGER', 'TEXT', 'REAL']
  },

  // ============= CONCEITOS =============
  'Banco de Dados': {
    term: 'Banco de Dados',
    category: 'Conceito',
    short: 'Conjunto organizado de tabelas relacionadas.',
    long: 'Sistema que armazena, organiza e permite consultar grande volume de dados. Exemplos: MySQL, PostgreSQL, SQLite, SQL Server.',
    seeAlso: ['Tabela', 'Schema']
  },
  'Tabela': {
    term: 'Tabela',
    category: 'Conceito',
    short: 'Estrutura tipo planilha que guarda dados em linhas e colunas.',
    long: 'Cada tabela representa uma entidade (ex: filmes, clientes). Cada coluna é uma característica, cada linha é um registro.',
    seeAlso: ['Linha', 'Coluna', 'Schema']
  },
  'Linha': {
    term: 'Linha',
    category: 'Conceito',
    short: 'Um registro individual em uma tabela.',
    long: 'Também chamado de "row" ou "record". Uma linha em "filmes" representa UM filme com todos seus atributos.',
    seeAlso: ['Tabela', 'Coluna']
  },
  'Coluna': {
    term: 'Coluna',
    category: 'Conceito',
    short: 'Uma categoria de informação em uma tabela.',
    long: 'Também chamada de "column" ou "field". Toda coluna tem um nome e um tipo de dado fixo.',
    seeAlso: ['Tabela', 'Linha', 'Tipo de Dado']
  },
  'Chave Primária': {
    term: 'Chave Primária',
    category: 'Conceito',
    short: 'Coluna que identifica unicamente cada linha (o "RG" do registro).',
    long: 'Em inglês: Primary Key (PK). Quase toda tabela tem uma — geralmente uma coluna "id" do tipo INTEGER. Nunca pode ser NULL nem duplicada.',
    example: 'CREATE TABLE filmes (id INTEGER PRIMARY KEY, titulo TEXT);',
    seeAlso: ['Chave Estrangeira', 'INTEGER']
  },
  'Chave Estrangeira': {
    term: 'Chave Estrangeira',
    category: 'Conceito',
    short: 'Coluna que referencia a chave primária de OUTRA tabela.',
    long: 'Em inglês: Foreign Key (FK). É a "cola" que conecta tabelas — base dos JOINs. Em filmes.diretor_id, esse diretor_id aponta pra diretores.id.',
    seeAlso: ['Chave Primária', 'JOIN']
  },
  'NULL': {
    term: 'NULL',
    category: 'Conceito',
    short: 'Representa a ausência de valor (vazio, desconhecido).',
    long: 'NULL não é zero, não é string vazia — é "não sabemos". Tem regras especiais: NULL = NULL é FALSO, use IS NULL pra testar.',
    example: 'WHERE telefone IS NULL  -- linhas onde telefone está vazio',
    seeAlso: ['IS NULL', 'COALESCE']
  },
  'Tipo de Dado': {
    term: 'Tipo de Dado',
    category: 'Conceito',
    short: 'Define que tipo de informação uma coluna armazena.',
    long: 'Tipos comuns: INTEGER (inteiros), REAL (decimais), TEXT (texto), BLOB (binário), DATE (datas). SQLite é mais flexível, outros bancos são estritos.',
    seeAlso: ['INTEGER', 'TEXT', 'REAL']
  },
  'INTEGER': {
    term: 'INTEGER',
    category: 'Tipo de Dado',
    short: 'Número inteiro (sem casas decimais).',
    long: 'Exemplos: 1, 42, -7, 2026. Ocupa até 8 bytes em SQLite.',
    seeAlso: ['REAL', 'CAST']
  },
  'TEXT': {
    term: 'TEXT',
    category: 'Tipo de Dado',
    short: 'Texto / string de tamanho variável.',
    long: 'Armazena qualquer texto. Sempre entre aspas simples nas queries.',
    seeAlso: ['INTEGER']
  },
  'REAL': {
    term: 'REAL',
    category: 'Tipo de Dado',
    short: 'Número com casas decimais (ponto flutuante).',
    long: 'Exemplos: 3.14, 8.6, -0.5. Use para preços, notas, medidas.',
    seeAlso: ['INTEGER', 'CAST']
  },
  'Schema': {
    term: 'Schema',
    category: 'Conceito',
    short: 'A estrutura do banco — tabelas, colunas, tipos, relações.',
    long: 'O "mapa" do banco. Quando alguém pergunta "qual o schema?", quer ver a definição de quais tabelas existem e como se conectam.',
    seeAlso: ['Tabela', 'Banco de Dados']
  },
  'Subquery': {
    term: 'Subquery',
    category: 'Conceito',
    short: 'Uma query DENTRO de outra query.',
    long: 'Permite usar o resultado de uma query como entrada de outra. Pode aparecer no SELECT, FROM ou WHERE.',
    syntax: 'WHERE col IN (SELECT outra_col FROM outra_tabela)',
    example: "SELECT * FROM filmes WHERE nota > (SELECT AVG(nota) FROM filmes);",
    exampleDesc: 'Filmes com nota acima da média.',
    seeAlso: ['CTE']
  },
  'CTE': {
    term: 'CTE',
    category: 'Conceito',
    short: 'Common Table Expression — tabela temporária nomeada para uma query.',
    long: 'Definida com WITH. Torna queries complexas mais legíveis ao quebrar em "passos" nomeados. Existe só durante a query.',
    syntax: 'WITH nome AS (SELECT ...) SELECT ... FROM nome',
    example: 'WITH caros AS (SELECT * FROM filmes WHERE nota > 8) SELECT titulo FROM caros;',
    seeAlso: ['Subquery']
  },
  'View': {
    term: 'View',
    category: 'Conceito',
    short: 'Uma "tabela virtual" salva como uma query nomeada.',
    long: 'Diferente de CTE, uma view é PERSISTENTE no banco — qualquer um pode usar SELECT * FROM minha_view. Útil para encapsular queries comuns.',
    syntax: 'CREATE VIEW nome AS SELECT ...',
    seeAlso: ['CTE', 'Tabela']
  },
  'Index': {
    term: 'Index',
    category: 'Conceito',
    short: 'Estrutura que acelera buscas em uma coluna.',
    long: 'Em português: Índice. Pense como o índice remissivo de um livro — em vez de procurar página por página, vai direto. Acelera WHERE/JOIN mas torna INSERT/UPDATE mais lento.',
    syntax: 'CREATE INDEX nome ON tabela(coluna)',
    example: 'CREATE INDEX idx_genero ON filmes(genero);',
    seeAlso: ['EXPLAIN']
  },
  'Window Function': {
    term: 'Window Function',
    category: 'Conceito',
    short: 'Função que olha "janelas" de linhas vizinhas sem agrupá-las.',
    long: 'Diferente de GROUP BY (que colapsa linhas), window functions PRESERVAM cada linha e adicionam uma coluna calculada vendo suas vizinhas. Exemplos: ROW_NUMBER, RANK, LAG, LEAD.',
    syntax: 'funcao() OVER (PARTITION BY col ORDER BY col)',
    example: 'SELECT titulo, RANK() OVER (PARTITION BY genero ORDER BY nota DESC) FROM filmes;',
    seeAlso: ['GROUP BY']
  },

  // ============= SINTAXE =============
  'AS': {
    term: 'AS',
    category: 'Sintaxe',
    short: 'Dá um apelido (alias) a uma coluna ou tabela no resultado.',
    long: 'A palavra AS é opcional, mas recomendada para clareza. Use aspas duplas pra apelidos com espaços.',
    syntax: 'coluna AS apelido',
    example: 'SELECT titulo AS nome_do_filme FROM filmes;',
    seeAlso: ['SELECT']
  },
  '*': {
    term: '*',
    category: 'Sintaxe',
    short: 'O asterisco — significa "todas as colunas".',
    long: 'SELECT * FROM tabela retorna TODAS as colunas. Conveniente pra exploração, mas em código de produção prefira listar colunas explicitamente.',
    example: 'SELECT * FROM filmes;',
    seeAlso: ['SELECT']
  },
  'Aspas Simples': {
    term: 'Aspas Simples',
    category: 'Sintaxe',
    short: 'Delimitam strings em SQL.',
    long: "Use aspas SIMPLES (') para texto. Aspas duplas (\") são pra identificadores (nomes de colunas). Pra incluir uma aspa simples dentro da string, duplique: 'O''Brien'.",
    example: "WHERE pais = 'Brasil'",
    seeAlso: ['TEXT']
  },
  'Comentário': {
    term: 'Comentário',
    category: 'Sintaxe',
    short: 'Texto ignorado pelo SQL — usado para documentar queries.',
    long: 'Duas formas: -- até o fim da linha, ou /* ... */ para várias linhas.',
    example: "-- isso é um comentário\nSELECT * FROM filmes;  /* outro estilo */",
    seeAlso: []
  }
};

/**
 * Tenta encontrar um termo no glossário pelo texto exato (case-insensitive).
 * Retorna a entrada ou null.
 */
function findGlossaryTerm(text) {
  if (!text) return null;
  const trimmed = text.trim();
  // Exact match (case-sensitive primeiro pra preferir variantes corretas)
  if (GLOSSARY[trimmed]) return GLOSSARY[trimmed];
  // Case-insensitive
  const lower = trimmed.toLowerCase();
  for (const key of Object.keys(GLOSSARY)) {
    if (key.toLowerCase() === lower) return GLOSSARY[key];
  }
  return null;
}

/**
 * Lista de termos filtrada por busca e/ou categoria.
 */
function searchGlossary(query, category) {
  const q = (query || '').trim().toLowerCase();
  let entries = Object.values(GLOSSARY);
  if (category) entries = entries.filter(e => e.category === category);
  if (q) {
    entries = entries.filter(e =>
      e.term.toLowerCase().includes(q) ||
      e.short.toLowerCase().includes(q) ||
      (e.long && e.long.toLowerCase().includes(q))
    );
  }
  // Sort alphabetically by term
  entries.sort((a, b) => a.term.localeCompare(b.term, 'pt-BR'));
  return entries;
}
