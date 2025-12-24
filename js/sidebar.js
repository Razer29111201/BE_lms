// Sidebar Builder - builds navigation based on user role
function buildSidebar(containerId, activePage = '') {
  const nav = document.getElementById(containerId);
  if (!nav) return;

  const role = auth.user?.role_name;
  const currentPath = window.location.pathname;
  const branches = auth.user?.branches || [];

  const isActive = (page) => currentPath.includes(page) ? 'active' : '';
  const prefix = currentPath.includes('/pages/') ? '' : 'pages/';

  let html = `
    <div class="sidebar-logo">
      <i class="fas fa-graduation-cap"></i>
      <span>LMS System</span>
    </div>
  `;

  // Branch selector (if user has multiple branches or is admin)
  if (branches.length > 1 || auth.user?.is_system_wide) {
    html += `<div id="branchSelector" class="sidebar-branch"></div>`;
  } else if (branches.length === 1) {
    html += `
      <div class="sidebar-branch">
        <div class="branch-badge">
          <i class="fas fa-building"></i>
          <span>${branches[0].name}</span>
        </div>
      </div>
    `;
  }

  html += `<div class="sidebar-nav">`;
  html += `<a href="${currentPath.includes('/pages/') ? '../index.html' : 'index.html'}" class="nav-item ${currentPath.endsWith('index.html') || currentPath.endsWith('/') ? 'active' : ''}"><i class="fas fa-home"></i><span>Dashboard</span></a>`;

  if (role === 'ADMIN') {
    html += `
      <div class="nav-section-title">Tuyển sinh</div>
      <a href="${prefix}experience.html" class="nav-item ${isActive('experience')}"><i class="fas fa-calendar-alt"></i><span>Trải nghiệm</span></a>
      <a href="${prefix}trial.html" class="nav-item ${isActive('trial')}"><i class="fas fa-user-clock"></i><span>Học thử</span></a>
      <a href="${prefix}students.html" class="nav-item ${isActive('students')}"><i class="fas fa-user-graduate"></i><span>Học sinh</span></a>
      <div class="nav-section-title">Quản lý lớp</div>
      <a href="${prefix}classes.html" class="nav-item ${isActive('classes')}"><i class="fas fa-chalkboard"></i><span>Lớp học</span></a>
      <a href="${prefix}sessions.html" class="nav-item ${isActive('sessions')}"><i class="fas fa-calendar-check"></i><span>Buổi học</span></a>
      <div class="nav-section-title">Giảng dạy</div>
      <a href="${prefix}attendance.html" class="nav-item ${isActive('attendance')}"><i class="fas fa-clipboard-check"></i><span>Điểm danh</span></a>
      <a href="${prefix}files.html" class="nav-item ${isActive('files')}"><i class="fas fa-folder"></i><span>Thư viện File</span></a>
      <a href="${prefix}assignments.html" class="nav-item ${isActive('assignments')}"><i class="fas fa-tasks"></i><span>Bài tập</span></a>
      <div class="nav-section-title">Hệ thống</div>
      <a href="${prefix}branches.html" class="nav-item ${isActive('branches')}"><i class="fas fa-building"></i><span>Cơ sở</span></a>
      <a href="${prefix}users.html" class="nav-item ${isActive('users')}"><i class="fas fa-users-cog"></i><span>Người dùng</span></a>
    `;
  } else if (role === 'SALE') {
    html += `
      <div class="nav-section-title">Tuyển sinh</div>
      <a href="${prefix}experience.html" class="nav-item ${isActive('experience')}"><i class="fas fa-calendar-alt"></i><span>Trải nghiệm</span></a>
      <a href="${prefix}trial.html" class="nav-item ${isActive('trial')}"><i class="fas fa-user-clock"></i><span>Học thử</span></a>
      <a href="${prefix}students.html" class="nav-item ${isActive('students')}"><i class="fas fa-user-graduate"></i><span>Học sinh</span></a>
    `;
  } else if (role === 'TEACHER') {
    html += `
      <div class="nav-section-title">Giảng dạy</div>
      <a href="${prefix}classes.html" class="nav-item ${isActive('classes')}"><i class="fas fa-chalkboard"></i><span>Lớp của tôi</span></a>
      <a href="${prefix}sessions.html" class="nav-item ${isActive('sessions')}"><i class="fas fa-calendar-check"></i><span>Buổi học</span></a>
      <a href="${prefix}attendance.html" class="nav-item ${isActive('attendance')}"><i class="fas fa-clipboard-check"></i><span>Điểm danh</span></a>
      <a href="${prefix}assignments.html" class="nav-item ${isActive('assignments')}"><i class="fas fa-tasks"></i><span>Bài tập</span></a>
    `;
  } else if (role === 'CM') {
    html += `
      <div class="nav-section-title">Quản lý lớp</div>
      <a href="${prefix}classes.html" class="nav-item ${isActive('classes')}"><i class="fas fa-chalkboard"></i><span>Lớp học</span></a>
      <a href="${prefix}students.html" class="nav-item ${isActive('students')}"><i class="fas fa-user-graduate"></i><span>Học sinh</span></a>
      <a href="${prefix}sessions.html" class="nav-item ${isActive('sessions')}"><i class="fas fa-calendar-check"></i><span>Buổi học</span></a>
      <a href="${prefix}files.html" class="nav-item ${isActive('files')}"><i class="fas fa-folder"></i><span>Thư viện File</span></a>
      <a href="${prefix}assignments.html" class="nav-item ${isActive('assignments')}"><i class="fas fa-tasks"></i><span>Bài tập</span></a>
    `;
  }

  html += `</div>`;

  // Logout button
  html += `
    <div class="sidebar-footer">
      <a href="#" class="nav-item logout" onclick="auth.logout(); return false;">
        <i class="fas fa-sign-out-alt"></i>
        <span>Đăng xuất</span>
      </a>
    </div>
  `;

  nav.innerHTML = html;

  // Initialize branch selector after sidebar is rendered
  setTimeout(() => {
    if (typeof branch !== 'undefined') {
      branch.renderSelector();
    }
  }, 100);
}

window.buildSidebar = buildSidebar;