// =============================================
// CONSULTECHNIC - JavaScript Premium
// =============================================

// ---- DOM Elements ----
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const header = document.getElementById('header');
const heroCanvas = document.getElementById('hero-canvas');

// ---- Mobile Navigation ----
hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
    link.addEventListener('click', () => {
        if (!link.parentElement.classList.contains('nav-item-dropdown')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// ---- Dropdown Toggle (Mobile) ----
document.querySelectorAll('.nav-item-dropdown > .nav-link').forEach(dropdownToggle => {
    dropdownToggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            e.stopPropagation();
            dropdownToggle.parentElement.classList.toggle('active');
        }
    });
});

document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ---- Smooth Scroll ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

// ---- Header Glassmorphism on Scroll ----
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    lastScroll = scrollY;
}, { passive: true });

// ---- Active Nav Link on Scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollPos = window.scrollY + 150;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });

// ---- Hero Particles Canvas ----
function initParticles() {
    if (!heroCanvas) return;
    const ctx = heroCanvas.getContext('2d');
    let width, height, particles;
    const particleCount = 120;
    const connectionDistance = 180;
    const mouseRadius = 200;
    let mouse = { x: -1000, y: -1000 };
    let time = 0;

    function resize() {
        const hero = heroCanvas.parentElement;
        width = heroCanvas.width = hero.offsetWidth;
        height = heroCanvas.height = hero.offsetHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.baseRadius = Math.random() * 2.5 + 1;
            this.radius = this.baseRadius;
            this.pulseOffset = Math.random() * Math.PI * 2;
            this.isNode = Math.random() < 0.2; // 20% are bigger "neuron" nodes
            if (this.isNode) this.baseRadius = Math.random() * 2 + 3;
            this.radius = this.baseRadius;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Pulse radius
            this.radius = this.baseRadius + Math.sin(time * 2 + this.pulseOffset) * 0.5;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Mouse attraction (neural activation)
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouseRadius) {
                const force = (mouseRadius - dist) / mouseRadius;
                this.x += dx * force * 0.015;
                this.y += dy * force * 0.015;
                this.radius = this.baseRadius + force * 3;
            }
        }

        draw() {
            // Glow effect for nodes
            if (this.isNode) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
                const glow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 3);
                glow.addColorStop(0, 'rgba(62, 214, 162, 0.3)');
                glow.addColorStop(1, 'rgba(62, 214, 162, 0)');
                ctx.fillStyle = glow;
                ctx.fill();
            }

            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.isNode ? 'rgba(62, 214, 162, 0.95)' : 'rgba(62, 214, 162, 0.6)';
            ctx.fill();
        }
    }

    function init() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDistance) {
                    const opacity = 1 - (dist / connectionDistance);
                    const pulse = 0.3 + Math.sin(time * 3 + i * 0.1) * 0.1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(62, 214, 162, ${opacity * pulse})`;
                    ctx.lineWidth = (particles[i].isNode || particles[j].isNode) ? 1.5 : 0.8;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        time += 0.016;
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        drawConnections();
        requestAnimationFrame(animate);
    }

    heroCanvas.parentElement.addEventListener('mousemove', (e) => {
        const rect = heroCanvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    heroCanvas.parentElement.addEventListener('mouseleave', () => {
        mouse.x = -1000;
        mouse.y = -1000;
    });

    window.addEventListener('resize', () => {
        resize();
        init();
    });

    resize();
    init();
    animate();
}

// ---- Scroll Reveal ----
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Don't unobserve — only animate once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

// ---- Animated Counters ----
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    if (counters.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    const prefix = target > 10 ? '+' : '';
                    const suffix = target === 100 ? '%' : '';
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = prefix + target + suffix;
                            clearInterval(timer);
                        } else {
                            counter.textContent = prefix + Math.floor(current) + suffix;
                        }
                    }, 16);
                });
            }
        });
    }, { threshold: 0.3 });

    const statsSection = counters[0].closest('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// ---- Contact Form ----
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        if (!data.nombre || !data.email || !data.servicio || !data.mensaje) {
            showNotification('Por favor, completa todos los campos requeridos.', 'error');
            return;
        }

        showNotification('Enviando mensaje...', 'info');

        setTimeout(() => {
            showNotification('¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.', 'success');
            this.reset();
        }, 2000);
    });
}

// ---- Notification System ----
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');

    const colors = {
        success: 'linear-gradient(135deg, #1DB954, #3ED6A2)',
        error: 'linear-gradient(135deg, #ef4444, #f87171)',
        info: 'linear-gradient(135deg, #3b82f6, #60a5fa)'
    };

    notification.innerHTML = `
        <div style="display:flex;align-items:center;gap:0.75rem;">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}" style="font-size:1.2rem;"></i>
            <span style="flex:1;">${message}</span>
            <button onclick="this.closest('.notification').remove()" style="background:none;border:none;color:white;font-size:1.3rem;cursor:pointer;padding:0;">&times;</button>
        </div>
    `;

    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed; top: 100px; right: 20px;
        background: ${colors[type]};
        color: white; padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(420px);
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 420px; font-size: 0.95rem;
        backdrop-filter: blur(10px);
    `;

    document.body.appendChild(notification);
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });

    setTimeout(() => {
        notification.style.transform = 'translateX(420px)';
        setTimeout(() => notification.remove(), 400);
    }, 5000);
}

// ---- Service Cards Tilt Effect ----
function initCardTilt() {
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -5;
            const rotateY = (x - centerX) / centerX * 5;

            card.style.transform = `translateY(-12px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}

// ---- Keyboard Accessibility ----
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') document.body.classList.add('keyboard-navigation');
});
document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// ---- Initialize Everything ----
document.addEventListener('DOMContentLoaded', () => {
    // Priority: Footer Year
    const fy = document.getElementById('footer-year');
    if (fy) fy.textContent = new Date().getFullYear();

    // Other initializations
    initParticles();
    initScrollReveal();
    initCounters();
    initContactForm();
    initCardTilt();
    initTeamNetwork();
});

// ---- Team Network Animation ----
function initTeamNetwork() {
    const canvas = document.getElementById('team-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, dpr, time = 0;

    const nodesDef = [
        // People (left side)
        { label: 'Consultor', type: 'people', drawIcon: drawPerson },
        { label: 'Equipo', type: 'people', drawIcon: drawTeam },
        { label: 'Cliente', type: 'people', drawIcon: drawClient },
        { label: 'Soporte', type: 'people', drawIcon: drawHeadset },
        // Tech (right side)
        { label: 'Cloud', type: 'tech', drawIcon: drawCloud },
        { label: 'Data', type: 'tech', drawIcon: drawDatabase },
        { label: 'Equipos', type: 'tech', drawIcon: drawLaptop },
        { label: 'Seguridad', type: 'tech', drawIcon: drawShield },
        { label: 'Analytics', type: 'tech', drawIcon: drawChart },
    ];

    let nodes = [];
    let centerNode;
    const peopleCount = 4;

    // ---- Custom icon drawing functions ----
    function drawPerson(x, y, s, color) {
        ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.arc(x, y - s * 0.35, s * 0.25, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x - s * 0.35, y + s * 0.45);
        ctx.quadraticCurveTo(x - s * 0.35, y + s * 0.05, x, y + s * 0.05);
        ctx.quadraticCurveTo(x + s * 0.35, y + s * 0.05, x + s * 0.35, y + s * 0.45);
        ctx.stroke();
    }

    function drawTeam(x, y, s, color) {
        ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.lineCap = 'round';
        // Left person
        ctx.beginPath(); ctx.arc(x - s * 0.25, y - s * 0.2, s * 0.17, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x - s * 0.45, y + s * 0.45);
        ctx.quadraticCurveTo(x - s * 0.45, y + s * 0.1, x - s * 0.25, y + s * 0.1);
        ctx.quadraticCurveTo(x - s * 0.05, y + s * 0.1, x - s * 0.05, y + s * 0.45); ctx.stroke();
        // Right person
        ctx.beginPath(); ctx.arc(x + s * 0.25, y - s * 0.2, s * 0.17, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x + s * 0.05, y + s * 0.45);
        ctx.quadraticCurveTo(x + s * 0.05, y + s * 0.1, x + s * 0.25, y + s * 0.1);
        ctx.quadraticCurveTo(x + s * 0.45, y + s * 0.1, x + s * 0.45, y + s * 0.45); ctx.stroke();
    }

    function drawClient(x, y, s, color) {
        ctx.strokeStyle = color; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(x, y - s * 0.15, s * 0.3, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(x, y - s * 0.15, s * 0.15, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x - s * 0.35, y + s * 0.45);
        ctx.quadraticCurveTo(x, y + s * 0.15, x + s * 0.35, y + s * 0.45); ctx.stroke();
    }

    function drawHeadset(x, y, s, color) {
        ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.arc(x, y - s * 0.05, s * 0.3, Math.PI, 0); ctx.stroke();
        // Left ear
        ctx.fillStyle = color; ctx.beginPath();
        ctx.roundRect(x - s * 0.38, y - s * 0.15, s * 0.15, s * 0.3, 3); ctx.fill();
        // Right ear
        ctx.beginPath(); ctx.roundRect(x + s * 0.23, y - s * 0.15, s * 0.15, s * 0.3, 3); ctx.fill();
        // Mic
        ctx.beginPath(); ctx.moveTo(x + s * 0.3, y + s * 0.15);
        ctx.lineTo(x + s * 0.3, y + s * 0.35);
        ctx.lineTo(x + s * 0.1, y + s * 0.35); ctx.stroke();
    }

    function drawCloud(x, y, s, color) {
        ctx.strokeStyle = color; ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x - s * 0.15, y, s * 0.2, Math.PI, 0, true);
        ctx.arc(x + s * 0.1, y - s * 0.15, s * 0.22, Math.PI * 1.2, Math.PI * 0.1, true);
        ctx.arc(x + s * 0.25, y + s * 0.05, s * 0.15, Math.PI * 1.5, Math.PI * 0.5, true);
        ctx.closePath(); ctx.stroke();
    }

    function drawDatabase(x, y, s, color) {
        ctx.strokeStyle = color; ctx.lineWidth = 2;
        const ew = s * 0.35, eh = s * 0.12;
        // Top ellipse
        ctx.beginPath(); ctx.ellipse(x, y - s * 0.25, ew, eh, 0, 0, Math.PI * 2); ctx.stroke();
        // Body
        ctx.beginPath(); ctx.moveTo(x - ew, y - s * 0.25); ctx.lineTo(x - ew, y + s * 0.25);
        ctx.ellipse(x, y + s * 0.25, ew, eh, 0, Math.PI, 0, true);
        ctx.lineTo(x + ew, y - s * 0.25); ctx.stroke();
        // Middle line
        ctx.beginPath(); ctx.ellipse(x, y, ew, eh, 0, Math.PI, 0, true); ctx.stroke();
    }

    function drawLaptop(x, y, s, color) {
        ctx.strokeStyle = color; ctx.lineWidth = 2;
        // Screen
        ctx.strokeRect(x - s * 0.3, y - s * 0.3, s * 0.6, s * 0.4);
        // Base
        ctx.beginPath();
        ctx.moveTo(x - s * 0.4, y + s * 0.15);
        ctx.lineTo(x - s * 0.3, y + s * 0.1);
        ctx.lineTo(x + s * 0.3, y + s * 0.1);
        ctx.lineTo(x + s * 0.4, y + s * 0.15);
        ctx.closePath(); ctx.stroke();
    }

    function drawShield(x, y, s, color) {
        ctx.strokeStyle = color; ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y - s * 0.4);
        ctx.lineTo(x + s * 0.3, y - s * 0.2);
        ctx.lineTo(x + s * 0.3, y + s * 0.1);
        ctx.quadraticCurveTo(x, y + s * 0.45, x, y + s * 0.45);
        ctx.quadraticCurveTo(x, y + s * 0.45, x - s * 0.3, y + s * 0.1);
        ctx.lineTo(x - s * 0.3, y - s * 0.2);
        ctx.closePath(); ctx.stroke();
        // Check mark
        ctx.beginPath();
        ctx.moveTo(x - s * 0.1, y); ctx.lineTo(x, y + s * 0.12); ctx.lineTo(x + s * 0.15, y - s * 0.1);
        ctx.stroke();
    }

    function drawChart(x, y, s, color) {
        ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 2;
        const bw = s * 0.12;
        // Bars
        ctx.fillRect(x - s * 0.3, y + s * 0.1, bw, -s * 0.25);
        ctx.fillRect(x - s * 0.1, y + s * 0.1, bw, -s * 0.45);
        ctx.fillRect(x + s * 0.1, y + s * 0.1, bw, -s * 0.35);
        ctx.fillRect(x + s * 0.3, y + s * 0.1, bw, -s * 0.55);
        // Baseline
        ctx.beginPath();
        ctx.moveTo(x - s * 0.35, y + s * 0.15); ctx.lineTo(x + s * 0.45, y + s * 0.15);
        ctx.stroke();
    }

    function drawCenterIcon(x, y, s, color) {
        ctx.strokeStyle = color; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
        // Hub with spokes
        ctx.beginPath(); ctx.arc(x, y, s * 0.15, 0, Math.PI * 2); ctx.stroke();
        for (let i = 0; i < 6; i++) {
            const a = (Math.PI * 2 / 6) * i;
            ctx.beginPath();
            ctx.moveTo(x + Math.cos(a) * s * 0.15, y + Math.sin(a) * s * 0.15);
            ctx.lineTo(x + Math.cos(a) * s * 0.35, y + Math.sin(a) * s * 0.35);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(x + Math.cos(a) * s * 0.35, y + Math.sin(a) * s * 0.35, 3, 0, Math.PI * 2);
            ctx.fillStyle = color; ctx.fill();
        }
    }

    function resize() {
        const parent = canvas.parentElement;
        const rect = parent.getBoundingClientRect();
        dpr = window.devicePixelRatio || 1;

        w = rect.width;
        h = Math.max(rect.height, 450);

        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        ctx.scale(dpr, dpr);

        setupNodes();
    }

    function setupNodes() {
        nodes = [];
        const cx = w / 2;
        const cy = h / 2;
        const radiusX = Math.min(w * 0.45, 260); // Aumentado para más separación
        const radiusY = Math.min(h * 0.42, 210); // Aumentado para más separación

        centerNode = { x: cx, y: cy, radius: 35, drawIcon: drawCenterIcon, label: 'Consultechnic', type: 'center' };

        nodesDef.forEach((def, i) => {
            const isPeople = def.type === 'people';
            const count = isPeople ? peopleCount : (nodesDef.length - peopleCount);
            const idx = isPeople ? i : (i - peopleCount);
            const spread = Math.PI * 0.85;
            const startAngle = isPeople ? (Math.PI / 2 + spread / 2) : (Math.PI / 2 - spread / 2);
            const dir = isPeople ? -1 : 1;
            const angle = startAngle + dir * spread * ((idx + 0.5) / count);

            nodes.push({
                baseX: cx + Math.cos(angle) * radiusX,
                baseY: cy + Math.sin(angle) * radiusY,
                x: cx + Math.cos(angle) * radiusX,
                y: cy + Math.sin(angle) * radiusY,
                radius: 28, // Un poco más grande para mejor definición
                drawIcon: def.drawIcon,
                label: def.label,
                type: def.type,
                phase: i * 0.8,
            });
        });
    }

    function drawConnection(from, to, color) {
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Data pulse
        const pulsePos = (time * 0.4 + (from.phase || 0)) % 1;
        const px = from.x + (to.x - from.x) * pulsePos;
        const py = from.y + (to.y - from.y) * pulsePos;
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(62, 214, 162, 0.9)';
        ctx.fill();
    }

    function drawNode(node) {
        if (node.baseX !== undefined) {
            node.x = node.baseX + Math.sin(time * 1.5 + node.phase) * 6;
            node.y = node.baseY + Math.cos(time * 1.2 + node.phase) * 5;
        }
        const r = node.radius;

        // Glow
        const glow = ctx.createRadialGradient(node.x, node.y, r * 0.5, node.x, node.y, r * 2.8);
        glow.addColorStop(0, node.type === 'center' ? 'rgba(29, 185, 84, 0.3)' : 'rgba(62, 214, 162, 0.2)');
        glow.addColorStop(1, 'rgba(62, 214, 162, 0)');
        ctx.beginPath(); ctx.arc(node.x, node.y, r * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = glow; ctx.fill();

        // Circle
        ctx.beginPath(); ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = node.type === 'center' ? '#1DB954' : (node.type === 'people' ? 'rgba(15, 61, 46, 0.9)' : 'rgba(29, 185, 84, 0.12)');
        ctx.fill();
        ctx.strokeStyle = node.type === 'people' ? 'rgba(62, 214, 162, 0.6)' : 'rgba(29, 185, 84, 0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw icon
        const iconColor = node.type === 'center' ? '#fff' : (node.type === 'people' ? '#3ED6A2' : '#1DB954');
        node.drawIcon(node.x, node.y, r * 0.85, iconColor);

        // Label
        ctx.font = '700 12px Inter, sans-serif'; // Más negrita y un punto más grande
        ctx.textAlign = 'center';
        ctx.fillStyle = 'rgba(15, 61, 46, 0.9)'; // Color más oscuro para mejor contraste
        ctx.fillText(node.label, node.x, node.y + r + 20); // Un poco más de margen
    }

    function animate() {
        time += 0.016;
        ctx.clearRect(0, 0, w, h);

        // Draw connections
        nodes.forEach(node => {
            const pulse = 0.7 + Math.sin(time * 2 + (node.phase || 0)) * 0.3;
            const color = node.type === 'people'
                ? `rgba(62, 214, 162, ${0.35 * pulse})`
                : `rgba(29, 185, 84, ${0.35 * pulse})`;
            drawConnection(centerNode, node, color);
        });

        // Cross connections
        for (let i = 0; i < peopleCount; i++) {
            const tIdx = peopleCount + (i % (nodesDef.length - peopleCount));
            const pulse = 0.5 + Math.sin(time * 1.5 + i) * 0.3;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.quadraticCurveTo(centerNode.x, centerNode.y, nodes[tIdx].x, nodes[tIdx].y);
            ctx.strokeStyle = `rgba(62, 214, 162, ${0.1 * pulse})`;
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        drawNode(centerNode);
        nodes.forEach(drawNode);
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    resize();
    animate();
}

// ---- Preloader ----
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.style.display = 'none', 300);
    }
});

console.log('🚀 Consultechnic - Cargado exitosamente');
