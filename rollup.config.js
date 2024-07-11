import svelte from 'rollup-plugin-svelte'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import resolve from '@rollup/plugin-node-resolve'
import css from 'rollup-plugin-css-only'
import sveltePreprocess from 'svelte-preprocess'
import typescript from 'rollup-plugin-typescript2'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'

const production = !process.env.ROLLUP_WATCH

export default {
    input: 'src/main.ts',
    output: {
        sourcemap: true,
        format: 'iife',
        name: 'app',
        file: 'public/build/bundle.js'
    },
    plugins: [
        svelte({
            preprocess: sveltePreprocess({
                sourceMap: !production,
            }),
        }),
        css({
            output: 'bundle.css'
        }),
        resolve({
            browser: true,
            dedupe: ['svelte'],
            exportConditions: ['svelte']
        }),
        commonjs(),
        typescript({
            sourceMap: !production,
            inlineSources: !production
        }),
        !production && serve({
            contentBase: 'public',
            historyApiFallback: true,
            port: 8080,
        }),
        !production && livereload('public'), // Watch the `public` directory and refresh the browser on changes when not in production
        production && terser() // If we're building for production (npm run build instead of npm run dev), minify
    ],
    watch: {
        clearScreen: false
    }
}
