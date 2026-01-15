import { createApp } from "vue"
import Index from "../components/Index.vue"

const ROOT_ID = "sg-helper-root"

function waitForIframe(selector: string, timeout = 15000): Promise<HTMLIFrameElement> {
  return new Promise((resolve, reject) => {
    const found = document.querySelector(selector) as HTMLIFrameElement | null
    if (found) return resolve(found)

    let timeoutId: ReturnType<typeof setTimeout>

    const observer = new MutationObserver(() => {
      const el = document.querySelector(selector) as HTMLIFrameElement | null
      if (el) {
        observer.disconnect()
        clearTimeout(timeoutId)
        resolve(el)
      }
    })

    observer.observe(document.documentElement, { childList: true, subtree: true })

    timeoutId = setTimeout(() => {
      observer.disconnect()
      reject(new Error("Iframe not found: " + selector))
    }, timeout)
  })
}

export default defineContentScript({
  matches: ["https://erpvan.sungivenfoods.ca/*"],
  runAt: "document_idle",

  async main() {
    if (window.top !== window.self) return

    console.log("[SG Helper] content loaded")

    let iframe: HTMLIFrameElement

    try {
      iframe = await waitForIframe("iframe#homeDocViewFrame")
    } catch (e) {
      console.error("[SG Helper] iframe not found", e)
      return
    }

    const parent = iframe.parentElement
    if (!parent) return

    // 防重复
    if (document.getElementById(ROOT_ID)) return

    // 设置父容器为横向布局
    parent.style.display = "flex"
    parent.style.alignItems = "stretch"

    // 创建 root
    const root = document.createElement("div")
    root.id = ROOT_ID
    root.style.width = "100%"
    root.style.flex = "1"
    root.style.overflow = "auto"

    iframe.style.display = "none"

    // 插到 iframe 前面
    parent.insertBefore(root, iframe)

    // mount Vue
    createApp(Index).mount(root)

    console.log("[SG Helper] sidebar injected ✅")
  },
})
