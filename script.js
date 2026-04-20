document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize AOS
    AOS.init({
        once: false,
        offset: 50,
        duration: 800,
        easing: 'ease-out-cubic',
    });

    // 2. Navbar Scroll Effect (Solidify background on scroll)
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg');
            navbar.style.padding = "0.5rem 0";
        } else {
            navbar.style.padding = "1rem 0";
        }
    });

    // 3. Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 150; 

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observe hero badges for counters
    const badgeContainer = document.querySelector('.hero-section');
    if (badgeContainer) observer.observe(badgeContainer);

    // 4. Operational Flow Pipeline Fill Effect
    const pipelineFill = document.querySelector('.pipeline-fill');
    const pipelineSteps = document.querySelector('.pipeline-steps');

    if (pipelineSteps && pipelineFill) {
        window.addEventListener('scroll', () => {
            const rect = pipelineSteps.getBoundingClientRect();
            // Calculate percentage based on viewport center
            const scrollPercentage = Math.max(0, Math.min(100, ((window.innerHeight / 1.5 - rect.top) / rect.height) * 100));
            
            pipelineFill.style.height = `${scrollPercentage}%`;

            const nodes = document.querySelectorAll('.step-node');
            nodes.forEach((node) => {
                const nodeRect = node.getBoundingClientRect();
                if (window.innerHeight / 1.5 > nodeRect.top) {
                    node.classList.remove('bg-charcoal', 'border-white');
                    node.classList.add('bg-orange', 'border-orange');
                } else {
                    node.classList.remove('bg-orange', 'border-orange');
                    node.classList.add('bg-charcoal', 'border-white');
                }
            });
        });
    }
});