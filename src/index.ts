import type { RsbuildPlugin, Rspack } from '@rsbuild/core';
import { type Config, optimize as optimizeSvg } from 'svgo';
import { compileTemplate } from 'vue/compiler-sfc';

export type PluginFooOptions = {
  svgoConfig?: Config;
  svgo?: boolean;
  defaultImport?: ImportType;
};

type ImportType = 'url' | 'raw' | 'component';

const SVG_REGEX = /\.svg$/;

export const pluginSvg = (options: PluginFooOptions = {}): RsbuildPlugin => ({
  name: 'plugin-svg',
  setup(api) {
    api.modifyBundlerChain((chain, { CHAIN_ID }) => {
      let generatorOptions: Rspack.GeneratorOptionsByModuleType['asset/resource'] =
        {};

      if (chain.module.rules.has(CHAIN_ID.RULE.SVG)) {
        generatorOptions = chain.module.rules
          .get(CHAIN_ID.RULE.SVG)
          .oneOfs.get(CHAIN_ID.ONE_OF.SVG_URL)
          .get('generator');

        // delete Rsbuild builtin SVG rules
        chain.module.rules.delete(CHAIN_ID.RULE.SVG);
        const rule = chain.module.rule(CHAIN_ID.RULE.SVG).test(SVG_REGEX);

        rule
          .oneOf(CHAIN_ID.ONE_OF.SVG_URL)
          .type('asset/resource')
          .resourceQuery(/(__inline=false|url)/)
          .set('generator', generatorOptions);
      }
    });

    const { svgoConfig, svgo, defaultImport } = options;
    const handle = (
      rawCode: string,
      path: string,
      query: ImportType | 'skipsvgo' = 'component',
    ) => {
      const importType = query || defaultImport || 'component';
      let svg = rawCode;

      if (importType === 'url') {
        return rawCode; // Use default svg loader
      }

      if (importType === 'raw') {
        return `export default ${JSON.stringify(svg)}`;
      }

      if (svgo !== false && query !== 'skipsvgo') {
        svg = optimizeSvg(svg, {
          ...svgoConfig,
          path,
        }).data;
      }

      // To prevent compileTemplate from removing the style tag
      svg = svg
        .replace(/<style/g, '<component is="style"')
        .replace(/<\/style/g, '</component');

      let id = path;
      if (importType) {
        id += `?${importType}`;
      }
      const { code } = compileTemplate({
        id: JSON.stringify(id),
        source: svg,
        filename: path,
        transformAssetUrls: false,
      });

      return `${code}\nexport default { render: render }`;
    };

    api.transform(
      { test: /\.svg$/ },
      async ({ code, resourcePath, resourceQuery }) => {
        let importType = resourceQuery;
        if (resourceQuery.startsWith('?')) {
          importType = importType.substring(1);
        }
        return handle(code, resourcePath, importType as ImportType);
      },
    );
  },
});
