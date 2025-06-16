
import { MenuItemText } from "../MenuItemText";
import { CollapsibleMenuItem } from "../CollapsibleMenuItem";

export function BenefitsSection() {
  return (
    <div className="space-y-0 pl-4 border-l-2 border-fuchsia-400/30">
      {/* Benefit 1 - 100% Occupancy */}
      <CollapsibleMenuItem title="1.1-   100% de ocupación todo el año" className="mb-1" titleClassName="text-[1.17rem]">
        <div className="space-y-4 text-left py-4">
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Las tasas de ocupación pueden alcanzar el 100% durante todo el año</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Cero habitaciones vacías significa máximo beneficio</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Ocupación completa incluso durante períodos tradicionalmente lentos</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Flujo de ingresos constante sin mínimos estacionales</p>
        </div>
      </CollapsibleMenuItem>
      
      {/* Benefit 2 - Lower Costs */}
      <CollapsibleMenuItem title="1.2-   Menores costes operativos" className="mb-1" titleClassName="text-[1.17rem]">
        <div className="space-y-4 text-left py-4">
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Solo un día laborable para todas las entradas/salidas. Cero huecos entre estancias</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Tasas de rotación reducidas significan menores costes de limpieza</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Estancias extendidas (8, 16, 24 y 32 días) reducen gastos operativos</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Procesos de check-in/out simplificados ahorran tiempo del personal</p>
        </div>
      </CollapsibleMenuItem>
      
      {/* Benefit 3 - Better Staff Stability */}
      <CollapsibleMenuItem title="1.3-   Mayor estabilidad del personal" className="mb-1" titleClassName="text-[1.17rem]">
        <div className="space-y-4 text-left py-4">
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Ocupación constante = empleo durante todo el año</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Menor rotación de personal reduce costes de contratación y formación</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Mayor satisfacción de empleados con horarios estables</p>
        </div>
      </CollapsibleMenuItem>
      
      {/* Benefit 4 - Additional Revenue */}
      <CollapsibleMenuItem title="1.4-   Ingresos añadidos de actividades temáticas" className="mb-1" titleClassName="text-[1.17rem]">
        <div className="space-y-4 text-left py-4">
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Nuevas fuentes de ingresos a través de eventos especializados</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Oportunidades de merchandising vinculadas a temas del hotel</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Ofertas de servicios extendidos generan mayor gasto</p>
        </div>
      </CollapsibleMenuItem>
    </div>
  );
}
