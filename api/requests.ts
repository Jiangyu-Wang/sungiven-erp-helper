export type KpiReportConfig = {
  latinTC: string
  payloadSource: string
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const encodeBase64 = (value: string) => {
  const bytes = new TextEncoder().encode(value)
  let binary = ""
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })
  return btoa(binary)
}

const buildKpiReportPayload = (payloadSource: string) => encodeBase64(payloadSource)

const buildClientMac = () => {
  const parts = Array.from({ length: 6 }, () =>
    Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0")
      .toUpperCase()
  )
  return parts.join("-")
}

const buildKpiReportUrls = (config: KpiReportConfig) => {
  const clientMac = buildClientMac()
  const jobInstanceDc = Date.now().toString()
  const reportResultDc = Date.now().toString()
  const reportUrl = new URL(
    "https://erpvan.sungivenfoods.ca/h4cs-web/pasoreport/report/display/queryDisplay.hd"
  )
  reportUrl.searchParams.set("clientMac", clientMac)
  reportUrl.searchParams.set("latinTC", config.latinTC)

  const jobInstanceUrl = new URL(
    "https://erpvan.sungivenfoods.ca/h4cs-web/latin/simplejob/getJobInstance.hd"
  )
  jobInstanceUrl.searchParams.set("latinTC", config.latinTC)
  jobInstanceUrl.searchParams.set("_dc", jobInstanceDc)

  const reportResultUrl = new URL(
    "https://erpvan.sungivenfoods.ca/h4cs-web/pasoreport/report/display/getReportResult.hd"
  )
  reportResultUrl.searchParams.set("latinTC", config.latinTC)
  reportResultUrl.searchParams.set("_dc", reportResultDc)

  return {
    reportUrl: reportUrl.toString(),
    jobInstanceUrl: jobInstanceUrl.toString(),
    reportResultUrl: reportResultUrl.toString(),
  }
}

const pollKpiReportJob = async (jobInstanceUrl: string, instanceId: string) => {
  let jobResult: { state?: string } | null = null

  while (jobResult?.state !== "completed") {
    const jobUrl = `${jobInstanceUrl}&instanceId=${instanceId}`
    const jobResponse = await fetch(jobUrl, {
      method: "GET",
      credentials: "include",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    })
    jobResult = await jobResponse.json()
    console.log("KPI Summary job response:", jobResult)
    if (jobResult?.state !== "completed") {
      await sleep(1000)
    }
  }
}

const fetchKpiReportResult = async (reportResultUrl: string, instanceId: string) => {
  const resultUrl = `${reportResultUrl}&enabledTimer=false&instanceId=${instanceId}`
  const reportResultResponse = await fetch(resultUrl, {
    method: "GET",
    credentials: "include",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  })
  return reportResultResponse.text()
}

export const fetchKpiReport = async (config: KpiReportConfig) => {
  const { reportUrl, jobInstanceUrl, reportResultUrl } = buildKpiReportUrls(config)
  const response = await fetch(reportUrl, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "X-Requested-With": "XMLHttpRequest",
    },
    body: buildKpiReportPayload(config.payloadSource),
  })
  const resultText = await response.text()
  console.log("KPI Summary report response:", resultText)
  const instanceId = encodeURIComponent(resultText)
  await pollKpiReportJob(jobInstanceUrl, instanceId)
  const reportResultText = await fetchKpiReportResult(reportResultUrl, instanceId)
  console.log("KPI Summary report result:", reportResultText)
}
