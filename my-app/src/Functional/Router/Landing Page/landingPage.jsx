import React, { useState } from "react";
import axios from "axios";
import styles from "./Card.module.css";

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
            <button className={styles.button} onClick={fetchNews}>
              Fetch News
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.row}>
          {news.map((value, index) => {
            return (
              <div key={index} className={styles.column}>
                <div className={styles.card}>
                  <img
                    src={value.urlToImage}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{value.title?.slice(0, 70)}</h5>
                    <p className={styles.cardText}>
                      {value.description?.slice(0, 100)}
                    </p>
                    <a href={value.url} className={styles.button}>
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
