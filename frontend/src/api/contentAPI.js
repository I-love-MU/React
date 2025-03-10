const BASE_URL = "http://127.0.0.1:8000/api";

export const fetchContentList = async () => {
  try {
    const response = await fetch(`${BASE_URL}/kopis-data/`);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
