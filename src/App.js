// import { autorun } from 'mobx';
import './App.css';
import { values } from 'mobx'; // у МСТ - є ще свої пропси, але щоб ми користувались і бачили лише свої, треба юзати values з мобХ
import { observer } from 'mobx-react-lite'
import rootStore from './store/RootStore';
import { prettyPrint } from './store/utils';



const List_Of_Group = observer((props) => {
	console.log("render List_Of_Group")
	return (
		<li key={props.group.id}>
			{props.group.title}

		</li>
	)
})

const TodoItem = observer((props) => {
	console.log("render TodoItem")
	return (
		<div className="oneItem">
			<li
				key={props.todo.id}
				className={props.todo.isCompleted ? 'completed ' : undefined}
				onClick={() => props.todo.toggleCompleted()}
			>
				{props.todo.title}
				<i className={props.todo.toggleFavorite ? "fas fa-star GREEN " : "fas fa-star"}
					onClick={() => props.todo.toggleFavorite()} />
			</li>
		</div>
	)
})


function App() {
	console.log('render app')
	prettyPrint(rootStore)
	let newValue = false;
	const submitHandler = (event) => {
		event.preventDefault();
	}

	// function ifComplete() {
	// 	let count = 0
	// 	for (let i = 0; i <= rootStore.todos.list.length; i++) {
	// 		if (rootStore.todos.list[i].isCompleted === true) { return count++ }
	// 		console.log('count', count)

	// 	}
	// 	console.log('legngth', rootStore.todos.list.length)
	// }
	// console.log('object', ifComplete())
	// let completedItem = rootStore.todos.ifComplete;

	return (

		<div className="mainbox" >

			<div className="Group_of_list">
				<ul>
					{values(rootStore).map((group) => {
						return (<List_Of_Group group={group} />)
					})}
				</ul >
			</div>
			<div className="List_Of_Todo">
				<form id="form" onSubmit={submitHandler}>
					<input placeholder="wtire some task" onChange={(e) => newValue = e.target.value}></input>
					<button type="submit" onClick={() => newValue ? rootStore.todos.add(newValue) : newValue = ""} >Add</button>
					<ul>
						{values(rootStore.todos.list).map((todo) => (
							<TodoItem todo={todo} />
						))}

					</ul >
					{/* {rootStore.todos.ifComplete} ???  finished */}
					{/* {completedItem} */} {rootStore.todos.list.length}
				</form>
			</div>


		</div>
	)

}

export default observer(App);
