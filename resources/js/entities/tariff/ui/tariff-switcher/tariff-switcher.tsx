import { AnimatePresence, motion } from 'framer-motion';
import { ComponentProps, useState } from 'react';
import { Tariff } from '../../model/types';
import { TariffSwitcherInfo } from './tariff-switcher-info';
import { TariffSwitcherTabs } from './tariff-switcher-tabs';

interface TariffTabsProps extends ComponentProps<"div"> {
    tariffs: Tariff[];
}

export const TariffSwitcher = (props: TariffTabsProps) => {
    const { tariffs } = props;
    const [activeIndex, setActiveIndex] = useState(0);
    const tariff = tariffs[activeIndex];
    return (
        <>
            <TariffSwitcherTabs
                tariffs={tariffs}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
            />
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    <TariffSwitcherInfo
                        key={activeIndex}
                        description={tariff.description}
                        term={tariff.term}
                        corrections={tariff.corrections}
                    />
                </motion.div>
            </AnimatePresence>
        </>
    );
};
