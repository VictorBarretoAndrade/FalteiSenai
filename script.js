let modo = 'faltas';
let horasSelecionadas = null;

function selecionarHoras(btn) {
  document.querySelectorAll('.opcao-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  horasSelecionadas = Number(btn.dataset.horas);

  const res = document.getElementById('resultado');
  res.textContent = '';
  res.className = '';
}

function setMode(m) {
  modo = m;
  const labelEl   = document.getElementById('label-faltasa');
  const inputEl   = document.getElementById('faltasa');
  const hintEl    = document.getElementById('hint-faltasa');
  const btnFaltas = document.getElementById('btn-faltas');
  const btnDias   = document.getElementById('btn-dias');

  if (m === 'faltas') {
    labelEl.textContent = 'Número de faltas:';
    inputEl.placeholder = 'Ex: 4';
    inputEl.step        = '1';
    hintEl.textContent  = 'Cole aqui exatamente o número que aparece no portal SENAI';
    btnFaltas.classList.add('active');
    btnDias.classList.remove('active');
  } else {
    labelEl.textContent = 'Dias faltados:';
    inputEl.placeholder = 'Ex: 2';
    inputEl.step        = '0.5';
    hintEl.textContent  = '1 dia faltado = 2 faltas no portal';
    btnFaltas.classList.remove('active');
    btnDias.classList.add('active');
  }

  const res = document.getElementById('resultado');
  res.textContent = '';
  res.className = '';
}

function calcular() {
  const entrada   = Number(document.getElementById("faltasa").value);
  const resultado = document.getElementById("resultado");

  if (!horasSelecionadas) {
    resultado.textContent = "Selecione a carga horária da matéria.";
    resultado.className = "resultado-erro";
    return;
  }

  if (entrada < 0) {
    resultado.textContent = "Você é idiota? Pare de tentar ser diferentão, o número tá negativo :( ";
    resultado.className = "resultado-erro";
    return;
  }

  const taula           = (horasSelecionadas * 60) / 50;
  const maxFaltas       = taula * 0.25;
  const faltasGastas    = modo === 'faltas' ? entrada : entrada * 2;
  const faltasRestantes = maxFaltas - faltasGastas;
  const diasRestantes   = Math.floor(faltasRestantes / 2);

  if (faltasRestantes > 0) {
    const diasStr   = `<b>${diasRestantes} dia${diasRestantes !== 1 ? 's' : ''}</b>`;
    const faltasStr = `<b>${Math.floor(faltasRestantes)} falta${Math.floor(faltasRestantes) !== 1 ? 's' : ''}</b>`;
    resultado.innerHTML = `😎 Falte meu filho!<br>Você ainda pode faltar ${diasStr}.<br><small class="resultado-detalhe">Isso equivale a ${faltasStr} no portal.</small>`;
    resultado.className = "resultado-ok";
  } else if (faltasRestantes === 0) {
    resultado.innerHTML = `⚠️ Não falte mais!<br>Você não tem mais faltas para gastar.`;
    resultado.className = "resultado-alerta";
  } else {
    resultado.innerHTML = `❌ Você ultrapassou o limite de faltas!<br>Reprovado por falta.`;
    resultado.className = "resultado-erro";
  }
}
