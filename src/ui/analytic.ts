// Desplegable analítico: panel flotante (acordeón con <details>) con las ecuaciones de lo que
// se ve en pantalla, escritas en LaTeX y dibujadas con KaTeX.
//
// Es modular: cada parte de la aplicación publica sus bloques con un nombre propio y los
// retira al salir. Por ejemplo:
//   analytic.set('conicas', [{ id: 'tipo', title: 'Cónica', rows: [{ label: 'e', tex: 'e = 0{,}5' }] }]);
//   analytic.clear('conicas');
// KaTeX va empaquetado con la aplicación (no depende de un CDN), así que funciona sin
// conexión, y se carga solo la primera vez que hace falta.

export interface AnalyticRow {
  readonly label: string;
  /** Expresión LaTeX (se dibuja con KaTeX). */
  readonly tex?: string;
  /** Texto normal (si no hay fórmula, o además de ella). */
  readonly text?: string;
}

export interface AnalyticBlock {
  readonly id: string;
  readonly title: string;
  readonly rows: readonly AnalyticRow[];
}

type Katex = typeof import('katex').default;

class AnalyticPanel {
  private root: HTMLDetailsElement | null = null;
  private body: HTMLElement | null = null;
  private readonly sources = new Map<string, readonly AnalyticBlock[]>();
  private katex: Katex | null = null;
  private loading: Promise<void> | null = null;
  private frame: number | null = null;
  /** Bloques abiertos o cerrados por el usuario (se respetan al redibujar). */
  private readonly open = new Map<string, boolean>();

  /** Coloca el panel en la página (una vez). */
  mount(container: HTMLElement): void {
    if (this.root) return;
    const root = document.createElement('details');
    root.className = 'analytic-panel';
    root.id = 'analytic-panel';
    root.hidden = true;
    const summary = document.createElement('summary');
    summary.className = 'analytic-summary';
    summary.textContent = 'Desplegable analítico';
    const body = document.createElement('div');
    body.className = 'analytic-body';
    body.setAttribute('aria-live', 'polite');
    root.append(summary, body);
    container.prepend(root);
    this.root = root;
    this.body = body;
  }

  /** Abre el panel (por ejemplo, al entrar en el laboratorio de cónicas en una pantalla ancha). */
  reveal(): void {
    if (this.root) this.root.open = true;
  }

  /** Publica (o sustituye) los bloques de una fuente. */
  set(source: string, blocks: readonly AnalyticBlock[]): void {
    this.sources.set(source, blocks);
    this.schedule();
  }

  clear(source: string): void {
    if (this.sources.delete(source)) this.schedule();
  }

  /** Texto plano de los bloques (para tests y lectores de pantalla). */
  get blocks(): AnalyticBlock[] {
    return [...this.sources.values()].flat();
  }

  private schedule(): void {
    if (this.frame !== null) return;
    this.frame = requestAnimationFrame(() => {
      this.frame = null;
      void this.render();
    });
  }

  private async ensureKatex(): Promise<void> {
    if (this.katex) return;
    this.loading ??= Promise.all([import('katex'), import('katex/dist/katex.min.css')]).then(
      ([m]) => {
        this.katex = m.default;
      },
    );
    await this.loading;
  }

  private async render(): Promise<void> {
    const root = this.root;
    const body = this.body;
    if (!root || !body) return;
    const blocks = this.blocks;
    root.hidden = blocks.length === 0;
    if (blocks.length === 0) return;
    if (blocks.some((b) => b.rows.some((r) => r.tex))) await this.ensureKatex();
    // Se guarda qué bloques estaban abiertos antes de redibujar.
    for (const d of body.querySelectorAll<HTMLDetailsElement>('details[data-block]')) {
      this.open.set(d.dataset.block ?? '', d.open);
    }
    body.replaceChildren(
      ...blocks.map((block) => {
        const d = document.createElement('details');
        d.className = 'analytic-block';
        d.dataset.block = block.id;
        d.open = this.open.get(block.id) ?? true;
        const s = document.createElement('summary');
        s.textContent = block.title;
        const dl = document.createElement('dl');
        for (const row of block.rows) {
          const dt = document.createElement('dt');
          dt.textContent = row.label;
          const dd = document.createElement('dd');
          if (row.tex && this.katex) {
            const math = document.createElement('span');
            math.className = 'analytic-tex';
            math.dataset.tex = row.tex;
            math.innerHTML = this.katex.renderToString(row.tex, {
              throwOnError: false,
              output: 'htmlAndMathml',
            });
            dd.append(math);
          }
          if (row.text) {
            const span = document.createElement('span');
            span.className = 'analytic-text';
            span.textContent = row.text;
            dd.append(span);
          }
          dl.append(dt, dd);
        }
        d.append(s, dl);
        return d;
      }),
    );
  }
}

/** El panel de toda la aplicación. */
export const analytic = new AnalyticPanel();
