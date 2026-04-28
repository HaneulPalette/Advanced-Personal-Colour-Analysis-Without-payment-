document.addEventListener("DOMContentLoaded", function () {

let imageFile = null;

const imageUpload = document.getElementById("imageUpload");
const previewSection = document.getElementById("previewSection");
const previewOutput = document.getElementById("previewOutput");
const analyzeBtn = document.getElementById("analyzeBtn");
const result = document.getElementById("result");

// Upload
imageUpload.addEventListener("change", function () {
    imageFile = this.files[0];
    if (!imageFile) return;

    previewSection.classList.remove("hidden");

    previewOutput.innerHTML = `
        <h3>Basic Analysis</h3>
        <p>Undertone: Neutral Warm</p>
        <p>Season: Soft Autumn</p>
    `;

    analyzeBtn.disabled = false;
});

// Generate PDF
analyzeBtn.addEventListener("click", function () {

    if (!imageFile) {
        alert("Upload image first");
        return;
    }

    result.innerHTML = "Generating PDF...";

    try {
        const { jsPDF } = window.jspdf;

        if (!jsPDF) {
            alert("PDF library not loaded!");
            return;
        }

        const doc = new jsPDF();

        doc.text("ADVANCED COLOUR ANALYSIS REPORT", 10, 20);
        doc.text("Undertone: Neutral Warm", 10, 40);
        doc.text("Season: Soft Autumn", 10, 50);

        // 🔥 IMPORTANT: use output instead of save (fix for mobile/GitHub)
        const pdfBlob = doc.output("blob");

        const url = URL.createObjectURL(pdfBlob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "Colour_Report.pdf";
        link.click();

        result.innerHTML = "✔ PDF downloaded successfully";

    } catch (err) {
        console.error(err);
        alert("Error generating PDF");
    }
});

});
