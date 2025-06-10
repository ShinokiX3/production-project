/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-var-requires */
// scripts/trend-analyzer.js
const fs = require('fs');
const path = require('path');

class CoverageTrendAnalyzer {
    constructor() {
        this.reportsDir = path.join(process.cwd(), 'reports');
        this.currentCoverageFile = path.join(
            this.reportsDir,
            'coverage-summary.json',
        );
        this.previousCoverageFile = path.join(
            this.reportsDir,
            'previous-coverage.json',
        );
        this.historyFile = path.join(this.reportsDir, 'coverage-history.json');
    }

    loadCoverageData() {
        let currentCoverage = {};
        let previousCoverage = {};
        let history = [];

        try {
            currentCoverage = JSON.parse(
                fs.readFileSync(this.currentCoverageFile, 'utf8'),
            );
        } catch (e) {
            console.error(
                'Не удалось загрузить текущие данные покрытия:',
                e.message,
            );
        }

        try {
            previousCoverage = JSON.parse(
                fs.readFileSync(this.previousCoverageFile, 'utf8'),
            );
        } catch (e) {
            console.log('Предыдущие данные покрытия не найдены');
        }

        try {
            history = JSON.parse(fs.readFileSync(this.historyFile, 'utf8'));
        } catch (e) {
            console.log('История покрытия не найдена, создаем новую');
        }

        return { currentCoverage, previousCoverage, history };
    }

    getCoverageMetrics(coverage) {
        if (!coverage.total) return null;

        return {
            lines: coverage.total.lines?.pct || 0,
            functions: coverage.total.functions?.pct || 0,
            branches: coverage.total.branches?.pct || 0,
            statements: coverage.total.statements?.pct || 0,
            timestamp: new Date().toISOString(),
        };
    }

    calculateTrends(current, previous) {
        if (!current || !previous) return null;

        return {
            lines: current.lines - previous.lines,
            functions: current.functions - previous.functions,
            branches: current.branches - previous.branches,
            statements: current.statements - previous.statements,
        };
    }

    generateTrendStatus(trend) {
        if (trend > 1)
            return { status: 'significant-improvement', emoji: '🚀' };
        if (trend > 0) return { status: 'improvement', emoji: '📈' };
        if (trend < -1) return { status: 'significant-decline', emoji: '🔻' };
        if (trend < 0) return { status: 'decline', emoji: '📉' };
        return { status: 'stable', emoji: '➡️' };
    }

    generateDetailedReport(current, previous, trends, history) {
        const reportDate = new Date().toLocaleString('uk-UA', {
            timeZone: 'Europe/Kiev',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });

        const metricsHtml = ['lines', 'functions', 'branches', 'statements']
            .map((metric) => {
                const trendInfo = trends
                    ? this.generateTrendStatus(trends[metric])
                    : { status: 'unknown', emoji: '❓' };
                const prevValue = previous ? previous[metric] : 0;
                const trendValue = trends ? trends[metric] : 0;

                return `
          <tr class="metric-row ${trendInfo.status}">
            <td class="metric-name">${
                metric.charAt(0).toUpperCase() + metric.slice(1)
            }</td>
            <td class="current-value">${
                current ? current[metric].toFixed(2) : '0.00'
            }%</td>
            <td class="previous-value">${prevValue.toFixed(2)}%</td>
            <td class="trend-value">
              ${trendInfo.emoji} ${
                    trendValue > 0 ? '+' : ''
                }${trendValue.toFixed(2)}%
            </td>
          </tr>
        `;
            })
            .join('');

        const historyChartData = history.slice(-10).map((entry) => ({
            date: new Date(entry.timestamp).toLocaleDateString('uk-UA'),
            ...entry,
        }));

        return `
    <!DOCTYPE html>
    <html lang="uk">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Еженедельный отчет по тестированию</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          padding: 20px;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          background: white;
          border-radius: 12px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        
        .header {
          background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
          color: white;
          padding: 30px;
          text-align: center;
        }
        
        .header h1 {
          font-size: 2.5rem;
          margin-bottom: 10px;
          font-weight: 300;
        }
        
        .header .date {
          font-size: 1.1rem;
          opacity: 0.9;
        }
        
        .content {
          padding: 40px;
        }
        
        .metrics-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 40px;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .metrics-table th {
          background: #f8f9fa;
          padding: 16px;
          text-align: left;
          font-weight: 600;
          color: #2c3e50;
          font-size: 1.1rem;
        }
        
        .metrics-table td {
          padding: 16px;
          border-bottom: 1px solid #eee;
          font-size: 1rem;
        }
        
        .metric-row:hover {
          background: #f8f9fa;
          transition: background 0.3s ease;
        }
        
        .current-value {
          font-weight: 600;
          font-size: 1.2rem;
        }
        
        .trend-value {
          font-weight: 600;
          font-size: 1.1rem;
        }
        
        .improvement .trend-value { color: #27ae60; }
        .significant-improvement .trend-value { color: #27ae60; font-size: 1.3rem; }
        .decline .trend-value { color: #e74c3c; }
        .significant-decline .trend-value { color: #c0392b; font-size: 1.3rem; }
        .stable .trend-value { color: #7f8c8d; }
        
        .summary-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }
        
        .summary-card {
          background: linear-gradient(135deg, #ff7f7f 0%, #ff4757 100%);
          color: white;
          padding: 25px;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 8px 16px rgba(0,0,0,0.1);
        }
        
        .summary-card.positive {
          background: linear-gradient(135deg, #7bed9f 0%, #2ed573 100%);
        }
        
        .summary-card.neutral {
          background: linear-gradient(135deg, #a4b0be 0%, #57606f 100%);
        }
        
        .summary-card h3 {
          font-size: 1.8rem;
          margin-bottom: 10px;
        }
        
        .summary-card p {
          font-size: 1.1rem;
          opacity: 0.9;
        }
        
        .links-section {
          background: #f8f9fa;
          padding: 30px;
          border-radius: 8px;
          margin-top: 40px;
        }
        
        .links-section h2 {
          color: #2c3e50;
          margin-bottom: 20px;
          font-size: 1.5rem;
        }
        
        .links-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
        }
        
        .link-card {
          background: white;
          padding: 20px;
          border-radius: 8px;
          text-decoration: none;
          color: #2c3e50;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .link-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.15);
          text-decoration: none;
          color: #2c3e50;
        }
        
        .link-card h3 {
          margin-bottom: 8px;
          color: #3498db;
        }
        
        @media (max-width: 768px) {
          .header h1 { font-size: 2rem; }
          .content { padding: 20px; }
          .metrics-table th, .metrics-table td { padding: 12px; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📊 Еженедельный отчет по тестированию</h1>
          <div class="date">Згенеровано: ${reportDate}</div>
        </div>
        
        <div class="content">
          <div class="summary-cards">
            <div class="summary-card ${
                trends &&
                trends.lines +
                    trends.functions +
                    trends.branches +
                    trends.statements >
                    0
                    ? 'positive'
                    : trends &&
                      trends.lines +
                          trends.functions +
                          trends.branches +
                          trends.statements <
                          0
                    ? ''
                    : 'neutral'
            }">
              <h3>Общий тренд</h3>
              <p>${
                  trends
                      ? trends.lines +
                            trends.functions +
                            trends.branches +
                            trends.statements >
                        2
                          ? 'Значительное улучшение 🚀'
                          : trends.lines +
                                trends.functions +
                                trends.branches +
                                trends.statements >
                            0
                          ? 'Положительная динамика 📈'
                          : trends.lines +
                                trends.functions +
                                trends.branches +
                                trends.statements <
                            -2
                          ? 'Требует внимания 🔻'
                          : trends.lines +
                                trends.functions +
                                trends.branches +
                                trends.statements <
                            0
                          ? 'Небольшое снижение 📉'
                          : 'Стабильно ➡️'
                      : 'Первый отчет 🎯'
              }</p>
            </div>
            
            <div class="summary-card ${
                current && current.lines > 80
                    ? 'positive'
                    : current && current.lines > 60
                    ? 'neutral'
                    : ''
            }">
              <h3>Покрытие строк</h3>
              <p>${current ? `${current.lines.toFixed(1)}%` : 'N/A'}</p>
            </div>
            
            <div class="summary-card ${
                current && current.functions > 80
                    ? 'positive'
                    : current && current.functions > 60
                    ? 'neutral'
                    : ''
            }">
              <h3>Покрытие функций</h3>
              <p>${current ? `${current.functions.toFixed(1)}%` : 'N/A'}</p>
            </div>
          </div>
          
          <table class="metrics-table">
            <thead>
              <tr>
                <th>Метрика</th>
                <th>Текущее значение</th>
                <th>Предыдущее значение</th>
                <th>Тренд</th>
              </tr>
            </thead>
            <tbody>
              ${metricsHtml}
            </tbody>
          </table>
          
          <div class="links-section">
            <h2>🔗 Детальные отчеты</h2>
            <div class="links-grid">
              <a href="./coverage/index.html" class="link-card">
                <h3>📈 Детальный отчет покрытия</h3>
                <p>Полная информация о покрытии кода тестами</p>
              </a>
              
              <a href="./tests/test-report.html" class="link-card">
                <h3>🧪 Результаты тестов</h3>
                <p>Подробные результаты выполнения тестов</p>
              </a>
              
              <a href="./coverage/lcov-report/index.html" class="link-card">
                <h3>📊 LCOV отчет</h3>
                <p>Детализированный LCOV отчет покрытия</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
    `;
    }

    updateHistory(current) {
        if (!current) return;

        let history = [];
        try {
            history = JSON.parse(fs.readFileSync(this.historyFile, 'utf8'));
        } catch (e) {
            console.log('Creating new coverage history');
        }

        // Добавляем текущий отчет в историю
        const historyEntry = {
            ...current,
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleDateString('uk-UA'),
        };

        history.push(historyEntry);

        // Сохраняем только последние 50 записей
        if (history.length > 50) {
            history = history.slice(-50);
        }

        fs.writeFileSync(this.historyFile, JSON.stringify(history, null, 2));
    }

    generateSummaryJson(current, previous, trends) {
        const summary = {
            reportDate: new Date().toISOString(),
            current: current || {},
            previous: previous || {},
            trends: trends || {},
            status: this.getOverallStatus(trends),
            recommendations: this.generateRecommendations(current, trends),
        };

        fs.writeFileSync(
            path.join(this.reportsDir, 'summary.json'),
            JSON.stringify(summary, null, 2),
        );

        return summary;
    }

    getOverallStatus(trends) {
        if (!trends) return 'unknown';

        const totalTrend =
            trends.lines +
            trends.functions +
            trends.branches +
            trends.statements;

        if (totalTrend > 5) return 'excellent';
        if (totalTrend > 2) return 'good';
        if (totalTrend > -2) return 'stable';
        if (totalTrend > -5) return 'concerning';
        return 'critical';
    }

    generateRecommendations(current, trends) {
        const recommendations = [];

        if (!current)
            return [
                'Настройте сбор метрик покрытия для получения рекомендаций',
            ];

        // Рекомендации по низкому покрытию
        if (current.lines < 70) {
            recommendations.push(
                '📝 Покрытие строк ниже 70%. Рекомендуется добавить больше unit-тестов',
            );
        }

        if (current.functions < 80) {
            recommendations.push(
                '🔧 Покрытие функций ниже 80%. Убедитесь, что все публичные функции протестированы',
            );
        }

        if (current.branches < 75) {
            recommendations.push(
                '🌿 Низкое покрытие ветвлений. Добавьте тесты для всех условных конструкций',
            );
        }

        // Рекомендации по трендам
        if (trends) {
            if (trends.lines < -2) {
                recommendations.push(
                    '🔻 Покрытие строк значительно снизилось. Проверьте новый код на наличие тестов',
                );
            }

            if (trends.functions < -5) {
                recommendations.push(
                    '⚠️ Резкое снижение покрытия функций. Возможно, добавлены нетестируемые функции',
                );
            }

            // Позитивные рекомендации
            if (trends.lines > 5) {
                recommendations.push(
                    '🎉 Отличная работа! Покрытие строк значительно улучшилось',
                );
            }
        }

        // Общие рекомендации
        if (
            current.lines > 90 &&
            current.functions > 90 &&
            current.branches > 85
        ) {
            recommendations.push(
                '✨ Превосходное покрытие! Поддерживайте этот уровень качества',
            );
        }

        return recommendations.length > 0
            ? recommendations
            : ['📊 Продолжайте мониторить покрытие кода'];
    }

    async run() {
        console.log('🔍 Анализ трендов покрытия...');

        // Создаем директорию отчетов если её нет
        if (!fs.existsSync(this.reportsDir)) {
            fs.mkdirSync(this.reportsDir, { recursive: true });
        }

        const { currentCoverage, previousCoverage, history } =
            this.loadCoverageData();

        const current = this.getCoverageMetrics(currentCoverage);
        const previous = this.getCoverageMetrics(previousCoverage);
        const trends = this.calculateTrends(current, previous);

        console.log('📊 Текущие показатели:', current);
        console.log('📈 Тренды:', trends);

        // Обновляем историю
        if (current) {
            this.updateHistory(current);
        }

        // Генерируем детальный HTML отчет
        const detailedReport = this.generateDetailedReport(
            current,
            previous,
            trends,
            history,
        );
        fs.writeFileSync(
            path.join(this.reportsDir, 'index.html'),
            detailedReport,
        );

        // Генерируем JSON сводку
        const summary = this.generateSummaryJson(current, previous, trends);

        // Копируем текущий отчет как предыдущий для следующего раза
        if (current) {
            fs.writeFileSync(
                path.join(this.reportsDir, 'coverage-summary.json'),
                JSON.stringify(currentCoverage, null, 2),
            );
        }

        console.log('✅ Анализ трендов завершен');
        console.log(`📋 Статус: ${summary.status}`);
        console.log('💡 Рекомендации:');
        summary.recommendations.forEach((rec) => console.log(`   ${rec}`));

        return summary;
    }
}

// Запуск анализатора
if (require.main === module) {
    const analyzer = new CoverageTrendAnalyzer();
    analyzer.run().catch(console.error);
}

module.exports = CoverageTrendAnalyzer;
