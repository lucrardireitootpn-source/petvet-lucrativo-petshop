import React from "react";

interface StepQuestionProps {
  question: string;
  onAnswer: (answer: boolean) => void;
  onBack?: () => void;
}

export default function StepQuestion({
  question,
  onAnswer,
  onBack,
}: StepQuestionProps) {
  return (
    <div className="p-8 text-center">
      <p className="mb-6 text-lg">{question}</p>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => onAnswer(true)}
          className="py-3 bg-green-600 text-white rounded-lg font-bold"
        >
          SIM
        </button>
        <button
          onClick={() => onAnswer(false)}
          className="py-3 bg-red-600 text-white rounded-lg font-bold"
        >
          NÃO
        </button>
      </div>

      {onBack && (
        <button onClick={onBack} className="mt-4 text-sm text-slate-500">
          Voltar
        </button>
      )}
    </div>
  );
}
