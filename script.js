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

// ---------------- GENERATE REPORT ----------------
analyzeBtn.addEventListener("click", function () {

    if (!imageFile) {
        alert("Please upload an image first.");
        return;
    }

    result.innerHTML = "<p>Generating report...</p>";

    setTimeout(generatePDF, 1000);
});

// ---------------- PDF GENERATION ----------------
function generatePDF() {

    const content = `
ADVANCED COLOUR ANALYSIS REPORT

Undertone: Neutral Warm
Season: Soft Autumn

Recommended Palette:
- Olive
- Camel
- Dusty Rose
- Soft Teal
- Cocoa

Makeup:
- Warm nude lips
- Soft bronze eyes

Hair:
- Warm brown shades

Accessories:
- Gold & rose gold jewelry
`;

    const blob = new Blob([content], { type: "application/pdf" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Colour_Analysis_Report.pdf";
    link.click();

    result.innerHTML = "<p>✔ Report downloaded successfully</p>";
}

});
