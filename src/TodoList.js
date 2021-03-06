/**
 * Created by jun on 2017/4/19.
 */

/**
 * @author  info_together@aliyun.com
 * @description
 * @param
 * @return
 */

import {action, useStrict} from 'mobx'
import {observer} from 'mobx-react'
import React from 'react'
import DevTools from 'mobx-react-devtools'
import AddTodo from './components/AddTodo';
import TodoView from './components/TodoView';
import Footer from './components/Footer';
import {Card, Notification} from 'antd';

useStrict(true);

const openNotification = (type) => {
    Notification[type]({
        message: 'A Sample Todos use React & MobX',
        description: 'This is the Sample Demo of the React,MobX,Ant-Design,LocalStorage etc.And so,you can Add Todo and double-click a todo item to edit. Thanks',
    });
};

@observer
class TodoList extends React.Component {

    render() {
        const store = this.props.store;
        return (
            <div style={{width: '400px', margin: '0 auto', textAlign: 'center'}}>
                <Card title="Todos-MobX" bordered={false} style={{width: 400}}
                      extra={<  a onClick={() => openNotification('info')}>More</a>}>
                    <AddTodo addTodo={this.props.store.addTodo}/>
                    <ul style={{margin: "10px 20px"}}>
                        {store.todos.map(
                            (todo, index) => <TodoView todo={todo} key={index} index={index}
                                                       writeLocal={this.props.store.writeLocal}
                                                       deleteTodo={this.props.store.deleteTodo}
                                                       isAllcheckedOrNot={this.props.store.isAllcheckedOrNot}
                            />
                        )}
                    </ul>
                    <Footer store={store}/>
                    <DevTools/>
                </Card>
            </div>
        )
    }
}

export default TodoList