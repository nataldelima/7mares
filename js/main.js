/**
 * 7 MARES ARRAIS - ESCOLA NÁUTICA
 * Main JavaScript Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroSlider();
  initModals();
  initQuiz();
});

/* --- Navbar & Smooth Scroll --- */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isExpanded = navMenu.classList.contains('active');
      toggleBtn.innerHTML = isExpanded ? '✕' : '☰';
    });
  }

  // Active link highlight & smooth scroll
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          if (toggleBtn) toggleBtn.innerHTML = '☰';
        }

        const targetElem = document.querySelector(targetId);
        if (targetElem) {
          const headerHeight = header.offsetHeight;
          const elementPosition = targetElem.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - headerHeight,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

/* --- Hero Carousel Slider --- */
const heroSlides = [
  {
    tag: "ESCOLA NÁUTICA",
    title: "7 MARES ARRAIS",
    subtitle: "Sua habilitação náutica com segurança, experiência e profissionalismo.",
    ctaText: "Nossos Cursos",
    ctaLink: "#cursos",
    badgeItems: ["Arrais Amador", "Motonauta", "Inclusão de Motonauta"]
  },
  {
    tag: "CURSOS HOMOLOGADOS PELA MARINHA",
    title: "LIBERDADE NO MAR & RIOS",
    subtitle: "Aulas práticas com instrutores da Marinha e embarcações modernas para seu aprendizado rápido.",
    ctaText: "Ver Turmas Abertas",
    ctaLink: "#cursos",
    badgeItems: ["Aulas Práticas no Lago", "Material Didático Completo", "Simulados Oficiais"]
  },
  {
    tag: "SERVIÇO ESPECIALIZADO",
    title: "DESPACHANTE NÁUTICO",
    subtitle: "Regularize sua lancha, moto aquática ou barco com quem entende e cuida de toda a burocracia.",
    ctaText: "Falar no WhatsApp",
    ctaLink: "https://wa.me/5567991155339?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20servi%C3%A7os%20de%20despachante%20n%C3%A1utico",
    badgeItems: ["Transferência de TIE", "Inscrição na Capitania", "Renovação de CHA"]
  }
];

let currentSlideIndex = 0;
let slideInterval;

function initHeroSlider() {
  const prevBtn = document.querySelector('.hero-nav-arrow.prev');
  const nextBtn = document.querySelector('.hero-nav-arrow.next');
  const dots = document.querySelectorAll('.hero-dot');

  if (!prevBtn || !nextBtn) return;

  function renderSlide(index) {
    const slide = heroSlides[index];
    const tagElem = document.querySelector('.hero-tag');
    const titleElem = document.querySelector('.hero-title');
    const subElem = document.querySelector('.hero-subtitle');
    const ctaBtn = document.querySelector('.btn-cursos-hero span');
    const ctaLink = document.querySelector('.btn-cursos-hero');
    const listElem = document.querySelector('.hero-badge-list');

    if (tagElem) tagElem.textContent = slide.tag;
    if (titleElem) titleElem.textContent = slide.title;
    if (subElem) subElem.textContent = slide.subtitle;
    if (ctaBtn) ctaBtn.textContent = slide.ctaText;
    if (ctaLink) ctaLink.setAttribute('href', slide.ctaLink);

    if (listElem) {
      listElem.innerHTML = slide.badgeItems
        .map(item => `<div class="hero-badge-item">${item}</div>`)
        .join('');
    }

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % heroSlides.length;
    renderSlide(currentSlideIndex);
  }

  function prevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + heroSlides.length) % heroSlides.length;
    renderSlide(currentSlideIndex);
  }

  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetInterval();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetInterval();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      currentSlideIndex = idx;
      renderSlide(currentSlideIndex);
      resetInterval();
    });
  });

  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 7000);
  }

  resetInterval();
}

/* --- Modals Controller (Mural do Aluno & Pré-Matrícula) --- */
function initModals() {
  const muralModal = document.getElementById('modalMural');
  const matriculaModal = document.getElementById('modalMatricula');
  const detailsModal = document.getElementById('modalDetails');

  // Mural Triggers
  const openMuralBtns = document.querySelectorAll('.open-mural-btn');
  openMuralBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(muralModal);
    });
  });

  // Matricula Triggers - CORRIGIDO PARA RADIO BUTTONS
  const openMatriculaBtns = document.querySelectorAll('.open-matricula-btn');
  openMatriculaBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const course = btn.getAttribute('data-course');

      if (course) {
        // Encontra o radio button correspondente e marca
        const radios = document.getElementsByName('curso');
        const courseKeyword = course.toLowerCase().split(' ')[0]; // Pega a primeira palavra (ex: "arrais", "motonauta")

        for (let i = 0; i < radios.length; i++) {
          if (radios[i].value.toLowerCase().includes(courseKeyword)) {
            radios[i].checked = true;
            break;
          }
        }
      }
      openModal(matriculaModal);
    });
  });

  // Close buttons
  const closeBtns = document.querySelectorAll('.modal-close-btn');
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      closeAllModals();
    });
  });

  // Close when clicking overlay backdrop
  const overlays = document.querySelectorAll('.modal-overlay');
  overlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeAllModals();
      }
    });
  });

  // Escape key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  // Mural Login form submission
  const loginForm = document.getElementById('muralLoginForm');
  const studentDashboard = document.getElementById('studentDashboard');

  if (loginForm && studentDashboard) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      loginForm.style.display = 'none';
      studentDashboard.style.display = 'block';
    });
  }

  // Pre-matricula form submission to WhatsApp
  const matriculaForm = document.getElementById('matriculaForm');
  if (matriculaForm) {
    matriculaForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.getElementById('matriculaEmail').value;
      const nome = document.getElementById('matriculaNome').value;
      const cidade = document.getElementById('matriculaCidade').value;
      const zap = document.getElementById('matriculaZap').value;
      const mensagem = document.getElementById('matriculaMensagem').value;

      // Capturando o valor do botão de rádio selecionado
      let cursoSelecionado = "Não especificado";
      const radios = document.getElementsByName('curso');
      for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
          cursoSelecionado = radios[i].value;
          break;
        }
      }

      // Montando a mensagem para o WhatsApp
      const msg = `Olá! Gostaria de fazer a Pré-Matrícula na 7 Mares Arrais.%0A%0A` +
        `*Nome:* ${encodeURIComponent(nome)}%0A` +
        `*E-mail:* ${encodeURIComponent(email)}%0A` +
        `*Cidade:* ${encodeURIComponent(cidade)}%0A` +
        `*Telefone:* ${encodeURIComponent(zap)}%0A` +
        `*Curso Pretendido:* ${encodeURIComponent(cursoSelecionado)}%0A` +
        `*Mensagem:* ${encodeURIComponent(mensagem)}`;

      window.open(`https://wa.me/5567991155339?text=${msg}`, '_blank');
      closeAllModals();
      matriculaForm.reset(); // Limpa o formulário após o envio
    });
  }
}

function openModal(modal) {
  if (modal) modal.classList.add('active');
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.classList.remove('active');
  });
}

/* --- Interactive Quiz inside Student Portal --- */
const quizQuestions = [
  {
    question: "1. Segundo as normas da Marinha do Brasil, quem tem preferência em um canal estreito?",
    options: [
      "A embarcação que estiver descendo a favor da corrente.",
      "Qualquer moto aquática em alta velocidade.",
      "A embarcação que estiver subindo contra a corrente.",
      "A embarcação que possuir maior potência de motor."
    ],
    correct: 0
  },
  {
    question: "2. O uso do colete salva-vidas homologado é obrigatório para:",
    options: [
      "Apenas o comandante da embarcação.",
      "Todos os tripulantes e passageiros em motos aquáticas (jet ski).",
      "Somente em navegação noturna.",
      "Apenas crianças menores de 12 anos em lanchas ancoradas."
    ],
    correct: 1
  },
  {
    question: "3. Uma boia ou sinalização circular vermelha e branca na água indica:",
    options: [
      "Área de ancoragem livre para todos.",
      "Presença de mergulhador em atividade na água.",
      "Velocidade máxima liberada sem restrições.",
      "Zona de pesca exclusiva."
    ],
    correct: 1
  }
];

let currentQuizIdx = 0;
let quizScore = 0;

function initQuiz() {
  const quizBox = document.getElementById('quizContainer');
  const startQuizBtn = document.getElementById('btnStartQuiz');
  if (!quizBox || !startQuizBtn) return;

  startQuizBtn.addEventListener('click', () => {
    startQuizBtn.style.display = 'none';
    quizBox.classList.add('active');
    currentQuizIdx = 0;
    quizScore = 0;
    renderQuestion(currentQuizIdx);
  });

  function renderQuestion(index) {
    if (index >= quizQuestions.length) {
      quizBox.innerHTML = `
        <div style="text-align:center; padding:15px;">
          <h4 style="font-family:var(--font-heading); color:var(--navy-900); margin-bottom:8px;">
            🎉 Simulado Concluído!
          </h4>
          <p style="font-size:0.95rem; color:var(--slate-600); margin-bottom:15px;">
            Você acertou <strong>${quizScore}</strong> de <strong>${quizQuestions.length}</strong> questões da Marinha!
          </p>
          <button id="btnRestartQuiz" class="btn-curso-matricula" style="padding:8px 18px; width:auto;">
            Fazer Novo Simulado
          </button>
        </div>
      `;
      document.getElementById('btnRestartQuiz').addEventListener('click', () => {
        currentQuizIdx = 0;
        quizScore = 0;
        renderQuestion(0);
      });
      return;
    }

    const q = quizQuestions[index];
    quizBox.innerHTML = `
      <div class="quiz-question-title">${q.question}</div>
      <div class="quiz-options">
        ${q.options.map((opt, i) => `
          <button class="quiz-option" data-idx="${i}">${opt}</button>
        `).join('')}
      </div>
      <div style="font-size:0.75rem; color:var(--slate-500); text-align:right;">
        Questão ${index + 1} de ${quizQuestions.length}
      </div>
    `;

    const optionBtns = quizBox.querySelectorAll('.quiz-option');
    optionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedIdx = parseInt(btn.getAttribute('data-idx'), 10);
        optionBtns.forEach(b => b.disabled = true);
        if (selectedIdx === q.correct) {
          btn.classList.add('correct');
          quizScore++;
        } else {
          btn.classList.add('wrong');
          optionBtns[q.correct].classList.add('correct');
        }
        setTimeout(() => {
          currentQuizIdx++;
          renderQuestion(currentQuizIdx);
        }, 1200);
      });
    });
  }
}

// Global helper for opening course modal with details
window.openCourseDetail = function (courseKey) {
  const details = {
    arrais: {
      title: "Arrais Amador",
      badge: "Habilitação Oficial",
      desc: "Habilitação náutica obrigatória para conduzir embarcações de esporte e recreio (lanchas, barcos a motor e veleiros) em águas interiores abrigadas (rios, lagos, represas, baias e enseadas).",
      requisitos: "Mínimo 18 anos, cópia do RG/CPF ou CNH, comprovante de residência e atestado médico para atividade náutica.",
      carga: "Teoria online + 6 horas de aula prática em embarcação homologada pela Marinha.",
      whatsappMsg: "Olá! Gostaria de detalhes e valores para o curso de Arrais Amador."
    },
    motonauta: {
      title: "Motonauta",
      badge: "Motos Aquáticas / Jet Ski",
      desc: "Permissão náutica da Marinha do Brasil para pilotar motos aquáticas (Jet Ski) com domínio de navegação, segurança, manobras e regulamentação náutica.",
      requisitos: "Mínimo 18 anos, documento de identificação com foto e aptidão física.",
      carga: "Teoria específica + 3 horas práticas em moto aquática homologada.",
      whatsappMsg: "Olá! Gostaria de detalhes e valores para o curso de Motonauta (Jet Ski)."
    },
    inclusao: {
      title: "Inclusão de Motonauta",
      badge: "Para já Habilitados",
      desc: "Processo rápido e econômico para quem já possui a habilitação de Arrais Amador e deseja incluir a categoria Motonauta na mesma Carteira de Habilitação do Amador (CHA).",
      requisitos: "Possuir CHA de Arrais Amador válida.",
      carga: "Treinamento prático direto na moto aquática e agendamento de homologação.",
      whatsappMsg: "Olá! Já possuo Arrais Amador e quero fazer a Inclusão de Motonauta."
    },
    regularizacao: {
      title: "Regularização de Embarcações",
      badge: "Despachante Náutico",
      desc: "Cuidamos de toda a assessoria documental da sua embarcação ou moto aquática junto à Capitania dos Portos e Delegacias da Marinha do Brasil.",
      requisitos: "Nota fiscal, documentos de propriedade e dados do proprietário.",
      carga: "Serviço expresso com agilidade e total conformidade com a NORMAM.",
      whatsappMsg: "Olá! Preciso regularizar a documentação da minha embarcação/jet ski."
    },
    transferencia: {
      title: "Inscrições, Registro e Transferência",
      badge: "Emissão de TIE / TIEM",
      desc: "Transferência de propriedade com segurança jurídica, primeiro registro de barcos e motores, renovação de CHA e emissão de segunda via.",
      requisitos: "Documento de compra e venda com firma reconhecida e laudo.",
      carga: "Atendimento presencial ou digital para todo o Mato Grosso do Sul.",
      whatsappMsg: "Olá! Gostaria de fazer a transferência/registro da minha embarcação."
    }
  };

  const data = details[courseKey];
  if (!data) return;

  const modal = document.getElementById('modalDetails');
  if (!modal) return;

  document.getElementById('modalDetailTitle').textContent = data.title;
  document.getElementById('modalDetailBadge').textContent = data.badge;
  document.getElementById('modalDetailDesc').textContent = data.desc;
  document.getElementById('modalDetailRequisitos').textContent = data.requisitos;
  document.getElementById('modalDetailCarga').textContent = data.carga;
  document.getElementById('modalDetailZapBtn').href = `https://wa.me/5567991155339?text=${encodeURIComponent(data.whatsappMsg)}`;

  openModal(modal);
};