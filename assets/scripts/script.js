$(document).ready(function () {
    const apiUrl = "https://rickandmortyapi.com/api/character/";
  
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
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
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
      },
      error: function (error) {
        console.error("Error al consumir la API:", error);
        $("#character-container").html("<p class='text-danger'>Hubo un error al cargar los personajes.</p>");
      }
    });
  });
  