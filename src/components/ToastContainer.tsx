import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-4 rounded-xl shadow-xl border flex items-start gap-3 transition-all animate-in slide-in-from-right-5 duration-200 ${
            toast.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : toast.type === 'warning'
              ? 'bg-amber-50 border-amber-200 text-amber-950'
              : toast.type === 'error'
              ? 'bg-red-50 border-red-200 text-red-950'
              : 'bg-blue-50 border-blue-200 text-blue-950'
          }`}
        >
          <div className="shrink-0 mt-0.5">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
            {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-600" />}
            {toast.type === 'error' && <XCircle className="w-5 h-5 text-red-600" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-blue-600" />}
          </div>

          <div className="flex-1 min-w-0 text-xs">
            <h5 className="font-bold">{toast.title}</h5>
            <p className="opacity-90 mt-0.5 leading-relaxed">{toast.message}</p>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="shrink-0 p-1 rounded-md opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
