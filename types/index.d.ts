declare module '*.svg?component' {
  import type { FunctionalComponent, SVGAttributes } from 'vue';

  const src: FunctionalComponent<SVGAttributes>;
  export default src;
}

declare module '*.svg?url' {
  const src: string;
  export default src;
}

declare module '*.svg?raw' {
  const src: string;
  export default src;
}

declare module '*.svg?skipsvgo' {
  import type { FunctionalComponent, SVGAttributes } from 'vue';

  const src: FunctionalComponent<SVGAttributes>;
  export default src;
}
