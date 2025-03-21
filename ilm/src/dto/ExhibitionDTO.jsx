// ExhibitionDTO 클래스 정의
export class ExhibitionDTO {
    constructor({title, thumbnail, startDate, endDate, place, area, seq }) {
      this.title = title || "제목 없음"; // 공연 제목
      this.poster = thumbnail || "https://via.placeholder.com/150"; // 포스터 이미지 (기본값 설정)
      this.start = startDate || "N/A"; // 공연 시작일
      this.end = endDate || "N/A"; // 공연 종료일
      this.hall = place || "N/A"; // 공연장 이름
      this.area = area || "N/A"; // 지역 정보
      this.date = `${startDate || "N/A"} - ${endDate || "N/A"}`; // 시작일과 종료일을 결합한 날짜 정보
      this.seq = seq || "N/A"; // 공연 코드 
      }
  }
export default ExhibitionDTO;
