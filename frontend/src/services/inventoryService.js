import api from './api';

const getItems = () => {
  return api.get('/inventory');
};

const addItem = (itemData) => {
  return api.post('/inventory', itemData);
};

const inventoryService = {
  getItems,
  addItem,
  // ... other inventory functions
};

export default inventoryService;