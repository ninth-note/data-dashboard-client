// import images
import images from "./images"

// import the building-blocks
import PieChartBlock from "../features/build-graphs/PieChart";
import BarChartBlock from "../features/build-graphs/BarChart";
import LineChartBlock from "../features/build-graphs/LineChart";
import AreaChartBlock from "../features/build-graphs/AreaChart";
import BudgetSummaryBlock from "../features/build-graphs/BudgetSummary";
import ShoppingSummaryBlock from "../features/build-graphs/ShoppingSummary";

const buildingBlocks = (color) => ([

    [
        
        {
            id: 'SS22',
            label: 'Shopping Summary (2 x 2)',
            img: images.shopspendweekblock,
            data: {
                name: 'SS22',
                dataGrid: {x: 0, y: 0, w: 2, h: 2},
                color,
                graph: <ShoppingSummaryBlock width={524} height={180} color={color}/>,
            }
        },
        {
            id: 'BS16',
            label: 'Budget Summary (1 x 6)',
            img: images.bs16,
            data: {
                name: 'BS16',
                dataGrid: {x: 0, y: 0, w: 1, h: 6},
                color,
                graph: <BudgetSummaryBlock width={768} height={360} color={color}/>,
            }
        },
        {
            id: 'P12',
            label: 'Pie Chart (1 x 2)',
            img: images.pieblocks,
            data: {
                name: 'P12',
                dataGrid: {x: 0, y: 0, w: 1, h: 2},
                color,
                graph: <PieChartBlock width={262} height={180} color={color}/>,
            }
        },
        {
            id: 'P24',
            label: 'Pie Chart (2 x 4)',
            img: images.pieblockm,
            data: {
                name: 'P24',
                dataGrid: {x: 0, y: 0, w: 2, h: 4},
                color,
                graph: <PieChartBlock width={524} height={360} color={color}/>,
            }
        },
        {
            id: 'B34',
            label: 'Bar Chart (3 x 4)',
            img: images.barblockm,
            data: {
                name: 'B34',
                dataGrid: {x: 0, y: 0, w: 3, h: 4},
                color,
                graph: <BarChartBlock width={768} height={360} color={color}/>,
            }
        },
        {
            id: 'L34',
            label: 'Line Chart (3 x 4)',
            img: images.lineblockm,
            data: {
                name: 'L34',
                dataGrid: {x: 0, y: 0, w: 3, h: 4},
                color,
                graph: <LineChartBlock width={768} height={360} color={color}/>,
            }
        },
        {
            id: 'A34',
            label: 'Area Chart (3 x 4)',
            img: images.areablockm,
            data: {
                name: 'A34',
                dataGrid: {x: 0, y: 0, w: 3, h: 4},
                color,
                graph: <AreaChartBlock width={768} height={360} color={color}/>,
            }
        },
        
    ],

    [
        {
            id: 'P12',
            label: 'Pie Chart (1 x 2)',
            img: images.pieblocks,
            data: {
                name: 'P12',
                dataGrid: {x: 0, y: 0, w: 1, h: 2},
                color,
                graph: <PieChartBlock width={262} height={180} color={color}/>,
            }
        },
        {
            id: 'P24',
            label: 'Pie Chart (2 x 4)',
            img: images.pieblockm,
            data: {
                name: 'P24',
                dataGrid: {x: 0, y: 0, w: 2, h: 4},
                color,
                graph: <PieChartBlock width={524} height={360} color={color}/>,
            }
        },
        {
            id: 'B34',
            label: 'Bar Chart (3 x 4)',
            img: images.barblockm,
            data: {
                name: 'B34',
                dataGrid: {x: 0, y: 0, w: 3, h: 4},
                color,
                graph: <BarChartBlock width={768} height={360} color={color}/>,
            }
        },
        {
            id: 'L34',
            label: 'Line Chart (3 x 4)',
            img: images.lineblockm,
            data: {
                name: 'L34',
                dataGrid: {x: 0, y: 0, w: 3, h: 4},
                color,
                // graph: <LineChartBlock width={400} height={230} color={color}/>,
                graph: <LineChartBlock width={768} height={360} color={color}/>,
            }
        },
        {
            id: 'A34',
            label: 'Area Chart (3 x 4)',
            img: images.areablockm,
            data: {
                name: 'A34',
                dataGrid: {x: 0, y: 0, w: 3, h: 4},
                color,
                // graph: <AreaChartBlock width={400} height={230} color={color}/>,
                graph: <AreaChartBlock width={768} height={360} color={color}/>,
            }
        },
        
    ]

]);

export default buildingBlocks