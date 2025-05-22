import React from 'react';
import { Paper, Typography } from '@mui/material';
import DiagramPreview from '../../components/Preview/DiagramPreview';

interface DiagramPreviewPanelProps {
  diagramCode: string;
  setSvgContent: (svg: string | null) => void;
  sx?: object;
}

const DiagramPreviewPanel: React.FC<DiagramPreviewPanelProps> = ({ diagramCode, setSvgContent, sx }) => (
  <Paper sx={sx}>
    <Typography variant="h5" color="text.primary" gutterBottom>
      Pré-visualização
    </Typography>
    <DiagramPreview diagramCode={diagramCode} setSvgContent={setSvgContent} />
  </Paper>
);

export default DiagramPreviewPanel;
