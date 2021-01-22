import { types as t } from 'mobx-state-tree';
import { v4 as uID } from 'uuid';
import rootStore from './RootStore';
import { TestStore } from './TestStore';
import { TodoModel } from './TodoStore';


export const FavoriteModel = t
	.model('FavoriteModel', {
		title: t.optional(t.string, 'Favorite'),
		todos: t.array(t.reference(TodoModel)),

	})

	.actions((self) => ({
		addTodo(todo) {

			self.todos.unshift(todo)
		},

	}));

