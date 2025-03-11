import axios from 'axios'
import { XMLParser } from 'fast-xml-parser'

// 필터링된 데이터 가져오기 함수
export const OpenApiRealm = async (apiFilter) => {
  // XML에서 JSON으로 변환하는 파서 설정
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
  })

  const baseUrl = 'https://apis.data.go.kr/B553457/nopenapi/rest/publicperformancedisplays/realm'

  try {
    const response = await axios.get(baseUrl, { params: apiFilter })

    const xmlData = response.data
    const jsonData = parser.parse(xmlData)
    const contents = jsonData.response.body.items.item

    // 결과가 항상 배열인지 확인
    return Array.isArray(contents) ? contents : contents ? [contents] : []
  } catch (error) {
    console.error('필터링된 데이터를 가져오는 데 실패했습니다:', error)
    throw error
  }
}
