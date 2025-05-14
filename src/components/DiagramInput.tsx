import React from 'react';
import { TextField } from '@mui/material';

interface DiagramInputProps {
  diagramCode: string;
  setDiagramCode: (code: string) => void;
}

const DiagramInput: React.FC<DiagramInputProps> = ({ diagramCode, setDiagramCode }) => {
  // Remove qualquer estado automático de erro
  const hasError = false; // Controle manual do estado de erro, se necessário

  


  return (
    <TextField
      label="Código Mermaid"
      placeholder="Digite o código do diagrama..."
      multiline
      rows={28}
      fullWidth
      value={diagramCode}
      onChange={(e) => setDiagramCode(e.target.value)}
      variant="outlined"
      error={hasError} // Certifique-se de que não está configurado para exibir erros automaticamente
      helperText={hasError ? "Erro no código" : ""} // Remova o texto auxiliar de erro, se necessário
      InputProps={{
        style: {
          height: '100%', // Ajusta a altura para não exibir comportamentos inesperados
        },
      }}
    />
  );
};

export default DiagramInput;