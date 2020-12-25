import { types as t } from 'mobx-state-tree';
import { v4 as uID } from 'uuid';
import rootStore from './RootStore';
import { TestStore } from './TestStore';
import { TodoModel } from './TodoStore';


export const FavoriteModel = t
	.model('FavoriteModel', {
		folder: t.reference(TestStore),
		title: t.string
	})
	// .views((self) => ({
	// 	get favoriteList() {

	// 		// for (let i = 0; i < self.list.length; i++) {

	// 		// 	self.list = rootStore.groups.list[i].todos.filter(item => item.isFavorite)
	// 		// }

	// 		// return self.list


	// 		// return self.list = rootStore.groups.list[i].todos.filter(item => item.isFavorite)  
	// 	},
	// 	// get ifComplete() {
	// 	// 	let count = 0
	// 	// 	for (let i = 0; i < self.list.length; i++) {
	// 	// 		if (self.list[i].isCompleted === true) { count++ }
	// 	// 	}
	// 	// 	return count
	// 	// }

	// }))


