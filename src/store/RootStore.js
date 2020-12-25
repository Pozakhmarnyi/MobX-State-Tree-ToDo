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
		// favorite: t.optional(FavoriteModel, {}),

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
rootStore.groups.list[1].todos[0].toggleFavorite()


// const group = rootStore.groups.list[0]

// group.addTodo({ id: "asd", title: "Write by hand" }) // вручну добавив \\ БУде відображатись у ДЕРЕВІ // Але тепер не працюватиме, оскільки використовую референс
// prettyPrint(group)  

// group.addTodo(todo)

// todo.toggleCompleted()

// prettyPrint(rootStore)
// prettyPrint(todo === group.todos[0])


const referenceTodo = rootStore.groups.list[1].todos[0];
console.log('referenceTodo', referenceTodo)
// rootStore.favorite.add(referenceTodo)


//гімнячу з перебором

let onlyFavorites = [];
for (let i = 0; i < rootStore.groups.list.length; i++) {

	onlyFavorites.push(rootStore.groups.list[i].todos.filter(item => item.isFavorite))
}

console.log('onlyFavorites', onlyFavorites)