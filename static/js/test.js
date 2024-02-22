// value 값을 metadata 객체의 bbtype 속성으로 설정
var data = [
    {
        domain: { x: [0, 1], y: [0, 1] },
        value: demographicData[0].bbtype, // 주간 세척 빈도
        title: { 
            text: "<b style='font-size: 24px'>Belly Button Washing Frequency</b><br><span style='font-size: 12px'>Scrubs per Week</span>",
            font: { size: 18 } // 제목 폰트 크기 설정
        },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: { range: [null, 9] }, // 주간 세척 빈도의 범위는 0에서 9까지
            steps: [
                { range: [0, 1], color: "rgba(255, 255, 255, 0)" },
                { range: [1, 2], color: "rgba(232, 226, 202, .5)" },
                { range: [2, 3], color: "rgba(210, 206, 145, .5)" },
                { range: [3, 4], color: "rgba(202, 209, 95, .5)" },
                { range: [4, 5], color: "rgba(170, 202, 42, .5)" },
                { range: [5, 6], color: "rgba(110, 154, 22, .5)" },
                { range: [6, 7], color: "rgba(14, 127, 0, .5)" },
                { range: [7, 8], color: "rgba(0, 105, 11, .5)" },
                { range: [8, 9], color: "rgba(0, 70, 0, .5)" }
            ],
            threshold: {
                line: { color: "red", width: 4 },
                thickness: 0.75,
                value: 9 // 이 값보다 크면 빨간색으로 표시
            }
        }
    }
];

// 레이아웃 설정
var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };

// gauge chart 그리기
Plotly.newPlot('gauge', data, layout);
