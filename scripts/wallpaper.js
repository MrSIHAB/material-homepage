const idbName = "image";
const storeName = "wallpaper";
const key = "index";

/*** Get database @returns {Promise<IDBDatabase>}*/
async function getDB() {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(idbName, 1);
    // define error and success listeners
    request.onerror = (event) => reject("An error occurred while opening IndexedDB", event);
    request.onsuccess = () => resolve(request.result);
    // for version update and initial setups
    request.onupgradeneeded = function () {
      const db = request.result;
      db.createObjectStore(storeName);
    };
  });
}

/*** Get saved wallpaper's arrayBuffer
 * @returns {Promise<File>} */
export async function getWallPaper() {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");

    const store = transaction.objectStore(storeName);
    const req = store.get(key);
    req.onsuccess = () => resolve(req.result);
    req.onerror = (e) => reject("Error getting wallpaper", e);
  });
}

// Set wallpaper
export async function setWallPaper(buffer) {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");

    const store = transaction.objectStore(storeName);
    const req = store.put(buffer, key);
    req.onsuccess = () => resolve(req.result);
    req.onerror = (e) => reject("Error saving wallpaper", e);
  });
}

// Delete wallpaper
export async function deleteWallPaper() {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");

    const store = transaction.objectStore(storeName);
    const req = store.delete(key);
    req.onsuccess = () => resolve(req.result);
    req.onerror = (e) => reject("Error saving wallpaper", e);
  });
}
