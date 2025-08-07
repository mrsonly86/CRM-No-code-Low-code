import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  MoreVertical,
  Edit,
  Trash2,
  Mail,
  Phone,
  CheckSquare
} from 'lucide-react';
import { useLeadsStore } from '../../store/leadsStore';
import { LEAD_STATUSES } from '../../data/mockData';

export default function LeadsTable() {
  const { 
    getPaginatedLeads,
    selectedLeads,
    toggleLeadSelection,
    selectAllLeads,
    clearSelection,
    filters,
    setFilters,
    pagination,
    setPagination,
    sorting,
    setSorting,
    updateLead,
    deleteLead
  } = useLeadsStore();

  const [showFilters, setShowFilters] = useState(false);
  const [actionMenuOpen, setActionMenuOpen] = useState(null);

  const { leads, total, pages } = getPaginatedLeads();
  const allSelected = leads.length > 0 && selectedLeads.length === leads.length;
  const someSelected = selectedLeads.length > 0 && selectedLeads.length < leads.length;

  const handleSelectAll = () => {
    if (allSelected) {
      clearSelection();
    } else {
      selectAllLeads(leads.map(lead => lead.id));
    }
  };

  const handleSort = (field) => {
    const direction = sorting.field === field && sorting.direction === 'asc' ? 'desc' : 'asc';
    setSorting(field, direction);
  };

  const handleStatusChange = (leadId, newStatus) => {
    updateLead(leadId, { status: newStatus });
    setActionMenuOpen(null);
  };

  const getStatusBadge = (status) => {
    const statusConfig = LEAD_STATUSES[status];
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}>
        {statusConfig.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Quản lý Leads</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Tổng cộng {total} leads
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="btn btn-outline btn-sm"
          >
            <Filter className="w-4 h-4 mr-2" />
            Lọc
          </button>
          <button className="btn btn-outline btn-sm">
            <Download className="w-4 h-4 mr-2" />
            Xuất
          </button>
          <button className="btn btn-primary btn-sm">
            <Plus className="w-4 h-4 mr-2" />
            Thêm Lead
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, email, công ty..."
                value={filters.search}
                onChange={(e) => setFilters({ search: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          
          {showFilters && (
            <div className="flex flex-wrap gap-3">
              <select
                value={filters.status}
                onChange={(e) => setFilters({ status: e.target.value })}
                className="select select-bordered select-sm"
              >
                <option value="">Tất cả trạng thái</option>
                {Object.entries(LEAD_STATUSES).map(([key, status]) => (
                  <option key={key} value={key}>{status.label}</option>
                ))}
              </select>
              
              <select
                value={filters.region}
                onChange={(e) => setFilters({ region: e.target.value })}
                className="select select-bordered select-sm"
              >
                <option value="">Tất cả khu vực</option>
                <option value="TP.HCM">TP.HCM</option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
                <option value="Cần Thơ">Cần Thơ</option>
                <option value="Hải Phòng">Hải Phòng</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedLeads.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-800 dark:text-blue-200">
              Đã chọn {selectedLeads.length} leads
            </span>
            <div className="flex items-center space-x-2">
              <button className="btn btn-sm btn-outline">
                <Mail className="w-4 h-4 mr-1" />
                Gửi Email
              </button>
              <button className="btn btn-sm btn-outline">
                <Edit className="w-4 h-4 mr-1" />
                Cập nhật
              </button>
              <button className="btn btn-sm btn-error btn-outline">
                <Trash2 className="w-4 h-4 mr-1" />
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="table-container">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>
                  <label>
                    <input 
                      type="checkbox" 
                      className="checkbox checkbox-sm"
                      checked={allSelected}
                      ref={input => {
                        if (input) input.indeterminate = someSelected;
                      }}
                      onChange={handleSelectAll}
                    />
                  </label>
                </th>
                <th 
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={() => handleSort('fullName')}
                >
                  Tên khách hàng
                </th>
                <th 
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={() => handleSort('status')}
                >
                  Trạng thái
                </th>
                <th>Domain</th>
                <th>Validation</th>
                <th>Chức vụ</th>
                <th>Khu vực</th>
                <th 
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={() => handleSort('value')}
                >
                  Giá trị
                </th>
                <th 
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={() => handleSort('createdAt')}
                >
                  Ngày tạo
                </th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="hover">
                  <td>
                    <label>
                      <input 
                        type="checkbox" 
                        className="checkbox checkbox-sm"
                        checked={selectedLeads.includes(lead.id)}
                        onChange={() => toggleLeadSelection(lead.id)}
                      />
                    </label>
                  </td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-10 h-10 bg-primary text-white flex items-center justify-center text-sm font-medium">
                          {lead.firstName.charAt(0)}{lead.lastName.split(' ')[1]?.charAt(0) || ''}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-sm">{lead.fullName}</div>
                        <div className="text-sm text-gray-500">{lead.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{getStatusBadge(lead.status)}</td>
                  <td>
                    <span className="text-sm">{lead.domain}</span>
                  </td>
                  <td>
                    <span className={`badge ${lead.isValidated ? 'badge-success' : 'badge-warning'} badge-sm`}>
                      {lead.isValidated ? 'Đã xác thực' : 'Chưa xác thực'}
                    </span>
                  </td>
                  <td>
                    <span className="text-sm">{lead.jobTitle}</span>
                  </td>
                  <td>
                    <span className="text-sm">{lead.region}</span>
                  </td>
                  <td>
                    <span className="font-medium">
                      {(lead.value / 1000000).toFixed(0)}M VND
                    </span>
                  </td>
                  <td>
                    <span className="text-sm">{lead.createdAt}</span>
                  </td>
                  <td>
                    <div className="dropdown dropdown-end">
                      <button 
                        tabIndex={0} 
                        className="btn btn-ghost btn-sm"
                        onClick={() => setActionMenuOpen(actionMenuOpen === lead.id ? null : lead.id)}
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {actionMenuOpen === lead.id && (
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                          <li>
                            <a onClick={() => console.log('Edit', lead.id)}>
                              <Edit className="w-4 h-4" />
                              Chỉnh sửa
                            </a>
                          </li>
                          <li>
                            <a onClick={() => console.log('Call', lead.phone)}>
                              <Phone className="w-4 h-4" />
                              Gọi điện
                            </a>
                          </li>
                          <li>
                            <a onClick={() => console.log('Email', lead.email)}>
                              <Mail className="w-4 h-4" />
                              Gửi email
                            </a>
                          </li>
                          <li className="menu-title">
                            <span>Thay đổi trạng thái</span>
                          </li>
                          {Object.entries(LEAD_STATUSES).map(([key, status]) => (
                            <li key={key}>
                              <a onClick={() => handleStatusChange(lead.id, key)}>
                                {status.label}
                              </a>
                            </li>
                          ))}
                          <li>
                            <a onClick={() => deleteLead(lead.id)} className="text-red-600">
                              <Trash2 className="w-4 h-4" />
                              Xóa
                            </a>
                          </li>
                        </ul>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Hiển thị {((pagination.page - 1) * pagination.limit) + 1} đến {Math.min(pagination.page * pagination.limit, total)} của {total} kết quả
          </div>
          <div className="join">
            <button 
              className="join-item btn btn-sm"
              disabled={pagination.page === 1}
              onClick={() => setPagination({ page: pagination.page - 1 })}
            >
              «
            </button>
            {Array.from({ length: Math.min(pages, 5) }, (_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  className={`join-item btn btn-sm ${pagination.page === page ? 'btn-active' : ''}`}
                  onClick={() => setPagination({ page })}
                >
                  {page}
                </button>
              );
            })}
            <button 
              className="join-item btn btn-sm"
              disabled={pagination.page === pages}
              onClick={() => setPagination({ page: pagination.page + 1 })}
            >
              »
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}