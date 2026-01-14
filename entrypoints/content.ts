import { createApp } from "vue"
import InjectedPanel from "../components/InjectedPanel.vue"

const IFRAME_SELECTOR = "#homeDocViewFrame"
const ROOT_ID = "sg-erp-root"

export default defineContentScript({
  matches: ["https://erpvan.sungivenfoods.ca/*"],
  runAt: "document_idle",

  main() {
    if (window.top !== window.self) return // 只在顶层页面执行

    waitForElement<HTMLIFrameElement>(IFRAME_SELECTOR, 15000, (iframe) => {
      // iframe 可能会 reload：每次 load 都重新尝试注入
      iframe.addEventListener("load", () => injectIntoIframe(iframe), { passive: true })

      // 也可能已经加载完了：先注入一次
      injectIntoIframe(iframe)
    })
  },
})

/** 等页面出现某个元素 */
function waitForElement<T extends Element>(
  selector: string,
  timeoutMs: number,
  onFound: (el: T) => void,
) {
  const start = Date.now()

  const timer = setInterval(() => {
    const el = document.querySelector(selector) as T | null
    if (el) {
      clearInterval(timer)
      onFound(el)
      return
    }

    if (Date.now() - start > timeoutMs) {
      clearInterval(timer)
      console.warn(`[SG Helper] Timeout waiting for ${selector}`)
    }
  }, 200)
}

/** 清空 iframe body，插入 root，然后挂载 Vue */
function injectIntoIframe(iframe: HTMLIFrameElement) {
  const doc = iframe.contentDocument
  if (!doc?.body) return

  // 防重复
  if (doc.getElementById(ROOT_ID)) return

  doc.body.innerHTML = ""
  const root = doc.createElement("div")
  root.id = ROOT_ID
  doc.body.appendChild(root)

  createApp(InjectedPanel).mount(root)
  console.log("[SG Helper] injected ✅")
}
