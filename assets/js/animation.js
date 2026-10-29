/* TODO:
   animation.js — scroll reveals + animated counters/meters*/

function animateCount(el, target, duration = 1200) {
    const start = 0;
    const startTime = performance.now();

    function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.round(start + (target - start) * progress);
        el.textContent = value + '%';
        if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

function initRevealObserver() {
    const revealTargets = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
    const meters = document.querySelectorAll('.meter');
    const expertiseCards = document.querySelectorAll('.expertise-card');
    const skillPcts = document.querySelectorAll('.skill-pct');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;

            if (el.classList.contains('fade-in') || el.classList.contains('fade-in-left') || el.classList.contains('fade-in-right')) {
                el.classList.add('visible');
            }

            if (el.classList.contains('meter')) {
                el.classList.add('in-view');
                const label = el.querySelector('.label');
                if (label && !label.dataset.done) {
                    label.dataset.done = 'true';
                    animateCount(label, parseInt(label.dataset.target, 10));
                }
            }

            if (el.classList.contains('expertise-card')) {
                el.classList.add('in-view');
                const pct = el.querySelector('.expertise-pct');
                if (pct && !pct.dataset.done) {
                    pct.dataset.done = 'true';
                    animateCount(pct, parseInt(pct.dataset.target, 10));
                }
            }

            if (el.classList.contains('skill-pct') && !el.dataset.done) {
                el.dataset.done = 'true';
                animateCount(el, parseInt(el.dataset.target, 10));
            }

            observer.unobserve(el);
        });
    }, { threshold: 0.3 });

    revealTargets.forEach((el) => observer.observe(el));
    meters.forEach((el) => observer.observe(el));
    expertiseCards.forEach((el) => observer.observe(el));
    skillPcts.forEach((el) => observer.observe(el));
}

/* TODO:  meters/skills on the Home section and the About/Resume tabs are present
 on page load; skill-pct elements inside a hidden tab panel still get
 observed correctly once their panel becomes visible because
 IntersectionObserver re-checks on layout changes triggered by class toggles.*/
document.addEventListener('DOMContentLoaded', initRevealObserver);