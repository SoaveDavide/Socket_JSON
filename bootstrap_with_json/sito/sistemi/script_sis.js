window.onload = function() {
    fetch('sistemi.json') // Sostituisci con il percorso reale del file JSON
        .then(response => response.json())
        .then(data => {
            // Titolo della pagina
            document.title = data.pagina.titolo;
            document.querySelector('h1').innerText = data.pagina.titolo;

            // Navbar principale e secondaria
            let navbar = document.querySelector('.navbar .container-fluid');
            let homeLink = document.createElement('a');
            homeLink.className = 'navbar-brand';
            homeLink.href = data.pagina.navbar.linkPrincipale.url;
            homeLink.innerText = data.pagina.navbar.linkPrincipale.nome;
            navbar.appendChild(homeLink);

            let linkContainer = document.createElement('div');
            linkContainer.className = 'd-flex';
            data.pagina.navbar.linkSecondari.forEach(link => {
                let navLink = document.createElement('a');
                navLink.className = 'navbar-brand me-2';
                navLink.href = link.url;
                navLink.innerText = link.nome;
                linkContainer.appendChild(navLink);
            });
            navbar.appendChild(linkContainer);

            // Contenuti
            let contentContainer = document.querySelector('.scrollspy-example');
            data.pagina.contenuti.sezioni.forEach(sezione => {
                let sectionTitle = document.createElement('h4');
                sectionTitle.id = sezione.id;
                sectionTitle.innerText = sezione.titolo;
                contentContainer.appendChild(sectionTitle);

                let sectionDesc = document.createElement('p');
                sectionDesc.className = 'border-bottom border-5 border-primary';
                sectionDesc.innerText = sezione.descrizione;
                contentContainer.appendChild(sectionDesc);

                if (sezione.funzioni) {
                    let accordion = document.createElement('div');
                    accordion.className = 'accordion accordion-flush';
                    accordion.id = 'accordionFlushExample';

                    sezione.funzioni.forEach((funzione, index) => {
                        let item = document.createElement('div');
                        item.className = 'accordion-item';

                        let header = document.createElement('h2');
                        header.className = 'accordion-header';

                        let button = document.createElement('button');
                        button.className = 'accordion-button collapsed';
                        button.type = 'button';
                        button.setAttribute('data-bs-toggle', 'collapse');
                        button.setAttribute('data-bs-target', `#flush-collapse${index}`);
                        button.setAttribute('aria-expanded', 'false');
                        button.setAttribute('aria-controls', `flush-collapse${index}`);
                        button.innerText = funzione.nome;

                        header.appendChild(button);
                        item.appendChild(header);

                        let collapse = document.createElement('div');
                        collapse.id = `flush-collapse${index}`;
                        collapse.className = 'accordion-collapse collapse';
                        collapse.setAttribute('data-bs-parent', '#accordionFlushExample');

                        let body = document.createElement('div');
                        body.className = 'accordion-body';
                        body.innerText = funzione.descrizione;
                        collapse.appendChild(body);

                        item.appendChild(collapse);
                        accordion.appendChild(item);
                    });
                    contentContainer.appendChild(accordion);
                }
            });

            // Footer
            document.getElementById('company-name').innerText = data.pagina.footer.copyright.nome;
            document.getElementById('company-info').innerText = data.pagina.footer.informazioniPersonali;
        })
        .catch(error => console.error('Errore:', error));
};
