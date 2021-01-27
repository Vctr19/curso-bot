// middleware pattern (chain of responsibility)

/* função que executa a cadeia de middlewares
   ctx = contexto (objeto acumulador, inicia vazio)
   ...middlewares (lista de funcoes middleware)
   const run = funcao que valida a existencia de no minimo um middleware e os executa */
const exec = (ctx, ...middlewares) => {
    const run = index => {
        middlewares && index < middlewares.length &&
            middlewares[index] (ctx, ()=> run(index+1))
    }
    run(0)
}

// exemplo de dois middlewares com o parametro next()
const mid1 = (ctx, next) => {
    ctx.info1 = 'mid1'
    next()
}

const mid2 = (ctx, next) => {
    ctx.info2 = 'mid2'
    next()
}

// exemplo de middleware sem o parametro next() (final da cadeia)
const mid3 = ctx => ctx.info3 = 'mid3'

const ctx = {}

exec(ctx, mid1, mid2, mid3)

console.log(ctx)