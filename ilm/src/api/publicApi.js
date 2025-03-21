import axios from 'axios'
import { XMLParser } from 'fast-xml-parser'

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const API_KEY = import.meta.env.VITE_API_KEY

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  parseTagValue: true,
  parseAttributeValue: true,
  trimValues: true,
})

const parseXML = (xmlString) => {
  const jsonData = parser.parse(xmlString)
  const items = jsonData.response?.body?.items?.item || []
  return Array.isArray(items) ? items : [items]
}

const fetchFromApi = async (path, queryParams = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}/${path}`, {
      params: { serviceKey: API_KEY, PageNo: 1, numOfRows: 10, ...queryParams },
      responseType: 'text',
    })
    return parseXML(response.data)
  } catch (error) {
    console.error(`🚨 API 요청 실패:`, error)
    return []
  }
}

// ✅ 올바르게 export 하기
export const fetchPerformancesByRealm = async ({ realmCode, from, to, numOfRows = 10 }) => {
  return fetchFromApi('realm', { realmCode, from, to, numOfRows })
}
