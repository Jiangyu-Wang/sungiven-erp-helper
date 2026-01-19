export type ReportPayload = Record<string, unknown>

export type ReportRequestConfig = {
  latinTC: string
  payloadSource: ReportPayload
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const encodeBase64 = (value: string) => {
  const bytes = new TextEncoder().encode(value)
  const binary = String.fromCharCode(...bytes)
  return btoa(binary)
}

const buildReportPayload = (payloadSource: ReportPayload) =>
  encodeBase64(JSON.stringify(payloadSource))

const buildClientMac = () => {
  const parts = Array.from({ length: 6 }, () =>
    Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0")
      .toUpperCase()
  )
  return parts.join("-")
}

const buildReportUrls = (config: ReportRequestConfig) => {
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

const pollReportJob = async (jobInstanceUrl: string, instanceId: string) => {
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
    if (jobResult?.state !== "completed") {
      await sleep(1000)
    }
  }
}

const fetchReportResult = async (reportResultUrl: string, instanceId: string) => {
  const resultUrl = `${reportResultUrl}&enabledTimer=false&instanceId=${instanceId}`
  return await fetch(resultUrl, {
    method: "GET",
    credentials: "include",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  })
}

export const fetchReport = async (config: ReportRequestConfig) => {
  const { reportUrl, jobInstanceUrl, reportResultUrl } = buildReportUrls(config)
  const response = await fetch(reportUrl, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "X-Requested-With": "XMLHttpRequest",
    },
    body: buildReportPayload(config.payloadSource),
  })
  const resultText = await response.text()
  const instanceId = encodeURIComponent(resultText)
  await pollReportJob(jobInstanceUrl, instanceId)
  const res = await fetchReportResult(reportResultUrl, instanceId)
  return res.json()
}
