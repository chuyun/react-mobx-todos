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

@observer
class Footer extends React.Component{

    render(){
        const store=this.props.store;
        return(
            <div>
                <small> (double-click a todo to edit)</small>
                <br/>
                {store.report}
                <br/>
                <input type="checkbox"
                       checked={this.props.store.isAllChecked}
                       onChange={this.props.store.handerAllState}

                />
                <button onClick={this.props.store.deleteCompleted}>删除已完成</button>
            </div>
        )
    }
}

export default Footer;