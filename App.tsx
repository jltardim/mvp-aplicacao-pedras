import React, { useState, useCallback } from 'react';
import { Stone, UploadedImage } from './types';
import { generateStonePlacement } from './services/geminiService';
import Header from './components/Header';
import StoneSelector from './components/StoneSelector';
import ImageUploader from './components/ImageUploader';
import ResultDisplay from './components/ResultDisplay';
import StepCard from './components/StepCard';
import { SparklesIcon } from './components/icons';

const App: React.FC = () => {
  const [selectedStone, setSelectedStone] = useState<Stone | null>(null);
  const [locationImage, setLocationImage] = useState<UploadedImage | null>(null);
  const [applicationArea, setApplicationArea] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!selectedStone || !locationImage || !applicationArea) {
      setError("Por favor, complete todos os campos antes de gerar.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const resultBase64 = await generateStonePlacement(locationImage, selectedStone.name, applicationArea);
      setGeneratedImage(resultBase64);
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro desconhecido.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedStone, locationImage, applicationArea]);

  const isButtonDisabled = !selectedStone || !locationImage || !applicationArea.trim() || isLoading;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="flex flex-col gap-8">
            <StepCard title="Escolha a Pedra" stepNumber={1}>
              <StoneSelector selectedStone={selectedStone} onSelectStone={setSelectedStone} />
            </StepCard>

            <StepCard title="Envie a Foto e Descreva" stepNumber={2}>
              <div className="flex flex-col gap-4">
                <ImageUploader image={locationImage} onImageChange={setLocationImage} />
                <div>
                  <label htmlFor="applicationArea" className="block text-sm font-medium text-gray-700 mb-1">
                    Onde aplicar a pedra?
                  </label>
                  <input
                    type="text"
                    id="applicationArea"
                    name="applicationArea"
                    value={applicationArea}
                    onChange={(e) => setApplicationArea(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Ex: na bancada da cozinha, no piso"
                    aria-label="Área de aplicação da pedra"
                  />
                </div>
              </div>
            </StepCard>

            <button
              onClick={handleGenerate}
              disabled={isButtonDisabled}
              className={`w-full flex items-center justify-center text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                ${isButtonDisabled 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
            >
              <SparklesIcon className="h-5 w-5 mr-2" />
              {isLoading ? 'Gerando...' : 'Gerar Visualização'}
            </button>
          </div>

          <div className="lg:sticky top-8 self-start">
             <StepCard title="Resultado" stepNumber={3}>
                <div className="aspect-square">
                    <ResultDisplay 
                        isLoading={isLoading} 
                        generatedImage={generatedImage} 
                        error={error} 
                    />
                </div>
            </StepCard>
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;