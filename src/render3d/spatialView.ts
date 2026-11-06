// Vista 3D: monta la escena, la cámara, los controles y dibuja solo cuando algo cambia.
import {
  AmbientLight,
  DirectionalLight,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  type Object3D,
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Line2 } from 'three/addons/lines/Line2.js';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
import type { Point } from '../geometry/index.ts';
import { setPoint, type AppStore } from '../state/index.ts';
import { CameraAnimator, MAX_DISTANCE_MM, MIN_DISTANCE_MM, type ViewName } from './cameraViews.ts';
import { attachPointDrag } from './pointDrag.ts';
import { PointModel } from './pointModel.ts';
import { ProjectionPlanes } from './projectionPlanes.ts';
import { readSceneColors } from './sceneColors.ts';

export class SpatialView {
  /** Se llama al elegir una vista rápida, o con null cuando el usuario gira la cámara. */
  onViewChange: (view: ViewName | null) => void = () => {};

  private readonly container: HTMLElement;
  private readonly renderer: WebGLRenderer;
  private readonly labelRenderer = new CSS2DRenderer();
  private readonly scene = new Scene();
  private readonly camera = new PerspectiveCamera(35, 1, 1, 5000);
  private readonly controls: OrbitControls;
  private readonly animator: CameraAnimator;
  private readonly planes = new ProjectionPlanes();
  private readonly pointModel = new PointModel();
  private readonly cleanups: (() => void)[] = [];
  private frameRequested = false;

  constructor(container: HTMLElement, store: AppStore) {
    this.container = container;

    // Puede lanzar un error si el navegador no tiene WebGL: lo recoge quien crea la vista.
    this.renderer = new WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0); // fondo transparente: se ve el del panel
    this.labelRenderer.domElement.className = 'label-layer';
    container.replaceChildren(this.renderer.domElement, this.labelRenderer.domElement);

    this.scene.add(new AmbientLight(0xffffff, 1.6), this.planes.group, this.pointModel.group);
    const light = new DirectionalLight(0xffffff, 1.6);
    light.position.set(60, 120, 90);
    this.scene.add(light);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enablePan = false; // el modelo queda siempre centrado
    this.controls.enableDamping = true;
    this.controls.minDistance = MIN_DISTANCE_MM;
    this.controls.maxDistance = MAX_DISTANCE_MM;
    this.controls.addEventListener('change', this.requestRender);
    this.controls.addEventListener('start', () => {
      this.animator.cancel();
      this.onViewChange(null);
    });

    this.animator = new CameraAnimator(this.camera);
    this.animator.goTo('perspective', true);
    this.controls.update();

    this.pointModel.update(store.get().point);
    this.cleanups.push(
      store.subscribe((state) => {
        this.pointModel.update(state.point);
        this.requestRender();
      }),
      attachPointDrag({
        container,
        canvas: this.renderer.domElement,
        camera: this.camera,
        controls: this.controls,
        targets: this.pointModel.hitTargets,
        getPoint: () => store.get().point,
        setPoint: (p: Point) => setPoint(store, p),
      }),
    );

    this.watchTheme();
    this.watchSize();
    this.requestRender();
  }

  /** Lleva la cámara a una vista rápida (sin transición si se pide reducir el movimiento). */
  setView(view: ViewName): void {
    const instant = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.animator.goTo(view, instant);
    this.onViewChange(view);
    this.requestRender();
  }

  dispose(): void {
    for (const cleanup of this.cleanups) cleanup();
    this.controls.dispose();
    this.renderer.dispose();
  }

  // ---------- Dibujo bajo demanda ----------

  private readonly requestRender = (): void => {
    if (this.frameRequested) return;
    this.frameRequested = true;
    requestAnimationFrame(this.renderFrame);
  };

  private readonly renderFrame = (now: number): void => {
    this.frameRequested = false;
    const animating = this.animator.step(now);
    // Durante una transición manda la animación; si no, los controles (con inercia).
    const moving = animating ? false : this.controls.update();
    if (animating) this.controls.update();
    this.planes.updateForCamera(this.camera);
    this.pointModel.updateForCamera(this.camera);
    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.render(this.scene, this.camera);
    if (animating || moving) this.requestRender();
  };

  // ---------- Tamaño y tema ----------

  private watchSize(): void {
    const resize = (): void => {
      const width = this.container.clientWidth;
      const height = this.container.clientHeight;
      if (width === 0 || height === 0) return;
      this.renderer.setSize(width, height);
      this.labelRenderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      // Las líneas gruesas necesitan saber el tamaño en píxeles.
      this.scene.traverse((object: Object3D) => {
        if (object instanceof Line2) object.material.resolution.set(width, height);
      });
      this.requestRender();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(this.container);
    resize();
    this.cleanups.push(() => observer.disconnect());
  }

  private watchTheme(): void {
    const apply = (): void => {
      const colors = readSceneColors(this.container);
      this.planes.setColors(colors);
      this.pointModel.setColors(colors);
      this.requestRender();
    };
    apply();
    const observer = new MutationObserver(apply);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', apply);
    this.cleanups.push(() => {
      observer.disconnect();
      media.removeEventListener('change', apply);
    });
  }
}
