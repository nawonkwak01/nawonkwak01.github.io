/* Shared data loading: retain a valid snapshot if an edit or request fails. */
(function () {
    const baseline = {"about":{"name":"Nawon Kwak","tagline":"Materials Researcher | Lightweight Alloys | Microstructure & Phase Transformation","avatar":"img/pic me.jpg","resume":"https://drive.google.com/file/d/1J79L3laKdUfjyP44nHjJ6E50oFebs5if/view?usp=drivesdk","details":[{"emoji":"🔬","label":"Current Role","value":"Research Staff, Korea Maritime & Ocean University"},{"emoji":"🎓","label":"Education","value":"M.S. in Advanced Materials Convergence Engineering"},{"emoji":"📍","label":"Location","value":"Republic of Korea"},{"emoji":"⚙️","label":"Research Focus","value":"Lightweight alloys, microstructure, phase transformation, residual stress, and additive manufacturing"},{"emoji":"🧪","label":"Materials","value":"Al alloys, Mg alloys, and Ni-based superalloys"}],"social":[{"id":"profile-academic-0","class":"scholar-link","icon":"zmdi-graduation-cap","url":"https://scholar.google.com/citations?user=Dra19MYAAAAJ&hl=ko","label":"Google Scholar"},{"id":"profile-academic-1","class":"researchgate-link","icon":"zmdi-flask","url":"https://www.researchgate.net/profile/Nawon-Kwak?ev=hdr_xprf","label":"ResearchGate"},{"id":"profile-academic-2","class":"linkedin-link","icon":"zmdi-linkedin","url":"https://www.linkedin.com/in/nawonkwak01/","label":"LinkedIn"},{"id":"profile-github","class":"github-link","icon":"zmdi-github","url":"https://github.com/nawonkwak01","label":"GitHub"}]},"whatIDo":[{"icon":"zmdi-invert-colors","iconColor":"font-blue","title":"Lightweight Alloys","description":"Research on aluminum and magnesium alloys with emphasis on processing–microstructure–property relationships."},{"icon":"zmdi-view-module","iconColor":"font-green","title":"Microstructure & Phase Transformation","description":"Characterization of precipitates, phases, solidification structures, and microstructural evolution using microscopy and diffraction."},{"icon":"zmdi-layers","iconColor":"font-yellow","title":"Advanced Processing","description":"Experience with casting, heat treatment, residual-stress analysis, and metal additive manufacturing."}],"experience":[{"company":"Metalcasting Research Lab, Korea Maritime and Ocean University","role":"Research Assistant (Advisor: Prof. Eunkyung Lee)","location":"Busan, South Korea","period":"Mar. 2026 – Present","current":true,"description":"Evaluated discrepancies between simulated and measured residual stresses in full-scale HPDC aluminum automotive subframes; correlated local microstructural characteristics with residual stress; applied DOE to identify statistically significant microstructural factors affecting residual stress."},{"company":"Metalcasting Research Lab, Korea Maritime and Ocean University","role":"M.S. Student","location":"Busan, South Korea","period":"Mar. 2024 – Feb. 2026","current":false,"description":"Conducted research on residual stress formation and microstructural factors in Al–Si alloys using casting simulation, X-ray residual stress measurement, microstructural characterization, and DOE."},{"company":"Convergence Composite Materials Lab, Dong-Eui University","role":"Undergraduate Research Assistant (Advisor: Prof. Ilguk Jo)","location":"Busan, South Korea","period":"Sep. 2022 – Feb. 2024","current":false,"description":"Extended an undergraduate capstone project into research on additively manufactured metallic materials. Investigated aging-temperature effects in SLM 18Ni300 maraging steel and contributed to a study on build orientation and heat treatment of SLM Inconel 718."}],"skills":[{"group":"Software","chips":["JMatPro","Origin","Minitab","ImageJ","MAGMA (interpretation of casting simulation results: filling, solidification, residual stress, and defects)","AutoCAD","Fusion 360","CATIA","Python (basic)","Excel VBA"]},{"group":"Characterization","chips":["Aluminum Casting","XRD","SEM–EDS","LIBS","Portable X-ray residual stress analysis","3D optical microscopy"]},{"group":"Testing","chips":["Nanoindentation Testing","Vickers Hardness Testing","Tensile Testing","Ball-on-disc wear Testing","Electrochemical corrosion Testing"]},{"group":"Casting & Processing","chips":["Lab-scale gravitational casting","Heat-treatment furnace operation"]}],"certifications":[{"name":"Engineer Metal","issuer":"Human Resources Development Service of Korea","date":"Sep. 2024"},{"name":"Computer Specialist in Spreadsheet & Database Level-1","issuer":"Korea Chamber of Commerce and Industry","date":"Aug. 2022"},{"name":"CAD Ability Test (CAT) Level-2 ","issuer":"Korea Productivity Center","date":"Jan. 2021"}],"repos":[{"name":"Research Experiences","url":"research-experiences.html","description":"Selected research projects in aluminum alloys, residual stress, casting, additive manufacturing, and Ni-based superalloys.","banner":"img/github_banner.jpg","color":"#777777","lang":"Research","date":"2026-09-10T00:00:00Z","stars":0,"forks":0},{"name":"Research Interests","url":"research.html","description":"Current research interests in lightweight alloys, phase transformation, high-temperature materials, and microstructure characterization.","banner":"img/github_banner.jpg","color":"#777777","lang":"Materials","date":"2026-09-10T00:00:00Z","stars":0,"forks":0},{"name":"Engineering Project Experiences","url":"project-experiences.html","description":"Mechanical design experience in EV and robotic reducer systems, including planetary gears, bearings, fits, GD&T, and prototype development.","banner":"img/github_banner.jpg","color":"#777777","lang":"Engineering","date":"2026-09-10T00:00:00Z","stars":0,"forks":0}],"contact":[{"id":"contact-academic-0","class":"scholar-link","icon":"zmdi-graduation-cap","url":"https://scholar.google.com/citations?user=Dra19MYAAAAJ&hl=ko","label":"Google Scholar"},{"id":"contact-academic-1","class":"researchgate-link","icon":"zmdi-flask","url":"https://www.researchgate.net/profile/Nawon-Kwak?ev=hdr_xprf","label":"ResearchGate"},{"id":"contact-academic-2","class":"linkedin-link","icon":"zmdi-linkedin","url":"https://www.linkedin.com/in/nawonkwak01/","label":"LinkedIn"},{"id":"contact-github","class":"github-link","icon":"zmdi-github","url":"https://github.com/nawonkwak01","label":"GitHub"}]};
    const key = "portfolio:last-valid:v1";
    function cached() {
        try {
            const value = JSON.parse(localStorage.getItem(key));
            return value && typeof value === "object" && !Array.isArray(value) ? value : baseline;
        } catch (_) { return baseline; }
    }
    function notice(message) {
        let node = document.getElementById("data-status");
        if (!node) {
            node = document.createElement("p");
            node.id = "data-status";
            node.setAttribute("role", "status");
            node.style.cssText = "padding:12px 16px;margin:100px auto 0;max-width:900px;background:#fff4d6;color:#513d08;border-radius:6px";
            document.querySelector(".main-content").prepend(node);
        }
        node.textContent = message;
    }
    window.loadPortfolio = async function (sections) {
        const previous = cached();
        let data;
        let failed = false;
        const controller = new AbortController();
        const timer = setTimeout(function () { controller.abort(); }, 10000);
        try {
            const response = await fetch("data.json?updated=" + Date.now(), {cache:"no-store",signal:controller.signal});
            if (!response.ok) throw new Error("HTTP " + response.status);
            data = await response.json();
            if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error("Invalid data");
        } catch (_) {
            data = previous;
            failed = true;
        } finally { clearTimeout(timer); }
        const accepted = {};
        for (const section of sections) {
            if (!document.getElementById(section.id)) continue;
            try {
                section.render(data[section.key]);
                accepted[section.key] = data[section.key];
            } catch (_) {
                failed = true;
                try { section.render(previous[section.key] === undefined ? baseline[section.key] : previous[section.key]); }
                catch (_) { try { section.render(baseline[section.key]); } catch (_) {} }
            }
        }
        if (!failed) {
            try { localStorage.setItem(key, JSON.stringify(Object.assign({}, data, accepted))); } catch (_) {}
        } else {
            notice("Some updates could not be loaded. Previously saved content is shown.");
        }
        if (window.componentHandler) window.componentHandler.upgradeDom();
    };
})();
