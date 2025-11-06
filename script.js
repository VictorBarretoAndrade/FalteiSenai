function calcular() {
  const hsemestre = Number(document.getElementById("hsemestre").value);
  const faltasa = Number(document.getElementById("faltasa").value);
  const resultado = document.getElementById("resultado");

  if (!hsemestre || hsemestre <= 0) {
    resultado.textContent = "Digite as horas da matéria corretamente.";
    resultado.className = "resultado-erro";
    return;
  }

  // 🔹 Cálculos baseados no código C
  const taula = (hsemestre * 60) / 50;  // total de aulas
  const faltasm = (taula * 0.25) / 2;   // máximo de faltas permitidas
  const faltasr = Math.floor(faltasm - faltasa); // faltas restantes

  // 🔹 Lógica de mensagens
  if (faltasr > 0) {
    resultado.innerHTML = `😎 Falte meu filho!<br>Você ainda pode faltar <b>${faltasr}</b> dias.`;
    resultado.className = "resultado-ok";
  } 
  else if (faltasr === 0) {
    resultado.innerHTML = `⚠️ Não falte mais!<br>Você não tem mais faltas para gastar.`;
    resultado.className = "resultado-alerta";
  } 
  else {
    resultado.innerHTML = `❌ Você ultrapassou o limite de faltas!<br>Reprovado por falta.`;
    resultado.className = "resultado-erro";
  }
}
