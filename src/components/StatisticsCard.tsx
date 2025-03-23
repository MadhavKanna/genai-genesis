import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";

interface StatisticsCardProps {
    title: string;
    value: string | number;
    description?: string;
    trend?: {
        value: number;
        label: string;
        isPositive: boolean;
    };
    className?: string;
}

export default function StatisticsCard({
    title,
    value,
    description,
    trend,
    className = "",
}: StatisticsCardProps) {
    return (
        <Card className={`border-none bg-white/50 backdrop-blur-sm ${className}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {trend && (
                    <Badge
                        variant="outline"
                        className={`${trend.isPositive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                            }`}
                    >
                        {trend.value > 0 ? "+" : ""}
                        {trend.value}% {trend.label}
                    </Badge>
                )}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {description && (
                    <p className="text-xs text-muted-foreground mt-1">{description}</p>
                )}
            </CardContent>
        </Card>
    );
} 