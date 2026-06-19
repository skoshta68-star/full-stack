import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, UserRole } from '../../../types';
import { SortableHeader } from '../../../components/shared/SortableHeader';
import { AvatarInitials } from '../../../components/shared/AvatarInitials';
import { RoleBadge } from '../../../components/shared/RoleBadge';
import { RowActions } from '../../../components/shared/RowActions';
import { EmptyState } from '../../../components/shared/EmptyState';
import { Icons } from '../../../components/common/Icons';

interface Props {
  users: User[]; order: 'asc' | 'desc'; orderBy: string;
  onSort: (field: string) => void; onEdit: (user: User) => void; onDelete: (id: number) => void;
}

export const UserTable: React.FC<Props> = ({ users, order, orderBy, onSort, onEdit, onDelete }) => (
  <div className="card overflow-hidden">
    <div className="overflow-x-auto max-h-[420px] overflow-y-auto">
      <table className="w-full text-sm">
        <thead className="bg-surface-50">
          <tr>
            <th className="table-header w-10"><Icons.List className="w-3.5 h-3.5" /></th>
            <SortableHeader label="Name" field="name" currentField={orderBy} direction={order} onSort={onSort} />
            <SortableHeader label="Email" field="email" currentField={orderBy} direction={order} onSort={onSort} />
            <SortableHeader label="Address" field="address" currentField={orderBy} direction={order} onSort={onSort} />
            <th className="table-header">Rating</th>
            <SortableHeader label="Role" field="role" currentField={orderBy} direction={order} onSort={onSort} />
            <th className="table-header text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-100">
          <AnimatePresence>
            {users.map((u, i) => (
              <motion.tr key={u.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ delay: i * 0.03 }}
                className="hover:bg-primary-50/30 transition-colors group">
                <td className="table-cell"><AvatarInitials name={u.name} gradient={false} /></td>
                <td className="table-cell font-medium text-surface-800">{u.name}</td>
                <td className="table-cell text-surface-500">{u.email}</td>
                <td className="table-cell text-surface-500 max-w-xs truncate">{u.address}</td>
                <td className="table-cell">{u.role === UserRole.STORE_OWNER ? (
                  <span className="text-sm font-semibold" style={{ color: '#059669' }}>{(u.averageRating ?? 0).toFixed(1)}</span>
                ) : <span className="text-surface-300">&mdash;</span>}</td>
                <td className="table-cell"><RoleBadge role={u.role} /></td>
                <td className="table-cell text-right">
                  <RowActions onEdit={() => onEdit(u)} onDelete={() => onDelete(u.id)} />
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
      {users.length === 0 && <EmptyState icon={Icons.Users} title="No users found" />}
    </div>
  </div>
);
