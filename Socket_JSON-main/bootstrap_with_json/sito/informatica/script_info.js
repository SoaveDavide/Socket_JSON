fetch('informatica.json')
        .then(response => response.json())
        .then(data => {
          // Imposta il titolo
          document.getElementById("page-title").innerText = data.title;

          // Imposta la navbar
          const navbar = document.getElementById("navbar-links");
          data.navbar.forEach(item => {
            const link = document.createElement("a");
            link.classList.add("navbar-brand", "me-2");
            link.href = item.href;
            link.innerText = item.text;
            navbar.appendChild(link);
          });

          // Imposta l'header
          document.getElementById("header-title").innerText = data.content.header;

          // Imposta le sezioni
          const contentSections = document.getElementById("content-sections");
          data.content.sections.forEach(section => {
            const sectionTitle = document.createElement("h4");
            sectionTitle.id = section.id;
            sectionTitle.innerText = section.title;
            contentSections.appendChild(sectionTitle);

            if (section.table) {
              const table = document.createElement("table");
              const thead = document.createElement("thead");
              const tbody = document.createElement("tbody");

              const headerRow = document.createElement("tr");
              section.table.headers.forEach(header => {
                const th = document.createElement("th");
                th.innerText = header;
                headerRow.appendChild(th);
              });
              thead.appendChild(headerRow);

              section.table.rows.forEach(row => {
                const tr = document.createElement("tr");
                row.forEach(cell => {
                  const td = document.createElement("td");
                  td.innerText = cell;
                  tr.appendChild(td);
                });
                tbody.appendChild(tr);
              });

              table.appendChild(thead);
              table.appendChild(tbody);
              contentSections.appendChild(table);
            } else {
              const paragraph = document.createElement("p");
              paragraph.classList.add("border-bottom", "border-5", "border-primary");
              paragraph.innerText = section.text;
              contentSections.appendChild(paragraph);
            }
          });

          // Imposta il footer
          document.getElementById("company-name").innerText = data.footer.company;
          document.getElementById("company-info").innerText = "Davide Soave - DICHIARAZIONE PRIVACY / COOKIES";
          document.getElementById("contact-address").innerText = data.footer.contact.address;
          document.getElementById("contact-email").innerText = data.footer.contact.email;
          document.getElementById("contact-phone").innerText = data.footer.contact.phone;

          // Imposta i link social
          const socialLinks = document.getElementById("social-links");
          data.footer.socialLinks.forEach(link => {
            const a = document.createElement("a");
            a.href = link.url;
            a.classList.add("me-4", "text-reset");
            a.innerText = link.platform;
            socialLinks.appendChild(a);
          });

          // Imposta la lista laterale
          const listExample = document.getElementById("list-example");
          data.content.sections.forEach(section => {
            const listItem = document.createElement("a");
            listItem.classList.add("list-group-item", "list-group-item-action");
            listItem.href = "#" + section.id;
            listItem.innerText = section.title;
            listExample.appendChild(listItem);
          });
        })
        .catch(error => {
          console.error('Errore nel caricamento del JSON:', error);
        });