/* TODO:
   main.js — injects navbar/footer, mobile menu, active-link highlight */

async function loadComponent(url, placeholderId) {
    try {
        const res = await fetch(url);
        const html = await res.text();
        const el = document.getElementById(placeholderId);
        if (el) el.innerHTML = html;
    } catch (err) {
        console.error('Could not load component:', url, err);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadComponent('components/navbar.html', 'navbar-placeholder');
    await loadComponent('components/footer.html', 'footer-placeholder');

    // TODO: footer year
    const yearEl = document.getElementById('footerYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // TODO: mobile menu toggle
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
        });
        mobileMenu.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', () => mobileMenu.classList.remove('open'));
        });
    }

    // TODO:  active nav-link highlight on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function setActiveLink() {
        let current = '';
        sections.forEach((section) => {
            const top = section.offsetTop - 100;
            if (window.scrollY >= top) current = section.id;
        });
        navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
    }

    window.addEventListener('scroll', setActiveLink);
    setActiveLink();

    // TODO:  let animation.js know the DOM (incl. injected navbar) is ready
    document.dispatchEvent(new CustomEvent('components:loaded'));
});

/* TODO:
   carousel.js — Tools & Workflow auto-sliding carousel (4 cards visible) */

(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var track = document.getElementById('toolsTrack');
        if (!track) return;
        var cards = track.children;
        var visible = 4;
        var total = cards.length;
        var maxIndex = Math.max(total - visible, 0);
        var index = 0;

        function goTo(i) {
            var card = cards[0];
            var gap = 16; 
            var cardWidth = card.getBoundingClientRect().width + gap;
            track.style.transform = 'translateX(-' + (i * cardWidth) + 'px)';
        }

        function next() {
            index = index >= maxIndex ? 0 : index + 1;
            goTo(index);
        }

        if (maxIndex > 0) {
            setInterval(next, 3000);
        }
        window.addEventListener('resize', function () { goTo(index); });
    });
})();

/* TODO:
   tabs.js — About Me tab switching (Biography / Skills / Education / Background)*/

function showResumeTab(name) {
    ['aboutme', 'biography', 'skills', 'education', 'background'].forEach(function (key) {
        var panel = document.getElementById('resumeTab-' + key);
        var btn = document.getElementById('resumeTabBtn-' + key);
        if (!panel || !btn) return;
        if (key === name) {
            panel.classList.remove('hidden');
            btn.className = 'resume-tab-btn px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-400 to-cyan-400 text-slate-900';
        } else {
            panel.classList.add('hidden');
            btn.className = 'resume-tab-btn px-6 py-3 rounded-full text-sm font-semibold bg-slate-800/70 border border-slate-700/50 text-gray-300 hover:text-white';
        }
    });
}