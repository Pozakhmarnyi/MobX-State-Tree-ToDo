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

// class TodoModel {      // модель - (хоч говори форма) якою будемо наділяти наші нові об"єкти
// 	constructor(id, title) {
// 		this.id = id;
// 		this.title = title;
// 	}
// }
// const todo = new TodoModel(uID, "Oil")  --- І наш новий о"єкт з заданою формою

// Нижче те саме, але на 'mobx-state-tree'

export const TodoModel = t
	.model('TodoModel', {				// надаю форму моделі
		id: t.identifier, // - індифікатор для наших посилань -> референсів
		title: t.string,
		isCompleted: t.optional(t.boolean, false),			// опціонально, з дефолтним фолс
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

// const newTodo = TodoModel.create({ id: uID(), title: 'Fack' })

// newTodo.isCompleted = true;      ТАК Є ПОМИЛКА, оскільки для внутрішньої зміни елементів у MST - треба робити через .actions і там створити якийсь метод - у нашому випадко toggleCompleted() {self.isCompleted = !self.isCompleted}
// prettyPrint(newTodo);

// newTodo.toggleCompleted()       // Ось так - Абсолютно законно ! %) 
// prettyPrint(newTodo);


export const TodoListModel = t
	.model('TodoListModel', { 		// наш MST - буде знати автоматично, що вміст нашого масиву матиме тип TodoModel ТАк -> list: t.array(TodoModel)
		list: t.array(TodoModel), 							//якщо t.optional ("першим аргументом - те,що повинно бути!" , а другим це по дефолту, якщо нема першого)
	})
	.views((self) => ({
		get favoriteList() {
			return self.list.filter(item => item.isFavorite)   // окремо відфільткував з усього і викликав як об"єкт - так робити, як з олюбненим товаром, так і дaні юзерів
		},
		get length() {
			return self.list.length
		}
	}))
	.actions((self) => ({  		   	// оскільки це MST - тут не можна вручну добивити, ще щось. І методи .push() і їм подібні, не поможуть, треба робити .action ІЗ своїми методами
		add(title) {	// get писати перед методом, коли нема потреби в пропсах - зараз у пропсі (title)
			const todo = {		    //const todo = TodoModel.create({...}) так не обо"язково вказувати, оскільки MST знає, яку можедель ми використовуємо
				id: uID(),
				title,
			}

			self.list.unshift(todo)
		},

		// У .views перед методами варто ставити get - якщо їм не треба пропсів. get - кешується, і не буде щоразу запускатись, якщо наш стейт\self не мінявся  
	}))

// const todo = TodoModel.create({ 						// створення об"яку
// 	id: uID(),
// 	title: 'egg',
// })


// const todoList = TodoListModel.create(state)

// todoList.add('chocolate')
// todoList.add('oil')

// todoList.list[1].toggleCompleted();
// todoList.list[0].toggleFavorite();



// prettyPrint(todoList.favoriteList);


// prettyPrint(todoList);
