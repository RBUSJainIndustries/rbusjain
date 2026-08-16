/* =========================================================
   R. B. UMRAO SINGH JAIN INDUSTRIES
   SHARED SITE JAVASCRIPT
   (Mobile nav, active nav link across pages, footer year)
========================================================== */

(function () {

    /* =====================================================
       MOBILE NAVIGATION
    ====================================================== */

    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-menu a");

    if (navToggle && navMenu) {

        navToggle.addEventListener("click", function () {

            const isOpen = navMenu.classList.toggle("open");

            navToggle.classList.toggle("active", isOpen);

            navToggle.setAttribute("aria-expanded", isOpen);

            navToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

        });

    }


    /* =====================================================
       CLOSE MOBILE MENU AFTER CLICK
    ====================================================== */

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("open");
            navToggle.classList.remove("active");

            navToggle.setAttribute("aria-expanded", "false");
            navToggle.setAttribute("aria-label", "Open navigation menu");

        });

    });


    /* =====================================================
       ACTIVE NAVIGATION LINK (works across multiple pages)
    ====================================================== */

    function currentPageName() {

        let path = window.location.pathname.split("/").pop();

        if (path === "") {
            path = "index.html";
        }

        return path;
    }

    const currentPage = currentPageName();

    function clearActive() {
        navLinks.forEach(function (link) {
            link.classList.remove("active");
        });
    }

    function setDefaultActive() {

        clearActive();

        let match = null;

        navLinks.forEach(function (link) {

            const hrefAttr = link.getAttribute("href") || "";
            const parts = hrefAttr.split("#");
            const hrefPage = parts[0] === "" ? currentPage : parts[0];
            const hrefHash = parts[1];

            if (hrefPage === currentPage && !hrefHash) {
                match = link;
            }

        });

        if (match) {
            match.classList.add("active");
        }

    }

    setDefaultActive();


    /* =====================================================
       ACTIVE LINK ON SCROLL (for sections within this page)
    ====================================================== */

    const sections = document.querySelectorAll("main section[id]");

    if (sections.length) {

        const observer = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        clearActive();

                        const activeLink = document.querySelector(
                            '.nav-menu a[href="' + currentPage + '#' + entry.target.id + '"]'
                        );

                        if (activeLink) {
                            activeLink.classList.add("active");
                        } else {
                            setDefaultActive();
                        }

                    }

                });

            },
            {
                rootMargin: "-25% 0px -65% 0px"
            }
        );

        sections.forEach(function (section) {
            observer.observe(section);
        });

    }


    /* =====================================================
       CURRENT YEAR
    ====================================================== */

    const yearEl = document.getElementById("currentYear");

    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }


    /* =====================================================
       ESC KEY CLOSES MOBILE MENU
    ====================================================== */

    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            navMenu &&
            navMenu.classList.contains("open")
        ) {

            navMenu.classList.remove("open");
            navToggle.classList.remove("active");

            navToggle.setAttribute("aria-expanded", "false");
            navToggle.focus();

        }

    });

})();
