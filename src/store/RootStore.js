import { types as t } from 'mobx-state-tree';
import { GroupListModel } from './GroupStore';
import { TodoListModel } from './TodoStore';

const RootStore = t
	.model('RootStore', {					// MST - має мати один корневий стор - із якою всі решта		
		todos: t.optional(TodoListModel, {}),
		groups: t.optional(GroupListModel, {}),
	});

const rootStore = RootStore.create({})

export default rootStore;


// rootStore.todos.list[0].isFavorite();
// prettyPrint(rootStore)
// autorun(() => prettyPrint(rootStore))

rootStore.todos.add("banana");
rootStore.todos.add("lemon");

const todo = rootStore.todos.list[0]

rootStore.groups.add("shopping list")
// const group = rootStore.groups.list[0]

// group.addTodo({ id: "asd", title: "Write by hand" }) // вручну добавив \\ БУде відображатись у ДЕРЕВІ // Але тепер не працюватиме, оскільки використовую референс
// prettyPrint(group)  

// group.addTodo(todo)
todo.toggleCompleted()

// prettyPrint(rootStore)
// prettyPrint(todo === group.todos[0])

