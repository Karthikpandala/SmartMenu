import React, { useState, useEffect } from 'react';
import MenuItemForm from '../components/MenuManagement/MenuItemForm';
import ImageUpload from '../components/MenuManagement/ImageUpload';
import api from '../services/api';

const MenuEditor = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    api.getMenuItems().then(setMenuItems);
  }, []);

  const handleSaveItem = async (itemData) => {
    if (selectedFile) {
      const uploadedUrl = await api.uploadImage(selectedFile);
      itemData.imageUrl = uploadedUrl;
    }

    if (editingItem) {
      const updated = await api.updateMenuItem(editingItem.id, itemData);
      setMenuItems((prev) =>
        prev.map((itm) => (itm.id === updated.id ? updated : itm))
      );
    } else {
      const added = await api.addMenuItem(itemData);
      setMenuItems((prev) => [...prev, added]);
    }

    setEditingItem(null);
    setSelectedFile(null);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Menu Editor</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div key={item.id} className="bg-white shadow rounded-lg p-4">
            <img src={item.imageUrl} alt={item.name} className="h-32 object-cover w-full rounded" />
            <h3 className="font-bold text-lg mt-2">{item.name}</h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
            <p className="font-medium mt-1">${item.price.toFixed(2)}</p>
            <button
              onClick={() => setEditingItem(item)}
              className="mt-2 px-3 py-1 text-sm bg-gray-800 text-white rounded hover:bg-gray-700"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-3">
          {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
        </h3>
        <ImageUpload onFileSelect={setSelectedFile} />
        <MenuItemForm item={editingItem} onSave={handleSaveItem} />
      </div>
    </div>
  );
};

export default MenuEditor;
