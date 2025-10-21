import React from 'react';

interface ResultDisplayProps {
  isLoading: boolean;
  generatedImage: string | null;
  error: string | null;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
        <p className="mt-4 text-gray-600 font-medium">Gerando sua visualização...</p>
        <p className="mt-2 text-sm text-gray-500">Isso pode levar alguns segundos. A IA está trabalhando na sua imagem.</p>
    </div>
);

const ResultDisplay: React.FC<ResultDisplayProps> = ({ isLoading, generatedImage, error }) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-center bg-red-50 p-4 rounded-lg">
        <div>
          <h3 className="text-red-800 font-semibold">Ocorreu um Erro</h3>
          <p className="text-red-700 mt-1">{error}</p>
        </div>
      </div>
    );
  }

  if (generatedImage) {
    return (
      <div className="w-full h-full rounded-lg overflow-hidden shadow-inner">
        <img
          src={`data:image/png;base64,${generatedImage}`}
          alt="Generated result"
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-full text-center bg-gray-100 rounded-lg p-4">
      <div>
        <h3 className="text-lg font-medium text-gray-700">Seu resultado aparecerá aqui</h3>
        <p className="mt-1 text-gray-500">Complete os passos 1 e 2 e clique em "Gerar Visualização" para ver a mágica acontecer.</p>
      </div>
    </div>
  );
};

export default ResultDisplay;