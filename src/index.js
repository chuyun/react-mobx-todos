/**
 * Created by jun on 2017/4/19.
 */

/**
 * @author  info_together@aliyun.com
 * @description
 * @param
 * @return
 */

import ReactDOM from 'react-dom'
import React from 'react'
import ObservableTodoStore from './Store'
import TodoList from './TodoList';
import './index.css'

const observableTodoStore = new ObservableTodoStore();

ReactDOM.render(
    <TodoList store={observableTodoStore}/>,
    document.getElementById('root')
);