import { defineConfig } from '@rsbuild/core';
import { pluginSvg } from '../src';

export default defineConfig({
  plugins: [pluginSvg()],
});
