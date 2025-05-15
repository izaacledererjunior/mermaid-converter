import React from 'react';
import { Stack, Button } from '@mui/material';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';

interface DownloadButtonsProps {
  svgContent: string;
}

const DownloadButtons: React.FC<DownloadButtonsProps> = ({ svgContent }) => {
  const downloadSVG = () => {
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    saveAs(blob, 'diagram.svg');
  };

  const downloadPNG = () => {
    const diagramElement = document.querySelector('.diagram-preview') as HTMLElement;
    if (diagramElement) {
      toPng(diagramElement)
        .then(dataUrl => {
          saveAs(dataUrl, 'diagram.png');
        })
        .catch(error => {
          console.error('Erro ao gerar PNG:', error);
        });
    }
  };

  const downloadPDF = () => {
    const diagramElement = document.querySelector('.diagram-preview') as HTMLElement;
    if (diagramElement) {
      toPng(diagramElement)
        .then(dataUrl => {
          const img = new Image();
          img.src = dataUrl;

          img.onload = () => {
            const imgWidth = img.width;
            const imgHeight = img.height;

            const margin = 40;

            const maxWidth = 1190 - margin * 2;
            const maxHeight = 842 - margin * 2;

            let scale = 1;
            if (imgWidth > maxWidth || imgHeight > maxHeight) {
              const scaleX = maxWidth / imgWidth;
              const scaleY = maxHeight / imgHeight;
              scale = Math.min(scaleX, scaleY);
            }

            const pdfWidth = imgWidth * scale;
            const pdfHeight = imgHeight * scale;

            const orientation = pdfWidth > pdfHeight ? 'landscape' : 'portrait';

            const pdf = new jsPDF({
              orientation: orientation,
              unit: 'pt',
              format: [pdfWidth + margin * 2, pdfHeight + margin * 2],
            });

            pdf.addImage(dataUrl, 'PNG', margin, margin, pdfWidth, pdfHeight);

            pdf.save('diagram.pdf');
          };
        })
        .catch(error => {
          console.error('Erro ao gerar PDF:', error);
        });
    }
  };

  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" color="primary" onClick={downloadSVG}>
        Baixar SVG
      </Button>
      <Button variant="contained" color="primary" onClick={downloadPNG}>
        Baixar PNG
      </Button>
      <Button variant="contained" color="primary" onClick={downloadPDF}>
        Baixar PDF
      </Button>
    </Stack>
  );
};

export default DownloadButtons;
