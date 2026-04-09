// Initialize Lucide Icons
lucide.createIcons();

// Elements
const inputs = {
    course: document.getElementById('input-course'),
    theme: document.getElementById('input-theme'),
    did: document.getElementById('input-did'),
    learn: document.getElementById('input-learn'),
    future: document.getElementById('input-future')
};

const views = {
    course: document.getElementById('view-course'),
    theme: document.getElementById('view-theme'),
    did: document.getElementById('view-did'),
    learn: document.getElementById('view-learn'),
    future: document.getElementById('view-future')
};

const btnExport = document.getElementById('btn-export');
const card = document.getElementById('card-to-export');

// Live Preview Update Logic
function updatePreview() {
    views.course.innerText = inputs.course.value.toUpperCase();
    
    // Auto-replace newlines with <br> in theme
    views.theme.innerHTML = inputs.theme.value.replace(/\n/g, '<br>');
    
    views.did.innerText = inputs.did.value;
    views.learn.innerText = inputs.learn.value;
    views.future.innerText = inputs.future.value;
}

// Attach listeners to all inputs
Object.keys(inputs).forEach(key => {
    inputs[key].addEventListener('input', updatePreview);
});

// Export Logic
btnExport.addEventListener('click', () => {
    btnExport.disabled = true;
    btnExport.innerHTML = '<i data-lucide="loader-2" class="spin"></i> ГЕНЕРАЦИЯ...';
    lucide.createIcons();

    // Export options for high quality
    const scale = 2; // Export at 2x resolution
    const options = {
        width: card.offsetWidth * scale,
        height: card.offsetHeight * scale,
        style: {
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            width: `${card.offsetWidth}px`,
            height: `${card.offsetHeight}px`
        }
    };

    htmlToImage.toJpeg(card, { quality: 0.95, ...options })
        .then((dataUrl) => {
            const link = document.createElement('a');
            const fileName = inputs.theme.value.replace(/[^a-z0-9а-я]/gi, '_').toLowerCase();
            link.download = `kiberone_${fileName}.jpg`;
            link.href = dataUrl;
            link.click();
            
            // Reset button
            btnExport.disabled = false;
            btnExport.innerHTML = '<i data-lucide="download"></i> СКАЧАТЬ В JPG';
            lucide.createIcons();
        })
        .catch((error) => {
            console.error('Ошибка экспорта:', error);
            alert('Не удалось сохранить изображение. Попробуйте другой браузер.');
            btnExport.disabled = false;
            btnExport.innerHTML = '<i data-lucide="download"></i> СКАЧАТЬ В JPG';
            lucide.createIcons();
        });
});

// Initial run
updatePreview();
