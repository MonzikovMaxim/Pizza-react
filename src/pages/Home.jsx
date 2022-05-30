import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Pizza from "../components/Pizza";
import PizzaSkeleton from "../components/PizzaSkeleton";
import Pagination from "../components/Pagination";
import { MyContext } from "../App";

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1)
  const [sortType, setSortType] = React.useState({
    name: "популярности",
    sort: "rating",
  });
  const { searchValue } = React.useContext(MyContext);

  React.useEffect(() => {
    setIsLoading(true);
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    fetch(
      `https://628ded4ea339dfef87a39dad.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType.sort}&order=asc${search}`
    )
      .then((res) => res.json())
      .then((items) => {
        setItems(items);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((obj) => <Pizza key={obj.id} {...obj} />);

  // const pizzas = items
  //   .filter((obj) => {
  //     if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
  //       return true;
  //     }
  //     return false;
  //   })
  //   .map((obj) => <Pizza key={obj.id} {...obj} />); // фильтрация JS

  const skeletons = [...new Array(6)].map((_, index) => (
    <PizzaSkeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onCategoryClick={(index) => setCategoryId(index)}
        />
        <Sort value={sortType} onSortClick={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)}/>
    </div>
  );
};

export default Home;
