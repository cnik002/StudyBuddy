document.addEventListener('DOMContentLoaded', function () {
    // 1. Pie Chart: Document Status
    const ctxPie = document.getElementById('statusPieChart').getContext('2d');
    new Chart(ctxPie, {
        type: 'pie',
        data: {
            labels: ['Draft', 'In Progress', 'Reviewed'],
            datasets: [{
                data: [5, 8, 12], // Dummy data
                backgroundColor: ['#0dcaf0', '#ffc107', '#198754'],
                hoverOffset: 10
            }]
        },
        options: { maintainAspectRatio: false }
    });

    // 2. Bar Chart: Files per Subject
    const ctxBar = document.getElementById('subjectBarChart').getContext('2d');
    new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: ['ISM 6225', 'Data Analytics', 'Marketing', 'FinTech', 'Unfiled'],
            datasets: [{
                label: 'Number of Documents',
                data: [15, 10, 6, 8, 4], // Dummy data
                backgroundColor: '#0d6efd',
                borderRadius: 5
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true } }
        }
    });

    // 3. Line Chart: Activity
    const ctxLine = document.getElementById('activityLineChart').getContext('2d');
    new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [{
                label: 'Files Uploaded',
                data: [2, 5, 3, 8, 4, 1, 3], // Dummy data
                borderColor: '#6f42c1',
                backgroundColor: 'rgba(111, 66, 193, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: { maintainAspectRatio: false }
    });
});