import React from "react";
import CarouselComponent from "../components/CarouselComponent";
import ContentList from "../components/ContentList";
import Filter from "../components/Filter";
import Pagination from "../components/Pagination";
import Header from "../components/Header";
import "../styles/MainPage.css";

const MainPage = () => {
  return (
    <div>
      <Header />
      <CarouselComponent />
      <Filter />
      <ContentList />
      <Pagination />
    </div>
  );
};

export default MainPage;
