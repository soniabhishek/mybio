import React, { useState } from 'react';
import { jsPDF } from "jspdf";

const templates = [
  {
    name: 'Classic',
    style: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f0f0',
      color: '#333',
    },
  },
  {
    name: 'Modern',
    style: {
      fontFamily: 'Helvetica, sans-serif',
      backgroundColor: '#ffffff',
      color: '#2c3e50',
    },
  },
  {
    name: 'Elegant',
    style: {
      fontFamily: 'Georgia, serif',
      backgroundColor: '#f9f9f9',
      color: '#2c3e50',
    },
  },
];

function BiodataPreview({ formData, photo }) {
  const [currentTemplate, setCurrentTemplate] = useState(templates[0]);

  const changeTemplate = (template) => {
    setCurrentTemplate(template);
  };

  const downloadPDF = () => {
    const pdf = new jsPDF();
    
    // Set font
    pdf.setFont(currentTemplate.style.fontFamily.split(',')[0]);
    pdf.setTextColor(currentTemplate.style.color);
    
    // Add background color
    pdf.setFillColor(currentTemplate.style.backgroundColor);
    pdf.rect(0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height, 'F');
    
    // Add content
    let yPosition = 20;
    const margin = 20;
    const pageWidth = pdf.internal.pageSize.width;
    const maxWidth = pageWidth - 2 * margin;

    // Helper function to add text with word wrap and page breaks
    const addText = (text, fontSize, isBold = false) => {
      pdf.setFontSize(fontSize);
      if (isBold) pdf.setFont(undefined, 'bold');
      const lines = pdf.splitTextToSize(text, maxWidth);
      lines.forEach(line => {
        if (yPosition > pdf.internal.pageSize.height - margin) {
          pdf.addPage();
          yPosition = margin;
          // Add background color to new page
          pdf.setFillColor(currentTemplate.style.backgroundColor);
          pdf.rect(0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height, 'F');
        }
        pdf.text(line, margin, yPosition);
        yPosition += fontSize * 1.5;
      });
      if (isBold) pdf.setFont(undefined, 'normal');
      yPosition += 5; // Add some space after each section
    };

    // Add name
    addText(formData.name, 24, true);

    // Add photo
    if (photo) {
      if (yPosition + 70 > pdf.internal.pageSize.height - margin) {
        pdf.addPage();
        yPosition = margin;
        pdf.setFillColor(currentTemplate.style.backgroundColor);
        pdf.rect(0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height, 'F');
      }
      pdf.addImage(photo, 'JPEG', margin, yPosition, 70, 70);
      yPosition += 80;
    }

    // Add other details
    addText(`Date of Birth: ${formData.dob}`, 12);
    addText(`Address: ${formData.address}`, 12);
    addText(`Mobile: ${formData.mobile}`, 12);
    addText(`Birth Location: ${formData.birthLocation}`, 12);
    
    pdf.save('biodata.pdf');
  };

  return (
    <div className="biodata-preview-container">
      <div className="template-buttons">
        {templates.map((template, index) => (
          <button key={index} onClick={() => changeTemplate(template)}>
            {template.name}
          </button>
        ))}
      </div>
      <div id="biodata-preview" style={currentTemplate.style}>
        <h1>{formData.name}</h1>
        {photo && <img src={photo} alt="User" style={{ width: '200px', height: '200px', objectFit: 'cover' }} />}
        <p>Date of Birth: {formData.dob}</p>
        <p>Address: {formData.address}</p>
        <p>Mobile: {formData.mobile}</p>
        <p>Birth Location: {formData.birthLocation}</p>
      </div>
      <button onClick={downloadPDF}>Download PDF</button>
    </div>
  );
}

export default BiodataPreview;