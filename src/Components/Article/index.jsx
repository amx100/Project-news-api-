import React from "react";
import { useContext } from "react";
import { myContext } from "../context";
import style from "./index.module.css";

function Articles() {
  const { sentNews } = useContext(myContext);
  console.log(sentNews, "returned news");
  return (
    <div>
      <div className={style.container}>
        <h3 className={style.title}>{sentNews.title}</h3>
        <img src={sentNews.urlToImage} className={style.img} alt="no img"></img>
        <p className={style.desc}>{sentNews.description}</p>
        <h4 className={style.date}>{sentNews.publishedAt}</h4>
        <h1 className={style.author}>{sentNews.author}</h1>
      </div>
    </div>
  );
}

export default Articles;
