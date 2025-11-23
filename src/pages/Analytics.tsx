import React, { useState } from 'react';
import TrendChart from '@/components/Analytics/TrendChart';
import { Button } from '@/components/ui/button';
import { Download, Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';

const Analytics = () => {
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(2024, 0, 20),
        to: new Date(2024, 0, 27),
    });

    const [weeklyData, setWeeklyData] = useState([
        { name: 'Mon', value: 180 },
        { name: 'Tue', value: 220 },
        { name: 'Wed', value: 190 },
        { name: 'Thu', value: 240 },
        { name: 'Fri', value: 280 },
        { name: 'Sat', value: 170 },
        { name: 'Sun', value: 150 },
    ]);

    // Simulate fetching/generating data when date changes
    React.useEffect(() => {
        if (date?.from && date?.to) {
            // Generate random data to simulate different time periods
            const newWeeklyData = [
                { name: 'Mon', value: Math.floor(Math.random() * 200) + 100 },
                { name: 'Tue', value: Math.floor(Math.random() * 200) + 100 },
                { name: 'Wed', value: Math.floor(Math.random() * 200) + 100 },
                { name: 'Thu', value: Math.floor(Math.random() * 200) + 100 },
                { name: 'Fri', value: Math.floor(Math.random() * 200) + 100 },
                { name: 'Sat', value: Math.floor(Math.random() * 200) + 100 },
                { name: 'Sun', value: Math.floor(Math.random() * 200) + 100 },
            ];
            setWeeklyData(newWeeklyData);

            const newMonthlyData = [
                { name: 'Week 1', value: Math.floor(Math.random() * 200) + 150 },
                { name: 'Week 2', value: Math.floor(Math.random() * 200) + 150 },
                { name: 'Week 3', value: Math.floor(Math.random() * 200) + 150 },
                { name: 'Week 4', value: Math.floor(Math.random() * 200) + 150 },
            ];
            setMonthlyData(newMonthlyData);
        }
    }, [date]);

    const [monthlyData, setMonthlyData] = useState([
        { name: 'Week 1', value: 210 },
        { name: 'Week 2', value: 195 },
        { name: 'Week 3', value: 245 },
        { name: 'Week 4', value: 180 },
    ]);

    const handleDownload = () => {
        // Convert data to CSV
        const headers = ['Day', 'AQI Value'];
        const csvContent = [
            headers.join(','),
            ...weeklyData.map(row => `${row.name},${row.value}`)
        ].join('\n');

        // Create blob and download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `aqi_report_${format(new Date(), 'yyyy-MM-dd')}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">Analytics & Reports</h1>
                    <p className="text-muted-foreground">
                        Historical data analysis and pollution trends.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date?.from ? (
                                    date.to ? (
                                        <>
                                            {format(date.from, "LLL dd, y")} -{" "}
                                            {format(date.to, "LLL dd, y")}
                                        </>
                                    ) : (
                                        format(date.from, "LLL dd, y")
                                    )
                                ) : (
                                    <span>Pick a date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="end">
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={2}
                            />
                        </PopoverContent>
                    </Popover>
                    <Button onClick={handleDownload}>
                        <Download className="mr-2 h-4 w-4" />
                        Download Report
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <TrendChart
                    title="Weekly AQI Trend"
                    data={weeklyData}
                    color="#ef4444"
                />
                <TrendChart
                    title="Monthly Average"
                    data={monthlyData}
                    color="#3b82f6"
                />
            </div>

            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-4">Key Insights</h3>
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-4 bg-secondary/50 rounded-lg">
                        <div className="text-sm text-muted-foreground">Highest AQI Day</div>
                        <div className="text-xl font-bold mt-1">Friday (280)</div>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg">
                        <div className="text-sm text-muted-foreground">Lowest AQI Day</div>
                        <div className="text-xl font-bold mt-1">Sunday (150)</div>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg">
                        <div className="text-sm text-muted-foreground">Monthly Average</div>
                        <div className="text-xl font-bold mt-1">207.5</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
