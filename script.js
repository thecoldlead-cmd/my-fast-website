const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const upload = document.getElementById('upload');
const brightness = document.getElementById('brightness');
const saturation = document.getElementById('saturation');
const invert = document.getElementById('invert');
const download = document.getElementById('download');

let img = new Image();

// ছবি আপলোড করার ফাংশন
upload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        img.src = reader.result;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            applyFilters();
        };
    };
});

// ফিল্টার অ্যাপ্লাই করার ফাংশন
function applyFilters() {
    ctx.filter = `
        brightness(${brightness.value}%)
        saturate(${saturation.value}%)
        invert(${invert.value}%)
    `;
    ctx.drawImage(img, 0, 0);
}

// স্লাইডার মুভ করলে ফিল্টার আপডেট হবে
[brightness, saturation, invert].forEach(input => {
    input.addEventListener('input', applyFilters);
});

// ডাউনলোড করার ফাংশন
download.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = canvas.toDataURL();
    link.click();
});
