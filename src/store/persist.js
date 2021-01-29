import { applySnapshot, onSnapshot } from 'mobx-state-tree'
const PERSIST_KEY = 'PERSIST';

function createPersist(store, storage) { // перший параметр store - на якого треба підписатись і дані якого треба persist - зберігати. Другий параметр (storage), це куди будемо записувати дані

	async function rehydrate() { // витягуватиме наші дані з storage і записувати в store
		const snapshot = await storage.getItem(PERSIST_KEY); // витягуємо якісб дані

		if (snapshot) {
			applySnapshot(store, JSON.parse(snapshot)); // applySnapshot - всунути в мій store -  \\\\\ JSON.parse() - перетворить у об"єкт
		}
	}

	function purge() { // очищеня локал стора
		storage.removeItem(PERSIST_KEY);
	}

	onSnapshot(store, (snapshot) => { // при кожній зміні в сторі, записуємо їх у локалСтор
		storage.setItem(PERSIST_KEY, JSON.stringify(snapshot));
	})

	return {
		rehydrate,
		purge,
	};


}

export default createPersist;
