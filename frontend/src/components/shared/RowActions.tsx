import React from 'react';
import { motion } from 'framer-motion';
import { Icons } from '../common/Icons';

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

export const RowActions: React.FC<Props> = ({ onEdit, onDelete }) => (
  <div className="flex items-center justify-end space-x-1">
    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onEdit}
      className="p-2 rounded-lg text-primary-600 hover:bg-primary-50 transition-all">
      <Icons.Pencil className="w-4 h-4" />
    </motion.button>
    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onDelete}
      className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-all">
      <Icons.Trash2 className="w-4 h-4" />
    </motion.button>
  </div>
);
