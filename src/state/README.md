# src/state

Estado único compartido entre la vista 3D, la lámina y el reproductor de pasos.
Al partir todas las vistas del mismo estado, lo que se mueve en una se mueve en la otra.

## Intersecciones (`meet`)

Un objeto `{ kind: 'meet', id, of: [a, b], points: [...] }` define puntos derivados: la recta común
a dos planos (dos puntos, H y V si tiene las dos trazas) o el punto en que una recta atraviesa un
plano (uno). El almacén los recalcula tras cada cambio (`derive.ts`), así que el 3D y la lámina los
dibujan como cualquier punto y se mueven al mover los puntos de los que dependen. Si la
intersección no existe (planos paralelos), el punto se queda donde estaba. La condición
`pointOnIntersection` de los ejercicios comprueba que un punto está en los dos objetos.
