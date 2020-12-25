import { types as t } from 'mobx-state-tree';
import { v4 as uID } from 'uuid';
import rootStore from './RootStore';
import { TodoModel } from './TodoStore';


export const TestStore = t
	.model('TestStore', {
		id: t.identifier,
		title: t.string
	})



