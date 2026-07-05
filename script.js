/* =========================================================
   Rahul Monde — profile site
   - Renders skills with rating dots
   - Reveal-on-scroll animation
   - Sets footer year
   ========================================================= */

(function () {
    'use strict';

    // ---- Skills data (mirrors About Me/03_Technical_Stack.md) ----
    // Rating scale: 1 theoretical, 2 with help, 3 independent, 4 can teach, 5 expert
    const SKILLS = {
        cloud: [
            { name: 'Azure Cloud',           rating: 4 },
            { name: 'AWS',                   rating: 3 },
            { name: 'GCP / Apigee',          rating: 3 },
            { name: 'Kubernetes',            rating: 3 },
            { name: 'Docker',                rating: 4 },
        ],
        devops: [
            { name: 'Azure DevOps Pipelines', rating: 4 },
            { name: 'GitHub Actions',         rating: 3 },
            { name: 'GitOps · ArgoCD',        rating: 3 },
            { name: 'Terraform',              rating: 3 },
            { name: 'ARM templates',          rating: 3 },
            { name: 'Ansible',                rating: 3 },
            { name: 'Kustomize',              rating: 3 },
        ],
        lang: [
            { name: 'Python (Flask, pytest)', rating: 3 },
            { name: 'PowerShell / Shell',     rating: 3 },
            { name: 'Node.js',                rating: 3 },
            { name: 'GitHub',                 rating: 3 },
            { name: 'GitHub Copilot',         rating: 3 },
            { name: 'System design (WAF)',    rating: 2 },
        ],
        ai: [
            { name: 'Prometheus · PromQL',    rating: 3 },
            { name: 'kube-prometheus-stack',  rating: 3 },
            { name: 'Grafana (learning)',     rating: 1 },
            { name: 'SonarQube · JFrog',      rating: 3 },
            { name: 'RAG · Azure AI Search',  rating: 3 },
            { name: 'AI / Agentic AI',        rating: 2 },
        ],
    };

    function renderSkills() {
        document.querySelectorAll('.skill-list[data-group]').forEach((ul) => {
            const group = ul.getAttribute('data-group');
            const items = SKILLS[group] || [];
            ul.innerHTML = items.map((s) => {
                const dots = Array.from({ length: 5 }, (_, i) =>
                    `<span class="skill-dot ${i < s.rating ? 'active' : ''}"></span>`
                ).join('');
                return `
                    <li class="skill-row">
                        <span class="skill-name">${escapeHtml(s.name)}</span>
                        <span class="skill-dots" aria-label="${s.rating} of 5">${dots}</span>
                    </li>
                `;
            }).join('');
        });
    }

    function escapeHtml(str) {
        return String(str).replace(/[&<>"']/g, (c) => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[c]));
    }

    // ---- Reveal-on-scroll ----
    function setupReveal() {
        const targets = document.querySelectorAll('.section, .t-item, .project-card, .cert-card');
        targets.forEach((el) => el.classList.add('reveal'));

        if (!('IntersectionObserver' in window)) {
            // Fallback: just show
            targets.forEach((el) => el.classList.add('in-view'));
            return;
        }

        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        targets.forEach((el) => io.observe(el));
    }

    // ---- Footer year ----
    function setYear() {
        const el = document.getElementById('year');
        if (el) el.textContent = new Date().getFullYear();
    }

    // ---- Init ----
    document.addEventListener('DOMContentLoaded', () => {
        renderSkills();
        setupReveal();
        setYear();
    });
})();
