// ⚠️  SEGURANÇA — Credenciais do Firebase
// Estas chaves ficam visíveis no código-fonte público. Para proteger o projeto:
//   1. No console do Firebase → Configurações do projeto → Restrições de API:
//      limite o uso desta apiKey apenas ao(s) domínio(s) do seu site.
//   2. Em Firestore → Regras: exija autenticação para leitura/escrita sensível.
//   3. Em Authentication → Configurações: ative apenas os provedores necessários.
//   4. Nunca exponha chaves de serviço (service account) aqui — essas sim são secretas.
const firebaseConfig = {
  apiKey: "AIzaSyAkZwQ5HNk0oNIAQ-9OGSmpHp4rSBCDe98",
  authDomain: "sabor-de-casa-42bc7.firebaseapp.com",
  projectId: "sabor-de-casa-42bc7",
  storageBucket: "sabor-de-casa-42bc7.firebasestorage.app",
  messagingSenderId: "377348659218",
  appId: "1:377348659218:web:a7b7f3bd868565749820cb",
  measurementId: "G-1H2MW3KCNE"
};

firebase.initializeApp(firebaseConfig);
const db   = firebase.firestore();
const auth = firebase.auth();

// ── Observer de autenticação ──────────────────────────────────────────────────
auth.onAuthStateChanged(async usuario => {
  const loginScreen = document.getElementById('admin-login-screen');
  const painel      = document.getElementById('admin-painel');
  if (!loginScreen || !painel) return;

  if (usuario) {
    loginScreen.style.display = 'none';
    painel.style.display      = 'block';
    const label = document.getElementById('admin-usuario-label');
    if (label) label.textContent = 'Logado como: ' + usuario.email;

    // BUG FIX: onAuthStateChanged disparava antes de carregarDisponibilidades()
    // terminar, então renderAdmin() desenhava os toggles com os valores padrão
    // do array PRATOS (todos disponível), ignorando o que estava salvo no Firestore.
    // Agora aguardamos o carregamento antes de renderizar o painel.
    if (!disponibilidadesCarregadas) await carregarDisponibilidades();
    renderAdmin();
  } else {
    loginScreen.style.display = 'flex';
    painel.style.display      = 'none';
    const emailEl = document.getElementById('login-email');
    const senhaEl = document.getElementById('login-senha');
    if (emailEl) emailEl.value = '';
    if (senhaEl) senhaEl.value = '';
  }
});

// ── Dados do cardápio ─────────────────────────────────────────────────────────
const PRATOS = [
  {
    id:1, nome:"Feijoada Completa", cat:"prato-principal",
    emoji:"🫘", preco:45.00,
    imagem:"./img/frimesa-receitas-eisbein-1.jpg",
    desc:"Feijoada negra com carnes nobres, servida com arroz branco soltinho, farofa crocante, couve refogada e rodelas de laranja.",
    tags:["serve até 3 pessoas","contém glúten"],
    personalizacoes:["Substituir farofa por pirão","Sem pimenta","Couve extra (+R$3)","Laranja extra (+R$2)"],
    badge:"Popular", veggie:false, disponivel:true, destaque:true
  },
  {
    id:2, nome:"Escondidinho de Carne Seca", cat:"prato-principal",
    emoji:"🥘", preco:38.00,
    imagem:"./img/escondidinho.jpeg",
    desc:"Camadas generosas de mandioca cremosa com carne seca desfiada, gratinadas com queijo coalho e finalizada com manteiga de garrafa.",
    tags:["individual","sem glúten"],
    personalizacoes:["Frango no lugar de carne seca","Mandioca extra (+R$4)","Queijo extra (+R$5)","Sem pimenta"],
    badge:"Chef Recomenda", veggie:false, disponivel:true, destaque:true
  },
  {
    id:3, nome:"Arroz de Cuxá", cat:"prato-principal",
    emoji:"🍚", preco:32.00,
    imagem:"./img/cuxa.jpeg",
    desc:"Prato típico maranhense: arroz preparado com vinagreira fresca, gergelim torrado e camarão seco. Sabor único e inconfundível.",
    tags:["individual","contém frutos do mar"],
    personalizacoes:["Sem camarão (versão vegana)","Porção maior (+R$8)"],
    badge:"Típico MA", veggie:false, disponivel:true, destaque:false
  },
  {
    id:4, nome:"Moqueca de Peixe", cat:"prato-principal",
    emoji:"🐟", preco:52.00,
    imagem:"./img/moqueca.jpeg",
    desc:"Peixe fresco da pesca local cozido em leite de coco, azeite de dendê, tomate, cebola e coentro. Acompanha pirão e arroz.",
    tags:["serve até 2 pessoas","sem glúten","contém peixe"],
    personalizacoes:["Camarão no lugar do peixe (+R$15)","Versão sem dendê","Arroz extra (+R$5)"],
    badge:null, veggie:false, disponivel:true, destaque:true
  },
  {
    id:5, nome:"Baião de Dois", cat:"prato-principal",
    emoji:"🫙", preco:28.00,
    imagem:"./img/baiao.jpeg",
    desc:"Receita tradicional do nordeste com arroz e feijão-verde cozidos juntos, temperados com queijo coalho, bacon e ervas frescas.",
    tags:["individual","contém glúten"],
    personalizacoes:["Versão vegetariana (sem bacon)","Arroz integral","Queijo extra (+R$4)"],
    badge:null, veggie:false, disponivel:false, destaque:false
  },
  {
    id:6, nome:"Bolinho de Bacalhau", cat:"porcao",
    emoji:"🥙", preco:25.00,
    imagem:"./img/bolinho-bacalhau.jpeg",
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
    imagem:"./img/vegetariano.jpeg",
    desc:"Preparação especial que muda diariamente, sempre com legumes e verduras frescos da feira, grãos e um toque criativo do chef.",
    tags:["vegetariano","perguntar ao garçom"],
    personalizacoes:["Versão vegana","Porção extra (+R$10)"],
    badge:"Vegetariano", veggie:true, disponivel:true, destaque:false
  },
  {
    id:9, nome:"Pudim de Leite", cat:"sobremesa",
    emoji:"🍮", preco:14.00,
    imagem:"./img/pudim.jpeg",
    desc:"Pudim artesanal com receita secreta do sous chef Eduardo Castelo. Textura sedosa, caramelo dourado e gostinho de infância.",
    tags:["individual","contém leite"],
    personalizacoes:["Porção dupla (+R$10)","Calda de chocolate (+R$3)"],
    badge:"Favorito", veggie:true, disponivel:true, destaque:false
  },
  {
    id:10, nome:"Canjica com Coco", cat:"sobremesa",
    emoji:"🥛", preco:12.00,
    imagem:"./img/canjica.jpeg",
    desc:"Canjica de milho branco cremosa, cozida no leite de coco e canela. Servida quente ou fria, como preferir.",
    tags:["sem glúten","vegetariano"],
    personalizacoes:["Calda de caramelo (+R$3)","Amendoim extra (+R$2)"],
    badge:null, veggie:true, disponivel:true, destaque:false
  }
];

let pratoPedido = null;

// ── Navegação ─────────────────────────────────────────────────────────────────
function mostrarSecao(id, el) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  if (el) {
    el.classList.add('active');
  } else {
    const linkCorrespondente = document.querySelector('.nav-links a[data-section="' + id + '"]');
    if (linkCorrespondente) linkCorrespondente.classList.add('active');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (id === 'cardapio') {
    if (!disponibilidadesCarregadas) {
      carregarDisponibilidades().then(() => renderCardapio());
    } else {
      renderCardapio();
    }
  }
  if (id === 'home')  renderDestaques();
}

// ── Renderização de cards ─────────────────────────────────────────────────────
function renderCard(p, container) {
  const div = document.createElement('div');
  div.className = 'prato-card' + (p.disponivel ? '' : ' esgotado');
  div.dataset.cat    = p.cat;
  div.dataset.veggie = p.veggie;

  const badgeHtml    = p.badge ? '<div class="prato-badge' + (p.veggie ? ' veggie' : '') + '">' + p.badge + '</div>' : '';
  const esgotadoHtml = !p.disponivel ? '<div class="esgotado-overlay">Esgotado</div>' : '';
  const tagsHtml     = p.tags.map(t => {
    let cls = 'tag-alergenico';
    if (t.includes('vegano') || t.includes('vegetariano')) cls = 'tag-veggie';
    if (t.includes('serve') || t.includes('unidades') || t.includes('individual')) cls = 'tag-serve';
    return '<span class="tag ' + cls + '">' + t + '</span>';
  }).join('');

  div.innerHTML =
    '<div class="prato-img' + (p.imagem ? ' prato-img--foto' : '') + '">' +
      (p.imagem ? '' : '<div class="prato-emoji">' + p.emoji + '</div>') +
      badgeHtml + esgotadoHtml +
    '</div>' +
    '<div class="prato-body">' +
      '<div class="prato-nome">' + p.nome + '</div>' +
      '<div class="prato-desc">' + p.desc + '</div>' +
      '<div class="prato-tags">' + tagsHtml + '</div>' +
      '<div class="prato-footer">' +
        '<div class="prato-preco">R$' + p.preco.toFixed(2).replace('.', ',') + '</div>' +
        '<button class="btn-pedir"' + (!p.disponivel ? ' disabled' : '') + '>' +
          (p.disponivel ? 'Fazer Pedido' : 'Indisponível') +
        '</button>' +
      '</div>' +
    '</div>';

  container.appendChild(div);

  // AVISO 5: usar addEventListener em vez de onclick inline
  if (p.disponivel) {
    div.querySelector('.btn-pedir').addEventListener('click', () => abrirModal(p.id));
  }

  if (p.imagem) {
    div.querySelector('.prato-img').style.backgroundImage = "url('" + p.imagem + "')";
  }
}

let disponibilidadesCarregadas = false;

// ── Sincronização de disponibilidade com Firestore ────────────────────────────
// Carrega os overrides de disponibilidade salvos pelo admin e aplica sobre o
// array PRATOS antes de qualquer renderização. Pratos sem documento no Firestore
// mantêm o valor padrão definido em PRATOS.
async function carregarDisponibilidades() {
  try {
    const snapshot = await db.collection('pratos').get();
    snapshot.forEach(doc => {
      const dado  = doc.data();
      const prato = PRATOS.find(p => String(p.id) === doc.id);
      if (prato && typeof dado.disponivel === 'boolean') {
        prato.disponivel = dado.disponivel;
      }
    });
  } catch (erro) {
    console.warn('Não foi possível carregar disponibilidades do Firestore:', erro);
    // Em caso de falha de rede, o site continua com os valores padrão do array
  } finally {
    disponibilidadesCarregadas = true;
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

  // AVISO 1: garante que o cardápio está renderizado antes de filtrar.
  // Pode estar vazio se o usuário clicar num filtro antes do carregamento terminar.
  const grid = document.getElementById('cardapio-grid');
  if (grid && grid.children.length === 0) renderCardapio();

  const cards = document.querySelectorAll('#cardapio-grid .prato-card');
  cards.forEach(c => {
    if (cat === 'todos')       { c.style.display = ''; return; }
    if (cat === 'vegetariano') { c.style.display = c.dataset.veggie === 'true' ? '' : 'none'; return; }
    c.style.display = c.dataset.cat === cat ? '' : 'none';
  });
}

// ── Painel admin ──────────────────────────────────────────────────────────────
function renderAdmin() {
  if (!auth.currentUser) return;
  const lista = document.getElementById('admin-lista');
  if (!lista) return;
  lista.innerHTML = '';
  PRATOS.forEach(p => {
    const div = document.createElement('div');
    div.className = 'admin-card';
    div.innerHTML =
      '<div class="admin-emoji">' + p.emoji + '</div>' +
      '<div class="admin-prato-info">' +
        '<div class="admin-prato-nome">' + p.nome + '</div>' +
        '<div class="admin-prato-cat">' + p.cat.replace('-', ' ') + ' · R$' + p.preco.toFixed(2).replace('.', ',') + '</div>' +
      '</div>' +
      '<div class="toggle-wrap">' +
        '<span class="toggle-label ' + (p.disponivel ? 'disponivel' : 'esgotado-text') + '" id="label-' + p.id + '">' +
          (p.disponivel ? 'Disponível' : 'Esgotado') +
        '</span>' +
        '<button class="toggle' + (p.disponivel ? ' on' : '') + '" id="toggle-' + p.id + '"></button>' +
      '</div>';
    lista.appendChild(div);
    // AVISO 5: usar addEventListener em vez de onclick inline
    div.querySelector('#toggle-' + p.id).addEventListener('click', () => togglePrato(p.id));
  });
}

async function togglePrato(id) {
  const p   = PRATOS.find(x => x.id === id);
  const btn = document.getElementById('toggle-' + id);
  const lbl = document.getElementById('label-' + id);

  // Desabilita o botão durante a operação para evitar cliques duplos
  btn.disabled = true;
  btn.style.opacity = '0.5';

  const novoEstado = !p.disponivel;

  try {
    await db.collection('pratos').doc(String(id)).set(
      { disponivel: novoEstado },
      { merge: true }
    );

    // Só atualiza memória e UI após confirmação do Firestore
    p.disponivel     = novoEstado;
    btn.classList.toggle('on', p.disponivel);
    lbl.textContent  = p.disponivel ? 'Disponível' : 'Esgotado';
    lbl.className    = 'toggle-label ' + (p.disponivel ? 'disponivel' : 'esgotado-text');
    mostrarToast(p.disponivel
      ? '✓ ' + p.nome + ' marcado como Disponível'
      : '⛔ ' + p.nome + ' marcado como Esgotado'
    );
  } catch (erro) {
    console.error('Erro ao salvar disponibilidade:', erro);
    mostrarToast('⚠️ Não foi possível salvar. Verifique sua conexão.');
  } finally {
    btn.disabled     = false;
    btn.style.opacity = '';
  }
}

// ── Autenticação ──────────────────────────────────────────────────────────────
async function fazerLogin() {
  const emailEl = document.getElementById('login-email');
  const senhaEl = document.getElementById('login-senha');
  const erroEl  = document.getElementById('login-erro');
  const btnEl   = document.getElementById('btn-login');

  const email = emailEl.value.trim();
  const senha = senhaEl.value;

  if (!email || !senha) {
    erroEl.textContent = '⚠️ Preencha e-mail e senha.';
    erroEl.style.display = 'block';
    return;
  }

  btnEl.textContent    = '⏳ Entrando...';
  btnEl.disabled       = true;
  erroEl.style.display = 'none';

  try {
    await auth.signInWithEmailAndPassword(email, senha);
  } catch (erro) {
    const msgs = {
      'auth/user-not-found':     '❌ E-mail não cadastrado.',
      'auth/wrong-password':     '❌ Senha incorreta.',
      'auth/invalid-email':      '❌ E-mail inválido.',
      'auth/too-many-requests':  '❌ Muitas tentativas. Tente mais tarde.',
      'auth/invalid-credential': '❌ E-mail ou senha incorretos.'
    };
    erroEl.textContent   = msgs[erro.code] || '❌ Erro ao autenticar. Tente novamente.';
    erroEl.style.display = 'block';
  } finally {
    btnEl.textContent = 'Entrar';
    btnEl.disabled    = false;
  }
}

async function fazerLogout() {
  await auth.signOut();
  mostrarToast('✓ Sessão encerrada com sucesso.');
}

function toggleSenha() {
  const campo = document.getElementById('login-senha');
  campo.type  = campo.type === 'password' ? 'text' : 'password';
}


// Extrai o valor extra de uma string de personalização.
// Ex: "Queijo extra (+R$5)"  →  5
//     "Sem pimenta"          →  0
function extrairValorExtra(texto) {
  const match = texto.match(/\(\+R\$(\d+(?:[.,]\d+)?)\)/);
  if (!match) return 0;
  return parseFloat(match[1].replace(',', '.'));
}

// Recalcula e exibe o preço total (base + adicionais marcados)
function atualizarPrecoModal() {
  let total = pratoPedido.preco;
  document.querySelectorAll('#personaliz-opts input[type="checkbox"]').forEach(cb => {
    if (cb.checked) total += extrairValorExtra(cb.dataset.extra || '');
  });
  const infoEl = document.getElementById('modal-info');
  const tagsStr = pratoPedido.tags.join(' · ');
  infoEl.textContent = 'R$' + total.toFixed(2).replace('.', ',') + ' · ' + tagsStr;
  infoEl.dataset.total = total;
}

// ── Modal de pedido ───────────────────────────────────────────────────────────
function abrirModal(id) {
  pratoPedido = PRATOS.find(p => p.id === id);
  document.getElementById('modal-titulo').textContent = pratoPedido.nome;

  const opts = document.getElementById('personaliz-opts');
  opts.innerHTML = '';
  pratoPedido.personalizacoes.forEach(function(op, i) {
    const div = document.createElement('div');
    div.className = 'personaliz-opt';
    const cbId = 'p' + pratoPedido.id + '-' + i;
    const extra = extrairValorExtra(op);
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.id = cbId;
    cb.dataset.extra = op;   // guarda o texto completo para extração posterior
    cb.addEventListener('change', atualizarPrecoModal);
    const lbl = document.createElement('label');
    lbl.htmlFor = cbId;
    lbl.textContent = op;
    div.appendChild(cb);
    div.appendChild(lbl);
    opts.appendChild(div);
  });

  // Exibe preço base antes de qualquer seleção
  atualizarPrecoModal();


  document.getElementById('campo-nome').value      = '';
  document.getElementById('campo-tel').value       = '';
  document.getElementById('campo-entrega').value   = '';
  document.getElementById('campo-pagamento').value = '';
  document.getElementById('campo-obs').value       = '';
  // CORREÇÃO 3: limpar campos de endereço para não vazar dados de pedido anterior
  document.getElementById('campo-cep').value    = '';
  document.getElementById('campo-rua').value    = '';
  document.getElementById('campo-num').value    = '';
  document.getElementById('campo-bairro').value = '';
  document.getElementById('campo-cidade').value = '';
  document.getElementById('endereco-wrap').style.display = 'none';
  document.getElementById('erro-nome').style.display    = 'none';
  document.getElementById('erro-tel').style.display     = 'none';

  document.getElementById('modalOverlay').classList.add('open');
}

function fecharModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

function toggleDelivery(val) {
  document.getElementById('endereco-wrap').style.display = val === 'delivery' ? 'block' : 'none';
}

// ── CEP ───────────────────────────────────────────────────────────────────────
function formatarCEP(el) {
  let v = el.value.replace(/\D/g, '');
  if (v.length > 5) v = v.slice(0, 5) + '-' + v.slice(5, 8);
  el.value = v;
}

async function buscarCEP() {
  const cep = document.getElementById('campo-cep').value.replace(/\D/g, '');
  if (cep.length !== 8) { mostrarToast('⚠️ CEP inválido. Informe 8 dígitos.'); return; }

  const btn = document.querySelector('.cep-btn');
  const textoOriginal = btn.textContent;
  btn.textContent = 'Buscando...';
  btn.disabled    = true;

  // Timeout de 8 s para não deixar o usuário esperando indefinidamente
  const controller = new AbortController();
  const timeout    = setTimeout(() => controller.abort(), 8000);

  try {
    const res  = await fetch('https://viacep.com.br/ws/' + cep + '/json/', { signal: controller.signal });
    const data = await res.json();
    if (data.erro) { mostrarToast('⚠️ CEP não encontrado.'); return; }
    document.getElementById('campo-rua').value    = data.logradouro || '';
    document.getElementById('campo-bairro').value = data.bairro     || '';
    document.getElementById('campo-cidade').value = data.localidade + ' – ' + data.uf;
    document.getElementById('campo-num').focus();
  } catch (e) {
    const msg = e.name === 'AbortError'
      ? '⚠️ A busca demorou demais. Verifique sua conexão ou preencha manualmente.'
      : '⚠️ Não foi possível buscar o CEP. Preencha manualmente.';
    mostrarToast(msg);
  } finally {
    clearTimeout(timeout);
    btn.textContent = textoOriginal;
    btn.disabled    = false;
  }
}

// ── Validações ────────────────────────────────────────────────────────────────
function validarNome(campo) {
  // AVISO 2: não apagar dígitos silenciosamente — isso confunde o usuário ao colar texto.
  // Apenas mostra o aviso; a remoção acontece somente no momento de confirmar o pedido.
  const temNumero = /\d/.test(campo.value);
  const aviso     = document.getElementById('erro-nome');
  aviso.style.display = temNumero ? 'block' : 'none';
  return !temNumero;
}

function validarTelefone(campo) {
  // Remove tudo que não seja dígito, espaço, parêntese ou hífen
  campo.value = campo.value.replace(/[^0-9\s()\-]/g, '');
  const aviso  = document.getElementById('erro-tel');
  const limpo  = campo.value.replace(/\D/g, '');
  const valido = limpo.length >= 10 && limpo.length <= 11;
  aviso.style.display = (!valido && campo.value.length > 0) ? 'block' : 'none';
  return valido;
}

// ── Envio do pedido ───────────────────────────────────────────────────────────
async function confirmarPedido() {
  const nomeCampo = document.getElementById('campo-nome');
  const telCampo  = document.getElementById('campo-tel');
  const entrega   = document.getElementById('campo-entrega').value;
  const pag       = document.getElementById('campo-pagamento').value;

  const nomeValido = validarNome(nomeCampo) && nomeCampo.value.trim() !== '';
  // Remove dígitos do nome somente na hora de enviar (validarNome só avisa inline)
  if (!nomeValido) nomeCampo.value = nomeCampo.value.replace(/\d/g, '').trim();
  validarTelefone(telCampo);
  const telLimpo  = telCampo.value.replace(/\D/g, '');
  const telValido = telLimpo.length >= 10 && telLimpo.length <= 11;

  if (!nomeValido || !telValido || !entrega || !pag) {
    mostrarToast('⚠️ Por favor, preencha todos os campos obrigatórios corretamente.');
    return;
  }

  // Coleta personalizações marcadas e calcula acréscimos
  const personalizacoesSelecionadas = [];
  let acrescimos = 0;
  document.querySelectorAll('#personaliz-opts input[type="checkbox"]').forEach(cb => {
    if (cb.checked) {
      personalizacoesSelecionadas.push(cb.dataset.extra);
      acrescimos += extrairValorExtra(cb.dataset.extra);
    }
  });
  const precoFinal = pratoPedido.preco + acrescimos;

  const dadosDoPedido = {
    prato:            pratoPedido.nome,
    precoBase:       pratoPedido.preco,
    acrescimos:      acrescimos,
    precoTotal:      precoFinal,
    personalizacoes: personalizacoesSelecionadas,
    cliente:         nomeCampo.value.trim(),
    telefone:        telCampo.value.trim(),
    tipoEntrega:     entrega,
    formaPagamento:  pag,
    observacoes:     document.getElementById('campo-obs').value.trim(),
    data:            new Date().toLocaleString('pt-BR')
  };

  if (entrega === 'delivery') {
    const cep    = document.getElementById('campo-cep').value.replace(/\D/g, '');
    const rua    = document.getElementById('campo-rua').value.trim();
    const num    = document.getElementById('campo-num').value.trim();
    const cidade = document.getElementById('campo-cidade').value.trim();

    if (cep.length !== 8 || !cidade) {
      mostrarToast('⚠️ Busque o CEP antes de confirmar o pedido.');
      document.getElementById('campo-cep').focus();
      return;
    }
    // CORREÇÃO 4: incluir bairro na validação — campo pode vir vazio do ViaCEP
    const bairro = document.getElementById('campo-bairro').value.trim();
    if (!rua || !num || !bairro) {
      mostrarToast('⚠️ Preencha rua, número e bairro para delivery.');
      return;
    }

    dadosDoPedido.endereco = rua + ', ' + num
      + ' - ' + bairro
      + ' - ' + cidade
      + ' - CEP ' + document.getElementById('campo-cep').value.trim();
  }

  const btnConfirmar  = document.querySelector('.btn-confirmar');
  const textoOriginal = btnConfirmar.textContent;
  btnConfirmar.textContent = '⏳ Enviando...';
  btnConfirmar.disabled    = true;

  try {
    await db.collection("pedidos").add(dadosDoPedido);
    fecharModal();
    mostrarToast('✓ Pedido de ' + pratoPedido.nome + ' (R$' + precoFinal.toFixed(2).replace('.', ',') + ') enviado com sucesso!');
  } catch (erro) {
    console.error("Erro:", erro);
    mostrarToast('⚠️ Erro ao conectar com o banco de dados.');
  } finally {
    btnConfirmar.textContent = textoOriginal;
    btnConfirmar.disabled    = false;
  }
}

// ── Toast ─────────────────────────────────────────────────────────────────────
function mostrarToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}


// ── Event listeners ────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  // Nav principal + rodapé: qualquer <a data-section="..."> navega para a seção
  document.querySelectorAll('a[data-section]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      mostrarSecao(link.dataset.section, link);
    });
  });

  // Filtros do cardápio
  document.querySelectorAll('.filtro-btn').forEach(btn => {
    btn.addEventListener('click', () => filtrarPratos(btn.dataset.cat, btn));
  });

  // Login: Enter nos campos de e-mail e senha
  ['login-email', 'login-senha'].forEach(id => {
    document.getElementById(id).addEventListener('keydown', e => {
      if (e.key === 'Enter') fazerLogin();
    });
  });

  // Login: botão Entrar
  document.getElementById('btn-login')
    .addEventListener('click', fazerLogin);

  // Login: mostrar/ocultar senha
  document.getElementById('btn-toggle-senha')
    .addEventListener('click', toggleSenha);

  // Admin: botão Sair
  document.getElementById('btn-logout')
    .addEventListener('click', fazerLogout);

  // Modal: fechar pelo botão X
  document.getElementById('btn-fechar-modal')
    .addEventListener('click', fecharModal);

  // Modal: fechar clicando no overlay
  document.getElementById('modalOverlay')
    .addEventListener('click', e => {
      if (e.target.id === 'modalOverlay') fecharModal();
    });

  // Modal: validação ao digitar nome
  document.getElementById('campo-nome')
    .addEventListener('input', function() { validarNome(this); });

  // Modal: validação ao digitar telefone
  document.getElementById('campo-tel')
    .addEventListener('input', function() { validarTelefone(this); });

  // Modal: alternar campos de endereço conforme tipo de entrega
  document.getElementById('campo-entrega')
    .addEventListener('change', function() { toggleDelivery(this.value); });

  // Modal: formatar CEP ao digitar
  document.getElementById('campo-cep')
    .addEventListener('input', function() { formatarCEP(this); });

  // Modal: buscar CEP
  document.getElementById('btn-buscar-cep')
    .addEventListener('click', buscarCEP);

  // Modal: confirmar pedido
  document.getElementById('btn-confirmar-pedido')
    .addEventListener('click', confirmarPedido);

  // Init: carregar disponibilidades do Firestore e renderizar destaques
  carregarDisponibilidades().then(() => renderDestaques());
});