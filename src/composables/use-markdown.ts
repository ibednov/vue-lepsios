import type MarkdownIt from 'markdown-it'
import { ref } from 'vue'

// markdown-it + shiki are heavy (~1 MB). They are imported dynamically inside
// initMarkdown so that merely importing this composable (e.g. via the package
// barrel) does not pull them into a consumer's eager chunk. They load on first
// render() only. render() is already async, so behavior is unchanged.
let mdInstance: MarkdownIt | null = null
let initPromise: Promise<MarkdownIt> | null = null

const initMarkdown = async (): Promise<MarkdownIt> => {
  if (mdInstance) {
    return mdInstance
  }

  if (initPromise) {
    return initPromise
  }

  initPromise = (async () => {
    const [
      { default: md },
      { fromHighlighter },
      { createHighlighterCore },
      { createJavaScriptRegexEngine },
    ] = await Promise.all([
      import('markdown-it'),
      import('@shikijs/markdown-it/core'),
      import('shiki/core'),
      import('shiki/engine/javascript'),
    ])

    const instance = md({
      html: true,
      linkify: true,
      typographer: true,
    })

    const highlighter = await createHighlighterCore({
      themes: [
        import('shiki/themes/github-light.mjs'),
        import('shiki/themes/github-dark.mjs'),
      ],
      langs: [
        import('shiki/langs/javascript.mjs'),
        import('shiki/langs/typescript.mjs'),
        import('shiki/langs/bash.mjs'),
        import('shiki/langs/shell.mjs'),
        import('shiki/langs/yaml.mjs'),
        import('shiki/langs/json.mjs'),
        import('shiki/langs/php.mjs'),
        import('shiki/langs/sql.mjs'),
        import('shiki/langs/dockerfile.mjs'),
      ],
      engine: createJavaScriptRegexEngine(),
    })

    instance.use(fromHighlighter(highlighter, {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    }))

    mdInstance = instance
    return instance
  })()

  return initPromise
}

export const useMarkdown = () => {
  const html = ref('')
  const isLoading = ref(false)

  const render = async (content: string): Promise<string> => {
    if (!content) {
      return ''
    }

    isLoading.value = true
    try {
      const instance = await initMarkdown()
      const result = instance.render(content)
      html.value = result
      return result
    }
    finally {
      isLoading.value = false
    }
  }

  return {
    html,
    isLoading,
    render,
  }
}
