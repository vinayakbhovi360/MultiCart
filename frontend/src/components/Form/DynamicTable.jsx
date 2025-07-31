import React from 'react';
import { Eye, Trash2 } from 'lucide-react';

const DynamicTable = ({ data, onDelete, onView }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  // Get the keys from the first object in the array for headers
  const dataKeys = Object.keys(data[0]);

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-200">
          <tr>
            {dataKeys.map((key) => (
              <th
                key={key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {key === 'id' ? 'ID' : key.charAt(0).toUpperCase() + key.slice(1)}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id}>
              {dataKeys.map((key) => (
                <td key={key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {typeof item[key] === 'number' ? `US$ ${item[key].toFixed(2)}` : item[key]}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  className="text-indigo-600 hover:text-indigo-900 mr-4"
                  onClick={() => onView && onView(item.id)}
                >
                  <Eye size={20} />
                </button>
                {/* <button
                  className="text-red-600 hover:text-red-900"
                  onClick={() => onDelete && onDelete(item.id)}
                >
                  <Trash2 size={20} />
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
