export const getPercentageDiff = (value: number) => {
        const isPositive = value > 0;
        let prefix = isPositive ? "+" : "";
        let suffix = "%";
        return `${prefix}${value} ${suffix}`
}

export const capitalize = (value:string): string => {
        return value.charAt(0).toUpperCase() + value.toLocaleLowerCase().slice(1)
}