  // Funzione per caricare il JSON e popolare il contenuto
  function loadContent() {
    fetch('socket.json') // Assicurati che il percorso sia corretto
      .then(response => response.json())
      .then(data => {
        // Popola il titolo
        document.title = data.title;

        // Popola la navbar
        const navbar = document.querySelector('.navbar .container-fluid .d-flex');
        data.navbar.sections.forEach(section => {
          const link = document.createElement('a');
          link.className = 'navbar-brand me-2';
          link.href = section.link;
          link.textContent = section.name;
          navbar.appendChild(link);
        });

        // Popola il contenuto
        const contentContainer = document.querySelector('.col-8');
        data.content.forEach(section => {
          const sectionTitle = document.createElement('h4');
          sectionTitle.id = section.sectionTitle.toLowerCase().replace(/\s+/g, '-');
          sectionTitle.textContent = section.sectionTitle;
          contentContainer.appendChild(sectionTitle);

          if (section.description) {
            const description = document.createElement('p');
            description.className = 'border-bottom border-5 border-primary';
            description.textContent = section.description;
            contentContainer.appendChild(description);
          }

          if (section.types) {
            const accordion = document.createElement('div');
            accordion.className = 'accordion accordion-flush';
            section.types.forEach(type => {
              const item = document.createElement('div');
              item.className = 'accordion-item';
              const header = document.createElement('h2');
              header.className = 'accordion-header';
              const button = document.createElement('button');
              button.className = 'accordion-button collapsed';
              button.type = 'button';
              button.setAttribute('data-bs-toggle', 'collapse');
              button.setAttribute('data-bs-target', `#${type.type.toLowerCase().replace(/\s+/g, '-')}`);
              button.textContent = type.type;
              header.appendChild(button);
              item.appendChild(header);

              const collapseDiv = document.createElement('div');
              collapseDiv.id = type.type.toLowerCase().replace(/\s+/g, '-');
              collapseDiv.className = 'accordion-collapse collapse';
              const body = document.createElement('div');
              body.className = 'accordion-body';
              body.textContent = type.description;
              collapseDiv.appendChild(body);
              item.appendChild(collapseDiv);
              accordion.appendChild(item);
            });
            contentContainer.appendChild(accordion);
          }

          if (section.examples) {
            const exampleAccordion = document.createElement('div');
            exampleAccordion.className = 'accordion accordion-flush';
            section.examples.forEach(example => {
              const exampleItem = document.createElement('div');
              exampleItem.className = 'accordion-item';
              const exampleHeader = document.createElement('h2');
              exampleHeader.className = 'accordion-header';
              const exampleButton = document.createElement('button');
              exampleButton.className = 'accordion-button collapsed';
              exampleButton.type = 'button';
              exampleButton.setAttribute('data-bs-toggle', 'collapse');
              exampleButton.setAttribute('data-bs-target', `#${example.name.toLowerCase().replace(/\s+/g, '-')}`);
              exampleButton.textContent = example.name;
              exampleHeader.appendChild(exampleButton);
              exampleItem.appendChild(exampleHeader);

              const exampleCollapseDiv = document.createElement('div');
              exampleCollapseDiv.id = example.name.toLowerCase().replace(/\s+/g, '-');
              exampleCollapseDiv.className = 'accordion-collapse collapse';
              const exampleBody = document.createElement('div');
              exampleBody.className = 'accordion-body';
              const codeBlock = document.createElement('pre');
              const code = document.createElement('code');
              code.textContent = example.code;
              codeBlock.appendChild(code);
              exampleBody.appendChild(codeBlock);
              exampleCollapseDiv.appendChild(exampleBody);
              exampleItem.appendChild(exampleCollapseDiv);
              exampleAccordion.appendChild(exampleItem);
            });
            contentContainer.appendChild(exampleAccordion);
          }
        });

        // Popola il footer
        const footer = document.querySelector('footer');
        footer.querySelector('.text-uppercase fw-bold.mb-4').textContent = data.footer.company;
        footer.querySelector('.text-uppercase.fw-bold.mb-4 + p').textContent = data.footer.contact.address;
        footer.querySelector('.text-uppercase.fw-bold.mb-4 + p + p').textContent = data.footer.contact.email;
        footer.querySelector('.text-uppercase.fw-bold.mb-4 + p + p + p').textContent = data.footer.contact.phone;
        const copyright = footer.querySelector('.text-center.p-4');
        copyright.innerHTML = `© ${new Date().getFullYear()} Copyright: <a class="text-reset fw-bold" href="${data.footer.links[0].url}" style="color: #007bff;">${data.footer.copyright}</a>`;
      })
      .catch(error => console.error('Error loading JSON:', error));
  }

  // Carica il contenuto al caricamento della pagina
  window.onload = loadContent;