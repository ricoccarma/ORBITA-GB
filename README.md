# ORBITA — Sistema de Alerta Climático por Satélite

> "Do espaço para proteger a Terra."

**Protótipo web da Global Solution da FIAP (Engenharia de Software), com o tema Economia Espacial / Nova Corrida Tecnológica.**

O ORBITA é uma plataforma digital simulada que usa dados de satélites para monitorar regiões com risco de enchentes, queimadas, seca e deslizamentos, transformando dados orbitais em alertas simples para a Defesa Civil, agricultores, cidades e moradores.

> Todos os dados exibidos são simulados e gerados estaticamente, apenas para fins acadêmicos. Não há backend, banco de dados nem dados reais de satélite.

## Tecnologias

- HTML5
- CSS3
- JavaScript puro (vanilla)

Sem frameworks, sem bibliotecas externas.

## Páginas

- index.html — Landing page (problema, solução, riscos, ODS)
- dashboard.html — Painel orbital (métricas, índice de risco, status dos satélites, mapa, leituras e gráfico)
- alertas.html — Central de alertas com filtros por tipo e nível
- regioes.html — Cadastro de regiões monitoradas (em memória)

## Estrutura

```bash
ORBITA/
├── index.html
├── dashboard.html
├── alertas.html
├── regioes.html
├── css/
│   └── style.css
├── js/
│   ├── data.js     # dados simulados (regiões, satélites, leituras, alertas)
│   └── main.js     # renderização e interações
└── assets/
    └── img/        # imagens do projeto
```
## Como executar

Não precisa de servidor nem instalação. Basta abrir o arquivo `index.html` no navegador.

**Opcional (servidor local):**

```bash
python3 -m http.server
# acesse http://localhost:8000
```
## ODS relacionados

- ODS 9 — Indústria, Inovação e Infraestrutura
- ODS 11 — Cidades e Comunidades Sustentáveis
- ODS 13 — Ação Contra a Mudança do Clima
- ODS 2 — Fome Zero e Agricultura Sustentável
