// Identio Portfolio Application Logic
window.addEventListener('error', function(e) {
  const errorDiv = document.createElement('div');
  errorDiv.style.position = 'fixed';
  errorDiv.style.top = '10px';
  errorDiv.style.left = '10px';
  errorDiv.style.background = 'rgba(220, 50, 50, 0.95)';
  errorDiv.style.color = 'white';
  errorDiv.style.padding = '24px';
  errorDiv.style.zIndex = '9999999';
  errorDiv.style.borderRadius = '8px';
  errorDiv.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
  errorDiv.style.fontFamily = 'monospace';
  errorDiv.style.fontSize = '12px';
  errorDiv.style.lineHeight = '1.6';
  errorDiv.style.maxWidth = '90%';
  
  let errMsg = '<h3 style="margin-top:0;color:#ffdddd;">⚠️ Runtime Error Detected</h3>';
  errMsg += '<b>Message:</b> ' + e.message + '<br>';
  errMsg += '<b>File:</b> ' + e.filename + '<br>';
  errMsg += '<b>Line:</b> ' + e.lineno + '<br>';
  if (e.error && e.error.stack) {
    errMsg += '<br><b>Stack Trace:</b><br><pre style="white-space:pre-wrap;margin:5px 0 0 0;background:rgba(0,0,0,0.3);padding:10px;border-radius:4px;">' + e.error.stack + '</pre>';
  }
  errorDiv.innerHTML = errMsg;
  document.body.appendChild(errorDiv);
});

document.addEventListener("DOMContentLoaded", () => {
  // State
  let map;
  let activeYear = "all";
  let activeProject = null;
  let sidebarVisible = false;
  let markersGroup = L.layerGroup();
  const activeMarkerClass = "active-marker";
  const activeItemClass = "active-item";
  let isSelectingProject = false;

  const worldCenter = [25.0, 10.0];
  const worldZoom = 2.2;
  const koreaCenter = [36.2, 127.8];
  const koreaZoom = 7.8;

  let currentTileLayer = null;
  const darkTileUrl = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
  const lightTileUrl = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

  function initMap() {
    try {
      if (typeof L === "undefined") throw new Error("Leaflet Library (L) is not loaded!");
      map = L.map("map", { zoomControl: false, minZoom: 2, maxZoom: 18, attributionControl: true });
      map.setView(worldCenter, worldZoom);
      currentTileLayer = L.tileLayer(darkTileUrl, {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd", maxZoom: 20
      }).addTo(map);
      L.control.zoom({ position: "topright" }).addTo(map);
      markersGroup.addTo(map);
    } catch (err) {
      console.error("Error inside initMap:", err);
      throw new Error("Failed to initialize Map: " + err.message);
    }
  }

  function startIntroAnimation() {
    const overlay = document.getElementById("intro-overlay");
    setTimeout(() => {
      overlay.classList.add("overlay-hidden");
      setTimeout(() => {
        map.flyTo(koreaCenter, koreaZoom, { duration: 3.2, easeLinearity: 0.15 });
        // 지도가 날아가기 시작하는 동시에 카운팅 애니메이션 실행
        animateStats();
        map.once("moveend", () => { renderPortfolio(); });
      }, 400);
    }, 3000); // 부드러운 애니메이션과 로딩 감상을 위해 대기 시간을 3.0초로 연장
  }

  function renderPortfolio() {
    markersGroup.clearLayers();
    const filteredProjects = activeYear === "all" ? projectsData : projectsData.filter(p => p.year === parseInt(activeYear));
    const sortedProjects = [...filteredProjects].sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return a.id.localeCompare(b.id);
    });
    sortedProjects.forEach((project) => {
      if (!project.coordinates) return;
      const customIcon = L.divIcon({ className: "custom-map-marker", html: `<div class="marker-pulse" id="marker-${project.id}"></div>`, iconSize: [20, 20], iconAnchor: [10, 10] });
      const marker = L.marker(project.coordinates, { icon: customIcon });
      marker.on("click", (e) => { L.DomEvent.stopPropagation(e); selectProject(project); });
      markersGroup.addLayer(marker);
    });
    renderSidebarList(sortedProjects);
  }

  function renderSidebarList(projects) {
    const listWrapper = document.getElementById("project-list");
    listWrapper.innerHTML = "";
    if (projects.length === 0) { listWrapper.innerHTML = '<div class="no-projects">해당 연도의 프로젝트가 없습니다.</div>'; return; }
    projects.forEach((project) => {
      const item = document.createElement("div");
      item.className = "sidebar-project-item";
      if (activeProject && activeProject.id === project.id) item.classList.add(activeItemClass);
      const tagText = project.coordinates ? "SIBX" : "BIBX";
      const locationText = project.location ? `${project.year} • ${project.location}` : `${project.year}`;
      item.innerHTML = `<div class="sb-proj-info"><span class="sb-proj-name">${project.name}</span><span class="sb-proj-year-cat">${locationText}</span></div><span class="sb-proj-tag">${tagText}</span>`;
      item.addEventListener("click", () => { selectProject(project); });
      listWrapper.appendChild(item);
    });
  }

  function selectProject(project) {
    if (isSelectingProject) return;
    isSelectingProject = true;

    if (activeProject) {
      const prev = document.getElementById(`marker-${activeProject.id}`);
      if (prev) prev.classList.remove(activeMarkerClass);
    }
    activeProject = project;

    if (project.coordinates) {
      const markerDom = document.getElementById(`marker-${project.id}`);
      if (markerDom) markerDom.classList.add(activeMarkerClass);
      // 모바일과 데스크톱의 지도 초점 위도 오프셋 분기 처리
      // 데스크톱은 기존 +0.15 오프셋으로 카드를 아래로 배치하며,
      // 모바일은 상단 프로젝트 로고와 하단 고정탭(33.3vh) 사이 공간에서 캡슐 배너가 정확히 상하 1:1 대칭(중앙)이 되도록 +0.05 오프셋 적용
      const latOffset = window.innerWidth <= 768 ? 0.05 : 0.15;
      const targetCoords = [project.coordinates[0] + latOffset, project.coordinates[1]];
      map.flyTo(targetCoords, 10.5, { duration: 1.5, easeLinearity: 0.2 });
      openCustomPopup(project);
    } else {
      map.closePopup();
      if (project.link && project.link !== "#") {
        window.open(project.link, "_blank");
      }
    }

    const listItems = document.querySelectorAll(".sidebar-project-item");
    const sorted = getSortedFilteredProjects();
    const projIndex = sorted.findIndex(p => p.id === project.id);
    // Expand sidebar on mobile when a project is selected
    const sidebar = document.getElementById("sidebar");
    if (sidebar) {
      sidebar.classList.add("expanded");
    }

    listItems.forEach((item, idx) => {
      if (idx === projIndex) {
        item.classList.add(activeItemClass);
        // Scroll active project to the top of the sidebar viewport
        setTimeout(() => {
          item.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100); // Wait for transition to start/finish
      } else {
        item.classList.remove(activeItemClass);
      }
    });

    // Update the top center title container with the project's English name in spans
    const titleContainer = document.querySelector("#atlas-title-container .atlas-main-title");
    if (titleContainer && project.englishTitle) {
      // Whoami 폰트의 대문자 D 형상을 소문자 d 타입 형상으로 출력하기 위해 문자열 치환 처리
      const formattedTitle = project.englishTitle.replace(/D/g, "d");
      titleContainer.innerHTML = formattedTitle
        .split("")
        .map(char => {
          if (char === " ") {
            const spaceMargin = window.innerWidth <= 768 ? "0 6px" : "0 16px";
            return `<span style="margin: ${spaceMargin};">&nbsp;</span>`;
          }
          return `<span>${char}</span>`;
        })
        .join("");

      // Adjust size based on text length to fit within mobile screen bounds
      if (window.innerWidth <= 768) {
        const len = project.englishTitle.length;
        let fontSize = 40;
        let letterMargin = "0 2px";
        if (len > 25) {
          fontSize = 18;
          letterMargin = "0 1px";
        } else if (len > 20) {
          fontSize = 22;
          letterMargin = "0 1px";
        } else if (len > 15) {
          fontSize = 26;
          letterMargin = "0 1px";
        } else if (len > 10) {
          fontSize = 32;
        }
        titleContainer.style.fontSize = fontSize + "px";
        titleContainer.querySelectorAll("span:not([style*='margin'])").forEach(s => {
          s.style.margin = letterMargin;
        });
      } else {
        titleContainer.style.fontSize = ""; // Reset to CSS default for desktop
      }
    }

    isSelectingProject = false;
  }

  function getSortedFilteredProjects() {
    const filtered = activeYear === "all" ? projectsData : projectsData.filter(p => p.year === parseInt(activeYear));
    return [...filtered].sort((a, b) => { if (a.year !== b.year) return b.year - a.year; return a.id.localeCompare(b.id); });
  }

  function formatProjectName(name) {
    const match = name.match(/^([^(]+)\s*\(([^)]+)\)$/);
    if (match) {
      const ko = match[1].trim();
      const en = match[2].trim();
      return `<span class="title-ko">${ko}</span><span class="title-en">${en}</span>`;
    }
    return `<span class="title-ko">${name}</span>`;
  }

  function openCustomPopup(project) {
    map.closePopup();

    let mediaHTML = "";
    if (!project.image || project.image.startsWith("placeholder")) {
      mediaHTML = `<div class="card-image-placeholder"><div class="placeholder-icon">📐</div></div>`;
    } else {
      mediaHTML = `<img src="${project.image}" alt="${project.name}">`;
    }

    const locationText = project.location || "";
    const categoryText = project.category || "";
    const yearText = project.year || "";
    const detailsText = locationText ? `${yearText} • ${locationText}` : `${yearText}`;
    const projectLink = project.link || "#";
    const formattedTitle = formatProjectName(project.name);

    const popupHTML = `
      <div class="custom-project-card">
        <div class="card-image-wrapper">
          ${mediaHTML}
        </div>
        <div class="card-category">${categoryText}</div>
        <h3 class="card-title">${formattedTitle}</h3>
        <div class="card-details">${detailsText}</div>
        <button class="card-action-btn" onclick="window.open('${projectLink}', '_blank')">View Work</button>
      </div>
    `;

    L.popup({
      closeButton: false,
      offset: [0, -10],
      className: 'custom-leaflet-popup',
      autoPan: false
    })
    .setLatLng(project.coordinates)
    .setContent(popupHTML)
    .openOn(map);
  }

  const yearButtons = document.querySelectorAll(".year-btn");
  yearButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const year = button.getAttribute("data-year");

      // Clicking the "ALL" button closes the popup and resets the active project/title (both PC and Mobile)
      if (year === "all") {
        map.closePopup();

        // Collapse sidebar on mobile
        const sidebar = document.getElementById("sidebar");
        if (sidebar) {
          sidebar.classList.remove("expanded");
          sidebar.scrollTo({ top: 0, behavior: "smooth" });
        }

        if (activeProject) {
          const m = document.getElementById(`marker-${activeProject.id}`);
          if (m) m.classList.remove(activeMarkerClass);
          document.querySelectorAll(".sidebar-project-item").forEach(i => i.classList.remove(activeItemClass));
          activeProject = null;
          
          const titleContainer = document.querySelector("#atlas-title-container .atlas-main-title");
          if (titleContainer) {
            titleContainer.innerHTML = "";
          }
        }
      }

      if (activeYear === year) {
        // 이미 active된 상태에서 다시 누르면 지도의 뷰를 초기화/재배치 (all인 경우 한반도 전체 뷰 복귀)
        fitMapToActiveMarkers();
        return;
      }
      yearButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      activeYear = year;
      map.closePopup();
      renderPortfolio();
      fitMapToActiveMarkers();
    });
  });

  const yearsList = ["all", "2021", "2022", "2023", "2024", "2025", "2026"];
  document.getElementById("prev-year-btn").addEventListener("click", () => { let i = yearsList.indexOf(activeYear) - 1; if (i < 0) i = yearsList.length - 1; triggerYearClick(yearsList[i]); });
  document.getElementById("next-year-btn").addEventListener("click", () => { let i = yearsList.indexOf(activeYear) + 1; if (i >= yearsList.length) i = 0; triggerYearClick(yearsList[i]); });
  function triggerYearClick(y) { const b = document.querySelector(`.year-btn[data-year="${y}"]`); if (b) b.click(); }

  function fitMapToActiveMarkers() {
    const geo = activeYear === "all" ? projectsData.filter(p => p.coordinates) : projectsData.filter(p => p.year === parseInt(activeYear) && p.coordinates);
    if (geo.length === 0) return;
    if (activeYear === "all") { map.flyTo(koreaCenter, koreaZoom, { duration: 1.5 }); }
    else { const bounds = L.latLngBounds(geo.map(p => p.coordinates)); map.fitBounds(bounds, { padding: [60, 60], maxZoom: 10, animate: true, duration: 1.5 }); }
  }

  let activeAnimations = {};

  function animateStats() {
    const yearsStat = document.getElementById("stat-years");
    const projStat = document.getElementById("stat-projects");
    animateCounter(yearsStat, 0, 6, 1000, "+"); // 0부터 카운팅 시작
    animateCounter(projStat, 0, 55, 1500, "+"); // 0부터 카운팅 시작
  }

  function animateCounter(el, start, end, dur, suffix = "") {
    const key = el.id;
    if (activeAnimations[key]) {
      cancelAnimationFrame(activeAnimations[key]);
    }
    let ts = null;
    const step = (t) => {
      if (!ts) ts = t;
      const p = Math.min((t - ts) / dur, 1);
      el.innerHTML = Math.floor(p * (end - start) + start) + suffix;
      if (p < 1) {
        activeAnimations[key] = requestAnimationFrame(step);
      } else {
        activeAnimations[key] = null;
      }
    };
    activeAnimations[key] = requestAnimationFrame(step);
  }

  // Sidebar Toggle
  const sidebarToggleBtn = document.getElementById("sidebar-toggle");
  const sidebar = document.getElementById("sidebar");
  const timelineContainer = document.getElementById("timeline-container");
  sidebarToggleBtn.addEventListener("click", () => {
    sidebarVisible = !sidebarVisible;
    sidebar.classList.toggle("sidebar-hidden", !sidebarVisible);
    timelineContainer.classList.toggle("sidebar-collapsed", !sidebarVisible);
    if (sidebarVisible) {
      animateStats();
    }
  });

  // ATLAS Evasion Mouse Interaction (Character-by-character)
  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const isLightTheme = document.body.classList.contains("light-theme");
    
    const titleSpans = document.querySelectorAll("#atlas-title-container span");
    titleSpans.forEach(span => {
      if (!span.style.willChange) {
        span.style.willChange = "transform";
      }
      
      const rect = span.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const diffX = mouseX - centerX;
      const diffY = mouseY - centerY;
      const distance = Math.sqrt(diffX * diffX + diffY * diffY);
      
      const evadeRadius = 100;
      if (distance < evadeRadius && distance > 0) {
        const maxEvade = 24;
        const ratio = (evadeRadius - distance) / evadeRadius;
        const force = ratio * maxEvade;
        
        const evadeX = -(diffX / distance) * force;
        const evadeY = -(diffY / distance) * force;
        
        span.style.transform = `translate(${evadeX}px, ${evadeY}px) scale(1.15)`;
        if (isLightTheme) {
          // 라이트모드 마우스오버: 연보라색 글자, 그레이 그림자
          span.style.color = "var(--accent-gold)";
          span.style.filter = "drop-shadow(0 4px 8px rgba(74, 69, 66, 0.4))";
          span.style.textShadow = "none";
        } else {
          // 다크모드 마우스오버: 화이트 글자, 연보라 그림자
          span.style.color = "var(--text-main)";
          span.style.textShadow = "0 0 15px rgba(var(--accent-gold-rgb), 0.8)";
          span.style.filter = "";
        }
      } else {
        span.style.transform = "translate(0, 0) scale(1)";
        span.style.color = "";
        span.style.textShadow = "";
        span.style.filter = "";
      }
    });
  });

  // Theme Toggle Logic
  const themeToggleBtn = document.getElementById("theme-toggle");
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const isLight = document.body.classList.toggle("light-theme");
      
      // Toggle Map Tile
      if (map && currentTileLayer) {
        map.removeLayer(currentTileLayer);
        const nextTileUrl = isLight ? lightTileUrl : darkTileUrl;
        currentTileLayer = L.tileLayer(nextTileUrl, {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd", maxZoom: 20
        }).addTo(map);
      }
    });
  }

  // Run Setup
  initMap();
  if (map) {
    map.on("click", () => map.closePopup());
    map.on("popupclose", () => {
      if (isSelectingProject) return;
      if (activeProject) {
        const m = document.getElementById(`marker-${activeProject.id}`);
        if (m) m.classList.remove(activeMarkerClass);
        document.querySelectorAll(".sidebar-project-item").forEach(i => i.classList.remove(activeItemClass));
        activeProject = null;
        
        // Clear top title
        const titleContainer = document.querySelector("#atlas-title-container .atlas-main-title");
        if (titleContainer) {
          titleContainer.innerHTML = "";
        }
      }
    });
  }

  // Clear top title and active project when year filter changes
  const yearButtonsList = document.querySelectorAll(".year-btn");
  yearButtonsList.forEach((button) => {
    button.addEventListener("click", () => {
      const year = button.getAttribute("data-year");
      if (activeYear === year) return;
      
      if (activeProject) {
        const m = document.getElementById(`marker-${activeProject.id}`);
        if (m) m.classList.remove(activeMarkerClass);
        document.querySelectorAll(".sidebar-project-item").forEach(i => i.classList.remove(activeItemClass));
        activeProject = null;
        
        const titleContainer = document.querySelector("#atlas-title-container .atlas-main-title");
        if (titleContainer) {
          titleContainer.innerHTML = "";
        }
      }
    });
  });

  // Easter egg redirect for first i's dot in the logo
  const easterEggDot = document.querySelector(".easter-egg-dot");
  if (easterEggDot) {
    easterEggDot.addEventListener("click", (e) => {
      e.stopPropagation();
      window.open("https://identio-poster-editor.vercel.app/", "_blank");
    });
  }

  // Mobile sidebar height transition on scroll
  const sidebarEl = document.getElementById("sidebar");
  if (sidebarEl) {
    sidebarEl.addEventListener("scroll", () => {
      if (window.innerWidth <= 768) {
        if (sidebarEl.scrollTop > 10) {
          sidebarEl.classList.add("expanded");
        } else if (sidebarEl.scrollTop === 0) {
          sidebarEl.classList.remove("expanded");
        }
      }
    });
  }

  startIntroAnimation();
});
