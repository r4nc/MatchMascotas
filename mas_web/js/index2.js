document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('userForm');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita el envío tradicional del formulario

        // Recopila los datos del formulario
        const tamaño = document.getElementById('tamaño').value;
        const hogar = document.getElementById('hogar').value;
        const edad = document.getElementById('edad').value;
        const compatibleConNinos = document.querySelector('input[name="comp_a"]:checked')?.value;
        const compatibleConOtros = document.querySelector('input[name="comp_b"]:checked')?.value;
        const nivelActividad = document.getElementById('nivel_actividad').value;
        const temperamento = document.getElementById('temperamento').value;

        // Construye la URL con los parámetros
        const query = new URLSearchParams({
            tamaño,
            hogar,
            edad,
            compatible_con_ninos: compatibleConNinos,
            compatible_con_otros: compatibleConOtros,
            nivel_actividad: nivelActividad,
            temperamento,
        });

        // Redirige al segundo HTML con los datos en la URL
        window.location.href = `4_respuestaespec.html?${query}`;
    });
});
document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);

    // Extrae los parámetros
    const tamaño = urlParams.get('tamaño');
    const hogar = urlParams.get('hogar');
    const edad = urlParams.get('edad');
    const nivelActividad = urlParams.get('nivel_actividad');
    const temperamento = urlParams.get('temperamento');

    const resultsContainer = document.getElementById('cards-container');

    try {
        // Realiza la solicitud a la API
        const response = await fetch(`http://localhost:3000/api/mascotas?${urlParams}`);
        const data = await response.json();

        // Limpia los resultados previos
        resultsContainer.innerHTML = '';

        // Muestra los resultados
        if (data.length > 0) {
            data.forEach((mascota) => {
                const card = document.createElement('div');
                card.classList.add('card', 'active');
                card.innerHTML = `
                    <h3 class="card-title">${mascota.animal}</h3>
                    <center><img src="${mascota.imagen}" alt="Imagen de ${mascota.animal}" class="card-image"></center>
                    <p class="card-description">${mascota.descripcion} ${mascota.requisitos_cuidados}</p>
                `;
                resultsContainer.appendChild(card);
            });
        } else {
            resultsContainer.innerHTML = '<p>No se encontraron resultados.</p>';
        }
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        resultsContainer.innerHTML = '<p>Error al cargar los datos. Por favor, intenta de nuevo.</p>';
    }
});
