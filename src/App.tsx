import React, {useEffect, useState} from 'react';
import './App.css';
import Papa from 'papaparse';

import Text from './components/Text';
import Select from './components/Select';
import CandleChart from './components/Chart';

interface CSVData {
    'Adj Close': string;
    Close: string;
    Date: Date;
    High: string;
    Low: string;
    Open: string;
    Volume: string;
}
function App() {
    const [CSVdata, setCSVdata] = useState<CSVData[]>([]);
    const [period, setPeriod] = useState('');
    useEffect(() => {
        if (period) {
            fetch(
                `https://query1.finance.yahoo.com/v7/finance/download/SPUS?period1=1633381200&period2=1664917199&interval=${period}&events=history&crumb=5YTX%2FgVGBmg`,
                {
                    headers: {
                        'content-type': 'text/csv;charset=UTF-8',
                    },
                },
            )
                .then(function (response) {
                    return response.text();
                })
                .then(function (resText) {
                    const results: {data: CSVData[]} = Papa.parse<CSVData>(
                        resText,
                        {
                            header: true,
                        },
                    );
                    setCSVdata(
                        results.data.map((s, i) => {
                            const date = String(s.Date).split('-').join(', ');
                            return {...s, date: new Date(date)};
                        }),
                    );
                });
        }
    }, [period]);

    const handlePeriodChange = (period: string) => {
        setPeriod(period);
    };

    return (
        <>
            <header className="header">
                <Text value="Please select the period " />
                <Select
                    options={[
                        {label: 'Days', value: '1d'},
                        {label: 'Weeks', value: '1wk'},
                        {label: 'Months', value: '1mo'},
                    ]}
                    name="Period"
                    onChange={handlePeriodChange}
                    value={period}
                />
            </header>
            <section>
                {CSVdata.length >= 1 && <CandleChart data={CSVdata} />}
            </section>
        </>
    );
}

export default App;
