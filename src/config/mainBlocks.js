// import the main-blocks
import PieChartMain from "../features/graphs/PieChartMain";
import AreaChartMain from "../features/graphs/AreaChartMain";
import BarChartMain from "../features/graphs/BarChartMain";
import BudgetSummaryMain from "../features/graphs/BudgetSummaryMain";
import LineChartMain from "../features/graphs/LineChartMain";
import ShoppingSummaryMain from "../features/graphs/ShoppingSummaryMain";

const mainBlocks = (inputData, color) => ([

    {
        root: 'P12',
        graph: <PieChartMain width={262} height={180} inputData={inputData} color={color}/>,
    },
    {
        root: 'P24',
        graph: <PieChartMain width={524} height={360} inputData={inputData} color={color}/>,
    },
    {
        root: 'A34',
        graph: <AreaChartMain width={768} height={360} inputData={inputData} color={color}/>,
    },
    {
        root: 'B34',
        graph: <BarChartMain width={768} height={360} inputData={inputData} color={color}/>,
    },
    {
        root: 'BS16',
        graph: <BudgetSummaryMain inputData={inputData} color={color}/>,
    },
    {
        root: 'L34',
        graph: <LineChartMain width={768} height={360} inputData={inputData} color={color}/>,
    },
    {
        root: 'SS22',
        graph: <ShoppingSummaryMain inputData={inputData} color={color}/>,
    },
]
    
)

export default mainBlocks