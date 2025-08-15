import { Text } from "@/shared/ui/text";
import { ComponentProps, useCallback, useEffect, useState } from "react";

interface PasswordCountdownProps extends ComponentProps<"p"> {
    targetDate: string;
    onEnd: () => void;
}

export const PasswordCountdown = (props: PasswordCountdownProps) => {
    const { targetDate, onEnd, ...rest } = props;

    const calcDiffSeconds = useCallback(() => {
        const now = new Date();
        const target = new Date(targetDate);
        return Math.max(0, Math.floor((target.getTime() - now.getTime()) / 1000));
    }, [targetDate]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const sec = seconds % 60;

        if (minutes === 0) {
            return `${sec} секунд`;
        } else {
            const minuteLabel = minutes === 1 ? "минута" : minutes < 5 ? "минуты" : "минут";
            return `${minutes} ${minuteLabel} ${sec} секунд`;
        }
    };

    const [secondsLeft, setSecondsLeft] = useState(calcDiffSeconds());

    useEffect(() => {
        if (secondsLeft === 0) return;

        const timer = setInterval(() => {
            setSecondsLeft(prev => {
                const next = prev - 1;
                if (next <= 0) {
                    clearInterval(timer);
                    onEnd();
                    return 0;
                }
                return next;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [secondsLeft, onEnd]);

    return <Text {...rest}>{formatTime(secondsLeft)}</Text>;
};
