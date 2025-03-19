// ExhibitionDTO 클래스 정의
export class ExhibitionDTO {
    constructor({ prfnm, mt20id, poster, prfpdfrom, prfpdto, fcltynm, area }) {
      this.title = prfnm || "제목 없음"; // 공연 제목
      this.id = mt20id || "N/A"; // 공연 ID
      this.poster = poster || "https://via.placeholder.com/150"; // 포스터 이미지 (기본값 설정)
      this.start = prfpdfrom || "N/A"; // 공연 시작일
      this.end = prfpdto || "N/A"; // 공연 종료일
      this.hall = fcltynm || "N/A"; // 공연장 이름
      this.area = area || "N/A"; // 지역 정보
      this.date = `${prfpdfrom || "N/A"} - ${prfpdto || "N/A"}`; // 시작일과 종료일을 결합한 날짜 정보
    }
  }
export default ExhibitionDTO;
