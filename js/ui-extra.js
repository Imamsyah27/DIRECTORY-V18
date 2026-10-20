/**
 * UI tambahan: panel bisa dilipat (tidak menumpuk) + sematkan/lepas kolom Aksi.
 * Pilihan disimpan di localStorage browser.
 */
(function () {
    const get = (k, d) => { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } };
    const set = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };

    /* ---- panel bisa dilipat ---- */
    function makeCollapsible(panel, key, startCollapsed) {
        const title = panel.querySelector(":scope > .panel-title");
        if (!title || title.dataset.cz) return;
        title.dataset.cz = "1";
        title.classList.add("cz-title");
        const caret = document.createElement("span");
        caret.className = "cz-caret"; caret.textContent = "▾";
        title.appendChild(caret);
        const saved = get("cz_" + key, startCollapsed ? "1" : "0");
        panel.classList.toggle("collapsed", saved === "1");
        title.addEventListener("click", (e) => {
            if (e.target.closest("button, a, input, select")) return;
            const c = panel.classList.toggle("collapsed");
            set("cz_" + key, c ? "1" : "0");
        });
    }
    document.querySelectorAll(".panel.collapsible").forEach((p, i) =>
        makeCollapsible(p, p.dataset.ckey || p.id || ("p" + i), p.classList.contains("start-collapsed")));
    document.querySelectorAll(".dash-stats > .panel").forEach((p, i) => makeCollapsible(p, "dstat" + i, false));

    /* ---- sematkan / lepas kolom Aksi ---- */
    const btn = document.getElementById("pinAksiBtn");
    const wrap = document.querySelector("#dashboardTable") && document.querySelector("#dashboardTable").closest(".table-wrap");
    if (btn && wrap) {
        const apply = (pinned) => {
            wrap.classList.toggle("aksi-pinned", pinned);
            btn.textContent = pinned ? "📌 Aksi: Disematkan" : "📍 Aksi: Di Ujung Tabel";
        };
        apply(get("aksi_pinned", "1") === "1");
        btn.addEventListener("click", () => {
            const p = !wrap.classList.contains("aksi-pinned");
            set("aksi_pinned", p ? "1" : "0");
            apply(p);
        });
    }
})();
