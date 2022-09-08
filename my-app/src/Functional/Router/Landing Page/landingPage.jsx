import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Card.module.css";

function App() {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [word, setWord] = useState();

  const fetchNews = () => {
    axios
      .get(
        `https://newsapi.org/v2/everything?q=tesla&&pageSize=20&page=${page}&sortBy=publishedAt&apiKey=29a06d6161374b318b0ca61b0d58b03f`
      )
      .then((response) => {
        console.log(response);
        setNews([...news, ...response.data.articles]);
      });
  };
  useEffect(() => {
    fetchNews();
  }, [page]);

  return (
    <>
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
                      {value.description?.slice(0, 80)}
                    </p>
                    <a href={value.url} className={styles.button}>
                      Read More...
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="container my-3">
        <div className="row">
          <div className="col-4">
            <button
              className={styles.button}
              onClick={() => {
                setPage(page + 1);
              }}
            >
              Fetch News
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
