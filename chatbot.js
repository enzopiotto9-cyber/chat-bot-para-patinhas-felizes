/* =========================================================
   Chatbot PATINHAS FELIZES — suporte e dúvidas
   Arquivo único: injeta o próprio CSS e HTML. Sem dependências.
   Uso: <script src="./js/chatbot.js" defer></script> antes de </body>
   ========================================================= */
(function () {
  "use strict";

  /* ---------- 1. CONFIGURAÇÃO (edite aqui) ---------- */
  const CONFIG = {
    nomeBot: "Pati",
    nomeLoja: "Patinhas Felizes",
    // ⚠ Troque pelos dados reais da loja:
    whatsapp: "5514999999999",          // DDI+DDD+número, só dígitos
    telefone: "(14) 99999-9999",
    email: "contato@patinhasfelizes.com.br",
    horario: "Segunda a sábado, das 8h às 18h",
    endereco: "Garça - SP (informe o endereço completo da loja aqui)",
    // Caminhos das páginas (ajuste se necessário)
    paginas: {
      home: "./index.html",
      servicos: "./servicos.html",
      galeria: "./galeria.html",
      contato: "./contato.html",
    },
  };

  /* ---------- 2. BASE DE CONHECIMENTO ---------- */
  const link = (url, texto) => `<a href="${url}">${texto}</a>`;

  const MENU = [
    "🛒 Produtos",
    "🚚 Entrega e frete",
    "💳 Pagamento",
    "💊 Medicamentos",
    "⭐ Opiniões de clientes",
    "👩‍💼 Falar com atendente",
  ];

  // Cada intenção: palavras-chave (sem acento, minúsculas) + resposta + sugestões
  const INTENCOES = [
    {
      id: "saudacao",
      kw: ["oi", "ola", "bom dia", "boa tarde", "boa noite", "e ai", "eae", "hello", "hey"],
      resp: () =>
        `Olá! 🐾 Eu sou a ${CONFIG.nomeBot}, assistente virtual da ${CONFIG.nomeLoja}. Como posso ajudar você e seu pet hoje?`,
      sug: MENU,
    },
    {
      id: "produtos",
      kw: ["produto", "produtos", "vende", "vendem", "catalogo", "tem pra", "o que tem", "loja"],
      resp: () =>
        `Trabalhamos com <b>potes, rações, medicamentos, coleiras e caminhas</b>, além de acessórios e itens de higiene para cães, gatos, aves, coelhos e roedores. 🐶🐱🐰<br>Veja tudo na página ${link(CONFIG.paginas.servicos, "Serviços")}.`,
      sug: ["🍖 Rações", "💊 Medicamentos", "🧴 Higiene", "🎀 Acessórios"],
    },
    {
      id: "racao",
      kw: ["racao", "racoes", "comida", "alimento", "alimentacao", "petisco", "extrusada", "special dog", "alcon"],
      resp: () =>
        `Temos rações para cães, aves e roedores. Alguns destaques da home:<br>
        • <b>Ração Special Dog</b> — R$ 105,28<br>
        • <b>Alcon Glub (500g)</b>, para aves — R$ 33,90<br>
        Veja mais em ${link(CONFIG.paginas.servicos, "Serviços")}. Para saber qual ração é ideal para seu pet, fale com nossa equipe!`,
      sug: ["👩‍💼 Falar com atendente", "🛒 Produtos"],
    },
    {
      id: "medicamento",
      kw: ["remedio", "remedios", "medicamento", "medicamentos", "antipulga", "pulga", "vermifugo", "carrapato", "tratamento", "vacina"],
      resp: () =>
        `Vendemos medicamentos <b>100% originais</b>, como antipulgas e vermífugos. 💊<br>
        ⚠️ Importante: não substituímos a consulta veterinária. Para dosagem ou diagnóstico, procure um veterinário. Em caso de emergência, procure atendimento imediato.`,
      sug: ["⭐ Opiniões de clientes", "🚚 Entrega e frete"],
    },
    {
      id: "higiene",
      kw: ["higiene", "shampoo", "condicionador", "banho", "escova", "dente", "tartaro", "peluche"],
      resp: () =>
        `Na linha de higiene temos <b>shampoos, condicionadores, escovas de dente</b> e mais, como o kit Peluche (shampoo, condicionador e brilho). 🛁✨ Confira em ${link(CONFIG.paginas.servicos, "Serviços")}.`,
      sug: ["🛒 Produtos", "⭐ Opiniões de clientes"],
    },
    {
      id: "acessorio",
      kw: ["acessorio", "acessorios", "coleira", "coleiras", "caminha", "cama", "pote", "potes", "gaiola", "roupa", "vestido", "escadinha", "brinquedo"],
      resp: () =>
        `Acessórios que temos:<br>
        • <b>Kit 3 Coleiras</b> — R$ 48,99<br>
        • <b>Gaiola para coelhos</b> — R$ 240,00<br>
        • Potes, caminhas, roupinhas e brinquedos. 🎀<br>
        Veja a vitrine completa em ${link(CONFIG.paginas.servicos, "Serviços")}.`,
      sug: ["🍖 Rações", "🛒 Produtos"],
    },
    {
      id: "preco",
      kw: ["preco", "precos", "valor", "valores", "quanto custa", "quanto e", "barato", "promocao", "desconto", "oferta"],
      resp: () =>
        `Alguns preços atuais:<br>
        • Ração Special Dog — R$ 105,28<br>
        • Gaiola para coelhos — R$ 240,00<br>
        • Alcon Glub 500g — R$ 33,90<br>
        • Kit 3 Coleiras — R$ 48,99<br>
        Veja os destaques em ${link(CONFIG.paginas.servicos, "Serviços")}.`,
      sug: ["🚚 Entrega e frete", "💳 Pagamento"],
    },
    {
      id: "frete",
      kw: ["frete", "entrega", "entregam", "prazo", "rastreio", "rastrear", "correio", "envio", "enviar", "chega", "demora"],
      resp: () =>
        `🚚 Nosso <b>frete é grátis</b>! O envio é rápido e acompanhado por <b>código de rastreio</b>. Os clientes costumam relatar que o pedido chega antes do prazo e bem embalado.`,
      sug: ["💳 Pagamento", "👩‍💼 Falar com atendente"],
    },
    {
      id: "pagamento",
      kw: ["pagamento", "pagar", "cartao", "pix", "boleto", "parcelar", "parcela", "seguro", "seguranca", "compra segura"],
      resp: () =>
        `💳 Nosso ambiente é <b>seguro para pagamentos online</b>. Para confirmar as formas de pagamento e parcelamento disponíveis (Pix, cartão, boleto), fale com nossa equipe pelo ${link(CONFIG.paginas.contato, "formulário de contato")} ou WhatsApp.`,
      sug: ["👩‍💼 Falar com atendente", "🚚 Entrega e frete"],
    },
    {
      id: "troca",
      kw: ["troca", "trocar", "devolucao", "devolver", "reembolso", "defeito", "errado", "arrependi", "cancelar", "cancelamento"],
      resp: () =>
        `Sentimos muito pelo transtorno! 😔 Para trocas, devoluções ou cancelamentos, nossa equipe resolve rapidinho. Envie o <b>número do pedido</b> pelo ${link(CONFIG.paginas.contato, "formulário de contato")} ou chame no WhatsApp.`,
      sug: ["👩‍💼 Falar com atendente"],
    },
    {
      id: "pedido",
      kw: ["pedido", "meu pedido", "status", "onde esta", "nao chegou", "atrasou", "atrasado"],
      resp: () =>
        `Para consultar seu pedido, use o <b>código de rastreio</b> enviado por e-mail. Se não chegou ou atrasou, chame nossa equipe com o número do pedido. 📦`,
      sug: ["👩‍💼 Falar com atendente", "🚚 Entrega e frete"],
    },
    {
      id: "avaliacoes",
      kw: ["opiniao", "opinioes", "avaliacao", "avaliacoes", "depoimento", "comentario", "clientes", "confiavel", "recomenda", "galeria"],
      resp: () =>
        `⭐ Na nossa ${link(CONFIG.paginas.galeria, "Galeria")} há depoimentos reais de clientes com fotos de seus pets: Shih Tzu, Husky, Cocker, papagaio, coelhinha, hamster e muito mais. Vale conferir!`,
      sug: ["🛒 Produtos", "💊 Medicamentos"],
    },
    {
      id: "horario",
      kw: ["horario", "funcionamento", "abre", "fecha", "aberto", "funciona", "atendimento"],
      resp: () =>
        `🕘 Atendimento: <b>${CONFIG.horario}</b>.<br>Nosso suporte online funciona a semana toda por e-mail e formulário.`,
      sug: ["📍 Endereço", "👩‍💼 Falar com atendente"],
    },
    {
      id: "endereco",
      kw: ["endereco", "onde fica", "localizacao", "local", "loja fisica", "mapa", "como chegar"],
      resp: () => `📍 ${CONFIG.endereco}`,
      sug: ["🕘 Horário", "👩‍💼 Falar com atendente"],
    },
    {
      id: "contato",
      kw: ["contato", "atendente", "humano", "pessoa", "falar com", "whatsapp", "zap", "telefone", "email", "ligar", "suporte", "ajuda"],
      resp: () =>
        `Claro! Fale com nossa equipe:<br>
        📱 <a href="https://wa.me/${CONFIG.whatsapp}" target="_blank" rel="noopener">WhatsApp ${CONFIG.telefone}</a><br>
        ✉️ ${CONFIG.email}<br>
        📝 ${link(CONFIG.paginas.contato, "Formulário de contato")}<br>
        🕘 ${CONFIG.horario}`,
      sug: ["🕘 Horário", "🛒 Produtos"],
    },
    {
      id: "quemsomos",
      kw: ["quem somos", "sobre", "empresa", "patinhas felizes", "historia"],
      resp: () =>
        `Somos o <b>Patinhas Felizes</b>, o petshop favorito do seu amigo com patas! 🐾 Cuidado e carinho para quem faz parte da família, com produtos de qualidade das melhores marcas.`,
      sug: ["🛒 Produtos", "⭐ Opiniões de clientes"],
    },
    {
      id: "redes",
      kw: ["instagram", "facebook", "rede social", "redes sociais", "youtube", "twitter", "tiktok", "siga"],
      resp: () => `Siga a gente nas redes sociais! Os ícones estão no rodapé de todas as páginas. 📸`,
      sug: ["🛒 Produtos"],
    },
    {
      id: "agradecimento",
      kw: ["obrigado", "obrigada", "valeu", "brigado", "agradeco", "thanks"],
      resp: () => `Por nada! 🐶💛 Se precisar de mais alguma coisa, é só chamar.`,
      sug: MENU.slice(0, 3),
    },
    {
      id: "tchau",
      kw: ["tchau", "ate mais", "ate logo", "adeus", "flw"],
      resp: () => `Até logo! Um abraço de patinha para você e seu pet! 🐾`,
      sug: [],
    },
  ];

  /* ---------- 3. MOTOR DE INTENÇÕES ---------- */
  const normalizar = (t) =>
    t
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  function responder(texto) {
    const t = " " + normalizar(texto) + " ";
    let melhor = null;
    let melhorPontos = 0;
    for (const it of INTENCOES) {
      let pontos = 0;
      for (const k of it.kw) {
        if (t.includes(" " + k + " ") || (k.length > 4 && t.includes(k))) {
          pontos += k.split(" ").length + 1; // frases valem mais
        }
      }
      if (pontos > melhorPontos) {
        melhorPontos = pontos;
        melhor = it;
      }
    }
    if (melhor) return { html: melhor.resp(), sug: melhor.sug };
    return {
      html: `Hmm, não entendi muito bem essa. 🐾 Posso ajudar com produtos, entrega, pagamento ou falar com um atendente. O que prefere?`,
      sug: MENU,
      fallback: true,
    };
  }

  /* ---------- 4. ESTILO ---------- */
  const CSS = `
  .pf-bot,.pf-bot *{box-sizing:border-box;font-family:'Segoe UI',Tahoma,sans-serif}
  .pf-bot{--azul:#1b3358;--ouro:#e3ae5e;--ouro2:#f0bd68;--areia:#ead2b3;--cobre:#c77727;--texto:#24364b;
    position:fixed;right:20px;bottom:20px;z-index:99999}
  .pf-fab{width:64px;height:64px;border-radius:50%;border:3px solid var(--ouro);background:var(--azul);color:#fff;
    font-size:28px;cursor:pointer;box-shadow:0 6px 18px rgba(27,51,88,.45);display:flex;align-items:center;justify-content:center;
    transition:transform .2s}
  .pf-fab:hover{transform:scale(1.08)}
  .pf-fab:focus-visible,.pf-bot button:focus-visible,.pf-bot input:focus-visible{outline:3px solid var(--ouro2);outline-offset:2px}
  .pf-badge{position:absolute;top:-4px;right:-4px;background:var(--cobre);color:#fff;font-size:12px;font-weight:700;
    width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid #fff}
  .pf-janela{position:absolute;right:0;bottom:80px;width:370px;max-width:calc(100vw - 24px);height:540px;max-height:calc(100vh - 110px);
    background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,.35);display:none;flex-direction:column;
    border:2px solid var(--azul)}
  .pf-bot.aberto .pf-janela{display:flex;animation:pfSobe .25s ease}
  @keyframes pfSobe{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
  .pf-topo{background:var(--azul);color:#fff;padding:12px 14px;display:flex;align-items:center;gap:10px;border-bottom:4px solid var(--ouro)}
  .pf-avatar{width:42px;height:42px;border-radius:50%;background:var(--ouro);display:flex;align-items:center;justify-content:center;font-size:22px}
  .pf-titulo{flex:1;line-height:1.2}
  .pf-titulo b{display:block;font-size:15px;color:var(--ouro2)}
  .pf-titulo span{font-size:12px;opacity:.85}
  .pf-titulo span::before{content:"";display:inline-block;width:8px;height:8px;border-radius:50%;background:#4cd964;margin-right:5px}
  .pf-fechar{background:none;border:0;color:#fff;font-size:22px;cursor:pointer;padding:4px 8px;border-radius:6px}
  .pf-fechar:hover{background:rgba(255,255,255,.15)}
  .pf-msgs{flex:1;overflow-y:auto;padding:14px;background:#faf5ec;display:flex;flex-direction:column;gap:10px}
  .pf-msg{max-width:86%;padding:10px 13px;border-radius:14px;font-size:14px;line-height:1.45;color:var(--texto);word-wrap:break-word;animation:pfSobe .2s ease}
  .pf-msg a{color:var(--cobre);font-weight:600}
  .pf-msg.bot{background:#fff;border:1px solid #e6d6bb;border-bottom-left-radius:4px;align-self:flex-start}
  .pf-msg.user{background:var(--azul);color:#fff;border-bottom-right-radius:4px;align-self:flex-end}
  .pf-digitando{display:flex;gap:4px;padding:12px 14px}
  .pf-digitando i{width:7px;height:7px;border-radius:50%;background:var(--cobre);animation:pfPulo 1s infinite}
  .pf-digitando i:nth-child(2){animation-delay:.15s}.pf-digitando i:nth-child(3){animation-delay:.3s}
  @keyframes pfPulo{0%,60%,100%{transform:translateY(0);opacity:.5}30%{transform:translateY(-5px);opacity:1}}
  .pf-sug{display:flex;flex-wrap:wrap;gap:6px;padding:0 14px 10px;background:#faf5ec}
  .pf-chip{background:#fff;border:1.5px solid var(--cobre);color:var(--cobre);border-radius:18px;padding:6px 12px;font-size:13px;cursor:pointer;font-weight:600;transition:.15s}
  .pf-chip:hover{background:var(--cobre);color:#fff}
  .pf-form{display:flex;gap:8px;padding:10px;background:#fff;border-top:1px solid #e6d6bb}
  .pf-form input{flex:1;border:1.5px solid #9aafc1;border-radius:22px;padding:10px 14px;font-size:14px;color:var(--texto)}
  .pf-form button{background:var(--cobre);color:#fff;border:0;border-radius:50%;width:42px;height:42px;font-size:18px;cursor:pointer}
  .pf-form button:hover{background:#a95f19}
  .pf-rodape{text-align:center;font-size:11px;color:#526779;padding:0 0 8px;background:#fff}
  @media (max-width:480px){
    .pf-bot{right:12px;bottom:12px}
    .pf-janela{position:fixed;right:8px;left:8px;bottom:84px;width:auto;max-width:none;height:calc(100vh - 100px)}
  }
  @media (prefers-reduced-motion:reduce){.pf-bot *{animation:none!important;transition:none!important}}
  `;

  /* ---------- 5. INTERFACE ---------- */
  function montar() {
    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);

    const root = document.createElement("div");
    root.className = "pf-bot";
    root.innerHTML = `
      <section class="pf-janela" role="dialog" aria-label="Chat de suporte ${CONFIG.nomeLoja}">
        <header class="pf-topo">
          <div class="pf-avatar" aria-hidden="true">🐾</div>
          <div class="pf-titulo"><b>${CONFIG.nomeBot} • ${CONFIG.nomeLoja}</b><span>Online agora</span></div>
          <button class="pf-fechar" aria-label="Fechar chat">✕</button>
        </header>
        <div class="pf-msgs" aria-live="polite"></div>
        <div class="pf-sug"></div>
        <form class="pf-form" autocomplete="off">
          <input type="text" placeholder="Digite sua dúvida..." aria-label="Digite sua mensagem" maxlength="200">
          <button type="submit" aria-label="Enviar">➤</button>
        </form>
        <div class="pf-rodape">Assistente virtual • respostas automáticas</div>
      </section>
      <button class="pf-fab" aria-label="Abrir chat de suporte">💬<span class="pf-badge">1</span></button>`;
    document.body.appendChild(root);

    const $ = (s) => root.querySelector(s);
    const msgs = $(".pf-msgs"), sug = $(".pf-sug"), form = $(".pf-form"),
      input = form.querySelector("input"), badge = $(".pf-badge");
    let iniciado = false, ocupado = false;

    const rolar = () => (msgs.scrollTop = msgs.scrollHeight);

    function addMsg(html, tipo) {
      const d = document.createElement("div");
      d.className = "pf-msg " + tipo;
      if (tipo === "user") d.textContent = html; else d.innerHTML = html;
      msgs.appendChild(d);
      rolar();
    }

    function setSug(lista) {
      sug.innerHTML = "";
      (lista || []).forEach((txt) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "pf-chip";
        b.textContent = txt;
        b.onclick = () => enviar(txt);
        sug.appendChild(b);
      });
      rolar();
    }

    function botResponde(r) {
      ocupado = true;
      setSug([]);
      const dig = document.createElement("div");
      dig.className = "pf-msg bot pf-digitando";
      dig.innerHTML = "<i></i><i></i><i></i>";
      msgs.appendChild(dig);
      rolar();
      setTimeout(() => {
        dig.remove();
        addMsg(r.html, "bot");
        setSug(r.sug);
        ocupado = false;
      }, 550 + Math.min(r.html.length * 3, 700));
    }

    function enviar(texto) {
      texto = (texto || "").trim();
      if (!texto || ocupado) return;
      addMsg(texto, "user");
      botResponde(responder(texto));
    }

    function abrir() {
      root.classList.add("aberto");
      badge.style.display = "none";
      if (!iniciado) {
        iniciado = true;
        botResponde({
          html: `Olá! 🐾 Eu sou a <b>${CONFIG.nomeBot}</b>, assistente virtual da <b>${CONFIG.nomeLoja}</b>. Posso tirar dúvidas sobre produtos, entrega, pagamento e muito mais. Como posso ajudar?`,
          sug: MENU,
        });
      }
      setTimeout(() => input.focus(), 50);
    }
    const fechar = () => root.classList.remove("aberto");

    $(".pf-fab").onclick = () => (root.classList.contains("aberto") ? fechar() : abrir());
    $(".pf-fechar").onclick = fechar;
    form.onsubmit = (e) => { e.preventDefault(); enviar(input.value); input.value = ""; };
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") fechar(); });

    // Permite abrir o chat por qualquer elemento: <a data-chatbot> ou o ícone "Chatbot" da página de contato
    document.querySelectorAll("[data-chatbot], img[alt='Chatbot']").forEach((el) => {
      el.style.cursor = "pointer";
      el.addEventListener("click", (e) => { e.preventDefault(); abrir(); });
    });
    window.PatinhasChat = { abrir, fechar };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", montar);
  else montar();
})();
