document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('userForm');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita el envío tradicional del formulario

        // Recopila los datos del formulario
        const tamaño = document.getElementById('tamaño').value;
        const hogar = document.getElementById('hogar').value;
        const edad = document.getElementById('edad').value;
        const nivelActividad = document.getElementById('nivel_actividad').value;
        const temperamento = document.getElementById('temperamento').value;

        // Construye la URL con los parámetros
        const query = new URLSearchParams({
            tamaño,
            hogar,
            edad,
            nivel_actividad: nivelActividad,
            temperamento,
        });

        // Redirige al segundo HTML con los datos en la URL
        window.location.href = `2_respuestamult.html?${query}`;
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
        const response = await fetch(`http://localhost:3000/api/mascotas?${urlParams}`);
        const data = await response.json();

        resultsContainer.innerHTML = ''; // Limpia las tarjetas existentes

        // Generar las tarjetas
        if (data.length > 0) {
            data.forEach((mascota, index) => {
                const card = document.createElement('div');
                card.classList.add('card');
                if (index === 0) card.classList.add('active'); // Marca la primera tarjeta como activa
                card.innerHTML = `
                    <h3 class="card-title">${mascota.animal}</h3>
                    <center><img src="${mascota.imagen}" alt="Imagen de ${mascota.animal}" class="card-image"></center>
                    <p class="card-description">${mascota.descripcion} <br>${mascota.requisitos_cuidados}</p>
                `;
                resultsContainer.appendChild(card);
            });
        } else {
            resultsContainer.innerHTML = '<p>No se encontraron resultados.</p>';
        }

        // Actualizar la navegación después de generar las tarjetas
        currentPetIndex = 0;
        updateDisplay();
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        resultsContainer.innerHTML = '<p>Error al cargar los datos. Por favor, intenta de nuevo.</p>';
    }
});


let currentPetIndex = 0;
let pets = []; // Inicialmente vacío
const petCounter = document.querySelector('.pet-counter');

function updateDisplay() {
    pets = document.querySelectorAll('.card'); // Re-evaluar las tarjetas dinámicamente
    pets.forEach((pet, index) => {
        pet.classList.toggle('active', index === currentPetIndex);
    });
    petCounter.textContent = pets.length > 0 ? `${currentPetIndex + 1} / ${pets.length}` : '0 / 0';
}

function showNextPet() {
    if (pets.length > 0) {
        currentPetIndex = (currentPetIndex + 1) % pets.length;
        updateDisplay();
    }
}

function showPreviousPet() {
    if (pets.length > 0) {
        currentPetIndex = (currentPetIndex - 1 + pets.length) % pets.length;
        updateDisplay();
    }
}

