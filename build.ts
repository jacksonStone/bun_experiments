
await Bun.build({
    entrypoints: ['./client'],
    outdir: './build',
    define: {
        "ENV": process.env.ENV + ""
    }
});