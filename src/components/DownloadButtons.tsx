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
        .then((dataUrl) => {
          saveAs(dataUrl, 'diagram.png');
        })
        .catch((error) => {
          console.error('Erro ao gerar PNG:', error);
        });
    }
  };

  const downloadPDF = () => {
    const diagramElement = document.querySelector('.diagram-preview') as HTMLElement;
    if (diagramElement) {
      toPng(diagramElement)
        .then((dataUrl) => {
          const pdf = new jsPDF({
            orientation: 'landscape', // Orientação para diagramas largos
            unit: 'pt',
            format: 'a4',
          });

          const imgProps = pdf.getImageProperties(dataUrl);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

          pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save('diagram.pdf');
        })
        .catch((error) => {
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