// ─── 1. 타이핑 효과 ───
const typingEl = document.getElementById('typingText');
const phrases = [
    'AI로 코딩의 한계를 넘어서세요.',
    '복잡한 프로젝트도 자연어로 설계합니다.',
    'GenSpark와 함께 아이디어를 현실로 만드세요.',
    '개발 생산성을 10배 높여주는 도구입니다.',
    '초보자부터 전문가까지, 모두를 위한 가이드.'
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

// ─── 6. 다크/라이트 테마 토글 ───
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('genspark-theme'); // 키 이름 변경
if (savedTheme === 'light') {
    document.body.classList.add('light');
    themeToggle.textContent = '☀️';
}
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    themeToggle.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('genspark-theme', isLight ? 'light' : 'dark');
});

// ─── 7. 카드 마우스 기울기 효과 (tilt) ───
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

// ─── 8. 스크롤 시 fade-in (Intersection Observer) ───
const faders = document.querySelectorAll('.fade-in');
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);
faders.forEach(el => fadeObserver.observe(el));
