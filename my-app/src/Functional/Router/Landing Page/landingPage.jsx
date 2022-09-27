import React, { useState, useEffect } from "react";
import styles from "./Card.module.css";
import apiNews from "../Api/api";

function App() {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [value, setValue] = useState("");

  const [search, setSearch] = useState("daily");

  const [category, setCategory] = useState("general");
  const [newcategory, SetnewCategory] = useState("popularity");
  const [drop, setDrop] = useState(false);

  const fetchNews = async () => {
    try {
      let result = "";
      if (search !== "") {
        result = await apiNews.get(
          `everything?&q=${search}&pageSize=20&page=${page}&apiKey=84a88c116e674bfd94b0bf91878ab59a`
        );
      } else {
        result = await apiNews.get(
          `top-headlines?country=us&category=${category}&pageSize=20&page=${page}&apiKey=84a88c116e674bfd94b0bf91878ab59a`
        );
      }

      const data = result.data;
      console.log(result.data.articles);
      setNews([...news, ...data.articles]);
    } catch (error) {
      console.log(error);
    }
  };

  // const fetchNews = () => {
  //   apiNews
  //     .get(
  //       `https://newsapi.org/v2/everything?sortBy=${category}&q=${search}&pageSize=20&page=${page}&apiKey=29a06d6161374b318b0ca61b0d58b03f`
  //     )
  //     .then((response) => {
  //       console.log(response);
  //       setNews([...news, ...response.data.articles]);
  //     });
  // };

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, newcategory, page, search]);

  return (
    <>
      {/* Search Function */}
      <header>
        <div>
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
        <div className={styles.sort}>
          {search !== "" ? (
            <p className={styles.sortit}>
              Sorted By:{" "}
              {newcategory.replace(/^./, newcategory[0].toUpperCase())}
            </p>
          ) : (
            <p className={styles.sortit}>
              Sorted By: {category.replace(/^./, category[0].toUpperCase())}
            </p>
          )}
        </div>
        <img
          className={styles.fiximg}
          src="https://cdn-icons-png.flaticon.com/512/32/32450.png"
          alt=""
          style={{ width: "30px", height: "20px", cursor: "pointer" }}
          onClick={() => {
            setDrop(!drop);
            console.log(drop);
          }}
        />
      </div>
      <div>
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
      </div>{" "}
      <div className="cardsssss">
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
      <br />
      <br />
      <div className="fetch more news">
        <button
          className={styles.button2}
          onClick={() => {
            setPage(page + 1);
          }}
        >
          Load More
        </button>
      </div>
    </>
  );
}

export default App;
