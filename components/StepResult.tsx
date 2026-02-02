import React from "react";

interface StepResultProps {
  answers: boolean[];
  onReset: () => void;
  onEnd: () => void;
}

export default function StepResult({
  answers,
  onReset,
  onEnd,
}: StepResultProps) {
  const isSafe = answers.every(Boolean);

  return (
    <div className="p-8 text-center">
      <h2 className="text-xl font-bold mb-6">
        Resultado do Diagnóstico
      </h2>

      <div
        className={`p-4 mb-6 rounded-xl font-black ${
          isSafe
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {isSafe ? "APARENTEMENTE SEGURO" : "NÃO ESTÁ SEGURO"}
      </div>

      <button
        onClick={onReset}
        className="w-full py-3 bg-slate-800 text-white rounded-lg font-bold mb-3"
      >
        Refazer diagnóstico
      </button>

      <button
        onClick={onEnd}
        className="w-full py-3 bg-slate-200 text-slate-700 rounded-lg font-bold"
      >
        Encerrar
      </button>
    </div>
  );
}
