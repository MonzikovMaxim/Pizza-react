import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Pizza from "../components/Pizza";
import PizzaSkeleton from "../components/PizzaSkeleton";
import Pagination from "../components/Pagination";
import { MyContext } from "../App";

const Home = () => {
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const sortType = sort.sortProperty;
  const dispatch = useDispatch();
  const { searchValue } = React.useContext(MyContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number))
  }

  React.useEffect(() => {
    setIsLoading(true);
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    axios
      .get(
        `https://628ded4ea339dfef87a39dad.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType}&order=asc${search}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((obj) => <Pizza key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((_, index) => (
    <PizzaSkeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onCategoryClick={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;

// fetch(
//   `https://628ded4ea339dfef87a39dad.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType}&order=asc${search}`
// )
//   .then((res) => res.json())
//   .then((items) => {
//     setItems(items);
//     setIsLoading(false);
//   }); // запрос через fetch

// const pizzas = items
//   .filter((obj) => {
//     if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
//       return true;
//     }
//     return false;
//   })
//   .map((obj) => <Pizza key={obj.id} {...obj} />); // фильтрация JS
