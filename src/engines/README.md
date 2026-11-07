# src/engines

Motores enchufables (métodos, sólidos, plana…): cada uno añade sus capas 3D y de lámina, su estado y sus datos de paso sin tocar los demás.
Definición pura en `definitions.ts` (la valida el esquema de lecciones) y ejecución en `runtimes.ts` (monta sus módulos con `SpatialView.use` y `SheetView.use`).
