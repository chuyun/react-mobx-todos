/**
 * Created by jun on 2017/4/19.
 */

/**
 * @author  info_together@aliyun.com
 * @description
 * @param
 * @return
 */

import React from 'react'
import {observer} from 'mobx-react'
import {action, useStrict} from 'mobx'
import {Input, Message} from 'antd';

useStrict(true);

@observer
class AddTodo extends React.Component {
    render() {
        return (
            <div>
                <Input type="text"
                       placeholder='Input someThing'
                       onKeyUp={this.addTodoHanderKeyUp.bind(this)}
                       style={{width: '90%'}}
                />
            </div>
        )
    }

    /**
     * 按下return键时添加数据到Store中
     * @param event
     */
    @action addTodoHanderKeyUp = (event) => {
        if (event.keyCode === 13 && event.target.value !== "") {
            this.props.addTodo(event.target.value);
            Message.success('添加成功');
            event.target.value = ""
        }
    };
}

export default AddTodo