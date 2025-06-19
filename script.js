function showPage(id) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.classList.remove('active'));

  const selected = document.getElementById(id);
  if (selected) {
    selected.classList.add('active');
  }

  const titleMap = {
    menu: 'Início',
    cardapio: 'Cardápio',
    horario: 'Horários 🕝',
  };
  document.getElementById('page-title').textContent = titleMap[id] || '';
}

async function carregarCardapio() {
  const res = await fetch('https://cardapioifpi.rf.gd/cardapio.json');
  const dados = await res.json();

  const dias = ['segunda', 'terca', 'quarta', 'quinta', 'sexta'];
  const nomesDias = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

  let html = `<table><tr>${nomesDias.map(d => `<th>${d}</th>`).join('')}</tr><tr>`;
  for (let dia of dias) {
    html += `<td><ul>${dados[dia].map(item => `<li>${item}</li>`).join('')}</ul></td>`;
  }
  html += '</tr></table>';

  document.getElementById('tabela-cardapio').innerHTML = html;
}

window.onload = carregarCardapio;
