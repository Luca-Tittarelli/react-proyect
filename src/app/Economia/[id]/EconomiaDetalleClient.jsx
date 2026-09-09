'use client';

import { useEffect, useState, useMemo } from "react";
import { fetchData } from "@/utils/Fetch";
import { RiesgoPaisHistoricoAPI, variableAPI } from "@/apis";
import { Loading } from "@/components/LoadingAnim";
import { getTodayDate } from "@/utils/functions";
import LineChart from "@/charts/ChartLine";
import { useTheme } from '@/hooks/useTheme';
import DifferenceIcon from "@/utils/DifferenceIcons";

const PERIODS = [
    { label: '7D', value: '7D' },
    { label: '1M', value: '1M' },
    { label: '3M', value: '3M' },
    { label: '6M', value: '6M' },
    { label: '1A', value: '1Y' },
    { label: '3A', value: '3Y' },
    { label: '5A', value: '5Y' },
];

export default function EconomiaDetalleClient({ id, meta = null }) {
    const [theme] = useTheme();
    const [fullChartData, setFullChartData] = useState([]);
    const [chartDataStatus, setChartDataStatus] = useState('loading');
    const [selected, setSelected] = useState('1M');

    const getLabels = data => data.map(d => d.fecha);
    const getValues = data => data.map(d => d.valor);

    useEffect(() => {
        const fetching = async () => {
            setChartDataStatus('loading');
            try {
                if (id === 'riesgo-pais') {
                    const res = await fetchData(RiesgoPaisHistoricoAPI);
                    setFullChartData(res.data || []);
                    setChartDataStatus(res.status);
                } else {
                    const today = new Date();
                    const pastDate = new Date(today.setFullYear(today.getFullYear() - 5));
                    const fiveYearsAgo = `${pastDate.getFullYear()}-${String(pastDate.getMonth() + 1).padStart(2, '0')}-${String(pastDate.getDate()).padStart(2, '0')}`;
                    const res = await fetchData(variableAPI(id, fiveYearsAgo, getTodayDate()));
                    const apiResults = res.data.results?.length > 0 ? res.data.results[0].detalle : [];
                    setFullChartData(apiResults.reverse());
                    setChartDataStatus(res.status);
                }
            } catch (err) {
                console.error("Error fetching historical detail data:", err);
                setChartDataStatus('error');
            }
        };
        fetching();
    }, [id]);

    const chartData = useMemo(() => {
        if (!fullChartData || fullChartData.length === 0) return [];
        const today = new Date();
        const pastDate = new Date(today);
        if (selected === '7D') pastDate.setDate(today.getDate() - 7);
        if (selected === '1M') pastDate.setMonth(today.getMonth() - 1);
        if (selected === '3M') pastDate.setMonth(today.getMonth() - 3);
        if (selected === '6M') pastDate.setMonth(today.getMonth() - 6);
        if (selected === '1Y') pastDate.setFullYear(today.getFullYear() - 1);
        if (selected === '3Y') pastDate.setFullYear(today.getFullYear() - 3);
        if (selected === '5Y') pastDate.setFullYear(today.getFullYear() - 5);
        return fullChartData.filter(d => new Date(d.fecha) >= pastDate);
    }, [fullChartData, selected]);

    const latestValue = chartData.length > 0 ? chartData[chartData.length - 1].valor : 0;
    const initialValue = chartData.length > 0 ? chartData[0].valor : 0;
    const difference = initialValue !== 0
        ? (((latestValue - initialValue) / initialValue) * 100).toFixed(2)
        : 0;

    const isPositive = difference > 0;
    const isNegative = difference < 0;
    const chartColor = isPositive ? '#00C853' : isNegative ? '#FF1744' : '#8B98A5';
    const diffColor = isPositive ? 'var(--positive)' : isNegative ? 'var(--negative)' : 'var(--text-tertiary)';

    const displayTitle = meta?.title ? meta.title.split('—')[0].trim() : '—';
    const displaySubtitle = meta?.dataset?.variableMeasured || meta?.description || null;
    const latestDate = fullChartData.length > 0 ? fullChartData[fullChartData.length - 1].fecha : '—';

    const isLoading = chartDataStatus === 'loading';

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="space-y-6">
            {/* Hero card */}
            <div
                className="p-6 sm:p-8 rounded-[16px]"
                style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                }}
            >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div>
                        <h1
                            className="text-xl sm:text-2xl font-bold tracking-tight mb-1"
                            style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
                        >
                            {displayTitle}
                        </h1>
                        {displaySubtitle && (
                            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                {displaySubtitle}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col items-start sm:items-end gap-1">
                        <p
                            className="text-3xl sm:text-4xl font-bold tracking-tight leading-none"
                            style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums' }}
                        >
                            {latestValue.toLocaleString('es-AR')}
                        </p>
                        <span
                            className="flex items-center gap-1 text-sm font-semibold px-2 py-0.5 rounded-full"
                            style={{
                                background: isPositive ? 'var(--positive-soft)' : isNegative ? 'var(--negative-soft)' : 'var(--bg-surface-hover)',
                                color: diffColor,
                            }}
                        >
                            <DifferenceIcon dif={difference} size={14} />
                            {difference}% · {PERIODS.find(p => p.value === selected)?.label}
                        </span>
                    </div>
                </div>
            </div>

            {/* Period selector */}
            <div className="flex items-center gap-2 flex-wrap">
                {PERIODS.map(period => (
                    <button
                        key={period.value}
                        onClick={() => setSelected(period.value)}
                        className={selected === period.value ? 'pill-active' : 'pill-inactive'}
                    >
                        {period.label}
                    </button>
                ))}
            </div>

            {/* Chart */}
            <div
                className="p-5 rounded-[12px]"
                style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                }}
            >
                {chartData.length === 0 ? (
                    <p className="text-center text-sm py-16" style={{ color: 'var(--text-tertiary)' }}>
                        Sin datos disponibles para este período.
                    </p>
                ) : (
                    <LineChart
                        labels={getLabels(chartData)}
                        dataset={getValues(chartData)}
                        height={320}
                        color={chartColor}
                    />
                )}
            </div>

            {/* Metadata */}
            <div className="flex items-center justify-between mt-4 px-1">
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    Última actualización: {latestDate}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    Fuente: {id === 'riesgo-pais' || id === '44' ? 'ArgentinaDatos API' : 'BCRA'}
                </p>
            </div>
        </div>
    );
}
