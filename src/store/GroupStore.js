import { types as t } from 'mobx-state-tree';
import { v4 as uID } from 'uuid';
import { TodoModel } from './TodoStore';


const GroupModel = t
	.model('GroupModel', {					// надаю форму моделі
		id: t.string,
		title: t.string,
		todos: t.array(t.reference(TodoModel)),
	})
	.actions((self) => ({
		addTodo(todo) {
			self.todos.unshift(todo)
		},
	}));



export const GroupListModel = t
	.model('GroupListModel', {
		id: uID(),
		title: t.optional(t.string, 'GroupList'),
		list: t.array(GroupModel), 							// олюблена моя частина - Вкладеність 
	})
	.views((self) => ({
		get favoriteList() {
			return self.list.filter(item => item.isFavorite)   // окремо відфільткував з усього і викликав як об"єкт - так робити, як з олюбненим товаром, так і дaні юзерів
		},
		get ifComplete() {
			let count = 0
			for (let i = 0; i < self.list.length; i++) {
				if (self.list[i].isCompleted === true) { count++ }
			}
			return count
		}

	}))
	.actions((self) => ({
		add(title) {
			const group = {
				id: uID(),
				title,
			}
			self.list.unshift(group)
		},
	}))

// const group = GroupModel.create({
// 	id: uID(),
// 	title: 'My new list',

// })

// const groupList = GroupListModel.create({
// 	list: [group]
// })

// const todoList = TodoListModel.create(state)

// todoList.add('chocolate')
// todoList.add('oil')

// todoList.list[1].toggleCompleted();
// todoList.list[0].toggleFavorite();



// prettyPrint(todoList.favoriteList);


// prettyPrint(todoList);
