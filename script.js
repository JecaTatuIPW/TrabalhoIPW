function showPage(id) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => {
    page.classList.remove('active');
    page.style.opacity = 0;
  });

  const selected = document.getElementById(id);
  if (selected) {
    selected.classList.add('active');
    setTimeout(() => {
      selected.style.opacity = 1;
    }, 10);
  }

  const titleMap = {
    menu: 'Início',
    cardapio: 'Cardápio',
    horario: 'Horários',
  };
  document.getElementById('page-title').textContent = titleMap[id] || '';
}

async function carregarCardapio() {
  try {
    // Mostrar estado de carregamento
    document.getElementById('tabela-cardapio').innerHTML = `
      <div class="loading">
        <i class="fas fa-spinner fa-spin"></i> Carregando cardápio...
      </div>
    `;

    const res = await fetch("https://refeitorio-ifpi-default-rtdb.firebaseio.com/cardapio.json");
    if (!res.ok) throw new Error('Erro ao carregar o cardápio');

    const dados = await res.json();
    const dias = ['segunda', 'terca', 'quarta', 'quinta', 'sexta'];
    const nomesDias = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'];

    let html = `
      <div class="table-responsive">
        <table>
          <thead>
            <tr>${nomesDias.map(d => `<th>${d}</th>`).join('')}</tr>
          </thead>
          <tbody>
            <tr>
    `;
    
    for (let dia of dias) {
      html += `
        <td>
          <ul>
            ${(dados[dia] || ['Cardápio em atualização']).map(item => `
              <li>${item}</li>
            `).join('')}
          </ul>
        </td>
      `;
    }
    
    html += `
            </tr>
          </tbody>
        </table>
      </div>
      <div class="cardapio-footer">
        <i class="fas fa-info-circle"></i> Cardápio sujeito a alterações sem aviso prévio.
      </div>
    `;

    document.getElementById('tabela-cardapio').innerHTML = html;
  } catch (erro) {
    document.getElementById('tabela-cardapio').innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-triangle"></i> Erro ao carregar o cardápio. Por favor, tente novamente mais tarde.
      </div>
    `;
    console.error(erro);
  }
}

// Carregar cardápio quando a página for carregada
document.addEventListener('DOMContentLoaded', () => {
  carregarCardapio();
  
  // Adiciona efeito de hover nos itens do menu
  const menuItems = document.querySelectorAll('.sidebar li');
  menuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateX(5px)';
    });
    item.addEventListener('mouseleave', () => {
      item.style.transform = 'translateX(0)';
    });
  });
});