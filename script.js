/* ===== CONFIGURAÇÃO: edite aqui ===== */
const CFG={nome:'Nome da Bruxa',whats:'5511999999999'};
const SERVICOS=[
{n:'Leitura de Tarô',e:'🔮',d:'Orientação sobre amor, carreira e decisões, com leitura acolhedora.',i:'quem busca clareza em uma decisão',preco:'R$ 120',min:45,top:1},
{n:'Mapa Astral',e:'✨',d:'Seus talentos, desafios e ciclos a partir dos astros no seu nascimento.',i:'quem quer se conhecer melhor',preco:'R$ 180',min:60},
{n:'Consulta de Ervas',e:'🌿',d:'Chás, banhos e blends indicados para o seu momento.',i:'quem busca cuidado natural',preco:'R$ 100',min:40},
{n:'Rituais Lunares',e:'🕯️',d:'Rituais personalizados para cada fase da lua e novos ciclos.',i:'quem inicia ou encerra uma fase',preco:'R$ 140',min:50},
{n:'Limpeza Energética',e:'🛁',d:'Banhos, defumações e práticas para renovar a energia.',i:'quem sente cansaço e peso',preco:'R$ 110',min:40},
{n:'Aconselhamento',e:'🌙',d:'Conversa individual para organizar sentimentos e caminhos.',i:'quem precisa ser ouvida',preco:'R$ 130',min:50}];
const PACOTES=['Consulta Avulsa','Jornada Lunar (3 encontros)','Círculo Mensal'];
const QUIZ=[{q:'O que mais pesa para você hoje?',o:[['💞 Amor e relações',0],['🧭 Rumo e decisões',1],['🌫️ Cansaço e energia pesada',4],['🌱 Quero me reconectar com a natureza',2]]},
{q:'Como prefere ser atendida?',o:[['💻 Online','Online'],['🕯️ Presencial','Presencial']]}];
const PRODUTOS=[
{id:1,nome:'Chá de Camomila e Lavanda',cat:'Ervas',preco:25,e:'🍵',d:'Calma e sono tranquilo'},
{id:2,nome:'Blend Prosperidade',cat:'Ervas',preco:30,e:'🌿',d:'Alecrim, canela e louro'},
{id:3,nome:'Vela de Lua Cheia',cat:'Velas',preco:38,e:'🕯️',d:'Cera vegetal e óleos essenciais'},
{id:4,nome:'Vela de Alecrim',cat:'Velas',preco:35,e:'🕯️',d:'Clareza e proteção'},
{id:5,nome:'Ametista Bruta',cat:'Cristais',preco:45,e:'💎',d:'Intuição e serenidade'},
{id:6,nome:'Quartzo Verde',cat:'Cristais',preco:42,e:'🪨',d:'Equilíbrio e renovação'},
{id:7,nome:'Kit Banho de Ervas',cat:'Kits',preco:55,e:'🛁',d:'Mix de ervas para limpeza'},
{id:8,nome:'Kit Ritual da Lua',cat:'Kits',preco:89,e:'🌙',d:'Vela, ervas, cristal e guia'}];
const CARTAS=[['O Louco','🌱','Novos começos pedem coragem. Dê o primeiro passo.'],['A Sacerdotisa','🌙','Silencie e ouça sua intuição hoje.'],['A Imperatriz','🌸','Abundância e cuidado. Nutra o que você ama.'],['O Eremita','🕯️','Um tempo de recolhimento traz respostas.'],['A Roda da Fortuna','☸️','Ciclos mudam. Confie no movimento da vida.'],['A Força','🦁','Sua gentileza é a sua maior força.'],['A Estrela','⭐','Esperança e renovação estão a caminho.'],['A Lua','🌕','Nem tudo está claro. Siga com paciência.'],['O Sol','☀️','Alegria e vitalidade. Permita-se brilhar.'],['A Temperança','🌿','Equilíbrio e harmonia nas suas escolhas.']];
const FASES=[['Lua Nova','🌑','Hora de plantar intenções.'],['Lua Crescente','🌒','Dê ação aos seus planos.'],['Quarto Crescente','🌓','Persista nos desafios.'],['Gibosa Crescente','🌔','Ajuste e refine.'],['Lua Cheia','🌕','Celebre e agradeça.'],['Gibosa Minguante','🌖','Compartilhe o aprendizado.'],['Quarto Minguante','🌗','Solte o que pesa.'],['Lua Minguante','🌘','Descanse e se limpe.']];
const HORARIOS=['09:00','10:00','11:00','14:00','15:00','16:00','17:00','19:00'];

/* ===== Utilidades ===== */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const brl=n=>n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const wa=t=>window.open(`https://wa.me/${CFG.whats}?text=${encodeURIComponent(t)}`,'_blank');
const store={get(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch{}}};
const hoje=new Date().toISOString().slice(0,10);

/* ===== Tema, menu, progresso ===== */
const root=document.documentElement;
root.dataset.theme=store.get('tema','light');
$('#tema').onclick=()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';store.set('tema',root.dataset.theme)};
const nav=$('.nav');$('.menu-btn').onclick=()=>nav.classList.toggle('open');$$('a',nav).forEach(a=>a.onclick=()=>nav.classList.remove('open'));
addEventListener('scroll',()=>{const h=root,p=h.scrollTop/(h.scrollHeight-h.clientHeight)*100;$('#progress').style.width=p+'%';$('#topo').classList.toggle('on',h.scrollTop>700)},{passive:true});
$('#topo').onclick=()=>scrollTo({top:0,behavior:'smooth'});$('#ano').textContent=new Date().getFullYear();

/* ===== Lua (badge + aviso de próxima lua cheia) ===== */
const ciclo=29.530588,idade=((Date.now()-Date.UTC(2000,0,6,18,14))/864e5%ciclo+ciclo)%ciclo,f=FASES[Math.floor(idade/ciclo*8+.5)%8];
$('#lua').innerHTML=`<i>${f[1]}</i><span><b>${f[0]}</b><br>${f[2]}</span>`;
const dias=Math.round((ciclo/2-idade+ciclo)%ciclo);
$('#anuncio').innerHTML=`🌕 ${dias&&dias<28?`Próxima Lua Cheia em ${dias} dia${dias>1?'s':''}`:'Hoje é Lua Cheia'} • Primeira consulta com 15% off: código <b>LUA15</b>`;

/* ===== Serviços ===== */
$('#svc').innerHTML=SERVICOS.map(s=>`<article class="card reveal">${s.top?'<span class="tag">Mais procurado</span>':''}<i>${s.e}</i><h3>${s.n}</h3><p>${s.d}</p><small>Ideal para ${s.i}</small><div class="row"><b>${s.preco}</b><span>${s.min} min</span></div><a href="#agendar" class="btn moss" data-s="${s.n}">Agendar</a></article>`).join('');

/* ===== Quiz de recomendação ===== */
const qz=$('#quizbox');let qs=0,qa=[];
function quiz(){if(qs<QUIZ.length){const q=QUIZ[qs];qz.innerHTML=`<p class="step">Pergunta ${qs+1} de ${QUIZ.length}</p><h3>${q.q}</h3><div class="opts">${q.o.map((o,i)=>`<button data-o="${i}">${o[0]}</button>`).join('')}</div>`}
else{const s=SERVICOS[qa[0]];qz.innerHTML=`<p class="step">Sua consulta ideal</p><h3>${s.e} ${s.n}</h3><p>${s.d}</p><p><b>${s.preco}</b> • ${s.min} min • ${qa[1]}</p><br><a class="btn gold" href="#agendar" data-s="${s.n}" data-m="${qa[1]}">Agendar esta consulta</a><br><button class="link" data-r="1">Refazer</button>`}}
qz.onclick=e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.r){qs=0;qa=[]}else{qa.push(QUIZ[qs].o[b.dataset.o][1]);qs++}quiz()};quiz();

/* ===== Carta do dia ===== */
const cb=$('#carta-btn');
function mostrarCarta(){const [n,e,m]=CARTAS[[...hoje].reduce((a,c)=>a+c.charCodeAt(0),0)%CARTAS.length];$('#c-nome').textContent=n;$('#c-emoji').textContent=e;$('#c-msg').textContent=m;cb.classList.add('flip')}
cb.onclick=()=>{mostrarCarta();store.set('carta',hoje)};if(store.get('carta')===hoje)mostrarCarta();

/* ===== Loja e cesto ===== */
let cart=store.get('cart',{}),cat='Todos';const cats=['Todos',...new Set(PRODUTOS.map(p=>p.cat))];
$('#filtros').innerHTML=cats.map(c=>`<button class="${c===cat?'on':''}">${c}</button>`).join('');
$('#filtros').onclick=e=>{if(e.target.tagName!=='BUTTON')return;cat=e.target.textContent;$$('#filtros button').forEach(b=>b.classList.toggle('on',b===e.target));renderProdutos()};
function renderProdutos(){$('#produtos').innerHTML=PRODUTOS.filter(p=>cat==='Todos'||p.cat===cat).map(p=>`<article class="card prod"><div class="thumb">${p.e}</div><h3>${p.nome}</h3><p>${p.d}</p><strong>${brl(p.preco)}</strong><button class="btn moss" data-add="${p.id}">Adicionar ao cesto</button></article>`).join('')}
$('#produtos').onclick=e=>{const id=e.target.dataset.add;if(!id)return;cart[id]=(cart[id]||0)+1;renderCart();abrir(true)};
function renderCart(){let total=0,qtd=0;$('#itens').innerHTML=Object.entries(cart).map(([id,q])=>{const p=PRODUTOS.find(x=>x.id==id);total+=p.preco*q;qtd+=q;return`<div class="item"><span>${p.e} ${p.nome}<br><small>${brl(p.preco)}</small></span><span><button data-m="${id}">−</button> ${q} <button data-p="${id}">+</button></span></div>`}).join('')||'<p>Seu cesto está vazio 🌿</p>';$('#total').textContent=brl(total);$('#qtd').textContent=qtd;store.set('cart',cart)}
$('#itens').onclick=e=>{const{m,p}=e.target.dataset;if(p)cart[p]++;if(m&&--cart[m]<=0)delete cart[m];renderCart()};
const abrir=o=>{$('#drawer').classList.toggle('open',o);$('#veu').classList.toggle('on',o)};
$('#abrirCarrinho').onclick=()=>abrir(true);$('#fechar').onclick=$('#veu').onclick=()=>abrir(false);$('#limpar').onclick=()=>{cart={};renderCart()};
$('#finalizar').onclick=()=>{const l=Object.entries(cart).map(([id,q])=>{const p=PRODUTOS.find(x=>x.id==id);return`• ${q}x ${p.nome} (${brl(p.preco*q)})`});if(!l.length)return;wa(`Olá, ${CFG.nome}! Quero fazer este pedido:\n${l.join('\n')}\n\n${$('#total').textContent}`)};
renderProdutos();renderCart();

/* ===== Agendamento (preenchido por botões de serviços, pacotes e quiz) ===== */
const form=$('#form');let hora='';
form.servico.innerHTML+=[...SERVICOS.map(s=>s.n),...PACOTES].map(s=>`<option>${s}</option>`).join('');form.data.min=hoje;
$('#slots').innerHTML=HORARIOS.map(h=>`<button type="button">${h}</button>`).join('');
$('#slots').onclick=e=>{if(e.target.tagName!=='BUTTON')return;hora=e.target.textContent;$$('#slots button').forEach(b=>b.classList.toggle('on',b===e.target))};
document.addEventListener('click',e=>{const a=e.target.closest('[data-s]');if(!a)return;form.servico.value=a.dataset.s;if(a.dataset.m)form.modo.value=a.dataset.m});
form.onsubmit=e=>{e.preventDefault();const msg=$('#msg');if(!hora){msg.textContent='Escolha um horário 🌙';return}
const d=Object.fromEntries(new FormData(form)),dt=d.data.split('-').reverse().join('/');
wa(`Olá, ${CFG.nome}! Sou ${d.nome} e gostaria de agendar:\n• ${d.servico} (${d.modo})\n• ${dt} às ${hora}\n${d.mensagem?'• '+d.mensagem:''}`);
msg.textContent=`Obrigada, ${d.nome}! Finalize a confirmação no WhatsApp ✨`;form.reset();hora='';$$('#slots button').forEach(b=>b.classList.remove('on'))};

/* ===== Newsletter (conecte a Mailchimp, MailerLite etc.) ===== */
$('#news').onsubmit=e=>{e.preventDefault();e.target.innerHTML='<p class="msg" style="width:100%;color:var(--moss)">Inscrição feita! Bem-vinda ao círculo 🌿</p>'};

/* ===== Animações (após renderizar o conteúdo) ===== */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add('show');io.unobserve(e.target)}),{threshold:.12});
$$('.reveal').forEach(el=>io.observe(el));
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;co.unobserve(e.target);const b=e.target,n=+b.dataset.n;let i=0;const t=setInterval(()=>{i+=Math.ceil(n/50);if(i>=n){i=n;clearInterval(t)}b.textContent=i},30)}));
$$('[data-n]').forEach(b=>co.observe(b));