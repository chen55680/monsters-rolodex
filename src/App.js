// import { Component } from "react";
import { useState, useEffect } from "react";

import CardList from "./components/card-list/card-list.components";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";

const App = () => {
  const [searchField, setSearchField] = useState(""); //[value, setvalue] 與class的setState不同,當有多個state就需要宣告多個
  const [monsters, setMonsters] = useState([]);
  const [filter_monsters, setFilter_monsters] = useState(monsters);

  const onSearchChange = (event) => {
    const searchString = event.target.value.toLocaleLowerCase();
    setSearchField(searchString);
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => {
        setMonsters(users)});
  }, []);
  //{} => callback: it's the real workspace; []:it's a depedency. When the value inside here change, it will call the {} function.
  //useEffect will run will the page onMount. In our situation, we just need it runs one time, so enter '' to ensure that always be the same.

  useEffect(() => {
    const new_filter_monsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    setFilter_monsters(new_filter_monsters);

  }, [monsters, searchField]) //當monsters or searchField change

  return (
    <div className="App">
      <h1 className="app-title">Monsters Roledes</h1>
      <SearchBox
        className={"monster-search-box"}
        onSearchHandler={onSearchChange}
        placeholder={"search monster"}
      />

      <CardList monsters={filter_monsters} />
    </div>
  );
};

// class App extends Component {
//   constructor() {
//     super();

//     //initial value
//     this.state = {
//       monsters: [],
//       searchString: "",
//     };
//   }

//   //只會呼叫一次就是當網頁第一次載入時
//   componentDidMount() {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((response) => response.json())
//       .then((users) =>
//         this.setState(() => {
//           return { monsters: users };
//         })
//       );
//   }

//   onSearchChange = (event) => {
//     const searchString = event.target.value.toLocaleLowerCase();

//     this.setState(() => {
//       return { searchString };
//     });
//   };

//   render() {
//     //ES6 解构赋值（destructuring assignment）
//     const { monsters, searchString } = this.state;
//     const { onSearchChange } = this;

//     const filter_monsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchString);
//     });

//     return (
//       <div className="App">
//         <h1 className="app-title">Monsters Roledes</h1>
//         <SearchBox
//           className={"monster-search-box"}
//           onSearchHandler={onSearchChange}
//           placeholder={"search monster"}
//         />

//         <CardList monsters={filter_monsters} />
//       </div>
//     );
//   }
// }

export default App;
