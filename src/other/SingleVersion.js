


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
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom'
import DevTools from 'mobx-react-devtools'

useStrict(true);

/**
 * 数据
 */
class ObservableTodoStore {
    @observable todos = [{task: "吃午饭", completed: true, isEditing: false}, {
        task: "休息",
        completed: false,
        isEditing: false
    }];
    @observable pendingRequest = 0;

    constructor() {
        autorun(() => console.log(this.report));
        this.deleteTodo = this.deleteTodo.bind(this);
        this.addTodo = this.addTodo.bind(this);
    }

    @computed get completedTodosCount() {
        return this.todos.filter(
            todo => todo.completed
        ).length
    }

    @computed get report() {
        if (this.todos.length === 0) {
            return '<none>'
        } else {
            return `Next todo: "${this.todos[0].task}". ` +
                `Progress: ${this.completedTodosCount}/${this.todos.length}`;
        }
    }

    @action changeTodoState(index, task) {
        this.todos[index].task = task;
    }

    @action addTodo(task) {
        console.log(this);
        this.todos.push({
            task: task,
            completed: false,
            isEditing: false
        })
    }

    @action deleteTodo(index) {
        console.log(index);
        this.todos.length && this.todos.splice(index, 1);
    }
}

const observableTodoStore = new ObservableTodoStore();

@observer
class AddTodo extends React.Component {

    render() {
        return (
            <div>
                <input type="text" defaultValue='Input someThing' onKeyUp={this.addTodoHanderKeyUp.bind(this)}/>

            </div>
        )
    }

    @action addTodoHanderKeyUp = (event) => {

        if (event.keyCode === 13&&event.target.value!=="") {
            this.props.addTodo(event.target.value);
            event.target.value = ""
        }
    };
}

@observer
class TodoList extends React.Component {

    render() {
        const store = this.props.store;
        return (
            <div>
                {store.report}
                <AddTodo addTodo={this.props.store.addTodo}/>
                <ul>
                    {store.todos.map(
                        (todo, index) => <TodoView todo={todo} key={index} index={index}
                                                   deleteTodo={this.props.store.deleteTodo}

                        />
                    )}
                </ul>
                {store.pendingRequest > 0 ? <marquee>Loading...</marquee> : null }
                {/*<button onClick={ this.onNewTodo }>New Todo</button>*/}
                <small> (double-click a todo to edit)</small>
                <DevTools/>
            </div>
        )
    }

    @action onNewTodo = () => {
        this.props.store.addTodo(prompt('Enter a new todo:', 'coffee plz'));
    }

}


@observer
class TodoView extends React.Component {

    render() {
        const {todo, index} = this.props;
        return (
            <li onDoubleClick={this.onReame} key={`li-${index}`} id={index}>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={this.onToggleCompleted}
                />
                {todo.isEditing ?
                    <input type="text" ref={`input-${todo.task}`}
                           defaultValue={todo.task}
                           onKeyUp={this.handerKeyUp.bind(this)}
                           onBlur={this.inputBlur.bind(this)}/>
                    :
                    <span>{todo.task}</span>
                }
                {todo.assignee ? <small>{todo.assignee.name}</small> : null}
                <button
                    style={{float: 'right'}}
                    onClick={() => this.props.deleteTodo(index)}
                >
                    删除
                </button>
            </li>

        )
    }

    // 绑定键盘回车事件，添加新任务
    @action handerKeyUp = (event) => {
        const todo = this.props.todo;
        if (event.keyCode === 13) {
            todo.task = event.target.value;
            todo.isEditing = false;
        }
    };
    @action inputBlur = (event) => {
        const todo = this.props.todo;
        todo.task = event.target.value;
        todo.isEditing = false;
    };

    @action onToggleCompleted = () => {
        const todo = this.props.todo;
        todo.completed = !todo.completed;
    };
    @action onReame = () => {
        const todo = this.props.todo;
        todo.isEditing = true;
    }
}

ReactDOM.render(
    <TodoList store={observableTodoStore}/>,
    document.getElementById('root')
);
