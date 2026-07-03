import React from 'react'
import { useDashboard } from '../../../store/hooks/useDashborad';
import styled from "styled-components";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from "chart.js"
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Dashboard = () => {
    const {kpi, userRanking,productRanking} = useDashboard();
    const userChartData = {
        labels : userRanking.map(item=>item.username),
        datasets : [
            {
                label : "구매 건수",
                data : userRanking.map(item => item.count)
            }
        ]
    }

    const productChartData = {
        labels : productRanking.map(item=>item.name),
        datasets : [
            {
                label : "판매 건수",
                data : productRanking.map(item => item.quantity)
            }
        ]
    }
    const chartOptions = {
        responsive : true,
        maintainAspectRatio : false,
        indexAxis : "y",
        plugins : {
            legend : {
                position : "top"
            }
        }
    }
  return (
    <Container>
        <KpiWrap>
            <KpiCard>
                <Title>총 매출액</Title>
                <Value>{kpi.totalSalesAmount.toLocaleString()}원</Value>
            </KpiCard>

            <KpiCard>
                <Title>총 판매수량</Title>
                <Value>{kpi.totalQuantity.toLocaleString()}개</Value>
            </KpiCard>

            <KpiCard>
                <Title>총 주문건수</Title>
                <Value>{kpi.totalOrderCount.toLocaleString()}건</Value>
            </KpiCard>

            <KpiCard>
                <Title>고객수</Title>
                <Value>{kpi.customerCount?.toLocaleString() || 0}명</Value>
            </KpiCard>

            <KpiCard>
                <Title>상품수</Title>
                <Value>{kpi.productCount.toLocaleString()}개</Value>
            </KpiCard>
        </KpiWrap>

        <ChartWrap>
            <ChartCard>
                <ChartTitle>고객 구매 랭킹 Top 10</ChartTitle>

                <ChartBox>
                    <Bar
                        data={userChartData}
                        options={chartOptions}
                    />
                </ChartBox>
            </ChartCard>

            <ChartCard>
                <ChartTitle>상품 판매 랭킹 Top 10</ChartTitle>

                <ChartBox>
                    <Bar
                        data={productChartData}
                        options={chartOptions}
                    />
                </ChartBox>
            </ChartCard>
        </ChartWrap>
    </Container>
    )
}

export default Dashboard


const Container = styled.div`
    padding: 30px;
    background: #f5f7fa;
    min-height: 100vh;
`;

const KpiWrap = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
`;

const KpiCard = styled.div`
    background: white;
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    transition: 0.2s;

    &:hover {
        transform: translateY(-4px);
    }
`;

const Title = styled.div`
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
`;

const Value = styled.div`
    font-size: 24px;
    font-weight: 700;
    color: #222;
`;

const ChartWrap = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;

    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
    }
`;

const ChartCard = styled.div`
    background: white;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
`;

const ChartTitle = styled.h2`
    margin: 0 0 20px;
    font-size: 20px;
    font-weight: 700;
    color: #222;
`;

const ChartBox = styled.div`
    height: 400px;
`;