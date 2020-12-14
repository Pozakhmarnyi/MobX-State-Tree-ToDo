import { types as t } from 'mobx-state-tree';
import { GroupListModel } from './GroupStore';
import { TodoListModel } from './TodoStore';

const RootStore = t
	.model('RootStore', {
		todos: t.optional(TodoListModel, {}),
		groups: t.optional(GroupListModel, {}),

	})






const rootStore = RootStore.create({})
export default rootStore;




rootStore.todos.add("banana");
rootStore.todos.add("lemon");

const todo = rootStore.todos.list[0]

rootStore.groups.add("shopping list")
rootStore.groups.add("My plan for week")


rootStore.groups.list[0].addTodo("Finished this ToDO")
rootStore.groups.list[0].addTodo("add simple UI")


rootStore.groups.list[0].toggleFavorite() // чомусь не змінює 

rootStore.groups.list[0].toggleCompleted() // чомусь не змінює 
rootStore.groups.list[1].toggleCompleted() // чомусь не змінює 



todo.toggleCompleted() // працює 
