import React, { useState } from "react";
import axios from "axios";
import "./Card.module.css";

function App() {
  const [news, setNews] = useState([]);

  const fetchNews = () => {
    axios
      .get(
        "https://newsapi.org/v2/everything?q=tesla&from=2022-08-01&sortBy=publishedAt&apiKey=84a88c116e674bfd94b0bf91878ab59a"
      )
      .then((response) => {
        console.log(response);
        setNews(response.data.articles);
      });
  };
  return (
    <>
      <div className="container my-3">
        <div className="row">
          <div className="col-4">
            <button className="btn btn-primary" onClick={fetchNews}>
              Fetch News
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {news.map((value, index) => {
            return (
              <div key={index} className="col-4">
                <div className="card" style={{ width: "400", height: "200" }}>
                  <img
                    src={value.urlToImage}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{value.title}</h5>
                    <p className="card-text">{value.description}</p>
                    <a href={value.url} className="btn btn-primary">
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
