// import { autorun } from 'mobx';
import React, { useState } from "react";
import './App.css';
import { values } from 'mobx'; // у МСТ - є ще свої пропси, але щоб ми користувались і бачили лише свої, треба юзати values з мобХ
import { observer } from 'mobx-react-lite'
import rootStore from './store/RootStore';
import rootStore2 from './store/RootStore2';
import { prettyPrint } from './store/utils';


// console.log(rootStore2.favorite[0].title + rootStore2.favorite[0].folder.title)


const ListOfGroup = observer((props) => {
	console.log("render List_Of_Group")

	return (
		<li key={props.group.id}
			onClick={() => props.setNewIndex(props.index)}
			className="oneItem">
			<b>	{props.group.title}</b>
			{props.group.ifComplete}
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
	const [ind, setInd] = useState(0);
	const [invisible, setVisible] = useState("switcherVisibleOff");

	let switcherClass = "modalBG " + invisible


	console.log('render app')
	// prettyPrint(rootStore)

	const setNewIndex = (props) => {
		setInd(props)
	}

	const onSubmitHandler = (event) => {
		event.preventDefault();
		if (value.trim()) {
			setValue("");
		}
		if (valueTD.trim()) {
			setValueTD("");
		}

	}





	return (
		<>
			<div className={switcherClass} >
				<div className="modalWindow">
					<h2 className="modalWindow__title">Favorite List</h2>
					<i className="fas fa-times modalWindow__ico-Close" onClick={() => {
						setVisible("switcherVisibleOff")
					}}></i>
					<ul className="modalWindow__todo">
						{
							rootStore.groups.list[0].favoriteList.map((todo) => (
								<TodoItem todo={todo} />
							))

							// values(rootStore.groups.list).forEach(thisArg => thisArg.favoriteList.map((todo) => (<TodoItem todo={todo} />)))



						}

					</ul >
				</div>
			</div>
			<div className="mainbox" >

				<div className="Group_of_list">
					<div className="divStar"><i onClick={() => {
						setVisible("")
					}} class="fas fa-star gold icoStar"></i></div>

					<form id="form" onSubmit={onSubmitHandler}>
						<input placeholder="create List" className="inputList"
							value={value}
							onChange={(event) => setValue(event.target.value)}></input>
						<button type="submit" onClick={() => value ? rootStore.groups.add(value) : undefined}>Add</button>
						<ul className="noPad">

							{values(rootStore.groups.list).map((group, index) => {
								return (<ListOfGroup group={group} index={index} setNewIndex={setNewIndex} />)
							})}

						</ul >
					</form>
				</div>
				<div className="List_Of_Todo">
					<h3>{rootStore.groups.list[ind].title}</h3>
					<form id="form" onSubmit={onSubmitHandler}>
						<input placeholder="wtire some task"
							value={valueTD}
							onChange={(event) => setValueTD(event.target.value)}></input>
						<button type="submit"
							onClick={() => valueTD ? rootStore.groups.list[ind].addTodo(valueTD) : undefined} >Add</button>
						<ul>
							{values(rootStore.groups.list[ind].todos).map((todo) => (
								<TodoItem todo={todo} />
							))}
						</ul >


					</form>
				</div>


			</div>
		</>
	)

}

export default observer(App);
