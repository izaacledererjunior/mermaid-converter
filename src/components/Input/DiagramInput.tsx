import React from 'react';
import { TextField } from '@mui/material';

interface DiagramInputProps {
  diagramCode: string;
  setDiagramCode: (code: string) => void;
}

const DiagramInput: React.FC<DiagramInputProps> = ({ diagramCode, setDiagramCode }) => {
  const hasError = false;

  return (
    <TextField
      placeholder="Digite o código do diagrama..."
      multiline
      rows={28}
      fullWidth
      value={diagramCode}
      onChange={e => setDiagramCode(e.target.value)}
      variant="outlined"
      error={hasError}
      helperText={hasError ? 'Erro no código' : ''}
      InputProps={{
        style: {
          height: '100%',
        },
      }}
    />
  );
};

export default DiagramInput;
