/**
 * Created by jun on 2017/4/19.
 */

/**
 * @author  info_together@aliyun.com
 * @description 待办列表
 * @param
 * @return
 */

import {action, useStrict} from 'mobx'
import {observer} from 'mobx-react'
import React from 'react'
import {Input, Checkbox, Popconfirm, Message} from 'antd';

useStrict(true);

@observer
class TodoView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteBtnShow: false
        }
    }

    render() {
        const {todo, index} = this.props;
        let deleteStyle = (this.state.deleteBtnShow && !todo.isEditing) ? {visibility: 'visible'} : {visibility: 'hidden'};
        let checkBoxStyle = todo.isEditing ? {visibility: 'hidden'} : {visibility: "visible"};
        let labelStyle = todo.completed ? {
            color: '#ccc',
            textDecoration: 'line-through',
            lineHeight: '32px',
            width: '70%'
        } : {lineHeight: '32px', width: '70%'};
        return (
            <li
                onDoubleClick={this.onReame}
                onMouseOver={this.handerMouseOver.bind(this)}
                onMouseOut={this.handerMouseOut.bind(this)}
                key={`li-${index}`}
                id={index}
            >
                <Checkbox
                    style={checkBoxStyle}
                    type="checkbox"
                    checked={todo.completed}
                    onChange={this.onToggleCompleted}
                />
                {todo.isEditing ?
                    <Input type="text"
                           className="input"
                           style={{display: 'inline', width: '70%'}}
                           ref={`input-${todo.task}`}
                           defaultValue={todo.task}
                           onKeyUp={this.handerKeyUp.bind(this)}
                           onBlur={this.inputBlur.bind(this)}/>
                    :
                    <span style={labelStyle}>{todo.task}</span>
                }
                <Popconfirm title="Are you sure delete this task?" onConfirm={() => this.confirm(index)}
                            onCancel={this.cancel} okText="Yes"
                            cancelText="No">
                    <a
                        className="delete-btn"
                        style={deleteStyle}
                    >
                        ×
                    </a>
                </Popconfirm>
            </li>
        )
    }

    /**
     * MouseOver 时显示deleteButton
     */
    handerMouseOver() {
        this.setState({deleteBtnShow: true});
    };

    /**
     * MouseOut 时隐藏deleteButton
     */
    handerMouseOut() {
        this.setState({deleteBtnShow: false});
    };

    /**
     * 绑定键盘回车事件，添加新任务
     * @param event
     */
    @action handerKeyUp = (event) => {
        const todo = this.props.todo;
        if (event.keyCode === 13) {
            todo.task = event.target.value;
            todo.isEditing = false;
        }
        this.props.writeLocal();
    };

    /**
     * input 失去焦点，保存修改后的数据
     * @param event
     */
    @action inputBlur = (event) => {
        const todo = this.props.todo;
        todo.task = event.target.value;
        todo.isEditing = false;
        this.props.writeLocal();
    };

    /**
     * CheckBox点击事件
     */
    @action onToggleCompleted = () => {
        const todo = this.props.todo;
        todo.completed = !todo.completed;
        this.props.isAllcheckedOrNot();
        this.props.writeLocal();

    };

    /**
     * 设置组件处于编辑状态
     */
    @action onReame = () => {
        const todo = this.props.todo;
        todo.isEditing = true;
        this.props.writeLocal();
    };

    /**
     * antd Popconfirm confirm cancel 事件
     */
    confirm = (idx) => {
        this.props.deleteTodo(idx);
        Message.success('已删除');
    };

    cancel = () => {
        Message.error('已取消');
    };
}

export default TodoView