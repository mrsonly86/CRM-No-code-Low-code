import { format, subDays, subWeeks, subMonths } from 'date-fns';

// Lead statuses with Vietnamese labels
export const LEAD_STATUSES = {
  NEW: { label: 'Mới', color: 'badge-info', bgColor: 'bg-blue-100', textColor: 'text-blue-800' },
  WORKING: { label: 'Đang xử lý', color: 'badge-warning', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' },
  QUALIFIED: { label: 'Đủ điều kiện', color: 'badge-success', bgColor: 'bg-green-100', textColor: 'text-green-800' },
  CONVERTED: { label: 'Đã chuyển đổi', color: 'badge-primary', bgColor: 'bg-purple-100', textColor: 'text-purple-800' },
  LOST: { label: 'Mất khách', color: 'badge-error', bgColor: 'bg-red-100', textColor: 'text-red-800' }
};

// Vietnamese first names
const firstNames = [
  'Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Phan', 'Vũ', 'Võ', 'Đặng',
  'Bùi', 'Đỗ', 'Hồ', 'Ngô', 'Dương', 'Lý', 'Mai', 'Đinh', 'Tô', 'Lâm'
];

// Vietnamese last names
const lastNames = [
  'Văn An', 'Thị Bình', 'Văn Cường', 'Thị Dung', 'Văn Đức', 'Thị Hoa', 'Văn Khải', 'Thị Lan',
  'Văn Minh', 'Thị Nam', 'Văn Phúc', 'Thị Quỳnh', 'Văn Sơn', 'Thị Thảo', 'Văn Tuấn', 'Thị Uyên',
  'Văn Việt', 'Thị Xuân', 'Văn Yên', 'Thị Loan', 'Văn Hải', 'Thị Mai', 'Văn Tâm', 'Thị Nga'
];

// Job titles in Vietnamese
const jobTitles = [
  'Giám đốc', 'Phó giám đốc', 'Trưởng phòng', 'Phó phòng', 'Nhân viên kinh doanh',
  'Kế toán trưởng', 'Nhân viên marketing', 'Chuyên viên IT', 'Quản lý dự án', 'Tư vấn viên',
  'Nhân viên hành chính', 'Thư ký', 'Chuyên viên nhân sự', 'Kỹ sư', 'Thiết kế đồ họa',
  'Nhân viên bán hàng', 'Quản lý cửa hàng', 'Chuyên viên tài chính', 'Báo cáo viên', 'Phiên dịch viên'
];

// Company domains
const domains = [
  'techviet.com', 'saigontech.vn', 'hanoiit.com', 'vietbusiness.net', 'innovate.vn',
  'digitalviet.com', 'smartsolution.vn', 'techno.com.vn', 'vietcorp.com', 'nextviet.vn',
  'cloudviet.com', 'dataviet.vn', 'aitech.com.vn', 'mobileviet.com', 'webviet.vn',
  'softwareviet.com', 'bizviet.net', 'enterprisevn.com', 'startuphcm.vn', 'fintech.vn'
];

// Generate random lead data
function generateLead(index) {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const jobTitle = jobTitles[Math.floor(Math.random() * jobTitles.length)];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const statuses = Object.keys(LEAD_STATUSES);
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  
  const createdAt = subDays(new Date(), Math.floor(Math.random() * 90));
  const lastContact = subDays(new Date(), Math.floor(Math.random() * 30));
  
  return {
    id: `lead-${index + 1}`,
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    email: `${lastName.toLowerCase().replace(/\s+/g, '.')}.${firstName.toLowerCase()}@${domain}`,
    phone: `0${Math.floor(Math.random() * 900000000 + 100000000)}`,
    company: `Công ty ${firstName} ${lastName.split(' ')[0]}`,
    jobTitle,
    domain,
    status,
    source: ['Website', 'Social Media', 'Email Campaign', 'Referral', 'Cold Call'][Math.floor(Math.random() * 5)],
    value: Math.floor(Math.random() * 1000000000) + 50000000, // 50M - 1B VND
    probability: Math.floor(Math.random() * 100),
    createdAt: format(createdAt, 'yyyy-MM-dd'),
    lastContact: format(lastContact, 'yyyy-MM-dd'),
    nextFollowUp: format(subDays(new Date(), -Math.floor(Math.random() * 14)), 'yyyy-MM-dd'),
    notes: `Ghi chú về khách hàng ${firstName} ${lastName}`,
    isValidated: Math.random() > 0.3,
    tags: ['VIP', 'Potential', 'Hot Lead', 'Follow-up', 'Qualified'].filter(() => Math.random() > 0.7),
    assignedTo: ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D'][Math.floor(Math.random() * 4)],
    region: ['Hà Nội', 'TP.HCM', 'Đà Nẵng', 'Cần Thơ', 'Hải Phòng'][Math.floor(Math.random() * 5)]
  };
}

// Generate 150 sample leads
export const mockLeads = Array.from({ length: 150 }, (_, index) => generateLead(index));

// Dashboard metrics
export const dashboardMetrics = {
  totalValue: 5494433865, // 54,944,338,65 VND
  totalLeads: 1809778012, // 18,097,780,12 VND (this seems to be another value metric)
  totalContacts: mockLeads.length,
  conversionRate: 23.5,
  avgDealSize: 125000000, // 125M VND average
  monthlyGrowth: 12.8,
  activeDeals: mockLeads.filter(lead => ['WORKING', 'QUALIFIED'].includes(lead.status)).length,
  convertedDeals: mockLeads.filter(lead => lead.status === 'CONVERTED').length
};

// Chart data for dashboard
export const chartData = {
  // Pie chart - Lead distribution by status
  leadsByStatus: {
    labels: Object.values(LEAD_STATUSES).map(status => status.label),
    datasets: [{
      data: Object.keys(LEAD_STATUSES).map(status => 
        mockLeads.filter(lead => lead.status === status).length
      ),
      backgroundColor: [
        '#3B82F6', // Blue for NEW
        '#F59E0B', // Yellow for WORKING  
        '#10B981', // Green for QUALIFIED
        '#6366F1', // Purple for CONVERTED
        '#EF4444'  // Red for LOST
      ],
      borderWidth: 2,
      borderColor: '#ffffff'
    }]
  },

  // Bar chart - Leads by month
  leadsByMonth: {
    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
    datasets: [{
      label: 'Leads mới',
      data: [45, 52, 38, 67, 49, 71, 58, 63, 55, 61, 48, 69],
      backgroundColor: '#6366F1',
      borderRadius: 4
    }, {
      label: 'Chuyển đổi',
      data: [12, 19, 15, 21, 18, 25, 22, 24, 20, 23, 17, 26],
      backgroundColor: '#10B981',
      borderRadius: 4
    }]
  },

  // Line chart - Revenue trend
  revenueByMonth: {
    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
    datasets: [{
      label: 'Doanh thu (tỷ VND)',
      data: [2.1, 2.8, 2.3, 3.2, 2.9, 3.6, 3.1, 3.8, 3.4, 3.9, 3.2, 4.1],
      borderColor: '#6366F1',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      tension: 0.4,
      fill: true
    }]
  },

  // Region distribution
  leadsByRegion: {
    labels: ['TP.HCM', 'Hà Nội', 'Đà Nẵng', 'Cần Thơ', 'Hải Phòng'],
    datasets: [{
      data: [45, 35, 12, 5, 3],
      backgroundColor: [
        '#6366F1',
        '#8B5CF6', 
        '#06B6D4',
        '#10B981',
        '#F59E0B'
      ]
    }]
  }
};

// Recent activities for dashboard
export const recentActivities = [
  {
    id: 1,
    type: 'new_lead',
    title: 'Lead mới được tạo',
    description: 'Nguyễn Văn Minh từ techviet.com',
    time: '5 phút trước',
    icon: 'user-plus',
    color: 'text-blue-600'
  },
  {
    id: 2,
    type: 'status_change',
    title: 'Thay đổi trạng thái',
    description: 'Trần Thị Lan chuyển sang Qualified',
    time: '15 phút trước',
    icon: 'check-circle',
    color: 'text-green-600'
  },
  {
    id: 3,
    type: 'meeting_scheduled',
    title: 'Lịch hẹn được tạo',
    description: 'Cuộc họp với Lê Văn Cường vào 14:00',
    time: '30 phút trước',
    icon: 'calendar',
    color: 'text-purple-600'
  },
  {
    id: 4,
    type: 'deal_won',
    title: 'Thành công deal',
    description: 'Deal 150M với Phạm Thị Dung',
    time: '1 giờ trước',
    icon: 'trophy',
    color: 'text-yellow-600'
  },
  {
    id: 5,
    type: 'email_sent',
    title: 'Email được gửi',
    description: 'Follow-up email tới 15 leads',
    time: '2 giờ trước',
    icon: 'mail',
    color: 'text-indigo-600'
  }
];

// AI insights and suggestions
export const aiInsights = [
  {
    id: 1,
    type: 'prediction',
    title: 'Dự đoán chuyển đổi',
    message: 'Lead Nguyễn Văn Minh có 85% khả năng chuyển đổi trong tuần tới',
    action: 'Gọi điện ngay',
    priority: 'high',
    confidence: 85
  },
  {
    id: 2,
    type: 'opportunity',
    title: 'Cơ hội bán chéo',
    message: '5 khách hàng hiện tại có thể quan tâm đến sản phẩm mới',
    action: 'Xem danh sách',
    priority: 'medium',
    confidence: 72
  },
  {
    id: 3,
    type: 'risk',
    title: 'Cảnh báo rủi ro',
    message: '3 deals lớn có nguy cơ mất do không follow-up',
    action: 'Tạo reminder',
    priority: 'high',
    confidence: 91
  },
  {
    id: 4,
    type: 'optimization',
    title: 'Tối ưu quy trình',
    message: 'Thời gian phản hồi email có thể cải thiện 40%',
    action: 'Xem chi tiết',
    priority: 'low',
    confidence: 68
  }
];

// Export functions for data manipulation
export const getLeadsByStatus = (status) => mockLeads.filter(lead => lead.status === status);
export const getLeadsByRegion = (region) => mockLeads.filter(lead => lead.region === region);
export const getRecentLeads = (days = 7) => mockLeads.filter(lead => 
  new Date(lead.createdAt) >= subDays(new Date(), days)
);

export const calculateMetrics = () => {
  const total = mockLeads.length;
  const converted = mockLeads.filter(lead => lead.status === 'CONVERTED').length;
  const working = mockLeads.filter(lead => ['WORKING', 'QUALIFIED'].includes(lead.status)).length;
  
  return {
    total,
    converted,
    working,
    conversionRate: ((converted / total) * 100).toFixed(1),
    pipelineValue: mockLeads
      .filter(lead => ['WORKING', 'QUALIFIED'].includes(lead.status))
      .reduce((sum, lead) => sum + (lead.value * lead.probability / 100), 0)
  };
};