fetch('glossario.json')
    .then(response => response.json())
    .then(data => {
        // Imposta meta e title
        document.title = data.title;
        document.getElementById("favicon").href = data.meta.icon;

        // Popola la navbar
        const navbarLinks = document.getElementById("navbar-links");
        let navContent = `<a class="navbar-brand" href="#">${data.nav.brand}</a><div class="d-flex">`;
        data.nav.a.forEach(link => {
            navContent += `<a class="navbar-brand me-2" href="${link.href}">${link.text}</a>`;
        });
        navContent += '</div>';
        navbarLinks.innerHTML = navContent;

        // Popola i termini del glossario
        const glossaryContainer = document.getElementById("glossary-terms");
        data.glossary.forEach(term => {
            glossaryContainer.innerHTML += `
            <div class="col">
                <div class="card h-100 bg-dark text-light">
                    <div class="card-body">
                        <h5 class="card-title text-primary">${term.h5}</h5>
                        <p class="card-text">${term.p}</p>
                        <a href="${term.href}" class="btn btn-primary" target="_blank">Leggi di più</a>
                    </div>
                </div>
            </div>`;
        });

        // Popola il footer
        const footerContent = document.getElementById("footer-content");
        let footerHTML = `
        <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
            <div class="me-5 d-none d-lg-block">
                <span style="color: #007bff;">${data.footer.span.text}</span>
            </div>
            <div>`;
        data.footer.socialLinks.forEach(link => {
            footerHTML += `<a href="${link.href}" class="me-4 text-reset"><i class="${link.icon}"></i></a>`;
        });
        footerHTML += `</div></section><section class="container text-center text-md-start mt-5"><div class="row mt-3">`;

        data.footer.info.forEach(info => {
            footerHTML += `
            <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 class="text-uppercase fw-bold mb-4">${info.title}</h6>`;
            if (Array.isArray(info.content)) {
                info.content.forEach(item => {
                    footerHTML += `<p><i class="${item.icon} me-3"></i> ${item.text}</p>`;
                });
            } else {
                footerHTML += `<p>${info.content}</p>`;
            }
            footerHTML += '</div>';
        });

        footerHTML += `</div></section>
        <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.05);">
            ${data.footer.copyright.text} 
            <a class="text-reset fw-bold" href="${data.footer.copyright.link.href}" target="_blank" style="color: #007bff;">
                ${data.footer.copyright.link.text}
            </a>
        </div>`;

        footerContent.innerHTML = footerHTML;
    });