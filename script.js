/* SCRIPT DO GUIA DA EVY PARA A NHL */

// 1. Dados Reais dos 32 Times da NHL (Organizados por Divisão e Conferência)
const nhlTeams = [
    // Leste - Atlantic
    { name: "Boston Bruins", division: "Atlantic", conference: "Eastern", arena: "TD Garden" },
    { name: "Buffalo Sabres", division: "Atlantic", conference: "Eastern", arena: "KeyBank Center" },
    { name: "Detroit Red Wings", division: "Atlantic", conference: "Eastern", arena: "Little Caesars Arena" },
    { name: "Florida Panthers", division: "Atlantic", conference: "Eastern", arena: "Amerant Bank Arena" },
    { name: "Montreal Canadiens", division: "Atlantic", conference: "Eastern", arena: "Bell Centre" },
    { name: "Ottawa Senators", division: "Atlantic", conference: "Eastern", arena: "Canadian Tire Centre" },
    { name: "Tampa Bay Lightning", division: "Atlantic", conference: "Eastern", arena: "Amalie Arena" },
    { name: "Toronto Maple Leafs", division: "Atlantic", conference: "Eastern", arena: "Scotiabank Arena" },

    // Leste - Metropolitan
    { name: "Carolina Hurricanes", division: "Metropolitan", conference: "Eastern", arena: "Lenovo Center" },
    { name: "Columbus Blue Jackets", division: "Metropolitan", conference: "Eastern", arena: "Nationwide Arena" },
    { name: "New Jersey Devils", division: "Metropolitan", conference: "Eastern", arena: "Prudential Center" },
    { name: "New York Islanders", division: "Metropolitan", conference: "Eastern", arena: "UBS Arena" },
    { name: "New York Rangers", division: "Metropolitan", conference: "Eastern", arena: "Madison Square Garden" },
    { name: "Philadelphia Flyers", division: "Metropolitan", conference: "Eastern", arena: "Wells Fargo Center" },
    { name: "Pittsburgh Penguins", division: "Metropolitan", conference: "Eastern", arena: "PPG Paints Arena" },
    { name: "Washington Capitals", division: "Metropolitan", conference: "Eastern", arena: "Capital One Arena" },

    // Oeste - Central
    { name: "Chicago Blackhawks", division: "Central", conference: "Western", arena: "United Center" },
    { name: "Colorado Avalanche", division: "Central", conference: "Western", arena: "Ball Arena" },
    { name: "Dallas Stars", division: "Central", conference: "Western", arena: "American Airlines Center" },
    { name: "Minnesota Wild", division: "Central", conference: "Western", arena: "Xcel Energy Center" },
    { name: "Nashville Predators", division: "Central", conference: "Western", arena: "Bridgestone Arena" },
    { name: "St. Louis Blues", division: "Central", conference: "Western", arena: "Enterprise Center" },
    { name: "Winnipeg Jets", division: "Central", conference: "Western", arena: "Canada Life Centre" },
    { name: "Utah Hockey Club", division: "Central", conference: "Western", arena: "Delta Center" },

    // Oeste - Pacific
    { name: "Anaheim Ducks", division: "Pacific", conference: "Western", arena: "Honda Center" },
    { name: "Calgary Flames", division: "Pacific", conference: "Western", arena: "Scotiabank Saddledome" },
    { name: "Edmonton Oilers", division: "Pacific", conference: "Western", arena: "Rogers Place" },
    { name: "Los Angeles Kings", division: "Pacific", conference: "Western", arena: "Crypto.com Arena" },
    { name: "San Jose Sharks", division: "Pacific", conference: "Western", arena: "SAP Center" },
    { name: "Seattle Kraken", division: "Pacific", conference: "Western", arena: "Climate Pledge Arena" },
    { name: "Vancouver Canucks", division: "Pacific", conference: "Western", arena: "Rogers Arena" },
    { name: "Vegas Golden Knights", division: "Pacific", conference: "Western", arena: "T-Mobile Arena" }
];

// 2. Renderizar Times
function renderTeams(filterConf = 'all') {
    const grid = document.getElementById('teamsGrid');
    grid.innerHTML = '';

    const filtered = filterConf === 'all' 
        ? nhlTeams 
        : nhlTeams.filter(t => t.conference === filterConf);

    filtered.forEach(team => {
        const confClass = team.conference === 'Eastern' ? 'conf-eastern' : 'conf-western';
        const confName = team.conference === 'Eastern' ? 'Conferência Leste' : 'Conferência Oeste';

        const card = document.createElement('div');
        card.className = 'team-card';
        card.innerHTML = `
            <div class="team-header">
                <span class="team-name">${team.name}</span>
                <span class="team-conf-badge ${confClass}">${team.division}</span>
            </div>
            <div class="team-details">
                <p>Arena: <span class="team-arena">${team.arena}</span></p>
                <p class="text-sm text-muted">${confName}</p>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterTeams(conf) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderTeams(conf);
}

// 3. Simulador de Power Play
function setSimMode(mode) {
    document.querySelectorAll('.sim-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const home = document.getElementById('homePlayers');
    const away = document.getElementById('awayPlayers');

    if (mode === '5v5') {
        home.textContent = "5 Patinadores + 1 Goleiro";
        away.textContent = "5 Patinadores + 1 Goleiro";
    } else if (mode === 'pp') {
        home.textContent = "5 Patinadores (Power Play!) + 1 Goleiro";
        away.textContent = "4 Patinadores (Penalty Kill) + 1 Goleiro";
    } else if (mode === 'ot') {
        home.textContent = "3 Patinadores + 1 Goleiro";
        away.textContent = "3 Patinadores + 1 Goleiro";
    }
}

// 4. Seletor Tático de Linhas
const tacticsData = {
    atacantes: `
        <div class="tactic-grid">
            <div class="tactic-card">
                <h4>1ª Linha (Top Line)</h4>
                <p>Os principais artilheiros e criadores de jogadas da equipe. Jogam contra os melhores defensores adversários.</p>
            </div>
            <div class="tactic-card">
                <h4>2ª Linha (Secondary Scoring)</h4>
                <p>Mantém a pressão ofensiva com alta habilidade técnica e capacidade de finalização.</p>
            </div>
            <div class="tactic-card">
                <h4>3ª e 4ª Linhas (Grinders & Checkers)</h4>
                <p>Jogadores especializados em força física, marcação sufocante e proteção de resultado (Energy Lines).</p>
            </div>
        </div>
    `,
    defensores: `
        <div class="tactic-grid">
            <div class="tactic-card">
                <h4>1º Par Defensivo (Top Pair)</h4>
                <p>A dupla principal que joga mais de 22-25 minutos por partida, unindo solidez defensiva e saída rápida de puck.</p>
            </div>
            <div class="tactic-card">
                <h4>2º e 3º Pares Defensivos</h4>
                <p>Dão profundidade ao time, equilibrando jogadores defensivos estritos com defensores construtores de jogadas.</p>
            </div>
        </div>
    `,
    goleiro: `
        <div class="tactic-grid">
            <div class="tactic-card">
                <h4>O Goleiro Titular (Starter)</h4>
                <p>A alma do time. Responsável por defesas acrobáticas, leitura de ângulo e controle de rebotes para evitar gols.</p>
            </div>
            <div class="tactic-card">
                <h4>O Goleiro Reserva (Backup)</h4>
                <p>Entra em jogos em back-to-back para dar descanso ao titular sem perder o nível defensivo.</p>
            </div>
        </div>
    `
};

function showTactics(category) {
    document.querySelectorAll('.line-tab').forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById('tacticsContent').innerHTML = tacticsData[category];
}

// 5. Quiz Interativo
const quizQuestions = [
    {
        question: "Quantos jogadores de linha (patinadores) cada time tem no gelo durante uma situação normal 5v5?",
        options: ["3 jogadores", "5 jogadores", "6 jogadores", "4 jogadores"],
        answer: 1
    },
    {
        question: "Qual é o nome do famoso e cobiçado troféu de campeão da NHL?",
        options: ["Vezina Trophy", "Hart Trophy", "Stanley Cup", "Calder Cup"],
        answer: 2
    },
    {
        question: "O que acontece quando ocorre um 'Icing' (bola longa)?",
        options: ["O jogo continua sem interrupção", "O juiz expulsa um jogador por 5 minutos", "O jogo é paralisado e há faceoff na zona defensiva do infrator", "O time ganha um gol automático"],
        answer: 2
    },
    {
        question: "Quantos minutos de punição um jogador recebe em uma penalidade menor (Minor Penalty)?",
        options: ["1 minuto", "2 minutos", "5 minutos", "10 minutos"],
        answer: 1
    }
];

let currentQuestion = 0;
let score = 0;

function loadQuiz() {
    if (currentQuestion < quizQuestions.length) {
        const q = quizQuestions[currentQuestion];
        document.getElementById('questionTitle').textContent = `Pergunta ${currentQuestion + 1}: ${q.question}`;
        
        const optionsBox = document.getElementById('quizOptions');
        optionsBox.innerHTML = '';
        
        q.options.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = opt;
            btn.onclick = () => selectAnswer(index, btn);
            optionsBox.appendChild(btn);
        });
    } else {
        document.getElementById('quizQuestionBox').style.display = 'none';
        document.getElementById('quizResultBox').style.display = 'block';
        document.getElementById('quizScoreText').textContent = `Você acertou ${score} de ${quizQuestions.length} perguntas! ${score === 4 ? '🏒 Perfeito! Você já é um verdadeiro fã da NHL!' : 'Bom trabalho! Continue explorando o guia.'}`;
    }
}

function selectAnswer(selectedIndex, btnElement) {
    const q = quizQuestions[currentQuestion];
    const allBtns = document.querySelectorAll('.option-btn');
    
    allBtns.forEach((b, idx) => {
        b.disabled = true;
        if (idx === q.answer) {
            b.classList.add('correct');
        } else if (idx === selectedIndex) {
            b.classList.add('wrong');
        }
    });

    if (selectedIndex === q.answer) {
        score++;
    }

    setTimeout(() => {
        currentQuestion++;
        loadQuiz();
    }, 1500);
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('quizQuestionBox').style.display = 'block';
    document.getElementById('quizResultBox').style.display = 'none';
    loadQuiz();
}

// Inicialização ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    renderTeams('all');
    showTactics('atacantes');
    loadQuiz();
});
