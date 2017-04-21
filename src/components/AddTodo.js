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

import Input from 'antd/lib/input';
import 'antd/lib/input/style';
import Message from 'antd/lib/message';
import 'antd/lib/message/style'

const Search=Input.Search;

@observer
class AddTodo extends React.Component {

    render() {
        return (
            <div>
                <Input type="text"
                       placeholder='Input someThing'
                       onKeyUp={this.addTodoHanderKeyUp.bind(this)}
                       style={{width:'90%'}}
                />
            </div>
        )
    }
    @action addTodoHanderKeyUp = (event) => {
        if (event.keyCode === 13 && event.target.value !== "") {
            this.props.addTodo(event.target.value);
            Message.success('添加成功');
            event.target.value = ""
        }
    };
}

export default AddTodo