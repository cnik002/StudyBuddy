// Global Filter State
let state = {
    subject: 'all',
    status: 'all',
    isAllTime: true,
    days: 30
};

// Global Chart Instances
let statusPieChart, subjectBarChart, activityLineChart;

document.addEventListener('DOMContentLoaded', function () {
    // Initialize Pie Chart (Starts empty, gets filled by refreshCharts)
    const ctxPie = document.getElementById('statusPieChart').getContext('2d');
    statusPieChart = new Chart(ctxPie, {
        type: 'pie',
        data: {
            labels: ['Draft', 'In Progress', 'Reviewed'],
            datasets: [{
                data: [0, 0, 0],
                backgroundColor: ['#0dcaf0', '#ffc107', '#198754'],
                hoverOffset: 10
            }]
        },
        options: { maintainAspectRatio: false }
    });

    // Initialize Bar Chart 
    const ctxBar = document.getElementById('subjectBarChart').getContext('2d');
    subjectBarChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
            // Using actual folder names
            labels: ['ISM 6225', 'ISM 6419', 'FIN 6406', 'MAR 6815', 'QMB 6305', 'Unfiled'],
            datasets: [{
                label: 'Number of Documents',
                data: [0, 0, 0, 0, 0, 0],
                backgroundColor: '#0d6efd',
                borderRadius: 5
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
        }
    });

    // Initialize Line Chart 
    const ctxLine = document.getElementById('activityLineChart').getContext('2d');
    activityLineChart = new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [{
                label: 'Files Uploaded',
                data: [2, 5, 3, 8, 4, 1, 3],
                borderColor: '#6f42c1',
                backgroundColor: 'rgba(111, 66, 193, 0.1)',
                fill: true, tension: 0.4, pointRadius: 6, pointHoverRadius: 8
            }]
        },
        options: { maintainAspectRatio: false }
    });

    // --- INTERACTIVITY: CLICK LISTENERS ---

    // Click to Filter: Pie Chart
    document.getElementById('statusPieChart').onclick = function (evt) {
        const points = statusPieChart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);
        if (points.length) {
            const clickedStatus = statusPieChart.data.labels[points[0].index];
            state.status = (state.status === clickedStatus) ? 'all' : clickedStatus; // Toggle logic
        } else {
            state.status = 'all'; // Clicked background resets
        }
        refreshCharts();
    };

    // Click to Filter: Bar Chart
    document.getElementById('subjectBarChart').onclick = function (evt) {
        const points = subjectBarChart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);
        if (points.length) {
            const clickedSubject = subjectBarChart.data.labels[points[0].index];
            state.subject = (state.subject === clickedSubject) ? 'all' : clickedSubject; // Toggle logic
        } else {
            state.subject = 'all'; // Clicked background resets
        }

        // Sync the HTML Dropdown to match the Bar Chart click!
        const dropdown = document.getElementById('analyticsFolderFilter');
        if (dropdown) {
            dropdown.value = (state.subject === 'all') ? 'all' : state.subject;
        }
        refreshCharts();
    };

    // Load real data immediately on page load
    refreshCharts();
});

// Dropdown Filter Logic
function filterAnalyticsChart() {
    // Triggered when the user manually changes the dropdown
    state.subject = document.getElementById('analyticsFolderFilter').value;
    refreshCharts();
}

// Time Filter Logic
function toggleAllTime() {
    state.isAllTime = !state.isAllTime;
    const btn = document.getElementById('allTimeBtn');
    const sliderDiv = document.getElementById('sliderContainer');
    const label = document.getElementById('sliderValueLabel');

    if (state.isAllTime) {
        btn.classList.replace('btn-outline-primary', 'btn-primary');
        sliderDiv.style.opacity = "0.5";
        sliderDiv.style.pointerEvents = "none";
        label.innerText = "All Time";
    } else {
        btn.classList.replace('btn-primary', 'btn-outline-primary');
        sliderDiv.style.opacity = "1";
        sliderDiv.style.pointerEvents = "auto";
        updateChartTime(document.getElementById('timeSlider').value);
        return; // updateChartTime calls refreshCharts
    }
    refreshCharts();
}

function updateChartTime(val) {
    if (state.isAllTime) return;
    state.days = parseInt(val);
    document.getElementById('sliderValueLabel').innerText = val + " Days";
    refreshCharts();
}

// Filter raw data and update UI
function refreshCharts() {
    if (typeof rawDocumentData === 'undefined') return;

    // Apply Time, Subject, and Status Filters
    const filtered = rawDocumentData.filter(d => {
        const docSub = d.Subject || 'Unfiled';
        const docStat = d.Status || 'Draft';

        // Check Subject
        const matchesSub = (state.subject === 'all') || (docSub.toLowerCase() === state.subject.toLowerCase());

        // Check Status
        const matchesStat = (state.status === 'all') || (docStat === state.status);

        // Check Time
        let matchesTime = true;
        if (!state.isAllTime && d.DateAdded) {
            const docDate = new Date(d.DateAdded);
            // Simulating "today" as April 10, 2026 based on dummy data dates
            const today = new Date("Apr 10, 2026");
            const diffDays = Math.ceil(Math.abs(today - docDate) / (1000 * 60 * 60 * 24));
            matchesTime = diffDays <= state.days;
        }

        return matchesSub && matchesStat && matchesTime;
    });

    // Update Pie Chart Data
    statusPieChart.data.datasets[0].data = [
        filtered.filter(d => d.Status === 'Draft').length,
        filtered.filter(d => d.Status === 'In Progress').length,
        filtered.filter(d => d.Status === 'Reviewed').length
    ];

    // Update Bar Chart Data
    const subjects = ['ISM 6225', 'ISM 6419', 'FIN 6406', 'MAR 6815', 'QMB 6305', 'Unfiled'];
    subjectBarChart.data.datasets[0].data = subjects.map(s =>
        filtered.filter(d => (d.Subject || 'Unfiled') === s).length
    );

    // Update Total Documents Counter Badge
    const counterBadge = document.getElementById('totalDocsCounter');
    if (counterBadge) counterBadge.innerText = filtered.length;

    // Push graphics to screen
    statusPieChart.update();
    subjectBarChart.update();
}