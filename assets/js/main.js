document.addEventListener('DOMContentLoaded', () => {
    
    // --- Theme Toggle (Dark/Light) ---
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    if (currentTheme === 'light') {
        document.body.setAttribute('data-theme', 'light');
        if(themeToggle) themeToggle.innerHTML = '<i class="bi bi-moon-stars"></i>';
    } else {
        document.body.setAttribute('data-theme', 'dark');
        if(themeToggle) themeToggle.innerHTML = '<i class="bi bi-sun"></i>';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            let theme = document.body.getAttribute('data-theme');
            if (theme === 'dark') {
                document.body.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="bi bi-moon-stars"></i>';
            } else {
                document.body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="bi bi-sun"></i>';
            }
            updateChartsTheme();
        });
    }

    // --- RTL Toggle ---
    const rtlToggle = document.getElementById('rtlToggle');
    const currentDir = localStorage.getItem('dir') || 'ltr';
    if(currentDir === 'rtl') {
        document.body.setAttribute('dir', 'rtl');
    }

    if(rtlToggle) {
        rtlToggle.addEventListener('click', (e) => {
            e.preventDefault();
            let dir = document.body.getAttribute('dir');
            if(dir === 'ltr' || !dir) {
                document.body.setAttribute('dir', 'rtl');
                localStorage.setItem('dir', 'rtl');
            } else {
                document.body.setAttribute('dir', 'ltr');
                localStorage.setItem('dir', 'ltr');
            }
        });
    }

    // --- Sidebar Toggle for Mobile ---
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarClose = document.getElementById('sidebarClose');
    const sidebar = document.getElementById('sidebar');
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('show');
        });
    }
    if (sidebarClose && sidebar) {
        sidebarClose.addEventListener('click', () => {
            sidebar.classList.remove('show');
        });
    }
    // Auto-close sidebar on mobile/tablet when a link is clicked
    if (sidebar) {
        const sidebarLinks = sidebar.querySelectorAll('.nav-link');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 1200) {
                    sidebar.classList.remove('show');
                }
            });
        });
    }

    // --- Mobile Menu Scroll Lock ---
    const navbarNav = document.getElementById('navbarNav');
    if (navbarNav) {
        navbarNav.addEventListener('show.bs.collapse', () => {
            document.body.style.overflow = 'hidden';
        });
        navbarNav.addEventListener('hidden.bs.collapse', () => {
            document.body.style.overflow = '';
        });
    }

    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.fade-up');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 80;
        
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('visible');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // --- Back to Top Button ---
    const footer = document.querySelector('footer');
    if (footer && !document.querySelector('.back-to-top')) {
        const backToTop = document.createElement('a');
        backToTop.href = '#';
        backToTop.className = 'back-to-top';
        backToTop.setAttribute('aria-label', 'Back to top');
        backToTop.innerHTML = '<i class="bi bi-arrow-up"></i>';
        document.body.appendChild(backToTop);

        const toggleBackToTop = () => {
            if (window.scrollY > 250) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        };

        window.addEventListener('scroll', toggleBackToTop);
        toggleBackToTop();

        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Counter Animations ---
    const counters = document.querySelectorAll('.counter-value');
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / 100;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting) {
                updateCount();
                observer.disconnect();
            }
        });
        observer.observe(counter);
    });

    // --- Interactive Errand Exchange Step Switcher ---
    const stepBtns = document.querySelectorAll('.step-btn');
    const heroImage = document.getElementById('transformationHeroImg');
    const heroBadgeText = document.getElementById('transformationBadge');
    
    if (stepBtns.length > 0 && heroImage) {
        const stepData = [
            {
                img: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
                badge: "Step 1: Request an Errand or Offer Your Skills"
            },
            {
                img: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80",
                badge: "Step 2: Connect With Verified Local Neighbor Concierge"
            },
            {
                img: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80",
                badge: "Step 3: Errand Completed Safely & With Care"
            },
            {
                img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
                badge: "Step 4: Time Credits Deposited to Member Balance (1 Hr = 1 Credit)"
            }
        ];

        stepBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                stepBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                heroImage.style.opacity = '0.3';
                setTimeout(() => {
                    heroImage.src = stepData[index].img;
                    if(heroBadgeText) heroBadgeText.innerText = stepData[index].badge;
                    heroImage.style.opacity = '1';
                }, 200);
            });
        });
    }

    // --- Member Stories / Blog Topic Filtering ---
    const topicBtns = document.querySelectorAll('.blog-category-chips button');
    if (topicBtns.length > 0) {
        topicBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');

                // Update active state of buttons
                topicBtns.forEach(b => {
                    b.classList.remove('btn-primary-orange');
                    b.classList.add('btn-secondary-custom');
                });
                btn.classList.remove('btn-secondary-custom');
                btn.classList.add('btn-primary-orange');

                // Filter story cards and sections
                const allCategorized = document.querySelectorAll('[data-category]');
                allCategorized.forEach(el => {
                    const cat = el.getAttribute('data-category');
                    if (filter === 'all' || cat === filter || (cat && cat.includes(filter))) {
                        el.style.display = '';
                        el.classList.remove('d-none');
                        el.style.opacity = '0';
                        el.style.transform = 'translateY(10px)';
                        setTimeout(() => {
                            el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        el.style.display = 'none';
                    }
                });
            });
        });

        // "View All Articles" button in section header
        const viewAllBtn = document.getElementById('viewAllArticlesBtn');
        if (viewAllBtn) {
            viewAllBtn.addEventListener('click', (e) => {
                const allBtn = document.querySelector('.blog-category-chips button[data-filter="all"]');
                if (allBtn) allBtn.click();
            });
        }
    }

    // --- Initialize Charts if Chart.js is present ---
    initCharts();

});

let charts = [];
function initCharts() {
    if (typeof Chart === 'undefined') return;

    Chart.defaults.color = getComputedStyle(document.body).getPropertyValue('--text-secondary').trim();
    Chart.defaults.font.family = getComputedStyle(document.body).getPropertyValue('--font-body').trim();

    const vulnCtx = document.getElementById('vulnChart');
    if (vulnCtx) {
        charts.push(new Chart(vulnCtx, {
            type: 'doughnut',
            data: {
                labels: ['Grocery & Pharmacy Runs', 'Senior Care & Rides', 'Home Organizing & Handyman', 'Pet Sitting & Tech Help'],
                datasets: [{
                    data: [40, 25, 20, 15],
                    backgroundColor: [
                        '#0D9488', // Concierge Teal
                        '#14B8A6', // Mint Teal
                        '#F59E0B', // Amber
                        '#64748B'  // Slate
                    ],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom' }
                },
                cutout: '70%'
            }
        }));
    }

    const gasCtx = document.getElementById('gasChart');
    if (gasCtx) {
        charts.push(new Chart(gasCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Hours Deposited / Earned',
                    data: [42, 65, 88, 110, 135, 178],
                    backgroundColor: 'rgba(13, 148, 136, 0.25)',
                    borderColor: '#0D9488',
                    borderWidth: 1
                }, {
                    label: 'Hours Redeemed / Exchanged',
                    data: [38, 58, 80, 102, 126, 164],
                    backgroundColor: '#0D9488',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, grid: { color: 'rgba(13, 148, 136, 0.08)' } },
                    x: { grid: { display: false } }
                }
            }
        }));
    }
}

function updateChartsTheme() {
    if (typeof Chart === 'undefined') return;
    const isLight = document.body.getAttribute('data-theme') === 'light';
    const textColor = isLight ? '#737373' : '#A3A3A3';
    const gridColor = isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)';

    Chart.defaults.color = textColor;
    charts.forEach(chart => {
        if(chart.options.scales && chart.options.scales.y) {
            chart.options.scales.y.grid.color = gridColor;
        }
        chart.update();
    });
}

function togglePasswordVisibility(inputId, btnElement) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const icon = btnElement ? btnElement.querySelector('i') : null;
    if (input.type === 'password') {
        input.type = 'text';
        if (icon) {
            icon.classList.remove('bi-eye-slash');
            icon.classList.add('bi-eye');
        }
    } else {
        input.type = 'password';
        if (icon) {
            icon.classList.remove('bi-eye');
            icon.classList.add('bi-eye-slash');
        }
    }
}
