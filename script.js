// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Referencias a elementos del DOM ---
    const navInicio = document.getElementById('nav-inicio');
    const navComponentes = document.getElementById('nav-componentes');
    const navSimulacion = document.getElementById('nav-simulacion');

    const introSection = document.getElementById('intro-section');
    const componentsSection = document.getElementById('components-section');
    const simulationSection = document.getElementById('simulation-section');

    const startSimulationBtn = document.getElementById('start-simulation-btn');
    const simulationOutput = document.getElementById('simulation-output');
    const keyInput = document.getElementById('key-input');
    const simulateKeyBtn = document.getElementById('simulate-key-btn');
    const simulateSoundBtn = document.getElementById('simulate-sound-btn');
    const simulateNetworkBtn = document.getElementById('simulate-network-btn');
    const resetSimulationBtn = document.getElementById('reset-simulation-btn');

    const componentCards = document.querySelectorAll('.component-card');

    let messageDelay = 800; // Retardo en milisegundos entre mensajes

    // --- Funcionalidad de Navegación ---
    function showSection(sectionId) {
        // Oculta todas las secciones
        document.querySelectorAll('.content-section').forEach(section => {
            section.style.display = 'none';
        });
        // Muestra la sección deseada
        document.getElementById(sectionId).style.display = 'block';

        // Actualiza el estado activo en el menú de navegación
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        if (sectionId === 'intro-section') {
            navInicio.classList.add('active');
        } else if (sectionId === 'components-section') {
            navComponentes.classList.add('active');
        } else if (sectionId === 'simulation-section') {
            navSimulacion.classList.add('active');
        }
    }

    // Event Listeners para la navegación
    navInicio.addEventListener('click', () => showSection('intro-section'));
    navComponentes.addEventListener('click', () => showSection('components-section'));
    navSimulacion.addEventListener('click', () => showSection('simulation-section'));
    startSimulationBtn.addEventListener('click', () => showSection('simulation-section'));

    // --- Lógica del Simulador de Hardware (Narrativa Frontend) ---

    function appendToOutput(message, delay = messageDelay) {
        return new Promise(resolve => {
            setTimeout(() => {
                const p = document.createElement('p');
                p.textContent = message;
                simulationOutput.appendChild(p);
                simulationOutput.scrollTop = simulationOutput.scrollHeight; // Auto-scroll
                resolve();
            }, delay);
        });
    }

    async function runSimulation(tecla) {
        keyInput.value = ''; // Limpiar el input

        await appendToOutput(`\n-------------------------------------`);
        await appendToOutput(`¡Simulando pulsación de tecla: '${tecla.toUpperCase()}'!`);
        await appendToOutput(`Teclado detecta la pulsación y envía la señal digital.`);
        await appendToOutput(`Chipset (Controlador de I/O) recibe la señal del Teclado.`);
        await appendToOutput(`Chipset dirige la información a la RAM.`);
        await appendToOutput(`RAM carga la señal para su procesamiento.`);
        await appendToOutput(`CPU (Unidad Central de Procesamiento) comienza a procesar la señal de la RAM.`);

        if (tecla.toUpperCase() === 'S') {
            await appendToOutput(`CPU identifica una solicitud de SONIDO.`);
            await appendToOutput(`CPU envía datos a la Tarjeta de Sonido.`);
            await appendToOutput(`Tarjeta de Sonido procesa los datos digitales y los convierte en señales analógicas.`);
            await appendToOutput(`Altavoces reciben la señal analógica y ¡emiten sonido!`);
        } else if (tecla.toUpperCase() === 'N') {
            await appendToOutput(`CPU identifica una solicitud de RED.`);
            await appendToOutput(`CPU envía datos a la Tarjeta de Red.`);

            // Simulación de interacción de red
            await appendToOutput(`Tarjeta de Red lista. ¿Deseas 'enviar' o 'recibir' datos? (E/R)`);

            // Para simular la interacción, necesitamos un pequeño truco ya que no hay input en tiempo real
            // Podríamos añadir un prompt real de JS, pero para mantener la simulación simple,
            // podemos simular una "decisión" o pedir otro input.
            // Por simplicidad, simularemos una "recepción" automática en este demo.

            await appendToOutput(`Simulando RECEPCIÓN de datos...`);
            await appendToOutput(`Tarjeta de Red recibe datos de la red.`);
            await appendToOutput(`Tarjeta de Red envía los datos recibidos al Chipset.`);
            await appendToOutput(`Chipset dirige los datos recibidos al SSD/HDD.`);
            await appendToOutput(`SSD/HDD guarda los nuevos datos de forma permanente.`);
            await appendToOutput(`¡Datos recibidos y guardados con éxito!`);

        } else {
            await appendToOutput(`CPU procesa la señal de la tecla para mostrar información visual.`);
            await appendToOutput(`CPU envía los datos procesados a la GPU (Unidad de Procesamiento Gráfico).`);
            await appendToOutput(`GPU renderiza la imagen o el carácter.`);
            await appendToOutput(`GPU envía la señal de video al Monitor.`);
            await appendToOutput(`Monitor muestra: ¡'${tecla.toUpperCase()}' aparece en pantalla!`);
        }
        await appendToOutput(`-------------------------------------`);
    }

    // Event Listeners del simulador
    simulateKeyBtn.addEventListener('click', () => {
        const tecla = keyInput.value.trim();
        if (tecla) {
            runSimulation(tecla);
        } else {
            appendToOutput("Por favor, ingresa una tecla para simular.");
        }
    });

    // Permitir Enter en el campo de texto
    keyInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            simulateKeyBtn.click();
        }
    });

    simulateSoundBtn.addEventListener('click', () => runSimulation('S'));
    simulateNetworkBtn.addEventListener('click', () => runSimulation('N'));

    resetSimulationBtn.addEventListener('click', () => {
        simulationOutput.innerHTML = '<p>Simulación iniciada: Sistema Operativo Básico cargado y listo para interacción.</p>';
        appendToOutput(`Sistema Operativo Básico cargado desde SSD/HDD.`, 0);
        appendToOutput(`Chipset (Controlador de I/O) dirige el SO a la RAM.`, 400);
        appendToOutput(`RAM carga el Sistema Operativo.`, 800);
        appendToOutput(`CPU (Unidad Central de Procesamiento) inicializa el Sistema Operativo.`, 1200);
        appendToOutput(`¡Listo para la interacción!`, 1600);
    });

    // Carga inicial del SO al cargar la sección de simulación
    // Esta parte la ejecutamos al mostrar la sección de simulación
    // para que no se ejecute al cargar la página completa.
    // También la pondremos en resetSimulationBtn para el reset.


    // --- Interactividad de Componentes ---
    componentCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('expanded'); // Alterna la clase 'expanded'
        });
    });

    // --- Configuración inicial al cargar la página ---
    showSection('intro-section'); // Mostrar la sección de introducción al cargar
    navInicio.classList.add('active'); // Marcar Inicio como activo
});
