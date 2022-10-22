import React from 'react';
import Chart, {
    CommonSeriesSettings,
    Series,
    Reduction,
    ArgumentAxis,
    Label,
    Format,
    ValueAxis,
    Legend,
    Export,
    Tooltip,
} from 'devextreme-react/chart';
import {ChartArgs} from '../../models/Chart';

//TODO REMOVE UNKOWN

const CandleChart: React.FC<{data: unknown[]}> = ({data}) => {
    const customizeTooltip = (arg: ChartArgs) => {
        return {
            text: `Open: $${arg.openValue}<br/>
    Close: $${arg.closeValue}<br/>
    High: $${arg.highValue}<br/>
    Low: $${arg.lowValue}<br/>,`,
        };
    };
    return (
        <Chart id="chart" title="Stock Price" dataSource={data}>
            <CommonSeriesSettings argumentField="date" type="candlestick" />
            <Series
                name="stock"
                openValueField="Open"
                highValueField="High"
                lowValueField="Low"
                closeValueField="Close">
                <Reduction color="red" />
            </Series>
            <ArgumentAxis inverted={true}>
                <Label format="shortDate" />
            </ArgumentAxis>
            <ValueAxis inverted={true}>
                <Label>
                    <Format precision={0} type="currency" />
                </Label>
            </ValueAxis>
            <Legend itemTextPosition="left" />
            <Export enabled={true} />
            <Tooltip
                enabled={true}
                location="edge"
                customizeTooltip={customizeTooltip}
            />
        </Chart>
    );
};

export default CandleChart;
