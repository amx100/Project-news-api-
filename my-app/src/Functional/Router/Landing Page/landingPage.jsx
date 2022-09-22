import React, { useState, useEffect } from "react";
import styles from "./Card.module.css";
import apiNews from "../Api/api";
function App() {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("tesla");
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("general");
  const [newcategory, SetnewCategory] = useState("popularity");
  const [drop, setDrop] = useState(false);

  // const fetchNews = () => {
  //   axios
  //     .get(
  //       `https://newsapi.org/v2/everything?sortBy=${category}&q=${search}&pageSize=20&page=${page}&apiKey=29a06d6161374b318b0ca61b0d58b03f`
  //     )
  //     .then((response) => {
  //       console.log(response);
  //       setNews([...news, ...response.data.articles]);
  //     });
  // };

  const fetchNews = async () => {
    try {
      let result;
      if (search !== "") {
        result = await apiNews.get(
          `everything?sortBy=${newcategory}&q=${search}&pageSize=20&page=${page}&apiKey=9770eaa81d774e98881c1153166cdbd2`
        );
      } else {
        result = await apiNews.get(
          `top-headlines?country=us&category=${category}&page=${page}&apiKey=9770eaa81d774e98881c1153166cdbd2`
        );
      }

      const data = result.data.articles;
      setNews(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  /*  */
  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, newcategory, page, search]);

  return (
    <>
      {/* Search Function */}
      <header>
        <div className={styles.search}>
          <input
            placeholder="Search News"
            onChange={(e) => {
              setValue(e.target.value);
            }}
            type="search"
            className={styles.search}
          />{" "}
          <button
            onClick={() => {
              setSearch(value);
              setNews([]);
            }}
            className={styles.search}
          >
            <i class="material-icons">search</i>
          </button>
        </div>
      </header>
      {/* Sorting News */}
      <div className={styles.dropdown}>
        {search !== "" ? (
          <p>
            Sorted By: {newcategory.replace(/^./, newcategory[0].toUpperCase())}
          </p>
        ) : (
          <p>Sorted By: {category.replace(/^./, category[0].toUpperCase())}</p>
        )}
        <img
          src="https://cdn-icons-png.flaticon.com/512/32/32450.png"
          alt=""
          style={{ width: "30px", height: "20px", cursor: "pointer" }}
          onClick={() => {
            setDrop(!drop);
            console.log(drop);
          }}
        />
      </div>
      <br />
      {drop ? (
        <div className={styles.categories}>
          {search !== "" ? (
            <div>
              <p
                className={styles.categoriesText}
                onClick={() => {
                  SetnewCategory("popularity");
                  setPage(1);
                }}
              >
                Popularity
              </p>
              <p
                className={styles.categoriesText}
                onClick={() => {
                  SetnewCategory("relevancy");
                  setPage(1);
                }}
              >
                Relevancy
              </p>
              <p
                className={styles.categoriesText}
                onClick={() => {
                  SetnewCategory("publishedAt");
                  setPage(1);
                }}
              >
                Published At
              </p>
            </div>
          ) : (
            <div>
              <p
                className={styles.categoriesText}
                onClick={() => {
                  setCategory("general");
                  setPage(1);
                }}
              >
                General
              </p>
              <p
                className={styles.categoriesText}
                onClick={() => {
                  setCategory("business");
                  setPage(1);
                }}
              >
                Business
              </p>
              <p
                className={styles.categoriesText}
                onClick={() => {
                  setCategory("sports");
                  setPage(1);
                }}
              >
                Sports
              </p>
              <p
                className={styles.categoriesText}
                onClick={() => {
                  setCategory("science");
                  setPage(1);
                }}
              >
                Science
              </p>
              <p
                className={styles.categoriesText}
                onClick={() => {
                  setCategory("entertainment");
                  setPage(1);
                }}
              >
                Entertainment
              </p>
              <p
                className={styles.categoriesText}
                onClick={() => {
                  setCategory("health");
                  setPage(1);
                }}
              >
                Health
              </p>
              <p
                className={styles.categoriesText}
                onClick={() => {
                  setCategory("technology");
                  setPage(1);
                }}
              >
                Technology
              </p>
            </div>
          )}
        </div>
      ) : null}

      <div>
        <div className={styles.container}>
          {news.map((value, index) => {
            return (
              <div key={index} className={styles.card}>
                {" "}
                <img
                  src={value.urlToImage}
                  className="card-img-top"
                  alt="..."
                />
                <h5 className={styles.title}>{value.title?.slice(0, 70)}</h5>
                <p className={styles.cardText}>
                  {value.description?.slice(0, 80)}
                </p>
                <a href={value.url} className={styles.button1}>
                  Read More
                </a>
              </div>
            );
          })}
        </div>
      </div>

      <div className="container my-3">
        <div className="row">
          <div className="col-4">
            <button
              className={styles.button2}
              onClick={() => {
                setPage(page + 1);
              }}
            >
              Load More
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
