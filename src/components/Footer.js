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

import CheckBox from 'antd/lib/checkbox';
import 'antd/lib/checkbox/style';
import Button from 'antd/lib/button';
import 'antd/lib/button/style';
import Popconfirm from 'antd/lib/popconfirm';
import 'antd/lib/popconfirm/style'
import Message from 'antd/lib/message';
import 'antd/lib/message/style'

@observer
class Footer extends React.Component {

    render() {
        const store = this.props.store;
        return (
            <div className="footer">
                {store.report}
                <br/>
                <br/>
                <CheckBox
                    style={{marginTop:'1px'}}
                    checked={this.props.store.isAllChecked}
                    onChange={this.props.store.handerAllState}
                >
                    {store.isAllChecked?'全不选':"全选"}
                </CheckBox>
                <Popconfirm title="Are you sure you want to delete all selected items?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
                <Button
                    className='deleteAll'
                    size='small'
                    type="danger"
                    // onClick={this.props.store.deleteCompleted}
                >
                    删除已完成
                </Button>
                </Popconfirm>

            </div>
        )
    }


    confirm = (e) => {
        // console.log(e);
        this.props.store.deleteCompleted();
        Message.success('已删除');
    };

    cancel = (e) => {
        // console.log(e);
        Message.error('已取消');
    };

}

export default Footer;