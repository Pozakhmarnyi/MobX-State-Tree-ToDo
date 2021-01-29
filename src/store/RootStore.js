import { types as t, onSnapshot } from 'mobx-state-tree';
import { autorun } from "mobx";
import localForage from 'localforage';
import { GroupListModel } from './GroupStore';
import { TodoListModel } from './TodoStore';
import { values } from 'mobx';
import { FavoriteModel } from './FavoriteStore';
import { observer } from 'mobx-react-lite';
import { TestStore } from './TestStore';

import { prettyPrint } from './utils';
import createPersist from './persist';

const RootStore = t
	.model('RootStore', {
		todos: t.optional(TodoListModel, {}),
		groups: t.optional(GroupListModel, {}),
		favorite: t.optional(FavoriteModel, {}),
	});

const rootStore = RootStore.create({});

onSnapshot(rootStore, (snapshot) => prettyPrint(snapshot));

// const persist = createPersist(rootStore, localForage);
// persist.rehydrate();

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



for (let i = 0; i < rootStore.groups.list.length; i++) {

	rootStore.groups.list[i].todos.forEach((item) => {

		rootStore.favorite.addTodo(item)

	});

	// isFavor1 = rootStore.groups.list[i].todos.filter((item) => item.isFavorite)  // так не працювало, через те, що проходячи інтерацію змінної і у циклі фор - метод фільт не встигав профільтрувати все, оскільки перемикався на наступний масив листа
	// rootStore.favorite.addTodo(...isFavor1)

}


