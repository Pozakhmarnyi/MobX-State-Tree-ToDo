// import { autorun } from 'mobx';
import './App.css';
import { values } from 'mobx'; // у МСТ - є ще свої пропси, але щоб ми користувались і бачили лише свої, треба юзати values з мобХ
import { observer } from 'mobx-react-lite'
import rootStore from './store/RootStore';
import { prettyPrint } from './store/utils';

const TodoItem = observer((props) => {
	console.log("render TodoItem")
	return (
		<li
			key={props.todo.id}
			className={props.todo.isCompleted ? 'completed' : undefined}
			onClick={() => props.todo.toggleCompleted()}
		>
			{props.todo.title}
		</li>
	)
})



// prettyPrint(rootStore)

function App() {
	console.log('render app')


	return (
		<div className="App" >
			<ul>
				{values(rootStore.todos.list).map((todo) => (
					<TodoItem todo={todo} />
				))}
			</ul >

			<button type="button" onClick={() => rootStore.todos.add("oil")} >Add</button>
			<p>{rootStore.todos.length}</p>

		</div>
	)

}

export default observer(App);
