import React from 'react';
import { Paper, Typography } from '@mui/material';
import DiagramInput from '../../components/Input/DiagramInput';

interface DiagramEditorProps {
  diagramCode: string;
  setDiagramCode: (code: string) => void;
  sx?: object;
}

const DiagramEditor: React.FC<DiagramEditorProps> = ({ diagramCode, setDiagramCode, sx }) => (
  <Paper sx={sx}>
    <Typography variant="h5" color="text.primary" gutterBottom>
      Editor de Diagrama
    </Typography>
    <DiagramInput diagramCode={diagramCode} setDiagramCode={setDiagramCode} />
  </Paper>
);

export default DiagramEditor;
