/**
 * Created by jun on 2017/4/19.
 */

/**
 * @author  info_together@aliyun.com
 * @description
 * @param
 * @return
 */


import {observable, action, computed, useStrict, autorun, remove} from 'mobx'
import {observer} from 'mobx-react'
import React from 'react'
import DevTools from 'mobx-react-devtools'
useStrict(true);

import AddTodo from './components/AddTodo';
import TodoView from './components/TodoView';
import Footer from './components/Footer';


@observer
class TodoList extends React.Component {

    render() {
        const store = this.props.store;
        return (
            <div style={{width: '400px', margin: '0 auto', border: '1px solid #ccc', textAlign: 'center'}}>
                <h2>Todos-MobX</h2>
                <AddTodo addTodo={this.props.store.addTodo}/>
                <ul>
                    {store.todos.map(
                        (todo, index) => <TodoView todo={todo} key={index} index={index}
                                                   writeLocal={this.props.store.writeLocal}
                                                   deleteTodo={this.props.store.deleteTodo}

                        />
                    )}
                </ul>

                <Footer store={store}/>

                <DevTools/>
            </div>
        )
    }

    @action onNewTodo = () => {
        this.props.store.addTodo(prompt('Enter a new todo:', 'coffee plz'));
    }

}

export default TodoList