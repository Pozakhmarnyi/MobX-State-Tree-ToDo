import { types as t } from 'mobx-state-tree';
import { v4 as uID } from 'uuid';

const state = {
	list: [
		{
			id: uID(),
			title: 'popato'
		}
	]
}


export const TodoModel = t
	.model('TodoModel', {
		id: t.identifier,
		title: t.string,
		isCompleted: t.optional(t.boolean, false),
		isFavorite: t.optional(t.boolean, false),
	})
	.actions((self) => ({
		toggleCompleted() {
			self.isCompleted = !self.isCompleted
		},
		toggleFavorite() {
			self.isFavorite = !self.isFavorite
		}

	}));



export const TodoListModel = t
	.model('TodoListModel', {
		id: uID(),
		title: t.optional(t.string, 'TodoList'),
		list: t.array(TodoModel),
	})
	.views((self) => ({
		get favoriteList() {
			return self.list.filter(item => item.isFavorite)
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
			const todo = {
				id: uID(),
				title,
			}

			self.list.unshift(todo)
		},


	}))
