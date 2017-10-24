/**
 * Created by jun on 2017/4/19.
 */

/**
 * @author  info_together@aliyun.com
 * @description
 * @param
 * @return
 */



import {observable, action, computed, useStrict, autorun} from 'mobx'
import {observer} from 'mobx-react'
import React from 'react'
import ReactDOM from 'react-dom'
import DevTools from 'mobx-react-devtools'

useStrict(true);

class Store {
    @observable todos = [
        {
            title: 'todo标题',
            done: false
        },
        {
            title: 'todo标题2',
            done: false
        },
        {
            title: "已经完成 todo 的标题111",
            done: true,
        },
        {
            title: "已经完成 todo 的标题222",
            done: true,
        }
    ];

    constructor() {
        autorun(() => console.log(this.report));
    }

    @computed get report() {
        if (this.todos.length === 0)
            return "<none>";
        return `Next todo: "${this.todos[0].task}". ` +
            `Progress: ${this.completedTodosCount}/${this.todos.length}`;
    }

    @action changeTodoTitle({index, title, done}) {
        this.todos[index].title = title
        this.todos[index].done = false
    }

    @action isShow(index) {
        this.todos[index].done = false
    }

    @action addTodo(t) {
        this.todos.push({
            title: t,
            done: false
        });
    }



    @computed get unfinishedTodos() {
        return this.todos.filter((todo) => !todo.done)
    }

}


@observer
class Hello extends React.Component {
    render() {

        return (
            <div>
                <ul>
                    {this.props.store.unfinishedTodos.map((todo, index) =>
                        <Item todo={todo} index={index} onClick={this.props.store.isShow(index)} key={`item-${index}`}/>
                    )}
                </ul>
                <div>
                    <input type="button" onClick={() => {
                        this.props.store.changeTodoTitle({
                            index: 1,
                            title: "修改111后的todo标题",
                            done: !this.props.store.todos[1].done
                        })
                    }} value="点击我"/>
                    <button onClick={() => {
                        this.props.store.addTodo("Test")
                    }}>ADD
                    </button>

                </div>
                <DevTools/>
            </div>
        )

    }
}

@observer
class Item extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {todo, index, onClick} = this.props;
        return (
            <li key={`list-${index}`}
                onClick={onClick}
            >
                {todo.title}
            </li>
        )
    }

}

const store = new Store();

ReactDOM.render(
    <Hello store={store}/>,
    document.getElementById('root')
);