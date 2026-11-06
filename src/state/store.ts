// Almacén mínimo: guarda un valor y avisa a los suscriptores cuando cambia.

export type Listener<T> = (value: T, previous: T) => void;

export class Store<T> {
  private value: T;
  private readonly listeners = new Set<Listener<T>>();

  constructor(initial: T) {
    this.value = initial;
  }

  get(): T {
    return this.value;
  }

  /** Sustituye el valor y avisa a los suscriptores, salvo que sea el mismo objeto. */
  set(next: T): void {
    if (next === this.value) return;
    const previous = this.value;
    this.value = next;
    for (const listener of this.listeners) {
      listener(next, previous);
    }
  }

  /** Se suscribe a los cambios. Devuelve la función para cancelar la suscripción. */
  subscribe(listener: Listener<T>): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
}
