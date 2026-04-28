document.addEventListener("DOMContentLoaded", function () {

let imageFile = null;

// Elements
const imageUpload = document.getElementById("imageUpload");
const previewSection = document.getElementById("previewSection");
const previewOutput = document.getElementById("previewOutput");
const analyzeBtn = document.getElementById("analyzeBtn");
const result = document.getElementById("result");

// ---------------- IMAGE UPLOAD ----------------
imageUpload.addEventListener("change", function () {

    imageFile = this.files[0];

    if (!imageFile) return;

    showPreview();

    analyzeBtn.disabled = false;
});

// ---------------- PREVIEW ----------------
function showPreview() {

    previewSection.classList.remove("hidden");

    previewOutput.innerHTML = `
        <h3>Basic Analysis</h3>
        <ul>
            <li><b>Undertone:</b> Neutral Warm</li>
            <li><b>Season:</b> Soft Autumn</li>
            <li><b>Contrast:</b> Medium Low</li>
        </ul>

        <div style="display:flex;gap:10px;margin-top:10px;">
            <div style="width:40px;height:40px;background:#d4a373;border-radius:6px;"></div>
            <div style="width:40px;height:40px;background:#b5838d;border-radius:6px;"></div>
            <div style="width:40px;height:40px;background:#6b705c;border-radius:6px;"></div>
        </div>
    `;
}

// ---------------- BUTTON CLICK ----------------
analyzeBtn.addEventListener("click", function () {

    if (!imageFile) {
        alert("Please upload an image first.");
        return;
    }

    result.innerHTML = "<p>Generating PDF report...</p>";

    setTimeout(generatePDF, 800);
});

// ---------------- REAL PDF GENERATION ----------------
function generatePDF() {

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFont("helvetica");
    doc.setFontSize(16);
    doc.text("ADVANCED PERSONAL COLOUR ANALYSIS", 10, 20);

    doc.setFontSize(12);

    doc.text("Undertone: Neutral Warm", 10, 40);
    doc.text("Season: Soft Autumn", 10, 50);

    doc.text("Recommended Palette:", 10, 70);
    doc.text("- Olive, Camel, Dusty Rose", 10, 80);
    doc.text("- Soft Teal, Cocoa", 10, 90);

    doc.text("Makeup Suggestions:", 10, 110);
    doc.text("- Warm nude lips", 10, 120);
    doc.text("- Soft bronze eyes", 10, 130);

    doc.text("Hair Colours:", 10, 150);
    doc.text("- Warm brown tones", 10, 160);

    doc.text("Accessories:", 10, 180);
    doc.text("- Gold & rose gold jewellery", 10, 190);

    // ✅ REAL PDF FILE DOWNLOAD
    doc.save("Colour_Analysis_Report.pdf");

    result.innerHTML = "<p>✔ PDF downloaded successfully</p>";
}

});
