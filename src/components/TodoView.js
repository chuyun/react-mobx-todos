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
useStrict(true);

import LocalDb from 'localDb';


@observer
class TodoView extends React.Component {
    constructor(props){
        super(props);
        this.state={
            deleteBtnShow:false
        }
    }
    handerMouseOver() {
        this.setState({deleteBtnShow:true});
    }
    handerMouseOut() {
        this.setState({deleteBtnShow:false});
    }

    render() {
        const {todo, index} = this.props;
        let deleteBtnStyle=this.state.deleteBtnShow?{display:'inline',float: 'right'}:{display:'none'}
        return (
            <li
                style={{textAlign:'left'}}
                onDoubleClick={this.onReame}
                onMouseOver={this.handerMouseOver.bind(this)}
                onMouseOut={this.handerMouseOut.bind(this)}
                key={`li-${index}`}
                id={index}
            >
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
                {/*{todo.assignee ? <small>{todo.assignee.name}</small> : null}*/}

                <button
                    style={deleteBtnStyle}
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
        this.props.writeLocal();

    };
    @action inputBlur = (event) => {
        const todo = this.props.todo;
        todo.task = event.target.value;
        todo.isEditing = false;
        this.props.writeLocal();

    };

    @action onToggleCompleted = () => {
        const todo = this.props.todo;
        todo.completed = !todo.completed;
        this.props.writeLocal();

    };
    @action onReame = () => {
        const todo = this.props.todo;
        todo.isEditing = true;
        this.props.writeLocal();
    }
}


export default TodoView