import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeHighlight]
    }),
    react()
  ],
  optimizeDeps: {
    exclude: ['lucide-react']
  }
});