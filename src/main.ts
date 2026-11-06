import './style.css';

type Theme = 'light' | 'dark';

const THEME_KEY = 'theme';

/** Tema que se está viendo ahora: el elegido con el botón o, si no hay, el del sistema. */
function currentTheme(): Theme {
  const chosen = document.documentElement.dataset.theme;
  if (chosen === 'light' || chosen === 'dark') {
    return chosen;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** El botón dice a qué tema se cambia y aria-pressed indica si el oscuro está activo. */
function updateToggle(button: HTMLButtonElement): void {
  const isDark = currentTheme() === 'dark';
  button.textContent = isDark ? 'Tema claro' : 'Tema oscuro';
  button.setAttribute('aria-pressed', String(isDark));
}

function setupThemeToggle(button: HTMLButtonElement): void {
  updateToggle(button);

  button.addEventListener('click', () => {
    const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Sin acceso a localStorage: el tema se aplica solo en esta visita.
    }
    updateToggle(button);
  });

  // Si cambia el tema del sistema y no se ha elegido ninguno, se actualiza el botón.
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    updateToggle(button);
  });
}

const themeToggle = document.querySelector<HTMLButtonElement>('#theme-toggle');
if (themeToggle) {
  setupThemeToggle(themeToggle);
}
