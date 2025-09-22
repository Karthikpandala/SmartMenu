import React, { useState } from 'react';

const MenuItemForm = ({ item, onSave }) => {
  const [name, setName] = useState(item?.name || '');
  const [description, setDescription] = useState(item?.description || '');
  const [price, setPrice] = useState(item?.price || '');
  const [category, setCategory] = useState(item?.category || '');
  const [available, setAvailable] = useState(item?.available ?? true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !price || !category) {
      alert('Please fill all required fields');
      return;
    }
    onSave({ name, description, price: parseFloat(price), category, available });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 border rounded-lg bg-white shadow-sm">
      <input
        type="text"
        placeholder="Item Name"
        className="w-full px-3 py-2 border rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        className="w-full px-3 py-2 border rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        className="w-full px-3 py-2 border rounded"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <select
        className="w-full px-3 py-2 border rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Select Category</option>
        <option value="Appetizers">Appetizers</option>
        <option value="Main Course">Main Course</option>
        <option value="Desserts">Desserts</option>
        <option value="Beverages">Beverages</option>
        <option value="Salads">Salads</option>
      </select>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={available}
          onChange={(e) => setAvailable(e.target.checked)}
        />
        <span>Available</span>
      </label>
      <button
        type="submit"
        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
      >
        Save Item
      </button>
    </form>
  );
};

export default MenuItemForm;
