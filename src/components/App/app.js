import React, {Component} from 'react';


import AppHeader from '../App-Header/app-header';
import SearchPanel from '../Search-Panel/search-panel';
import TodoList from '../ToDo-List/todo-list';
import ItemStatusFilter from '../Item-Status-File/item-status-filter';

import './app.css';
import ItemAddForm from '../Item-Add-Form/Item-Add-Form';

export default class App extends Component {

  


  maxId = 100;

  state = {
    todoData : [
      this.createTodoItem('Додай завдання')
    ],
    term: '',
    filter: 'all' //active,all,done
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done:false,
      id: this.maxId++
    }
  }

  deleteItem = (id) => {
    this.setState(({todoData}) => {
      const idx = todoData.findIndex((el) => el.id === id);
    

      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];

      return{
        todoData: newArray
      };
    });
  };

  addItem = (text) => {
    //genid ?
    const newItem = this.createTodoItem(text)


    // add el in array ?
    this.setState(({todoData}) => {
      const newArray = [
        ...todoData,
        newItem
      ];

      return {
        todoData: newArray
      }

    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = {...oldItem,
      [propName]: !oldItem[propName]};

      
    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];

  

  }

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    });

  };

  search = (items, term) => {
    if(term.length === 0) {
      return items
    }

    return items.filter((item)=> {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    })
  }
  onSearchChange = (term) => {
    this.setState({term})
  }

  filter(items, filter) {
    switch(filter) {
      case 'all':
        return items
      case 'active':
        return items.filter((item) => !item.done)
      case 'done':
        return items.filter((item) => item.done)
      default:
        return items;
    }
  }

  onFilterChange = (filter) => {
    this.setState({filter})
  }

  render() {
    const {todoData , term , filter} = this.state;
    const doneCount = todoData.filter((el) => el.done).length;

    const visibelItem = this.filter(this.search(todoData, term), filter)
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange}/>
          <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange}/>
        </div>
    
        <TodoList 
        todos={visibelItem} 
        onDeleted={this.deleteItem}
        onToggleImportant={this.onToggleImportant}
        onToggleDone={this.onToggleDone}
        
        />

        <ItemAddForm
        onItemAdded={this.addItem}
        />
      </div>
    ); 
  }


};