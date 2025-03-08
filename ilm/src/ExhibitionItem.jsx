function ExhibitionItem({ title, date, location, image }) {
    return (
      <div className="exhibition-item">
        <img src={image} alt={title} />
        <h3>{title}</h3>
        <p>{date}</p>
        <p>{location}</p>
      </div>
    );
  }
  


  export default ExhibitionItem;
  