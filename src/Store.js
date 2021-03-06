/**
 * Created by jun on 2017/4/19.
 */

/**
 * @author  info_together@aliyun.com
 * @description
 * @param [...]
 * @return [...]
 */


import {observable, action, computed, useStrict, autorun} from 'mobx'
import LocalDb from './localDb/';

useStrict(true);


export default class ObservableTodoStore {
    // @observable todos = [{task: "吃午饭", completed: true, isEditing: false}, {
    //     task: "休息",
    //     completed: false,
    //     isEditing: false
    // }];
    // @observable todos = this.db.get('todos-mobx') || [{task: "吃午饭", completed: true, isEditing: false}]
    @observable todos = this.db.get('todos-mobx') || [];
    @observable isAllChecked = false;
    @observable pendingRequest = 0;

    /**
     * 构造函数
     * 初始化
     */
    constructor() {
        this.db = new LocalDb('React-MobX');
        autorun(() => console.log(this.report));
        this.deleteTodo = this.deleteTodo.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.deleteCompleted = this.deleteCompleted.bind(this);
        this.handerAllState = this.handerAllState.bind(this);
        this.writeLocal = this.writeLocal.bind(this);
        this.isAllcheckedOrNot = this.isAllcheckedOrNot.bind(this);
    }

    /**
     * 写入数据到localStorage
     */
    @action writeLocal = () => {
        this.db.set('todos-mobx', this.todos);
    };

    /**
     * 计算属性 已完成项目计数
     * @return {Number}
     */
    @computed
    get completedTodosCount() {
        return this.todos.filter(
            todo => todo.completed
        ).length
    }

    /**
     * 计算属性 完成百分比
     * @return {*}
     */
    @computed
    get report() {
        if (this.todos.length === 0) {
            return 'Todo 列表中空空如也，快来添加吧！'
        } else {
            return `Progress: ${this.completedTodosCount}/${this.todos.length}`;
        }
    }

    /**
     * 修改待办事项
     * @param index
     * @param task
     */
    @action
    changeTodoState(index, task) {
        this.todos[index].task = task;
    }

    /**
     * 添加新的待办事项
     * @param task
     */
    @action
    addTodo(task) {
        console.log(this);
        this.todos.push({
            task: task,
            completed: false,
            isEditing: false
        });
        this.isAllChecked = false;
        this.writeLocal();
    }

    /**
     * 删除待办事项
     * @param index
     */
    @action
    deleteTodo(index) {
        console.log(index);
        this.todos.length && this.todos.splice(index, 1);
        this.isAllcheckedOrNot();
        this.writeLocal();
    }

    /**
     * 删除已完成项目
     */
    @action
    deleteCompleted() {
        let newTodos = this.todos.filter(todo => !todo.completed);
        this.todos = newTodos;
        if (this.isAllChecked) this.isAllChecked = false;
        this.writeLocal();
    }

    /**
     * 处理全选与全不选的状态
     */
    @action
    handerAllState() {
        if (this.isAllChecked) {
            //    当前状态为全选，=> 全不选
            this.todos.map(todo => todo.completed = false);
            this.isAllChecked = false;
        } else {
            //    当前状态为未选择 =>全选
            this.todos.map((todo) => todo.completed = true);
            this.isAllChecked = true;
        }
        this.writeLocal();
    }

    /**
     * 判断是否全选
     */
    @action
    isAllcheckedOrNot() {
        if (this.todos.filter(todo => todo.completed).length === this.todos.length) {
            this.isAllChecked = true
        } else {
            this.isAllChecked = false
        }
    }
}