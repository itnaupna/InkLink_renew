function BgDesktop() {
  return (
    <div className="tip_box">
      <div className="tip_row">
        <div className="tip"></div>
        <div className="tip_arrow">
          <img alt="arrow" src={process.env.REACT_APP_BUCKET_URL + 'icons/top_arrow.svg'} />
        </div>
        <div className="tip second"></div>
      </div>
      <div className="tip_row">
        <div className="tip third"></div>
        <div className="tip_arrow">
          <img alt="arrow" src={process.env.REACT_APP_BUCKET_URL + 'icons/bottom_arrow.svg'} />
        </div>
      </div>
    </div>
  );
}

export default BgDesktop;
