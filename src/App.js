/**
 * Created by jun on 2017/4/20.
 */

/**
 * @author  info_together@aliyun.com
 * @description  测试ANT Design 此时采用引入less 文件 而非css文件
 * @param
 * @return
 */



import React, { Component } from 'react';
import Button  from 'antd/lib/button';
import 'antd/lib/button/style'

import 'antd/dist/antd.css';

class App extends Component {
    render() {
        return (
            <div>
                <Button type="danger">Button</Button>
            </div>
        );
    }
}

export default App;