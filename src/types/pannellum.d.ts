declare module 'pannellum' {
  interface ViewerConfig {
    type?: 'equirectangular' | 'cubemap'
    panorama?: string
    autoLoad?: boolean
    compass?: boolean
    showControls?: boolean
    mouseZoom?: boolean
    hfov?: number
    pitch?: number
    yaw?: number
    [key: string]: unknown
  }

  interface Pannellum {
    viewer: (container: HTMLElement, config: ViewerConfig) => Viewer
  }

  interface Viewer {
    destroy: () => void
  }

  const pannellum: Pannellum
  export default pannellum
}