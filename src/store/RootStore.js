import { types as t } from 'mobx-state-tree';
import { GroupListModel } from './GroupStore';
import { TodoListModel } from './TodoStore';
import { values } from 'mobx';
import { FavoriteModel } from './FavoriteStore';
import { observer } from 'mobx-react-lite';
import { TestStore } from './TestStore';

const RootStore = t
	.model('RootStore', {					// MST - має мати один корневий стор - із якою всі решта		
		todos: t.optional(TodoListModel, {}),
		groups: t.optional(GroupListModel, {}),
		favorite: t.optional(FavoriteModel, {}),
	})


const rootStore = RootStore.create({})
export default rootStore;


// rootStore.todos.list[0].isFavorite();
// prettyPrint(rootStore)
// autorun(() => prettyPrint(rootStore))

// rootStore.todos.add("banana");
// rootStore.todos.add("lemon");

// const todo = rootStore.todos.list[0]

rootStore.groups.add("shopping list")
rootStore.groups.add("My plan for week")


rootStore.groups.list[0].addTodo("Finished this ToDO")
rootStore.groups.list[0].addTodo("add simple UI")
rootStore.groups.list[1].addTodo("one ToDO in [1] - shoping list")



rootStore.groups.list[0].todos[0].toggleCompleted() // все ок !
rootStore.groups.list[0].todos[0].toggleFavorite() // все ок !
rootStore.groups.list[0].todos[1].toggleFavorite() // все ок !
rootStore.groups.list[1].todos[0].toggleFavorite()




// Ось так норм працює референс
// export const referenceTodo = rootStore.groups.list[1].todos[0];
// console.log('referenceTodo', referenceTodo)
// rootStore.favorite.addTodo(referenceTodo)


// for (let i = 0; i < rootStore.groups.list.length; i++) {

// }


// let faAAaavor1ts = rootStore.groups.list[0].favoriteList

// console.log('faAAaavor1ts', faAAaavor1ts)

// faAAaavor1ts.forEach(obj => { rootStore.favorite.addTodo(obj) })





//гімнячу з перебором

// let onlyFavorites = [];

// for (let i = 0; i < rootStore.groups.list.length; i++) {
// 	onlyFavorites.push(rootStore.groups.list[i].todos.filter(item => item.isFavorite))

// }

// onlyFavorites.push(rootStore.groups.list[0].todos.filter(item => item.isFavorite))

let isFavor1 = [];
for (let i = 0; i < rootStore.groups.list.length; i++) {
	isFavor1 = rootStore.groups.list[i].todos.filter(item => item.isFavorite)


}
// let isFavor1 = rootStore.groups.list[0].todos.filter(item => item.isFavorite)
rootStore.favorite.addTodo(...isFavor1)

console.log('isFavor1', isFavor1)