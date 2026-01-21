export async function getStoreCode(): Promise<string> {
  const ctx = (window as any).__SG_CONTEXT__ ??= {}

  if (ctx.storeCode) return ctx.storeCode

  const tryGet = (): string | null => {
    const text = document.querySelector("#orgName")?.textContent ?? ""
    const matches = [...text.matchAll(/\[(\d+)\]/g)]
    const code = matches.at(-1)?.[1] ?? null
    if (code) ctx.storeCode = code
    return code
  }

  return new Promise((resolve, reject) => {
    const start = Date.now()

    const timer = setInterval(() => {
      const code = tryGet()

      if (code) {
        clearInterval(timer)
        resolve(code)
      }

      // 超时保护（例如 10 秒）
      if (Date.now() - start > 10000) {
        clearInterval(timer)
        reject(new Error("getStoreCode timeout"))
      }
    }, 300) // 每 300ms 尝试一次
  })
}
