$(document).ready(function () {
    const apiUrl = "https://rickandmortyapi.com/api/character/";

    //header y footer
    $('#header').html('<h1>Rick and Morty Personajes</h1>');
    $('#footer').html('<p>&copy; 2023 Javier Nieves</p>');

    //Cuerpo del filtro
    $('#main-container').html(`
        <h4>Busqueda Personajes</h4>
        <div id="filter-container" class="mb-4">
            <input type="text" id="search" class="form-control mb-2" placeholder="Buscar personaje...">
            <select id="species-filter" class="form-control">
                <option value="">Todos</option>
                <option value="Human">Humanos</option>
                <option value="Alien">Aliens</option>
            </select>
        </div>
        <div id="character-container" class="row g-4"></div>
    `);

    // Consumir la API
    $.ajax({
        url: apiUrl,
        method: "GET",
        success: function (response) {
            const characters = response.results;
            const container = $("#character-container");

            // Iterar y crear cards
            characters.forEach(character => {
                const cardHtml = `
                    <div class="col-12 col-sm-6 col-md-4 col-lg-3 character-card" data-name="${character.name}" data-species="${character.species}">
                        <div class="card h-100" data-id="${character.id}" data-name="${character.name}" 
                            data-status="${character.status}" data-species="${character.species}" 
                            data-gender="${character.gender}" data-origin="${character.origin.name}" 
                            data-image="${character.image}">
                            <img src="${character.image}" class="card-img-top" alt="${character.name}">
                            <div class="card-body">
                                <h5 class="card-title">${character.name}</h5>
                                <p class="card-text"><strong>Status:</strong> ${character.status}</p>
                            </div>
                        </div>
                    </div>
                `;
                container.append(cardHtml);
            });

            // Evento click en las cards
            $(".card").on("click", function () {
                const name = $(this).data("name");
                const status = $(this).data("status");
                const species = $(this).data("species");
                const gender = $(this).data("gender");
                const origin = $(this).data("origin");
                const image = $(this).data("image");

                // Configurar los datos en el modal
                $("#characterModalLabel").text(name);
                $("#character-image").attr("src", image).attr("alt", name);
                $("#character-status").text(status);
                $("#character-species").text(species);
                $("#character-gender").text(gender);
                $("#character-origin").text(origin);

                // Mostrar el modal
                $("#characterModal").modal("show");
            });

            // Filtro de búsqueda
            $("#search").on("keyup", function () {
                const searchTerm = $(this).val().toLowerCase();
                filterCharacters(searchTerm, $("#species-filter").val());
            });

            // Filtro de especie
            $("#species-filter").on("change", function () {
                filterCharacters($("#search").val().toLowerCase(), $(this).val());
            });

            function filterCharacters(searchTerm, species) {
                $(".character-card").each(function () {
                    const characterName = $(this).data("name").toLowerCase();
                    const characterSpecies = $(this).data("species");
                    if (characterName.includes(searchTerm) && (species === "" || characterSpecies === species)) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                });
            }
        },
        error: function (error) {
            console.error("Error al consumir la API:", error);
            $("#character-container").html("<p class='text-danger'>Hubo un error al cargar los personajes.</p>");
        }
    });
});