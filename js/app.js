// PRIMEIRO GRÁFICO - BARRAS

const configBarras = {
    type: 'bar',

    data: {
        labels: [
            'LinkedIn: membros anunciados',
            'NapoleonCat: audiência estimada'
        ],

        datasets: [{
            data: [100, 82.2],

            backgroundColor: [
                '#245e4c',
                '#ed8955'
            ],

            borderRadius: 10,
            barPercentage: 0.55
        }]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: false
            }
        },

        scales: {
            y: {
                beginAtZero: true,
                max: 120,

                ticks: {
                    stepSize: 20
                },

                title: {
                    display: true,
                    text: 'Milhões'
                }
            }
        }
    }
};

new Chart(
    document.getElementById('graficoBarras'),
    configBarras
);


// SEGUNDO GRÁFICO - ROSCA

const dataRosca = {
    labels: [
        '18–24 anos',
        '25–34 anos',
        '35–54 anos',
        '55 anos ou mais'
    ],

    datasets: [{
        label: 'Distribuição por faixa etária (%)',

        data: [31.6, 49.9, 17, 1.5],

        backgroundColor: [
            '#ed8955',
            '#245e4c',
            '#d0f45c',
            '#a8b8ae'
        ],

        hoverOffset: 4,
        borderWidth: 0
    }]
};

const configRosca = {
    type: 'doughnut',
    data: dataRosca,

    options: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                position: 'bottom'
            },

            tooltip: {
                callbacks: {
                    label: function(context) {
                        return context.label + ': ' + context.raw + '%';
                    }
                }
            }
        },

        cutout: '65%'
    }
};

new Chart(
    document.getElementById('graficoRosca'),
    configRosca
);