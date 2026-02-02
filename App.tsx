
import React, { useState, useCallback, useMemo } from 'react';
import { Layout } from './components/Layout';
import { Card } from './components/Card';
import { AppScreen, DiagnosticResult } from './types';
import { QUESTIONS, APP_NAME, BADGE_TEXT } from './constants';

const App: React.FC = () => {
  const [screen, setScreen] = useState<AppScreen>(AppScreen.WELCOME);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const handleStart = () => {
    setAnswers([]);
    setCurrentQuestionIdx(0);
    setScreen(AppScreen.QUESTION);
  };

  const handleAnswer = useCallback((value: boolean) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIdx] = value;
    setAnswers(newAnswers);

    if (currentQuestionIdx < QUESTIONS.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      setScreen(AppScreen.RESULT);
    }
  }, [answers, currentQuestionIdx]);

  const handleBack = useCallback(() => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(prev => prev - 1);
    } else {
      setScreen(AppScreen.WELCOME);
    }
  }, [currentQuestionIdx]);

  const handleReset = () => {
    setAnswers([]);
    setCurrentQuestionIdx(0);
    setScreen(AppScreen.WELCOME);
  };

  const isSafe = useMemo(() => {
    return answers.length === QUESTIONS.length && answers.every(a => a === true);
  }, [answers]);

  return (
    <Layout>
      {screen === AppScreen.WELCOME && (
        <div className="flex flex-col items-center">
          <div className="mb-6 flex flex-col items-center gap-2">
            <span className="text-[10px] tracking-[0.2em] font-bold text-slate-500 uppercase">{APP_NAME}</span>
            <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-500/20">{BADGE_TEXT}</span>
          </div>
          
          <Card>
            <h1 className="text-2xl font-bold text-slate-100 mb-4 leading-tight">
              Diagnóstico Financeiro em 5 perguntas
            </h1>
            <p className="text-slate-400 text-sm mb-10 font-light">
              Resultado binário, baseado apenas nas respostas informadas.
            </p>

            <button
              onClick={handleStart}
              className="w-full bg-slate-100 text-slate-950 font-semibold py-4 rounded-xl hover:bg-white active:scale-[0.98] transition-all mb-4"
            >
              Começar diagnóstico
            </button>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">Tempo estimado: menos de 1 minuto.</p>
          </Card>
        </div>
      )}

      {screen === AppScreen.QUESTION && (
        <div className="flex flex-col items-center">
          <div className="w-full mb-6">
            <div className="flex justify-between items-center mb-2 px-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pergunta {currentQuestionIdx + 1} de {QUESTIONS.length}</span>
              <span className="text-[10px] font-bold text-slate-400">{Math.round(((currentQuestionIdx + 1) / QUESTIONS.length) * 100)}%</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${((currentQuestionIdx + 1) / QUESTIONS.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <Card>
            <div className="min-h-[120px] flex items-center justify-center mb-10">
              <h2 className="text-xl font-semibold text-slate-100 leading-relaxed">
                {QUESTIONS[currentQuestionIdx].text}
              </h2>
            </div>

            <div className="w-full space-y-3">
              <button
                onClick={() => handleAnswer(true)}
                className="w-full bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 font-semibold py-4 rounded-xl hover:bg-emerald-600/30 active:scale-[0.98] transition-all"
              >
                SIM
              </button>
              <button
                onClick={() => handleAnswer(false)}
                className="w-full bg-white/5 text-slate-300 border border-white/10 font-semibold py-4 rounded-xl hover:bg-white/10 active:scale-[0.98] transition-all"
              >
                NÃO
              </button>
            </div>

            <button
              onClick={handleBack}
              className="mt-8 text-xs text-slate-500 hover:text-slate-300 transition-colors py-2"
            >
              Voltar
            </button>
          </Card>
        </div>
      )}

      {screen === AppScreen.RESULT && (
        <div className="flex flex-col items-center">
          <Card>
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em] mb-10">Diagnóstico Financeiro — Resultado</h2>
            
            <div className="w-full py-12 px-6 rounded-2xl bg-white/[0.02] border border-white/5 mb-8 flex flex-col items-center justify-center">
              {isSafe ? (
                <div className="text-center">
                  <span className="text-xs font-mono text-emerald-500 mb-2 block tracking-widest">STATUS</span>
                  <h3 className="text-2xl font-bold text-emerald-400 tracking-tight">APARENTEMENTE SEGURO</h3>
                </div>
              ) : (
                <div className="text-center">
                  <span className="text-xs font-mono text-red-500 mb-2 block tracking-widest">STATUS</span>
                  <h3 className="text-2xl font-bold text-red-400 tracking-tight">NÃO ESTÁ SEGURO</h3>
                </div>
              )}
            </div>

            <p className="text-slate-500 text-[11px] leading-relaxed mb-10 max-w-[280px]">
              Este resultado reflete exclusivamente as respostas informadas neste diagnóstico.
            </p>

            <div className="w-full space-y-3">
              <button
                onClick={handleReset}
                className="w-full bg-slate-100 text-slate-950 font-semibold py-4 rounded-xl hover:bg-white active:scale-[0.98] transition-all"
              >
                Refazer diagnóstico
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-white/5 text-slate-400 font-semibold py-4 rounded-xl hover:bg-white/10 active:scale-[0.98] transition-all border border-white/5"
              >
                Encerrar
              </button>
            </div>
          </Card>
        </div>
      )}
    </Layout>
  );
};

export default App;
