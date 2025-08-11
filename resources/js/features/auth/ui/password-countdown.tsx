import { Text } from "@/shared/ui/text";
import { ComponentProps, useCallback, useEffect, useState } from "react";

interface PasswordCountdownProps extends ComponentProps<"p"> {
    targetDate: string;
}

export const PasswordCountdown = (props: PasswordCountdownProps) => {
    const { targetDate , ...rest} = props;

    const calcTimeLeft = useCallback(() => {
        const now = new Date();
        const target = new Date(targetDate);
        let diff = Math.floor((target.getTime() - now.getTime()) / 1000);

        if (diff < 0) diff = 0;

        const minutes = Math.floor(diff / 60);
        const seconds = diff % 60;

        if (minutes === 0) {
            return `${seconds} секунд`;
        } else {
            const minuteLabel = minutes === 1 ? 'минута' : minutes < 5 ? 'минуты' : 'минут';
            return `${minutes} ${minuteLabel} ${seconds} секунд`;
        }
    },[targetDate]);

    const [timeLeft, setTimeLeft] = useState(calcTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calcTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, [calcTimeLeft]);

    return <Text {...rest}>{timeLeft}</Text>;
}