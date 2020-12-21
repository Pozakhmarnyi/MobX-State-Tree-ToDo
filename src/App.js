// import { autorun } from 'mobx';
import React, { useState } from "react";
import './App.css';
import { values } from 'mobx'; // у МСТ - є ще свої пропси, але щоб ми користувались і бачили лише свої, треба юзати values з мобХ
import { observer } from 'mobx-react-lite'
import rootStore from './store/RootStore';
import { prettyPrint } from './store/utils';




const ListOfGroup = observer((props) => {
	console.log("render List_Of_Group")

	return (
		<li key={props.group.id} className="oneItem">
			<b>	{props.group.title}</b>
			{props.group.todos.ifComplete}
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
				onClick={() => props.todo.toggleCompleted()}>

				{props.todo.title}

			</li>
			<i className={props.todo.isFavorite ? "fas fa-star gold " : "fas fa-star black"}
				onClick={() => props.todo.toggleFavorite()} />
		</div>
	)
})


function App() {
	const [value, setValue] = useState("");
	const [valueTD, setValueTD] = useState("");
	console.log('render app')
	prettyPrint(rootStore)

	const submitHandler = (event) => {
		event.preventDefault();

		if (value.trim()) {
			setValue("");
		}
		if (valueTD.trim()) {
			setValueTD("");
		}

	}

	return (

		<div className="mainbox" >

			<div className="Group_of_list">
				<form id="form" onSubmit={submitHandler}>
					<input placeholder="create List"
						value={value}
						onChange={(event) => setValue(event.target.value)}></input>
					<ul className="noPad">
						<button type="submit" onClick={() => rootStore.groups.add(value)}>Add</button>
						{values(rootStore.groups.list).map((group) => {
							return (<ListOfGroup group={group} />)
						})}
					</ul >
				</form>
			</div>
			<div className="List_Of_Todo">
				<form id="form" onSubmit={submitHandler}>
					<input placeholder="wtire some task"
						value={valueTD}
						onChange={(event) => setValueTD(event.target.value)}></input>
					<button type="submit" onClick={() => rootStore.todos.add(valueTD)} >Add</button>
					<ul>
						{values(rootStore.groups.list[0].todos).map((todo) => (
							<TodoItem todo={todo} />
						))}

					</ul >
					{rootStore.todos.ifComplete} =  finished in todos
					<p>{rootStore.groups.list[0].todos.ifCompleted} =  finished in Group </p>

					<p>{rootStore.todos.list.length} = length</p>
				</form>
			</div>


		</div>
	)

}

export default observer(App);
