/* eslint-disable jsx-a11y/alt-text */
import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import style from "./style.module.css";
import { Link } from "react-router-dom";
import { myContext } from "../context";

const { useEffect } = require("react");

function Home() {
  const { sentNews, setSentNews } = useContext(myContext);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [value, setValue] = useState("");

  const [articles, setArticles] = useState([]);
  const key = "84a88c116e674bfd94b0bf91878ab59a";

  useEffect(() => {
    if (search === "") {
      axios
        .get("https://newsapi.org/v2/top-headlines", {
          params: {
            country: "us",
            pageSize: 20,

            apiKey: key,
          },
        })
        .then((response) => {
          console.log(response.data.articles);
          setArticles([...articles, ...response.data.articles]);
        });
    }
  }, [page]);

  useEffect(() => {
    axios
      .get(`https://newsapi.org/v2/everything`, {
        params: {
          q: search,
          apiKey: "84a88c116e674bfd94b0bf91878ab59a",
          pageSize: 20,
          page: page,
        },
      })
      .then((response) => {
        console.log(response.data.articles);
        setArticles([...articles, ...response.data.articles]);
      });
  }, [search, page]);

  return (
    <div className={style.containerHome}>
      <input
        placeholder="Search News"
        className={style.input}
        onChange={(value) => {
          setValue(value.target.value);
        }}
      />
      <button
        className={style.button1}
        onClick={() => {
          setSearch(value);
          setArticles([]);
        }}
      >
        search
      </button>
      <div className={style.container}>
        {articles.map((value) => {
          return (
            <div>
              <div className={style.card}>
                <a href={value.url} target="_blank">
                  <img
                    onClick={() => {
                      window.open(value.url);
                    }}
                    src={value.urlToImage}
                    alt="no img"
                  />
                </a>

                <h5 className={style.title}>{value.title?.slice(0, 70)}</h5>

                <p className={style.cardText}>
                  {value.description?.slice(0, 80)}
                </p>

                <Link
                  className={style.button1}
                  to={`article`}
                  onClick={() => {
                    setSentNews(value);
                  }}
                >
                  Read more
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <button
          className={style.button2}
          onClick={() => {
            setPage(page + 1);
          }}
        >
          load more
        </button>
      </div>
    </div>
  );
}

export default Home;
