/* =========================================================
   SQL Engine — sql.js wrapper + datasets
   ========================================================= */

const SqlEngine = (() => {
  let SQL = null;
  let db = null;

  const SEED = `
    -- =================== FILMES ===================
    DROP TABLE IF EXISTS filmes;
    CREATE TABLE filmes (
      id INTEGER PRIMARY KEY,
      titulo TEXT NOT NULL,
      ano INTEGER NOT NULL,
      genero TEXT NOT NULL,
      nota REAL NOT NULL,
      duracao_min INTEGER NOT NULL,
      pais TEXT NOT NULL,
      diretor_id INTEGER
    );
    INSERT INTO filmes VALUES
      (1,  'Cidade de Deus',         2002, 'Drama',     8.6, 130, 'Brasil',  1),
      (2,  'Tropa de Elite',         2007, 'Acao',      8.0, 115, 'Brasil',  2),
      (3,  'Central do Brasil',      1998, 'Drama',     8.0, 110, 'Brasil',  3),
      (4,  'O Auto da Compadecida',  2000, 'Comedia',   8.4, 104, 'Brasil',  4),
      (5,  'Bacurau',                2019, 'Suspense',  7.5, 132, 'Brasil',  5),
      (6,  'Que Horas Ela Volta?',   2015, 'Drama',     7.7, 114, 'Brasil',  6),
      (7,  'Aquarius',               2016, 'Drama',     7.4, 146, 'Brasil',  5),
      (8,  'Pixote',                 1981, 'Drama',     7.9, 128, 'Brasil',  7),
      (9,  'Cinema Paradiso',        1988, 'Drama',     8.5, 155, 'Italia',  8),
      (10, 'O Senhor dos Aneis',     2001, 'Fantasia',  8.8, 178, 'EUA',     9),
      (11, 'Matrix',                 1999, 'Ficcao',    8.7, 136, 'EUA',     10),
      (12, 'Pulp Fiction',           1994, 'Crime',     8.9, 154, 'EUA',     11),
      (13, 'Forrest Gump',           1994, 'Drama',     8.8, 142, 'EUA',     12),
      (14, 'O Poderoso Chefao',      1972, 'Crime',     9.2, 175, 'EUA',     13),
      (15, 'Coringa',                2019, 'Drama',     8.4, 122, 'EUA',     14),
      (16, 'Parasita',               2019, 'Suspense',  8.5, 132, 'Coreia',  15),
      (17, 'O Labirinto do Fauno',   2006, 'Fantasia',  8.2, 118, 'Espanha', 16),
      (18, 'Amelie Poulain',         2001, 'Comedia',   8.3, 122, 'Franca',  17),
      (19, 'A Origem',               2010, 'Ficcao',    8.8, 148, 'EUA',     18),
      (20, 'Interestelar',           2014, 'Ficcao',    8.7, 169, 'EUA',     18);

    -- =================== DIRETORES ===================
    DROP TABLE IF EXISTS diretores;
    CREATE TABLE diretores (
      id INTEGER PRIMARY KEY,
      nome TEXT NOT NULL,
      nacionalidade TEXT NOT NULL,
      ano_nascimento INTEGER
    );
    INSERT INTO diretores VALUES
      (1,  'Fernando Meirelles',    'Brasileira',    1955),
      (2,  'Jose Padilha',          'Brasileira',    1967),
      (3,  'Walter Salles',         'Brasileira',    1956),
      (4,  'Guel Arraes',           'Brasileira',    1953),
      (5,  'Kleber Mendonca Filho', 'Brasileira',    1968),
      (6,  'Anna Muylaert',         'Brasileira',    1964),
      (7,  'Hector Babenco',        'Argentina',     1946),
      (8,  'Giuseppe Tornatore',    'Italiana',      1956),
      (9,  'Peter Jackson',         'Neozelandesa',  1961),
      (10, 'Lana Wachowski',        'Americana',     1965),
      (11, 'Quentin Tarantino',     'Americana',     1963),
      (12, 'Robert Zemeckis',       'Americana',     1951),
      (13, 'Francis Ford Coppola',  'Americana',     1939),
      (14, 'Todd Phillips',         'Americana',     1970),
      (15, 'Bong Joon-ho',          'Coreana',       1969),
      (16, 'Guillermo del Toro',    'Mexicana',      1964),
      (17, 'Jean-Pierre Jeunet',    'Francesa',      1953),
      (18, 'Christopher Nolan',     'Britanica',     1970),
      (19, 'Pedro Almodovar',       'Espanhola',     1949);

    -- =================== CASE REAL: tb_termos ===================
    DROP TABLE IF EXISTS tb_termos;
    CREATE TABLE tb_termos (
      codigo_termo INTEGER PRIMARY KEY,
      codigo_link INTEGER NOT NULL,
      codigo_executivo INTEGER NOT NULL,
      data_termo TEXT NOT NULL
    );
    INSERT INTO tb_termos (codigo_termo, codigo_link, codigo_executivo, data_termo) VALUES
      (1, 1, 123, '2025-01-01'),
      (2, 1, 555, '2025-01-15'),
      (3, 1, 123, '2025-01-15'),
      (4, 1, 123, '2025-01-13'),
      (5, 2, 555, '2025-01-28'),
      (6, 2, 128, '2025-01-04'),
      (7, 2, 123, '2025-01-25'),
      (8, 3, 555, '2025-01-26'),
      (9, 3, 555, '2025-01-26');

    -- =================== CASE REAL: tb_codigo_link ===================
    DROP TABLE IF EXISTS tb_codigo_link;
    CREATE TABLE tb_codigo_link (
      codigo_link INTEGER PRIMARY KEY,
      taxa_do_link REAL NOT NULL,
      tpv_negociado INTEGER NOT NULL
    );
    INSERT INTO tb_codigo_link VALUES
      (1, 1.25, 10000),
      (2, 1.35, 7000),
      (3, 1.43, 5000);

    -- =================== CASE REAL: tb_hierarquia ===================
    DROP TABLE IF EXISTS tb_hierarquia;
    CREATE TABLE tb_hierarquia (
      codigo_executivo INTEGER PRIMARY KEY,
      nome_executivo TEXT NOT NULL,
      carteira TEXT NOT NULL,
      coordenador TEXT NOT NULL
    );
    INSERT INTO tb_hierarquia VALUES
      (123, 'Teste', 'A Plus', 'Coordenador A1'),
      (555, 'Executivo 555', 'B1', 'Coordenador B1'),
      (128, 'Executivo 128', 'C2', 'Coordenador C2');
  `;

  const SCHEMA = {
    filmes: [
      { name: 'id',          type: 'INTEGER' },
      { name: 'titulo',      type: 'TEXT' },
      { name: 'ano',         type: 'INTEGER' },
      { name: 'genero',      type: 'TEXT' },
      { name: 'nota',        type: 'REAL' },
      { name: 'duracao_min', type: 'INTEGER' },
      { name: 'pais',        type: 'TEXT' },
      { name: 'diretor_id',  type: 'INTEGER (FK→diretores.id)' }
    ],
    diretores: [
      { name: 'id',             type: 'INTEGER' },
      { name: 'nome',           type: 'TEXT' },
      { name: 'nacionalidade',  type: 'TEXT' },
      { name: 'ano_nascimento', type: 'INTEGER' }
    ],
    tb_termos: [
      { name: 'codigo_termo',     type: 'INTEGER' },
      { name: 'codigo_link',      type: 'INTEGER (FK→tb_codigo_link)' },
      { name: 'codigo_executivo', type: 'INTEGER (FK→tb_hierarquia)' },
      { name: 'data_termo',       type: 'TEXT' }
    ],
    tb_codigo_link: [
      { name: 'codigo_link',   type: 'INTEGER' },
      { name: 'taxa_do_link',  type: 'REAL' },
      { name: 'tpv_negociado', type: 'INTEGER' }
    ],
    tb_hierarquia: [
      { name: 'codigo_executivo', type: 'INTEGER' },
      { name: 'nome_executivo',   type: 'TEXT' },
      { name: 'carteira',         type: 'TEXT' },
      { name: 'coordenador',      type: 'TEXT' }
    ]
  };

  async function init() {
    if (SQL) return;
    SQL = await initSqlJs({
      locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${file}`
    });
    resetDb();
  }

  function resetDb() {
    if (db) db.close();
    db = new SQL.Database();
    db.exec(SEED);
  }

  function run(query) {
    if (!db) throw new Error('Banco de dados não inicializado.');
    if (!query || !query.trim()) {
      return { columns: [], values: [], rowCount: 0 };
    }
    const result = db.exec(query);
    if (result.length === 0) {
      return { columns: [], values: [], rowCount: 0 };
    }
    const r = result[0];
    return { columns: r.columns, values: r.values, rowCount: r.values.length };
  }

  /** Returns full schema or just the requested tables. */
  function getSchema(filter) {
    if (!filter || !Array.isArray(filter) || filter.length === 0) return SCHEMA;
    const out = {};
    for (const t of filter) {
      if (SCHEMA[t]) out[t] = SCHEMA[t];
    }
    return out;
  }

  return { init, resetDb, run, getSchema };
})();

function validateResult(result, expected) {
  if (!result || !result.columns) {
    return { ok: false, reason: 'Sua query não retornou nada.' };
  }
  if (result.values.length !== expected.rows.length) {
    return {
      ok: false,
      reason: `Esperava ${expected.rows.length} linha(s), recebi ${result.values.length}.`
    };
  }
  if (expected.columns) {
    if (result.columns.length !== expected.columns.length) {
      return {
        ok: false,
        reason: `Esperava ${expected.columns.length} coluna(s) (${expected.columns.join(', ')}), recebi ${result.columns.length} (${result.columns.join(', ')}).`
      };
    }
    for (let i = 0; i < expected.columns.length; i++) {
      if (result.columns[i] !== expected.columns[i]) {
        return {
          ok: false,
          reason: `Coluna ${i + 1} esperava '${expected.columns[i]}', recebi '${result.columns[i]}'. Verifique nomes e ordem das colunas (use AS se precisar).`
        };
      }
    }
  }
  const norm = v => (v === null || v === undefined) ? 'NULL' : String(v).trim();
  if (expected.orderMatters) {
    for (let i = 0; i < expected.rows.length; i++) {
      const got = result.values[i].map(norm).join('||');
      const want = expected.rows[i].map(norm).join('||');
      if (got !== want) {
        return { ok: false, reason: `Linha ${i + 1} não bate com o esperado (a ordem importa).` };
      }
    }
  } else {
    const got = result.values.map(r => r.map(norm).join('||')).sort();
    const want = expected.rows.map(r => r.map(norm).join('||')).sort();
    for (let i = 0; i < got.length; i++) {
      if (got[i] !== want[i]) {
        return { ok: false, reason: 'O conjunto de linhas retornado não corresponde ao esperado.' };
      }
    }
  }
  return { ok: true, reason: 'Resultado correto!' };
}
