---
title: 关于
date: 2020-01-31 15:40:33
layout: about
---

<p class="note note-info">个人简介</p>

- 高一，坐标 🌏🚩福建，喜欢数码科技  
- 取名 Royce 没有什么特殊含义，2003，出生年🐣  
- 懂一点点点点点前端知识，在搭建博客过程中不断学习，不断实践  
- 还懂那么一点点c/c++，是最菜的OIer，抱歉拉低了OIer的水平 orz orz  
- 由于个人水平非常有限，在博客分享的内容可能有错，希望莅临指导🤝  


<p class="note note-danger">博客简介</p>

- Hexo框架+Fluid主题  
- Coding Pages<i class="fa fa-plus" aria-hidden="true"></i>GitHub Pages双线部署  
- 全站HTTPS  

<p class="note note-success">博客历史</p>

- 2020.02.27 从NexT搬迁至Fluid，已完成大部分功能搬迁

{% echarts %}
{
    title: {
        text: '文章发布统计',
        textStyle: {
            align: 'center',
            color: '#000',
            fontSize: 30,
        },
        top: '5%',
        left: '40%',
    },
    backgroundColor: '#fff',
    grid: {
        top: "25%",
        bottom: "10%"
    },
    toolbox: {
        show: !0,
        feature: {
            mark: {
                show: !0
            },
            dataView: {
                show: !0,
                readOnly: !1
            },
            magicType: {
                show: !0,
                type: ["pie", "funnel"]
            },
            restore: {
                show: !0
            },
            saveAsImage: {
                show: !0
            }
        }
    },
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "shadow",
            label: {
                show: true
            }
        }
    },
    legend: { //图例
        data: ["该月发布数", "发布总数"],
        top: "15%",
        textStyle: {
            color: "#999"
        }
    },
    xAxis: {
        data: [
            "2019.10",
            "2019.11",
            "2019.12",
            "2020.01",
            "2020.02",
            "2020.03"
        ],
        axisLine: {
            show: true //隐藏X轴轴线
        },
        axisTick: {
            show: true //隐藏X轴刻度
        },
        axisLabel: {
            show: true,
            textStyle: {
                color: "#999" //X轴文字颜色
            }
        },
        axisLine: {
            lineStyle: {
                color: '#999'
            }
        },
    },
    yAxis: [{
            type: "value",
            name: "该月发布数",
            nameTextStyle: {
                color: "#999" //左侧文字
            },
            splitLine: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: true
            },
            axisLine: {
                show: true
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: "#999" //左侧数值
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#999' //左侧y轴
                }
            },
        },
        {
            type: "value",
            name: "发布总数",
            nameTextStyle: {
                color: "#999"
            },
            position: "right",
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: true
            },
            
            // splitLine: {
            //     show: false
            // },
            // axisLine: {
            //     lineStyle: {
            //         color: '#B4B4B4',
            //     }
            // },
            axisLabel: {
                show: true,
                formatter: "{value}", //右侧Y轴文字显示
                textStyle: {
                    color: "#999"
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#999' //左侧y轴
                }
            },
        },
        {
            type: "value",
            gridIndex: 0,
            min: 50,
            max: 100,
            splitNumber: 8,
            splitLine: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false
            },

            splitLine: {
                lineStyle: {
                    color: 'rgba(131,101,101,0.2)',
                    type: 'dashed',
                }
            }
        }
    ],
    series: [{
            name: "发布总数",
            type: "line",
            yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            smooth: true, //平滑曲线显示
            showAllSymbol: true, //显示所有图形。
            symbol: "circle", //标记的图形为实心圆
            symbolSize: 10, //标记的大小
            itemStyle: {
                //折线拐点标志的样式
                color: "rgba(50,117,251,255)"
            },
            lineStyle: {
                color: "rgba(50,117,251,255)",
                shadowColor: 'rgba(0, 0, 0, 0.3)',
                width: 3,
                shadowBlur: 15,
                shadowOffsetY: 15,
            },
            data: [1, 6, 10, 15, 30, 32]
        },
        {
            name: "该月发布数",
            type: "bar",
            barWidth: 35,
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: "#FF9A22"
                        },
                        {
                            offset: 1,
                            color: "#FFD56E"
                        }
                    ]),
                    barBorderRadius: [30, 30, 0, 0],
                }
            },
            data: [1, 5, 4, 5, 15, 2]
        }
    ]
};
{% endecharts %}
---
{% echarts %}
option = {
    title: {
        text: "文章季度统计",
        x: "center"
    },
    tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        x: "left",
        data: ["2019Q4", "2020Q1"]
    },
    label: {
        normal: {
            formatter: "{b} ({d}%)",
            position: "insideTopRight"
        }
    },
    labelLine: {
        normal: {
            smooth: .6
        }
    },
    toolbox: {
        show: !0,
        feature: {
            mark: {
                show: !0
            },
            dataView: {
                show: !0,
                readOnly: !1
            },
            magicType: {
                show: !0,
                type: ["pie", "funnel"]
            },
            restore: {
                show: !0
            },
            saveAsImage: {
                show: !0
            }
        }
    },
    calculable: !0,
    series: [{
        name: "文章数量",
        type: "pie",
        roseType: "area",
        label: {
            normal: {
                show: !0
            },
            emphasis: {
                show: !0
            }
        },
        lableLine: {
            normal: {
                show: !0
            },
            emphasis: {
                show: !0
            }
        },
        data: [{
            value: 10,
            name: "2019Q4"
        }, {
            value: 22,
            name: "2020Q1"
        }
        ]
    }]
};
{% endecharts %}
