import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import mermaid from 'mermaid';
import DownloadButtons from '../Buttons/DownloadButtons';

interface DiagramPreviewProps {
  diagramCode: string;
  setSvgContent: (svg: string | null) => void;
}

const DiagramPreview: React.FC<DiagramPreviewProps> = ({ diagramCode, setSvgContent }) => {
  const diagramRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [svgContent, setLocalSvgContent] = useState<string | null>(null);

  useEffect(() => {
    if (diagramCode && diagramRef.current) {
      try {
        const renderDiagram = async () => {
          const { svg } = await mermaid.render('mermaid-diagram', diagramCode);
          if (diagramRef.current) {
            diagramRef.current.innerHTML = svg;
            setSvgContent(svg);
            setLocalSvgContent(svg);
            setError(null);
          }
        };

        renderDiagram();
      } catch (e) {
        if (diagramRef.current) {
          diagramRef.current.innerHTML = '';
          setError('Erro ao renderizar o diagrama. Verifique o código Mermaid.');
          setSvgContent(null);
          setLocalSvgContent(null);
        }
      }
    }
  }, [diagramCode, setSvgContent]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: 'background.paper',
        borderRadius: 2,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        ref={diagramRef}
        className="diagram-preview"
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 2,
        }}
      >
        {error && (
          <Box
            sx={{
              color: 'red',
              textAlign: 'center',
              fontSize: '1rem',
            }}
          >
            {error}
          </Box>
        )}
      </Box>

      {svgContent && (
        <Box
          sx={{
            position: 'sticky',
            bottom: 0,
            left: 0,
            bgcolor: 'background.paper',
            p: 2,
            boxShadow: '0 -1px 4px rgba(0,0,0,0.1)',
            zIndex: 1,
          }}
        >
          <DownloadButtons svgContent={svgContent} />
        </Box>
      )}
    </Box>
  );
};

export default DiagramPreview;
