import { types as t } from 'mobx-state-tree';
import { GroupListModel } from './GroupStore';
import { TodoListModel } from './TodoStore';
import { values } from 'mobx';
import { FolderFavoriteModel } from './FolderFavoriteStore';
import { observer } from 'mobx-react-lite';
import { TestStore } from './TestStore';

const RootStore2 = t
	.model('RootStore', {					// MST - має мати один корневий стор - із якою всі решта		

		favorite: t.array(FolderFavoriteModel),
		TestStore: t.array(TestStore)
	})




const data = {
	favorite: [{ title: "Мушу розібратись з ", folder: "1" }],
	TestStore: [{ id: "1", title: "посиланнями" }]
}

const rootStore2 = RootStore2.create(data)
export default rootStore2;
