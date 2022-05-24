import React from "react";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import Pizza from "./components/Pizza";
import pizzas from "./pizza.json";
import "./scss/app.scss";
console.log(pizzas);

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.map((obj) => {
              return (
                <Pizza key={obj.id} {...obj}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
