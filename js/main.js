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

