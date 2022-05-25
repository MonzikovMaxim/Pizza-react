import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Pizza from "../components/Pizza";
import PizzaSkeleton from "../components/PizzaSkeleton";

const Home = () => {

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("https://628ded4ea339dfef87a39dad.mockapi.io/items")
      .then((res) => res.json())
      .then((items) => {
        setItems(items);
        setIsLoading(false)
      })
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />)
          : items.map((obj) => <Pizza key={obj.id} {...obj} />)}
      </div>
    </>
  );
};

export default Home;