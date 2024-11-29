/* MOBILE EN DESKTOP PRICE SLIDER*/
const initSlider = (containerClass, thumbMinId, thumbMaxId, rangeClass, displayId) => {
    const sliderContainer = document.querySelector(containerClass);
    const slider = sliderContainer.querySelector('.slider');
    const thumbMin = sliderContainer.querySelector(`#${thumbMinId}`);
    const thumbMax = sliderContainer.querySelector(`#${thumbMaxId}`);
    const range = sliderContainer.querySelector(rangeClass);
    const priceDisplay = sliderContainer.querySelector(`#${displayId}`);

    let sliderWidth = slider.offsetWidth; // Zorgt voor correcte breedte
    let minValue = 60;
    let maxValue = 630;
    const maxSliderValue = 900;

    const updateSlider = () => {
        sliderWidth = slider.offsetWidth; // Update breedte dynamisch bij schermwissel
        const percentMin = (minValue / maxSliderValue) * 100;
        const percentMax = (maxValue / maxSliderValue) * 100;

        thumbMin.style.left = percentMin + '%';
        thumbMax.style.left = percentMax + '%';
        range.style.left = percentMin + '%';
        range.style.width = (percentMax - percentMin) + '%';

        priceDisplay.innerHTML = ` 
            <p class="mt-3 questrial fs-6 c-lichtgrijs">PRICE: <span class="c-zwart-grijs fw-bold ms-2">$${minValue} &nbsp - &nbsp $${maxValue}</span></p>
        `;
    };

    const onDrag = (thumb, callback) => {
        const onMouseMove = (e) => {
            const rect = slider.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const percent = Math.min(Math.max((offsetX / sliderWidth) * 100, 0), 100);
            callback(percent);
            updateSlider();
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    thumbMin.addEventListener('mousedown', () => {
        onDrag(thumbMin, (percent) => {
            minValue = Math.min(maxValue - 1, Math.round((percent / 100) * maxSliderValue));
        });
    });

    thumbMax.addEventListener('mousedown', () => {
        onDrag(thumbMax, (percent) => {
            maxValue = Math.max(minValue + 1, Math.round((percent / 100) * maxSliderValue));
        });
    });

    // Zorg ervoor dat de slider goed werkt na resizing
    window.addEventListener('resize', updateSlider);

    updateSlider();
};

// Initialiseer de desktop- en mobiele sliders afzonderlijk
initSlider('.slider-container.desktop', 'thumbMinDesktop', 'thumbMaxDesktop', '.range', 'priceDisplayDesktop');
initSlider('.slider-container.mobile', 'thumbMinMobile', 'thumbMaxMobile', '.range', 'priceDisplayMobile');

/*navbar on scroll*/
const navbar = document.querySelector('.navbar'); // De navbar
const navUl = document.querySelector('#nav-ul'); // De navbar
const navbarTinyImg = document.querySelector('#navbar-tiny-img'); // De navbar
const placeholder = document.createElement('div'); // Een element dat als placeholder dient

// Voeg de placeholder in direct boven de navbar
navbar.parentNode.insertBefore(placeholder, navbar);

// Event listener voor scrollen
window.addEventListener('scroll', function () {
    if (window.scrollY > navbar.offsetTop) {
        // navbar fixed bij het scrollen
        navbar.classList.add('fixed-top'); // Maak de navbar vast
        navUl.classList.add('navbar-small');
        navbarTinyImg.classList.add('navbar-tiny-img-small');
        placeholder.style.display = 'block'; // Activeer de placeholder
        placeholder.style.height = `${navbar.offsetHeight}px`; // Geef de placeholder dezelfde hoogte als de navbar
    } else {
        // Terug naar boven en verwijder de classes
        navbar.classList.remove('fixed-top'); // Verwijder de vaste positie
        navUl.classList.remove('navbar-small');
        navbarTinyImg.classList.remove('navbar-tiny-img-small');
        placeholder.style.display = 'none'; // Verberg de placeholder
        placeholder.style.height = '0'; // Reset de hoogte
    }
});

/*NAVBAR navbar-active links*/
const navLinks = document.querySelectorAll('.nav-link');

/*navbar-active links*/
navLinks.forEach(navLink => {
    navLink.addEventListener('click', function () {
        navLinks.forEach(navLink => {
            navLink.classList.remove('navbar-active');
        });
        navLink.classList.add('navbar-active');
    });
});

/*SLUIT MODAL WANNEER JE OP DE SEARCH KNOP KLIKT*/
const searchButton = document.querySelector('#exampleModal .btn');

searchButton.addEventListener('click', function () {
    // Zoek de modal en sluit deze
    const modalElement = document.getElementById('exampleModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
        modalInstance.hide();
    }
});

/*COPYRIGHT jaar aanpassing*/
const copyrightYearElement = document.getElementById('copyrightYear');
// Haal het huidige jaar op
const currentYear = new Date().getFullYear();
// Stel het huidige jaar in als de tekst van het element
copyrightYearElement.textContent = currentYear;

/*dropdown toggle vervangen*/
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

dropdownToggles.forEach(dropdown=> {
    const icon = dropdown.querySelector('.icon-pages');

    //eventlistener toevoegen voor het openen van de dropdown
    dropdown.addEventListener('show.bs.dropdown', function (){
        icon.classList.remove('bi-plus');
        icon.classList.add('bi-dash');
    })
    //eventlistener voor het sluiten van de dropdown
    dropdown.addEventListener('hide.bs.dropdown',
        function (){
            icon.classList.remove('bi-dash');
            icon.classList.add('bi-plus');
        })
});

/*Hamburger menu icon vervangen door kruisje*/
const navbarToggler = document.querySelector('.navbar-toggler');
const toggleIcon = document.querySelector('.toggle-icon');

//luisteren wanneer er op het hamburgertje geklikt wordt
navbarToggler.addEventListener("click", function(){
    const isExpanded = navbarToggler.getAttribute('aria-expanded') === 'true';

    // wisselen van het icoontje
    if (isExpanded){
        toggleIcon.classList.remove('bi-list');
        toggleIcon.classList.add('bi-x')
    }else{
        toggleIcon.classList.remove('bi-x')
        toggleIcon.classList.add('bi-list');

    }
});






