import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Upload, Edit, Trash2 } from 'react-feather';

const categories = ['Appetizers', 'Main Course', 'Desserts', 'Beverages'];

const MenuEditor = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: categories[0],
    available: true,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMenu = async () => {
      const items = await api.getMenuItems();
      setMenuItems(items);
    };
    fetchMenu();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageDrop = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    setFormData((prev) => ({ ...prev, imageFile: file }));
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      available: item.available,
      imageFile: null,
    });
    setPreview(item.imageUrl);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.price) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');

    const newItem = {
      id: selectedItem ? selectedItem.id : Date.now().toString(),
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      available: formData.available,
      imageUrl: preview || 'https://via.placeholder.com/150',
    };

    if (selectedItem) {
      setMenuItems((prev) =>
        prev.map((item) => (item.id === selectedItem.id ? newItem : item))
      );
    } else {
      setMenuItems((prev) => [...prev, newItem]);
    }

    // Reset form
    setSelectedItem(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: categories[0],
      available: true,
    });
    setPreview(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Menu Editor</h1>
        <p className="text-gray-600 mt-1">
          Add, edit, and manage your restaurant's menu items
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Menu Items List */}
        <div>
          <h2 className="text-xl font-bold mb-4">Current Menu Items</h2>
          {menuItems.length === 0 ? (
            <p className="text-gray-500">No menu items yet.</p>
          ) : (
            <ul className="space-y-4">
              {menuItems.map((item) => (
                <li
                  key={item.id}
                  className="bg-white rounded-lg shadow p-4 flex justify-between items-center"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.category}</p>
                      <p className="text-sm text-gray-700">${item.price}</p>
                      {!item.available && (
                        <span className="text-xs text-red-600">Unavailable</span>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Menu Item Form */}
        <div>
          <h2 className="text-xl font-bold mb-4">
            {selectedItem ? 'Edit Item' : 'Add New Item'}
          </h2>
          {error && <p className="text-red-600 mb-2">{error}</p>}
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                required
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="available"
                checked={formData.available}
                onChange={handleInputChange}
                className="h-4 w-4 text-gray-600 border-gray-300 rounded"
              />
              <label className="text-sm text-gray-700">Available</label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageDrop}
                className="mt-1 block w-full text-sm text-gray-600"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-2 w-32 h-32 object-cover rounded border"
                />
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
              >
                {selectedItem ? 'Update Item' : 'Add Item'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MenuEditor;
