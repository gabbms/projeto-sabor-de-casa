const PRATOS = [
  {
    id:1, nome:"Feijoada Completa", cat:"prato-principal",
    emoji:"🫘", preco:45.00,
    imagem:"/img/frimesa-receitas-eisbein-1.jpg",
    desc:"Feijoada negra com carnes nobres, servida com arroz branco soltinho, farofa crocante, couve refogada e rodelas de laranja.",
    tags:["serve até 3 pessoas","contém glúten"],
    personalizacoes:["Substituir farofa por pirão","Sem pimenta","Couve extra (+R$3)","Laranja extra (+R$2)"],
    badge:"Popular", veggie:false, disponivel:true, destaque:true
  },
  {
    id:2, nome:"Escondidinho de Carne Seca", cat:"prato-principal",
    emoji:"🥘", preco:38.00,
    imagem:"/img/escondidinho.jpeg",
    desc:"Camadas generosas de mandioca cremosa com carne seca desfiada, gratinadas com queijo coalho e finalizada com manteiga de garrafa.",
    tags:["individual","sem glúten"],
    personalizacoes:["Frango no lugar de carne seca","Mandioca extra (+R$4)","Queijo extra (+R$5)","Sem pimenta"],
    badge:"Chef Recomenda", veggie:false, disponivel:true, destaque:true
  },
  {
    id:3, nome:"Arroz de Cuxá", cat:"prato-principal",
    emoji:"🍚", preco:32.00,
    imagem:"/img/cuxa.jpeg",
    desc:"Prato típico maranhense: arroz preparado com vinagreira fresca, gergelim torrado e camarão seco. Sabor único e inconfundível.",
    tags:["individual","contém frutos do mar"],
    personalizacoes:["Sem camarão (versão vegana)","Porção maior (+R$8)"],
    badge:"Típico MA", veggie:false, disponivel:true, destaque:false
  },
  {
    id:4, nome:"Moqueca de Peixe", cat:"prato-principal",
    emoji:"🐟", preco:52.00,
    imagem:"/img/moqueca.jpeg",
    desc:"Peixe fresco da pesca local cozido em leite de coco, azeite de dendê, tomate, cebola e coentro. Acompanha pirão e arroz.",
    tags:["serve até 2 pessoas","sem glúten","contém peixe"],
    personalizacoes:["Camarão no lugar do peixe (+R$15)","Versão sem dendê","Arroz extra (+R$5)"],
    badge:null, veggie:false, disponivel:true, destaque:true
  },
  {
    id:5, nome:"Baião de Dois", cat:"prato-principal",
    emoji:"🫙", preco:28.00,
    imagem:"/img/baiao.jpeg",
    desc:"Receita tradicional do nordeste com arroz e feijão-verde cozidos juntos, temperados com queijo coalho, bacon e ervas frescas.",
    tags:["individual","contém glúten"],
    personalizacoes:["Versão vegetariana (sem bacon)","Arroz integral","Queijo extra (+R$4)"],
    badge:null, veggie:false, disponivel:false, destaque:false
  },
  {
    id:6, nome:"Bolinho de Bacalhau", cat:"porcao",
    emoji:"🥙", preco:25.00,
    imagem:"/img/bolinho-bacalhau.jpeg",
    desc:"6 unidades de bolinho crocante por fora e cremoso por dentro, preparado com bacalhau importado dessalgado, batata e ervas.",
    tags:["6 unidades","contém peixe"],
    personalizacoes:["8 unidades (+R$7)","Molho aioli extra (+R$4)"],
    badge:null, veggie:false, disponivel:true, destaque:false
  },
  {
    id:7, nome:"Salada Verde da Roça", cat:"vegetariano",
    emoji:"🥗", preco:22.00,
    imagem:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
    desc:"Mix de folhas frescas, tomate cereja, pepino, cenoura ralada, beterraba e sementes, com molho de limão e azeite extra virgem.",
    tags:["vegano","sem glúten","individual"],
    personalizacoes:["Acrescentar ovo poché (+R$3)","Acrescentar frango grelhado (+R$8)","Molho extra (+R$2)"],
    badge:"Vegano", veggie:true, disponivel:true, destaque:false
  },
  {
    id:8, nome:"Prato Vegetariano do Dia", cat:"vegetariano",
    emoji:"🌽", preco:30.00,
    imagem:"/img/vegetariano.jpeg",
    desc:"Preparação especial que muda diariamente, sempre com legumes e verduras frescos da feira, grãos e um toque criativo do chef.",
    tags:["vegetariano","perguntar ao garçom"],
    personalizacoes:["Versão vegana","Porção extra (+R$10)"],
    badge:"Vegetariano", veggie:true, disponivel:true, destaque:false
  },
  {
    id:9, nome:"Pudim de Leite", cat:"sobremesa",
    emoji:"🍮", preco:14.00,
    imagem:"/img/pudim.jpeg",
    desc:"Pudim artesanal com receita secreta da sous chef Eduardo Castelo. Textura sedosa, caramelo dourado e gostinho de infância.",
    tags:["individual","contém leite"],
    personalizacoes:["Porção dupla (+R$10)","Calda de chocolate (+R$3)"],
    badge:"Favorito", veggie:true, disponivel:true, destaque:false
  },
  {
    id:10, nome:"Canjica com Coco", cat:"sobremesa",
    emoji:"🥛", preco:12.00,
    imagem:"/img/canjica.jpeg",
    desc:"Canjica de milho branco cremosa, cozida no leite de coco e canela. Servida quente ou fria, como preferir.",
    tags:["sem glúten","vegetariano"],
    personalizacoes:["Calda de caramelo (+R$3)","Amendoim extra (+R$2)"],
    badge:null, veggie:true, disponivel:true, destaque:false
  }
];

let pratoPedido = null;

function mostrarSecao(id, el) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));

  if (el) {
    el.classList.add('active');
  } else {
    
    const linkCorrespondente = document.querySelector(`.nav-links a[data-section="${id}"]`);
    if (linkCorrespondente) linkCorrespondente.classList.add('active');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (id === 'cardapio') renderCardapio();
  if (id === 'home') renderDestaques();
  if (id === 'admin') renderAdmin();
}

function renderCard(p, container) {
  const div = document.createElement('div');
  div.className = 'prato-card' + (p.disponivel ? '' : ' esgotado');
  div.dataset.cat = p.cat;
  div.dataset.veggie = p.veggie;

  const badgeHtml = p.badge ? `<div class="prato-badge${p.veggie ? ' veggie' : ''}">${p.badge}</div>` : '';
  const esgotadoHtml = !p.disponivel ? `<div class="esgotado-overlay">⛔ Esgotado</div>` : '';
  const tagsHtml = p.tags.map(t => {
    let cls = 'tag-alergenico';
    if (t.includes('vegano') || t.includes('vegetariano')) cls = 'tag-veggie';
    if (t.includes('serve') || t.includes('unidades') || t.includes('individual')) cls = 'tag-serve';
    return `<span class="tag ${cls}">${t}</span>`;
  }).join('');

  div.innerHTML = `
    <div class="prato-img${p.imagem ? ' prato-img--foto' : ''}">
      ${p.imagem ? '' : `<div class="prato-emoji">${p.emoji}</div>`}
      ${badgeHtml}${esgotadoHtml}
    </div>
    <div class="prato-body">
      <div class="prato-nome">${p.nome}</div>
      <div class="prato-desc">${p.desc}</div>
      <div class="prato-tags">${tagsHtml}</div>
      <div class="prato-footer">
        <div class="prato-preco">R$${p.preco.toFixed(2).replace('.', ',')}</div>
        <button class="btn-pedir" onclick="abrirModal(${p.id})" ${!p.disponivel ? 'disabled' : ''}>
          ${p.disponivel ? 'Fazer Pedido' : 'Indisponível'}
        </button>
      </div>
    </div>`;
  container.appendChild(div);

 
  if (p.imagem) {
    div.querySelector('.prato-img').style.backgroundImage = `url('${p.imagem}')` ;
  }
}

function renderDestaques() {
  const grid = document.getElementById('destaques-grid');
  if (!grid) return;
  grid.innerHTML = '';
  PRATOS.filter(p => p.destaque).forEach(p => renderCard(p, grid));
}

function renderCardapio() {
  const grid = document.getElementById('cardapio-grid');
  if (!grid) return;
  grid.innerHTML = '';
  PRATOS.forEach(p => renderCard(p, grid));
}

function filtrarPratos(cat, btn) {
  document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const cards = document.querySelectorAll('#cardapio-grid .prato-card');
  cards.forEach(c => {
    if (cat === 'todos') { c.style.display = ''; return; }
    if (cat === 'vegetariano') { c.style.display = c.dataset.veggie === 'true' ? '' : 'none'; return; }
    c.style.display = c.dataset.cat === cat ? '' : 'none';
  });
}

function renderAdmin() {
  const lista = document.getElementById('admin-lista');
  if (!lista) return;
  lista.innerHTML = '';
  PRATOS.forEach(p => {
    const div = document.createElement('div');
    div.className = 'admin-card';
    div.innerHTML = `
      <div class="admin-emoji">${p.emoji}</div>
      <div class="admin-prato-info">
        <div class="admin-prato-nome">${p.nome}</div>
        <div class="admin-prato-cat">${p.cat.replace('-', ' ')} · R$${p.preco.toFixed(2).replace('.', ',')}</div>
      </div>
      <div class="toggle-wrap">
        <span class="toggle-label ${p.disponivel ? 'disponivel' : 'esgotado-text'}" id="label-${p.id}">
          ${p.disponivel ? 'Disponível' : 'Esgotado'}
        </span>
        <button class="toggle${p.disponivel ? ' on' : ''}" id="toggle-${p.id}" onclick="togglePrato(${p.id})"></button>
      </div>`;
    lista.appendChild(div);
  });
}

function togglePrato(id) {
  const p = PRATOS.find(x => x.id === id);
  p.disponivel = !p.disponivel;
  const btn = document.getElementById('toggle-' + id);
  const lbl = document.getElementById('label-' + id);
  btn.classList.toggle('on', p.disponivel);
  lbl.textContent = p.disponivel ? 'Disponível' : 'Esgotado';
  lbl.className = 'toggle-label ' + (p.disponivel ? 'disponivel' : 'esgotado-text');
  mostrarToast(p.disponivel ? `✓ ${p.nome} marcado como Disponível` : `⛔ ${p.nome} marcado como Esgotado`);
}

function abrirModal(id) {
  pratoPedido = PRATOS.find(p => p.id === id);
  document.getElementById('modal-titulo').textContent = pratoPedido.nome;
  document.getElementById('modal-info').textContent = `R$${pratoPedido.preco.toFixed(2).replace('.', ',')} · ${pratoPedido.tags.join(' · ')}`;

  const opts = document.getElementById('personaliz-opts');
  opts.innerHTML = '';
  pratoPedido.personalizacoes.forEach((op, i) => {
    const div = document.createElement('div');
    div.className = 'personaliz-opt';
    div.innerHTML = `<input type="checkbox" id="p${i}"><label for="p${i}">${op}</label>`;
    opts.appendChild(div);
  });

  document.getElementById('campo-nome').value = '';
  document.getElementById('campo-tel').value = '';
  document.getElementById('campo-entrega').value = '';
  document.getElementById('campo-pagamento').value = '';
  document.getElementById('campo-obs').value = '';
  document.getElementById('endereco-wrap').style.display = 'none';

  document.getElementById('erro-nome').style.display = 'none';
  document.getElementById('erro-tel').style.display = 'none';

  document.getElementById('modalOverlay').classList.add('open');
}

function fecharModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

function toggleDelivery(val) {
  document.getElementById('endereco-wrap').style.display = val === 'delivery' ? 'block' : 'none';
}

function formatarCEP(el) {
  let v = el.value.replace(/\D/g, '');
  if (v.length > 5) v = v.slice(0, 5) + '-' + v.slice(5, 8);
  el.value = v;
}

async function buscarCEP() {
  const cep = document.getElementById('campo-cep').value.replace(/\D/g, '');
  if (cep.length !== 8) { mostrarToast('⚠️ CEP inválido. Informe 8 dígitos.'); return; }
  try {
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await res.json();
    if (data.erro) { mostrarToast('⚠️ CEP não encontrado.'); return; }
    document.getElementById('campo-rua').value = data.logradouro || '';
    document.getElementById('campo-bairro').value = data.bairro || '';
    document.getElementById('campo-cidade').value = `${data.localidade} – ${data.uf}`;
    document.getElementById('campo-num').focus();
  } catch (e) {
    mostrarToast('⚠️ Não foi possível buscar o CEP. Preencha manualmente.');
  }
}

function validarNome(campo) {
  const temNumero = /\d/.test(campo.value);
  const aviso = document.getElementById('erro-nome');
  if (temNumero) {
    campo.value = campo.value.replace(/\d/g, '');
    aviso.style.display = 'block';
  } else {
    aviso.style.display = 'none';
  }
  return !temNumero;
}

function validarTelefone(campo) {
  const temLetra = /[a-zA-ZÀ-ú]/.test(campo.value);
  const aviso = document.getElementById('erro-tel');
  if (temLetra) {
    campo.value = campo.value.replace(/[a-zA-ZÀ-ú]/g, '');
    aviso.style.display = 'block';
  } else {
    aviso.style.display = 'none';
  }
  return !temLetra;
}

function confirmarPedido() {
  const nomeCampo = document.getElementById('campo-nome');
  const telCampo = document.getElementById('campo-tel');
  const entrega = document.getElementById('campo-entrega').value;
  const pag = document.getElementById('campo-pagamento').value;

  const nomeValido = validarNome(nomeCampo) && nomeCampo.value.trim() !== '';
  const telValido = validarTelefone(telCampo) && telCampo.value.trim() !== '';

  if (!nomeValido || !telValido || !entrega || !pag) {
    mostrarToast('⚠️ Por favor, preencha todos os campos obrigatórios corretamente.');
    return;
  }

  if (entrega === 'delivery') {
    const rua = document.getElementById('campo-rua').value.trim();
    const num = document.getElementById('campo-num').value.trim();
    if (!rua || !num) {
      mostrarToast('⚠️ Preencha o endereço completo para delivery.');
      return;
    }
  }

  fecharModal();
  mostrarToast(`✓ Pedido de ${pratoPedido.nome} enviado com sucesso!`);
}

function mostrarToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}


// ═══ RESERVAS ═══
let resPessoas = 2;

function alterarPessoas(delta) {
  resPessoas = Math.max(1, Math.min(20, resPessoas + delta));
  document.getElementById('res-pessoas-num').textContent = resPessoas;
  document.getElementById('pessoas-label').textContent = resPessoas === 1 ? 'pessoa' : 'pessoas';
}

function validarResNome(campo) {
  const temNumero = /\d/.test(campo.value);
  const aviso = document.getElementById('rerro-nome');
  if (temNumero) { campo.value = campo.value.replace(/\d/g, ''); aviso.style.display = 'block'; }
  else aviso.style.display = 'none';
  return !temNumero && campo.value.trim() !== '';
}

function validarResEmail(campo) {
  const valido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campo.value);
  const aviso = document.getElementById('rerro-email');
  aviso.style.display = campo.value && !valido ? 'block' : 'none';
  return valido;
}

function validarResTel(campo) {
  const temLetra = /[a-zA-ZÀ-ú]/.test(campo.value);
  const aviso = document.getElementById('rerro-tel');
  if (temLetra) { campo.value = campo.value.replace(/[a-zA-ZÀ-ú]/g, ''); aviso.style.display = 'block'; }
  else aviso.style.display = 'none';
  return !temLetra && campo.value.trim() !== '';
}

function atualizarProgress(step) {
  for (let i = 1; i <= 3; i++) {
    const ind = document.getElementById('step-ind-' + i);
    if (!ind) continue;
    ind.classList.remove('active', 'done');
    if (i < step) ind.classList.add('done');
    else if (i === step) ind.classList.add('active');
  }
  const lines = document.querySelectorAll('.progress-line');
  lines.forEach((l, i) => { l.classList.toggle('done', i < step - 1); });
}

function avancarStep(step) {
  if (step === 2) {
    const nome = document.getElementById('res-nome');
    const email = document.getElementById('res-email');
    const tel = document.getElementById('res-tel');
    const nOk = validarResNome(nome) !== false && nome.value.trim() !== '';
    const eOk = validarResEmail(email);
    const tOk = validarResTel(tel) !== false && tel.value.trim() !== '';
    if (!nOk) { document.getElementById('rerro-nome').style.display = 'block'; nome.focus(); return; }
    if (!eOk) { document.getElementById('rerro-email').style.display = 'block'; email.focus(); return; }
    if (!tOk) { document.getElementById('rerro-tel').style.display = 'block'; tel.focus(); return; }

    const hoje = new Date(); hoje.setHours(0,0,0,0);
    const dataMin = hoje.toISOString().split('T')[0];
    document.getElementById('res-data').min = dataMin;
  }

  if (step === 3) {
    const data = document.getElementById('res-data').value;
    const hora = document.getElementById('res-hora').value;
    if (!data) { document.getElementById('rerro-data').style.display = 'block'; return; }
    else document.getElementById('rerro-data').style.display = 'none';
    if (!hora) { document.getElementById('rerro-hora').style.display = 'block'; return; }
    else document.getElementById('rerro-hora').style.display = 'none';

    const nome = document.getElementById('res-nome').value.trim();
    const tel = document.getElementById('res-tel').value.trim();
    const ocasiao = document.getElementById('res-ocasiao');
    const ocasiaoTxt = ocasiao.options[ocasiao.selectedIndex].text;
    const obs = document.getElementById('res-obs').value.trim();
    const dataFmt = new Date(data + 'T12:00:00').toLocaleDateString('pt-BR', { weekday:'long', day:'numeric', month:'long', year:'numeric' });

    document.getElementById('conf-nome').textContent = nome.split(' ')[0];
    document.getElementById('conf-tel').textContent = tel;
    let resumo = `<strong>Data:</strong> ${dataFmt}<br><strong>Horário:</strong> ${hora}<br><strong>Pessoas:</strong> ${resPessoas}<br>`;
    if (ocasiao.value) resumo += `<strong>Ocasião:</strong> ${ocasiaoTxt}<br>`;
    if (obs) resumo += `<strong>Observações:</strong> ${obs}`;
    document.getElementById('conf-resumo').innerHTML = resumo;
  }

  document.querySelectorAll('.form-step').forEach(s => s.style.display = 'none');
  document.getElementById('reserva-step-' + step).style.display = 'block';
  atualizarProgress(step);
  document.getElementById('reserva-form-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function voltarStep(step) {
  document.querySelectorAll('.form-step').forEach(s => s.style.display = 'none');
  document.getElementById('reserva-step-' + step).style.display = 'block';
  atualizarProgress(step);
}

function novaReserva() {
  document.getElementById('res-nome').value = '';
  document.getElementById('res-email').value = '';
  document.getElementById('res-tel').value = '';
  document.getElementById('res-data').value = '';
  document.getElementById('res-hora').value = '';
  document.getElementById('res-ocasiao').value = '';
  document.getElementById('res-obs').value = '';
  resPessoas = 2;
  document.getElementById('res-pessoas-num').textContent = '2';
  document.getElementById('pessoas-label').textContent = 'pessoas';
  avancarStep(1);
}
// Inicializar
renderDestaques();