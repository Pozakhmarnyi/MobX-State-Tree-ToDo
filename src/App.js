// import { autorun } from 'mobx';
import './App.css';
import { values } from 'mobx'; // у МСТ - є ще свої пропси, але щоб ми користувались і бачили лише свої, треба юзати values з мобХ
import { observer } from 'mobx-react-lite'
import rootStore from './store/RootStore';
import { prettyPrint } from './store/utils';


const TodoItem = observer((props) => {
	console.log("render TodoItem")
	return (
		<div className="oneItem">
			<li
				key={props.todo.id}
				className={props.todo.isCompleted ? 'completed' : undefined}
				onClick={() => props.todo.toggleCompleted()}
			>
				{props.todo.title}
			</li>
			<i className={props.todo.toggleFavorite ? "fas fa-star GREEN" : "fas fa-heart-broken"}
				onClick={() => props.todo.toggleFavorite()} />
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




	return (

		<div className="mainbox" >
			<div className="List_Of_Todo">
				<form id="form" onSubmit={submitHandler}>
					<input placeholder="wtire some task" onChange={(e) => newValue = e.target.value}></input>
					<button type="submit" onClick={() => newValue ? rootStore.todos.add(newValue) : newValue = ""} >Add</button>
					<ul>
						{values(rootStore.todos.list).map((todo) => (
							<TodoItem todo={todo} />

						))}
					</ul >
				</form>
			</div>


		</div>
	)

}

export default observer(App);
