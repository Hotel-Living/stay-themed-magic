
import React from "react";

export function ImportantNotice() {
  return (
    <div className="bg-amber-950/30 p-4 rounded-lg border border-amber-700/30 mb-6">
      <h3 className="font-medium mb-2 uppercase text-base text-amber-300">IMPORTANTE</h3>
      <p className="text-xs text-amber-200/80">
        Todos los campos marcados como obligatorios deben completarse antes de continuar. Si usted añade nuevos elementos, la publicación de su propiedad requerirá la aprobación del administrador antes de ser publicada.
      </p>
    </div>
  );
}
