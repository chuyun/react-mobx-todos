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
import LocalDb from 'localDb';
useStrict(true);


export default class ObservableTodoStore {
    // @observable todos = [{task: "吃午饭", completed: true, isEditing: false}, {
    //     task: "休息",
    //     completed: false,
    //     isEditing: false
    // }];
    @observable todos = this.db.get('todos-mobx') || [{task: "吃午饭", completed: true, isEditing: false}]
    @observable isAllChecked = false;
    @observable pendingRequest = 0;

    constructor() {
        this.db = new LocalDb('React-MobX');
        autorun(() => console.log(this.report));
        this.deleteTodo = this.deleteTodo.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.deleteCompleted = this.deleteCompleted.bind(this);
        this.handerAllState = this.handerAllState.bind(this);
        this.writeLocal=this.writeLocal.bind(this);
    }
    @action writeLocal=()=>{
        this.db.set('todos-mobx', this.todos);
        console.log("SSSS");
    }


    @computed get completedTodosCount() {
        return this.todos.filter(
            todo => todo.completed
        ).length
    }

    @computed get report() {
        if (this.todos.length === 0) {
            return '<none>'
        } else {
            return `Progress: ${this.completedTodosCount}/${this.todos.length}`;
        }
    }

    @action changeTodoState(index, task) {
        this.todos[index].task = task;

    }

    @action addTodo(task) {
        console.log(this);
        this.todos.push({
            task: task,
            completed: false,
            isEditing: false
        })
        this.isAllChecked = false;

        this.writeLocal();
    }

    //删除项目
    @action deleteTodo(index) {
        console.log(index);
        this.todos.length && this.todos.splice(index, 1);

        this.writeLocal();
    }

    //删除已完成
    @action deleteCompleted() {
        // this.todos.map((todo,index)=>{
        //     if(todo.completed){
        //         this.todos.length && this.todos.splice(index, 1);
        //     }
        // })

        let newTodos = this.todos.filter(todo => !todo.completed);
        this.todos = newTodos;

        if (this.isAllChecked) this.isAllChecked = false;

        this.writeLocal();

    }

    // 处理全选与全不选的状态
    @action handerAllState() {
        if (this.isAllChecked) {
            //    当前状态为全选，=> 全不选
            this.todos.map(todo => todo.completed = false);
            this.isAllChecked = false;
        } else {
            //    当前状态为未选择 =>全选
            this.todos.map(todo => {
                    if (!todo.completed) {
                        todo.completed = true
                    }
                }
            );
            this.isAllChecked = true;
        }
        this.writeLocal();
    }
}