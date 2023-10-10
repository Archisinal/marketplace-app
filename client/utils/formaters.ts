export const getPercentageDiff = (value: number) => {
        const isPositive = value > 0;
        let prefix = isPositive ? "+" : "";
        let suffix = "%";
        return `${prefix}${value} ${suffix}`
}