"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.periodToMilliseconds = exports.periodToSeconds = exports.MetricPeriod = void 0;
var MetricPeriod;
(function (MetricPeriod) {
    MetricPeriod["MINUTE"] = "1 minute";
    MetricPeriod["FIVE_MINUTES"] = "5 minutes";
    MetricPeriod["FIFTEEN_MINUTES"] = "15 minutes";
    MetricPeriod["THIRTY_MINUTES"] = "30 minutes";
    MetricPeriod["HOUR"] = "1 hour";
    MetricPeriod["DAY"] = "1 day";
    MetricPeriod["WEEK"] = "1 week";
    MetricPeriod["MONTH"] = "1 month";
    MetricPeriod["THREE_MONTHS"] = "3 months";
    MetricPeriod["YEAR"] = "1 year";
})(MetricPeriod || (exports.MetricPeriod = MetricPeriod = {}));
const periodToSeconds = (period) => {
    switch (period) {
        case MetricPeriod.MINUTE:
            return 60;
        case MetricPeriod.FIVE_MINUTES:
            return 300;
        case MetricPeriod.FIFTEEN_MINUTES:
            return 900;
        case MetricPeriod.THIRTY_MINUTES:
            return 1800;
        case MetricPeriod.HOUR:
            return 3600;
        case MetricPeriod.DAY:
            return 86400;
        case MetricPeriod.WEEK:
            return 604800;
        case MetricPeriod.MONTH:
            return 2592000;
        case MetricPeriod.THREE_MONTHS:
            return 7776000;
        case MetricPeriod.YEAR:
            return 31536000;
    }
};
exports.periodToSeconds = periodToSeconds;
const periodToMilliseconds = (period) => (0, exports.periodToSeconds)(period) * 1000;
exports.periodToMilliseconds = periodToMilliseconds;
//# sourceMappingURL=metric-period.enum.js.map