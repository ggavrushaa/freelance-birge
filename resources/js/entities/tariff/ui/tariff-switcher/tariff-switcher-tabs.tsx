import classNames from 'classnames';
import { Tariff } from '../../model/types';

interface TariffSwitcherTabsProps {
    tariffs: Tariff[];
    activeIndex: number;
    setActiveIndex: (index: number) => void;
}

export const TariffSwitcherTabs = (props: TariffSwitcherTabsProps) => {
    const { tariffs, activeIndex, setActiveIndex } = props;
    return (
        <div style={{ display: 'flex', position: 'relative' }}>
            {tariffs.map((tariff, index) => (
                <div
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={classNames('flex-1 cursor-pointer p-2 text-center', {
                        'text-primary': activeIndex === index,
                    })}
                >
                    {tariff.price}$
                </div>
            ))}
            <div
                className="absolute bottom-0 h-[2px] bg-primary"
                style={{
                    left: `${(100 / tariffs.length) * activeIndex}%`,
                    width: `${100 / tariffs.length}%`,
                    transition: 'left 0.3s ease',
                }}
            />
        </div>
    );
};
