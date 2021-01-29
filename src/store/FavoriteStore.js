import { getParent, types as t } from 'mobx-state-tree';
import { v4 as uID } from 'uuid';
import rootStore from './RootStore';
import { TestStore } from './TestStore';
import { TodoModel } from './TodoStore';


export const FavoriteModel = t
	.model('FavoriteModel', {
		title: t.optional(t.string, 'Favorite'),
		todos: t.array(t.reference(TodoModel)),

	})
	.views((self) => ({
		get favoriteList() {

			// getParent(self).groups.list[0].todos.forEach((item) => {
			// 	self.todos.unshift(item)
			// });
			return self.todos.filter(item => item.isFavorite)   // окремо відфільткував з усього і викликав як об"єкт - так робити, як з олюбненим товаром, так і дaні юзерів
		}
	}))
	.actions((self) => ({
		addTodo(todo) {
			self.todos.unshift(todo)
		},

	}));

