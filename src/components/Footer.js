/**
 * Created by jun on 2017/4/19.
 */

/**
 * @author  info_together@aliyun.com
 * @description Footer组件
 * @param
 * @return
 */

import {useStrict} from 'mobx'
import {observer} from 'mobx-react'
import React from 'react'
import {Checkbox, Button, Popconfirm, Message} from 'antd';

useStrict(true);

@observer
class Footer extends React.Component {
    render() {
        const store = this.props.store;
        return (
            <div className="footer">
                {store.report}
                <br/>
                <br/>
                <Checkbox
                    style={{marginTop: '1px'}}
                    checked={this.props.store.isAllChecked}
                    onChange={this.props.store.handerAllState}
                >
                    {store.isAllChecked ? '全不选' : "全选"}
                </Checkbox>
                <Popconfirm title="Are you sure you want to delete all selected items?" onConfirm={this.confirm}
                            onCancel={this.cancel} okText="Yes" cancelText="No">
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

    /**
     * antd Popconfirm confirm cancel 事件
     */
    confirm = () => {
        this.props.store.deleteCompleted();
        Message.success('已删除');
    };

    cancel = () => {
        Message.error('已取消');
    };
}

export default Footer;