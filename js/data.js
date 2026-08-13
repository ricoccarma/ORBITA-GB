/* =====================================================================
   ORBITA - Sistema de Alerta Climatico por Satelite
   Base de dados simulada alinhada ao Java e ao banco Oracle do projeto.

   Os dados sao ficticios e usados apenas para demonstracao academica.
   Nada vem de satelite real, backend ou banco de dados.
   ===================================================================== */

const PESO_RISCO = { Baixo: 25, Moderado: 50, Alto: 75, "Crítico": 100 };

const SATELITES = [
  {
    id: 1,
    nome: "Sentinel-2",
    operadora: "ESA",
    tipoOrbita: "Heliossíncrona",
    altitudeKm: 786,
    sensores: "Óptico multiespectral",
    ativo: true
  },
  {
    id: 2,
    nome: "Landsat-9",
    operadora: "NASA",
    tipoOrbita: "Heliossíncrona",
    altitudeKm: 705,
    sensores: "Óptico, térmico",
    ativo: true
  },
  {
    id: 3,
    nome: "CBERS-4A",
    operadora: "INPE",
    tipoOrbita: "Heliossíncrona",
    altitudeKm: 628,
    sensores: "Óptico, infravermelho",
    ativo: true
  }
];

const REGIOES = [
  {
    id: 1,
    nome: "Vale do Itajaí",
    pais: "Brasil",
    estado: "SC",
    cidade: "Blumenau",
    area: "Urbana",
    areaKm2: 519.8,
    populacao: 361855,
    latitude: -26.9194,
    longitude: -49.0666,
    temperatura: 22.4,
    umidade: 95,
    chuva: 180.5,
    vegetacao: 0.61,
    umidadeSolo: 92,
    vento: 18,
    focosCalor: 0,
    risco: "Crítico",
    tipoRisco: "Enchente",
    tendencia: "subindo",
    coordX: 60,
    coordY: 83,
    atualizado: "08/06/2026 06:00"
  },
  {
    id: 2,
    nome: "Pantanal Norte",
    pais: "Brasil",
    estado: "MT",
    cidade: "Cáceres",
    area: "Florestal",
    areaKm2: 12500,
    populacao: 92000,
    latitude: -16.0706,
    longitude: -57.6811,
    temperatura: 39.7,
    umidade: 18,
    chuva: 0,
    vegetacao: 0.25,
    umidadeSolo: 9,
    vento: 35,
    focosCalor: 47,
    risco: "Crítico",
    tipoRisco: "Queimada",
    tendencia: "subindo",
    coordX: 45,
    coordY: 55,
    atualizado: "08/06/2026 13:30"
  },
  {
    id: 3,
    nome: "Sertão do Cariri",
    pais: "Brasil",
    estado: "CE",
    cidade: "Crato",
    area: "Agrícola",
    areaKm2: 1176.5,
    populacao: 132000,
    latitude: -7.2343,
    longitude: -39.4094,
    temperatura: 34.2,
    umidade: 22,
    chuva: 2,
    vegetacao: 0.18,
    umidadeSolo: 8,
    vento: 14,
    focosCalor: 3,
    risco: "Alto",
    tipoRisco: "Seca",
    tendencia: "estável",
    coordX: 80,
    coordY: 26,
    atualizado: "07/06/2026 10:00"
  },
  {
    id: 4,
    nome: "Serra de Petrópolis",
    pais: "Brasil",
    estado: "RJ",
    cidade: "Petrópolis",
    area: "Montanhosa",
    areaKm2: 795.8,
    populacao: 306000,
    latitude: -22.5051,
    longitude: -43.1789,
    temperatura: 19.1,
    umidade: 98,
    chuva: 145,
    vegetacao: 0.72,
    umidadeSolo: 97,
    vento: 22,
    focosCalor: 0,
    risco: "Crítico",
    tipoRisco: "Deslizamento",
    tendencia: "subindo",
    coordX: 71,
    coordY: 71,
    atualizado: "08/06/2026 04:15"
  }
];

const LEITURAS = [
  {
    id: 1,
    hora: "06:00",
    satelite: "Sentinel-2",
    regiao: "Vale do Itajaí",
    dado: "Chuva 180,5 mm e solo 92%",
    risco: "Crítico"
  },
  {
    id: 2,
    hora: "13:30",
    satelite: "Landsat-9",
    regiao: "Pantanal Norte",
    dado: "47 focos, 39,7 °C e umidade 18%",
    risco: "Crítico"
  },
  {
    id: 3,
    hora: "10:00",
    satelite: "CBERS-4A",
    regiao: "Sertão do Cariri",
    dado: "Solo 8% e NDVI 0,18",
    risco: "Alto"
  },
  {
    id: 4,
    hora: "04:15",
    satelite: "Sentinel-2",
    regiao: "Serra de Petrópolis",
    dado: "Chuva 145 mm e solo 97%",
    risco: "Crítico"
  }
];

function adicionarAlerta(lista, regiao, tipo, nivel, mensagem, recomendacao) {
  lista.push({
    id: lista.length + 1,
    tipo,
    regiao: regiao.nome,
    estado: regiao.estado,
    nivel,
    data: regiao.atualizado,
    status: "Ativo",
    mensagem,
    recomendacao
  });
}

function avaliarEnchente(regiao, alertas) {
  let nivel = null;
  if (regiao.chuva >= 120 && regiao.umidadeSolo >= 80) {
    nivel = "Crítico";
  } else if (regiao.chuva >= 80 && regiao.umidadeSolo >= 70) {
    nivel = "Alto";
  } else if (regiao.chuva >= 60) {
    nivel = "Moderado";
  }

  if (nivel) {
    adicionarAlerta(
      alertas,
      regiao,
      "Enchente",
      nivel,
      `Risco ${nivel.toLowerCase()} de enchente: chuva acumulada de ${formatarNumero(regiao.chuva)} mm e umidade do solo de ${formatarNumero(regiao.umidadeSolo)}%.`,
      "Monitorar rios e áreas baixas e orientar a população sobre rotas seguras."
    );
  }
}

function avaliarQueimada(regiao, alertas) {
  if (!["Florestal", "Rural", "Agrícola"].includes(regiao.area)) return;

  let nivel = null;
  if (regiao.focosCalor >= 40 && regiao.umidade <= 20) {
    nivel = "Crítico";
  } else if (
    regiao.focosCalor >= 20 ||
    (regiao.temperatura >= 38 && regiao.umidade <= 25)
  ) {
    nivel = "Alto";
  } else if (regiao.focosCalor >= 5 && regiao.umidade <= 35) {
    nivel = "Moderado";
  }

  if (nivel) {
    adicionarAlerta(
      alertas,
      regiao,
      "Queimada",
      nivel,
      `Risco ${nivel.toLowerCase()} de queimada: ${regiao.focosCalor} focos de calor, temperatura de ${formatarNumero(regiao.temperatura)} °C e umidade de ${formatarNumero(regiao.umidade)}%.`,
      "Acionar a equipe ambiental e evitar atividades com fogo na região."
    );
  }
}

function avaliarSeca(regiao, alertas) {
  if (!["Agrícola", "Rural"].includes(regiao.area)) return;

  let nivel = null;
  if (
    regiao.chuva <= 1 &&
    regiao.umidadeSolo <= 5 &&
    regiao.vegetacao <= 0.15
  ) {
    nivel = "Crítico";
  } else if (
    regiao.chuva <= 3 &&
    regiao.umidadeSolo <= 10 &&
    regiao.vegetacao <= 0.2
  ) {
    nivel = "Alto";
  } else if (
    regiao.chuva <= 10 &&
    regiao.umidadeSolo <= 20 &&
    regiao.vegetacao <= 0.3
  ) {
    nivel = "Moderado";
  }

  if (nivel) {
    adicionarAlerta(
      alertas,
      regiao,
      "Seca",
      nivel,
      `Risco ${nivel.toLowerCase()} de seca: chuva de ${formatarNumero(regiao.chuva)} mm, umidade do solo de ${formatarNumero(regiao.umidadeSolo)}% e NDVI de ${formatarNumero(regiao.vegetacao, 2)}.`,
      "Planejar o uso de água e acompanhar as áreas agrícolas mais vulneráveis."
    );
  }
}

function avaliarDeslizamento(regiao, alertas) {
  if (regiao.area !== "Montanhosa") return;

  let nivel = null;
  if (regiao.chuva >= 140 && regiao.umidadeSolo >= 90) {
    nivel = "Crítico";
  } else if (regiao.chuva >= 100 && regiao.umidadeSolo >= 80) {
    nivel = "Alto";
  } else if (regiao.chuva >= 70 && regiao.umidadeSolo >= 70) {
    nivel = "Moderado";
  }

  if (nivel) {
    adicionarAlerta(
      alertas,
      regiao,
      "Deslizamento",
      nivel,
      `Risco ${nivel.toLowerCase()} de deslizamento: chuva de ${formatarNumero(regiao.chuva)} mm e solo com ${formatarNumero(regiao.umidadeSolo)}% de umidade em área montanhosa.`,
      "Vistoriar encostas e preparar a retirada preventiva de áreas de risco."
    );
  }
}

function formatarNumero(valor, casas = 1) {
  return Number(valor).toLocaleString("pt-BR", {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas
  });
}

function gerarAlertasDasLeituras() {
  const alertas = [];
  REGIOES.forEach((regiao) => {
    avaliarEnchente(regiao, alertas);
    avaliarQueimada(regiao, alertas);
    avaliarSeca(regiao, alertas);
    avaliarDeslizamento(regiao, alertas);
  });
  return alertas;
}

const ALERTAS = gerarAlertasDasLeituras();

const RESUMO_ALERTAS = [
  { rotulo: "Enchente", valor: ALERTAS.filter((a) => a.tipo === "Enchente").length },
  { rotulo: "Queimada", valor: ALERTAS.filter((a) => a.tipo === "Queimada").length },
  { rotulo: "Seca", valor: ALERTAS.filter((a) => a.tipo === "Seca").length },
  { rotulo: "Desliz.", valor: ALERTAS.filter((a) => a.tipo === "Deslizamento").length }
];
