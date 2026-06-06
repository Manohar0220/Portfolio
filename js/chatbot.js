/* ============================================================
   PORTFOLIO CHATBOT  (retrieval-based, no backend / no API)
   ------------------------------------------------------------
   Reads all content directly from the portfolio's DOM on load,
   so anything you add to the page (new project, skill, job,
   certification, etc.) is automatically answerable.
   ============================================================ */

(function () {
    "use strict";

    /* ---------- small helpers ---------- */
    const txt = (el) => (el ? el.textContent.replace(/\s+/g, " ").trim() : "");
    const esc = (s) =>
        String(s)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");

    const STOP = new Set([
        "a","an","the","and","or","of","to","in","on","for","with","is","are","was",
        "were","do","does","did","you","your","his","her","my","me","i","he","she",
        "about","tell","what","whats","which","who","whom","where","when","how","can",
        "could","would","please","give","show","list","know","have","has","had","any",
        "some","that","this","there","their","them","it","at","as","be","by","from",
        "into","more","most","also","etc","get","got"
    ]);

    const tokenize = (s) =>
        s.toLowerCase()
            .replace(/[^a-z0-9+#./ ]/g, " ")
            .split(/\s+/)
            .filter((w) => w && !STOP.has(w));

    /* ============================================================
       1. BUILD KNOWLEDGE BASE FROM THE DOM
       ============================================================ */
    function buildKnowledge() {
        const kb = {
            name: txt(document.querySelector(".hero-text .highlight")) ||
                  txt(document.querySelector(".logo-text")) || "Manohar",
            role: txt(document.querySelector(".hero-text h2")),
            tagline: txt(document.querySelector(".hero-text p")),
            about: [],
            stats: [],
            skills: [],
            projects: [],
            experience: [],
            achievements: [],
            certifications: [],
            education: [],
            contact: []
        };

        // About
        document.querySelectorAll("#about .about-text > p").forEach((p) => {
            const t = txt(p);
            if (t) kb.about.push(t);
        });
        document.querySelectorAll("#about .stat").forEach((s) => {
            kb.stats.push({
                number: txt(s.querySelector(".stat-number")),
                text: txt(s.querySelector(".stat-text"))
            });
        });

        // Skills
        document.querySelectorAll("#skills .skill-item").forEach((item) => {
            const name = txt(item.querySelector(".skill-name"));
            if (!name) return;
            kb.skills.push({
                name,
                categories: (item.dataset.categories || "").split(",").filter(Boolean)
            });
        });

        // Projects (includes hidden / "view more" ones)
        document.querySelectorAll("#projects .project-card").forEach((card) => {
            kb.projects.push({
                title: txt(card.querySelector(".project-title")),
                category: txt(card.querySelector(".project-category")),
                description: txt(card.querySelector(".project-description")),
                tech: Array.from(card.querySelectorAll(".tech-tag")).map(txt)
            });
        });

        // Experience
        document.querySelectorAll("#experience .timeline-item").forEach((item) => {
            kb.experience.push({
                title: txt(item.querySelector(".timeline-title")),
                company: txt(item.querySelector(".timeline-company")),
                date: txt(item.querySelector(".timeline-date")),
                description: txt(item.querySelector(".timeline-description")),
                skills: Array.from(item.querySelectorAll(".timeline-skill")).map(txt)
            });
        });

        // Achievements
        document.querySelectorAll("#achievements .achievement-card").forEach((card) => {
            kb.achievements.push({
                title: txt(card.querySelector(".achievement-title")),
                description: txt(card.querySelector(".achievement-description")),
                year: txt(card.querySelector(".achievement-year")),
                authority: Array.from(card.querySelectorAll(".issuing-authority")).map(txt).join(", ")
            });
        });

        // Certifications
        document.querySelectorAll("#certifications .achievement-card").forEach((card) => {
            kb.certifications.push({
                title: txt(card.querySelector(".achievement-title")),
                description: txt(card.querySelector(".achievement-description")),
                year: txt(card.querySelector(".achievement-year")),
                authority: Array.from(card.querySelectorAll(".issuing-authority")).map(txt).join(", ")
            });
        });

        // Education
        document.querySelectorAll("#education .timeline-item").forEach((item) => {
            kb.education.push({
                title: txt(item.querySelector(".timeline-title")),
                company: txt(item.querySelector(".timeline-company")),
                date: txt(item.querySelector(".timeline-date")),
                description: txt(item.querySelector(".timeline-description")),
                skills: Array.from(item.querySelectorAll(".timeline-skill")).map(txt)
            });
        });

        // Contact
        document.querySelectorAll("#contact .contact-item").forEach((item) => {
            const link = item.querySelector("a");
            kb.contact.push({
                label: txt(item.querySelector(".contact-text h3")),
                value: txt(item.querySelector(".contact-text p")),
                href: link ? link.getAttribute("href") : ""
            });
        });

        return kb;
    }

    /* ============================================================
       2. RENDERERS  (turn KB data into chat HTML)
       ============================================================ */
    function renderAbout(kb) {
        let html = kb.about.map((p) => `<p>${esc(p)}</p>`).join("");
        if (kb.stats.length) {
            html += "<ul>" + kb.stats
                .map((s) => `<li><strong>${esc(s.number)}</strong> ${esc(s.text)}</li>`)
                .join("") + "</ul>";
        }
        return html || `<p>${esc(kb.name)} is a ${esc(kb.role)}.</p>`;
    }

    function renderSkills(kb, category) {
        let skills = kb.skills;
        const labelMap = {
            languages: "programming languages",
            tools: "tools & platforms",
            ml: "ML & AI",
            databases: "databases"
        };
        if (category) skills = skills.filter((s) => s.categories.includes(category));
        if (!skills.length) return `<p>I couldn't find skills for that category.</p>`;
        const names = skills.map((s) => esc(s.name)).join(", ");
        const lead = category
            ? `Here are ${esc(kb.name)}'s ${labelMap[category] || category} skills:`
            : `Here's the full skill set:`;
        return `<p>${lead}</p><p>${names}.</p>`;
    }

    function renderProjectsList(kb) {
        const items = kb.projects
            .map((p) => `<li><strong>${esc(p.title)}</strong>${p.category ? " — " + esc(p.category) : ""}</li>`)
            .join("");
        return `<p>${esc(kb.name)} has worked on <strong>${kb.projects.length}</strong> projects:</p><ul>${items}</ul><p>Ask about any one of them for details.</p>`;
    }

    function renderProject(p) {
        const tech = p.tech.length ? `<p><strong>Tech:</strong> ${p.tech.map(esc).join(", ")}</p>` : "";
        return `<p><strong>${esc(p.title)}</strong>${p.category ? " (" + esc(p.category) + ")" : ""}</p>` +
               `<p>${esc(p.description)}</p>${tech}`;
    }

    function renderExperience(kb) {
        if (!kb.experience.length) return `<p>No experience listed yet.</p>`;
        const items = kb.experience
            .map((e) => `<li><strong>${esc(e.title)}</strong> at ${esc(e.company)} <em>(${esc(e.date)})</em><br>${esc(e.description)}</li>`)
            .join("");
        return `<p>Professional experience:</p><ul>${items}</ul>`;
    }

    function renderEducation(kb) {
        if (!kb.education.length) return `<p>No education listed yet.</p>`;
        const items = kb.education
            .map((e) => `<li><strong>${esc(e.title)}</strong> — ${esc(e.company)} <em>(${esc(e.date)})</em>${e.skills.length ? "<br>" + e.skills.map(esc).join(" · ") : ""}</li>`)
            .join("");
        return `<p>Education:</p><ul>${items}</ul>`;
    }

    function renderAchievements(kb) {
        if (!kb.achievements.length) return `<p>No achievements listed yet.</p>`;
        const items = kb.achievements
            .map((a) => `<li><strong>${esc(a.title)}</strong>${a.year ? " (" + esc(a.year) + ")" : ""}${a.authority ? " — " + esc(a.authority) : ""}</li>`)
            .join("");
        return `<p>Achievements & recognition:</p><ul>${items}</ul>`;
    }

    function renderCertifications(kb) {
        if (!kb.certifications.length) return `<p>No certifications listed yet.</p>`;
        const items = kb.certifications
            .map((c) => `<li><strong>${esc(c.title)}</strong>${c.authority ? " — " + esc(c.authority) : ""}${c.year ? " (" + esc(c.year) + ")" : ""}</li>`)
            .join("");
        return `<p>Certifications:</p><ul>${items}</ul>`;
    }

    function renderContact(kb) {
        if (!kb.contact.length) return `<p>No contact details listed yet.</p>`;
        const items = kb.contact.map((c) => {
            let val = esc(c.value);
            if (c.href && /^mailto:/i.test(c.href)) val = `<a href="${esc(c.href)}">${esc(c.value)}</a>`;
            else if (c.href && /^https?:/i.test(c.href)) val = `<a href="${esc(c.href)}" target="_blank" rel="noopener">${esc(c.value || c.href)}</a>`;
            return `<li><strong>${esc(c.label)}:</strong> ${val}</li>`;
        }).join("");
        return `<p>Here's how to reach ${esc(kb.name)}:</p><ul>${items}</ul>`;
    }

    /* ============================================================
       3. INTENT + ENTITY MATCHING ENGINE
       ============================================================ */
    function buildEngine(kb) {
        // Category intents
        const intents = [
            { key: "about", kws: ["about","who","summary","bio","background","yourself","introduce","intro"], render: () => renderAbout(kb) },
            { key: "skills", kws: ["skill","skills","technology","technologies","tech","stack","tools","tool","language","languages","framework","frameworks","proficient","expertise","good"], render: (q) => renderSkills(kb, skillCategoryFromQuery(q)) },
            { key: "projects", kws: ["project","projects","work","works","built","build","developed","portfolio","made","created"], render: () => renderProjectsList(kb) },
            { key: "experience", kws: ["experience","experiences","job","jobs","career","intern","internship","employment","employed","worked","working","role","roles","company","companies","professional"], render: () => renderExperience(kb) },
            { key: "education", kws: ["education","study","studied","degree","degrees","university","college","school","gpa","academic","masters","master","bachelor","bachelors","graduate","graduated","major"], render: () => renderEducation(kb) },
            { key: "achievements", kws: ["achievement","achievements","award","awards","hackathon","recognition","won","win","honor","honour","accomplishment"], render: () => renderAchievements(kb) },
            { key: "certifications", kws: ["certification","certifications","certificate","certificates","certified","course","courses","credential"], render: () => renderCertifications(kb) },
            { key: "contact", kws: ["contact","email","mail","reach","reachable","linkedin","phone","location","located","based","hire","connect","get","touch","resume","cv"], render: () => renderContact(kb) }
        ];

        // Entity documents (specific items) for precise lookups
        const entities = [];
        kb.projects.forEach((p) => entities.push({
            tokens: new Set(tokenize([p.title, p.category, p.description, p.tech.join(" ")].join(" "))),
            nameTokens: new Set(tokenize([p.title, p.category].join(" "))),
            render: () => renderProject(p)
        }));
        kb.experience.forEach((e) => entities.push({
            tokens: new Set(tokenize([e.title, e.company, e.description, e.skills.join(" ")].join(" "))),
            nameTokens: new Set(tokenize([e.title, e.company].join(" "))),
            render: () => `<p><strong>${esc(e.title)}</strong> at ${esc(e.company)} <em>(${esc(e.date)})</em></p><p>${esc(e.description)}</p>`
        }));
        kb.education.forEach((e) => entities.push({
            tokens: new Set(tokenize([e.title, e.company, e.description].join(" "))),
            nameTokens: new Set(tokenize([e.title, e.company].join(" "))),
            render: () => `<p><strong>${esc(e.title)}</strong> — ${esc(e.company)} <em>(${esc(e.date)})</em></p><p>${esc(e.description)}</p>`
        }));

        const skillSet = new Set(kb.skills.map((s) => s.name.toLowerCase()));

        function skillCategoryFromQuery(q) {
            if (/\blanguage/.test(q)) return "languages";
            if (/\b(database|sql|postgres)/.test(q)) return "databases";
            if (/\b(ml|machine learning|deep learning|ai|model)/.test(q)) return "ml";
            if (/\b(tool|platform|cloud)/.test(q)) return "tools";
            return null;
        }

        function answer(raw) {
            const q = raw.toLowerCase().trim();
            const qTokens = tokenize(q);

            // greetings / pleasantries
            if (/^(hi|hey|hello|yo|hiya|greetings|good (morning|afternoon|evening))\b/.test(q)) {
                return `<p>Hi! I'm ${esc(kb.name)}'s portfolio assistant. Ask me about his skills, projects, experience, education, achievements, or how to get in touch.</p>`;
            }
            if (/\b(thank|thanks|thx|appreciate)\b/.test(q)) {
                return `<p>You're welcome! Anything else you'd like to know about ${esc(kb.name)}?</p>`;
            }
            if (/\b(bye|goodbye|see ya|cya)\b/.test(q)) {
                return `<p>Thanks for stopping by! Feel free to reach out through the contact section.</p>`;
            }

            // direct skill check: "do you know docker", "experience with python"
            const matchedSkill = kb.skills.find((s) => q.includes(s.name.toLowerCase()));

            // score category intents
            let bestIntent = null, bestIntentScore = 0;
            intents.forEach((it) => {
                let score = 0;
                it.kws.forEach((k) => { if (qTokens.includes(k)) score += 1; });
                if (score > bestIntentScore) { bestIntentScore = score; bestIntent = it; }
            });

            // score entities (specific items) — name-token matches weighted higher
            let bestEntity = null, bestEntityScore = 0;
            entities.forEach((ent) => {
                let score = 0;
                qTokens.forEach((t) => {
                    if (ent.nameTokens.has(t)) score += 2;
                    else if (ent.tokens.has(t)) score += 1;
                });
                if (score > bestEntityScore) { bestEntityScore = score; bestEntity = ent; }
            });

            // Decision: a strong specific match wins over a generic category
            if (bestEntity && bestEntityScore >= 3 && bestEntityScore >= bestIntentScore + 1) {
                return bestEntity.render();
            }
            if (bestIntent && bestIntentScore > 0) {
                return bestIntent.render(q);
            }
            if (matchedSkill) {
                return `<p>Yes — ${esc(kb.name)} works with <strong>${esc(matchedSkill.name)}</strong>. Ask "what are your skills?" to see the full stack.</p>`;
            }
            if (bestEntity && bestEntityScore > 0) {
                return bestEntity.render();
            }

            // fallback help
            return `<p>I'm not sure about that one. I can tell you about ${esc(kb.name)}'s:</p>` +
                `<ul><li>About / background</li><li>Skills & technologies</li><li>Projects</li><li>Experience</li><li>Education</li><li>Achievements & certifications</li><li>Contact info</li></ul>`;
        }

        return { answer };
    }

    /* ============================================================
       4. WIDGET UI
       ============================================================ */
    function buildWidget() {
        const launcher = document.createElement("button");
        launcher.className = "chatbot-launcher";
        launcher.setAttribute("aria-label", "Open chat assistant");
        launcher.innerHTML =
            '<i class="fas fa-robot icon-open"></i>' +
            '<i class="fas fa-times icon-close"></i>' +
            '<span class="chatbot-spark">✨</span>';

        const greeting = document.createElement("div");
        greeting.className = "chatbot-greeting";
        greeting.innerHTML =
            '<span><i class="fas fa-wand-magic-sparkles"></i> Curious about my work?</span>' +
            '<button class="chatbot-greeting-close" aria-label="Dismiss">&times;</button>';

        const panel = document.createElement("div");
        panel.className = "chatbot-panel";
        panel.setAttribute("role", "dialog");
        panel.setAttribute("aria-label", "Portfolio assistant");
        panel.innerHTML = `
            <div class="chatbot-header">
                <div class="chatbot-avatar"><i class="fas fa-robot"></i></div>
                <div class="chatbot-titles">
                    <h3>Ask about me</h3>
                    <p class="chatbot-status">Online</p>
                </div>
                <button class="chatbot-close-btn" aria-label="Close chat"><i class="fas fa-times"></i></button>
            </div>
            <div class="chatbot-messages" role="log" aria-live="polite"></div>
            <div class="chatbot-suggestions"></div>
            <form class="chatbot-input">
                <input type="text" placeholder="Ask me anything..." aria-label="Type your message" autocomplete="off" maxlength="200" />
                <button type="submit" class="chatbot-send-btn" aria-label="Send message"><i class="fas fa-paper-plane"></i></button>
            </form>`;

        document.body.appendChild(launcher);
        document.body.appendChild(greeting);
        document.body.appendChild(panel);

        return {
            launcher,
            greeting,
            panel,
            messages: panel.querySelector(".chatbot-messages"),
            suggestions: panel.querySelector(".chatbot-suggestions"),
            form: panel.querySelector(".chatbot-input"),
            input: panel.querySelector(".chatbot-input input"),
            closeBtn: panel.querySelector(".chatbot-close-btn"),
            greetingClose: greeting.querySelector(".chatbot-greeting-close")
        };
    }

    /* ============================================================
       5. INIT + EVENT WIRING
       ============================================================ */
    function init() {
        const kb = buildKnowledge();
        const engine = buildEngine(kb);
        const ui = buildWidget();
        let greeted = false;

        const scrollDown = () => { ui.messages.scrollTop = ui.messages.scrollHeight; };

        function addMessage(html, sender) {
            const msg = document.createElement("div");
            msg.className = "chat-msg " + sender;
            if (sender === "user") msg.textContent = html;   // user text is never treated as HTML
            else msg.innerHTML = html;                         // bot HTML built from site's own content
            ui.messages.appendChild(msg);
            scrollDown();
        }

        function showTyping() {
            const t = document.createElement("div");
            t.className = "chat-typing";
            t.innerHTML = "<span></span><span></span><span></span>";
            ui.messages.appendChild(t);
            scrollDown();
            return t;
        }

        function botReply(query) {
            const typing = showTyping();
            const reply = engine.answer(query);
            setTimeout(() => {
                typing.remove();
                addMessage(reply, "bot");
            }, 450);
        }

        function handleQuery(query) {
            const q = query.trim();
            if (!q) return;
            addMessage(q, "user");
            botReply(q);
        }

        // Suggestion chips
        const suggestions = ["What are your skills?", "Tell me about your projects", "Your experience?", "How can I contact you?"];
        suggestions.forEach((s) => {
            const chip = document.createElement("button");
            chip.type = "button";
            chip.className = "chat-suggestion";
            chip.textContent = s;
            chip.addEventListener("click", () => { handleQuery(s); ui.input.focus(); });
            ui.suggestions.appendChild(chip);
        });

        function hideGreeting() {
            if (ui.greeting) ui.greeting.classList.add("hide");
        }

        function openChat() {
            ui.panel.classList.add("open");
            ui.launcher.classList.add("open");
            ui.launcher.setAttribute("aria-label", "Close chat assistant");
            hideGreeting();
            if (!greeted) {
                greeted = true;
                addMessage(`<p>Hi there! 👋 I'm ${esc(kb.name)}'s assistant. Ask me anything about his background, skills, projects, or how to get in touch.</p>`, "bot");
            }
            setTimeout(() => ui.input.focus(), 150);
        }

        function closeChat() {
            ui.panel.classList.remove("open");
            ui.launcher.classList.remove("open");
            ui.launcher.setAttribute("aria-label", "Open chat assistant");
        }

        ui.launcher.addEventListener("click", () => {
            ui.panel.classList.contains("open") ? closeChat() : openChat();
        });
        ui.closeBtn.addEventListener("click", closeChat);
        ui.greetingClose.addEventListener("click", (e) => {
            e.stopPropagation();
            hideGreeting();
        });

        // Auto-dismiss the greeting bubble after a while if untouched
        setTimeout(hideGreeting, 9000);

        ui.form.addEventListener("submit", (e) => {
            e.preventDefault();
            handleQuery(ui.input.value);
            ui.input.value = "";
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && ui.panel.classList.contains("open")) closeChat();
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
