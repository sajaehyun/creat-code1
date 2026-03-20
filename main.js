// ─── 1. 타이핑 효과 ───
const typingEl = document.getElementById('typingText');
const phrases = [
    'Anthropic이 만든 AI 어시스턴트입니다.',
    '복잡한 문제를 함께 풀어드립니다.',
    '창의적인 글쓰기를 도와드립니다.',
    '코드를 작성하고 디버깅합니다.',
    '한국어도 자연스럽게 대화할 수 있습니다.'
];
let phraseIdx = 0, charIdx = 0, isDeleting = false;

function typeEffect() {
    const current = phrases[phraseIdx];
    if (!isDeleting) {
        typingEl.innerHTML = current.slice(0, charIdx + 1) + '<span class="cursor">|</span>';
        charIdx++;
        if (charIdx === current.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1800);   //  완성 후 잠시 멈춤
            return;
        }
        setTimeout(typeEffect, 60);
    } else {
        typingEl.innerHTML = current.slice(0, charIdx - 1) + '<span class="cursor">|</span>';
        charIdx--;
        if (charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            setTimeout(typeEffect, 400);
            return;
        }
        setTimeout(typeEffect, 30);
    }
}
typeEffect();

// ─── 2. 네비게이션 스크롤 효과 & 활성 링크 ───
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    // 네비게이션 배경 변경
    navbar.classList.toggle('scrolled', window.scrollY > 60);

    // 맨 위로 버튼 표시/숨김
    document.getElementById('scrollTopBtn')
        .classList.toggle('show', window.scrollY > 400);

    // 현재 섹션에 따라 네비 활성화
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 200) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
});

// ─── 3. 부드러운 스크롤 ───
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
        // 모바일 메뉴 닫기
        const navMenu = document.getElementById('navMenu');
        const hamburger = document.getElementById('hamburger');
        navMenu.classList.remove('open');
        hamburger.classList.remove('open');
    });
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
document.getElementById('scrollTopBtn').addEventListener('click', scrollToTop);

// ─── 4. 모바일 햄버거 메뉴 ───
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
});

// ─── 5. FAQ 아코디언 (JS 제어) ───
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        // 다른 열린 항목 닫기
        document.querySelectorAll('.faq-item').forEach(other => {
            if (other !== item) other.classList.remove('open');
        });
        item.classList.toggle('open');
    });
});

// ─── 6. 숫자 카운트업 애니메이션 ───
const statNumbers = document.querySelectorAll('.stat-number');
let statsCounted = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsCounted) {
            statsCounted = true;
            statNumbers.forEach(num => {
                const target = +num.getAttribute('data-target');
                const duration = 1500;
                const step = target / (duration / 16);
                let current = 0;
                const counter = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        num.textContent = target;
                        clearInterval(counter);
                    } else {
                        num.textContent = Math.floor(current);
                    }
                }, 16);
            });
        }
    });
}, { threshold: 0.5 });
statNumbers.forEach(el => statsObserver.observe(el));

// ─── 7. 다크/라이트 테마 토글 ───
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('claude-theme');
if (savedTheme === 'light') {
    document.body.classList.add('light');
    themeToggle.textContent = '☀️';
}
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    themeToggle.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('claude-theme', isLight ? 'light' : 'dark');
});

// ─── 8. 카드 마우스 기울기 효과 (tilt) ───
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y / rect.height) - 0.5) * -10;
        const rotateY = ((x / rect.width) - 0.5) * 10;
        card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ─── 9. 회로 검증 AI (Teachable Machine) ───
const CIRCUIT_MODEL_URL = "https://teachablemachine.withgoogle.com/models/-QV2XmXIr/";
let circuitModel, circuitWebcam, circuitLabelContainer, circuitMaxPredictions;

async function initCircuitAI() {
    const startBtn = document.getElementById('start-btn');
    startBtn.disabled = true;
    startBtn.textContent = "모델 로딩 중...";

    const modelURL = CIRCUIT_MODEL_URL + "model.json";
    const metadataURL = CIRCUIT_MODEL_URL + "metadata.json";

    try {
        circuitModel = await tmImage.load(modelURL, metadataURL);
        circuitMaxPredictions = circuitModel.getTotalClasses();

        // 웹캠 설정
        const flip = true;
        circuitWebcam = new tmImage.Webcam(400, 400, flip);
        await circuitWebcam.setup();
        await circuitWebcam.play();
        window.requestAnimationFrame(circuitLoop);

        // UI 업데이트
        document.getElementById("webcam-container").appendChild(circuitWebcam.canvas);
        circuitLabelContainer = document.getElementById("label-container");
        circuitLabelContainer.innerHTML = "";
        for (let i = 0; i < circuitMaxPredictions; i++) {
            const div = document.createElement("div");
            div.className = "label-item";
            div.innerHTML = `<span class="label-name"></span><span class="label-prob"></span>`;
            circuitLabelContainer.appendChild(div);
        }
        
        startBtn.style.display = "none";
    } catch (e) {
        console.error(e);
        alert("웹캠을 시작할 수 없거나 모델을 불러오는데 실패했습니다.");
        startBtn.disabled = false;
        startBtn.textContent = "검증 시작하기";
    }
}

async function circuitLoop() {
    if (circuitWebcam) {
        circuitWebcam.update();
        await circuitPredict();
        window.requestAnimationFrame(circuitLoop);
    }
}

async function circuitPredict() {
    const prediction = await circuitModel.predict(circuitWebcam.canvas);
    for (let i = 0; i < circuitMaxPredictions; i++) {
        const classPrediction = prediction[i];
        const item = circuitLabelContainer.childNodes[i];
        if (item) {
            const name = item.querySelector(".label-name");
            const prob = item.querySelector(".label-prob");
            
            name.innerText = classPrediction.className;
            prob.innerText = (classPrediction.probability * 100).toFixed(1) + "%";
            
            if (classPrediction.probability > 0.8) {
                item.classList.add("high");
            } else {
                item.classList.remove("high");
            }
        }
    }
}
