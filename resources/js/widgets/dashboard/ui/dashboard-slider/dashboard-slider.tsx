import 'swiper/css';
import 'swiper/css/pagination';
import "./dashboard-slider.css";
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Title } from '@/shared/ui/title';
import { Text } from '@/shared/ui/text';

interface DashboardSliderSlideProps {
    title: string;
    backgroundUrl: string;
    renderText: () => React.ReactNode;
}

export const DashboardSliderSlide = (props: DashboardSliderSlideProps) => {
    const { title, backgroundUrl, renderText } = props;
    return (
        <div style={{ backgroundImage: `url('${backgroundUrl}')` }} className={`rounded-xl bg-cover bg-center p-4.5`}>
            <Title className="font-bold text-white">{title}</Title>
            <Text fontSize={13} className="text-gray2">
                {renderText()}
            </Text>
        </div>
    );
};

export const DashboardSlider = () => {
    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={10}
            modules={[Pagination]}
            pagination={{ clickable: true }}
            className="px-6"
        >
            <SwiperSlide>
                <DashboardSliderSlide
                    title="VIP Club"
                    backgroundUrl="/vip.png"
                    renderText={() => (
                        <>
                            Join Vip club and receive <br /> exclusive bonuses
                        </>
                    )}
                />
            </SwiperSlide>
            <SwiperSlide>
                <DashboardSliderSlide
                    title="RIKI Premium"
                    backgroundUrl="/riki.png"
                    renderText={() => (
                        <>
                            Comisions 0%, Express mode, Analitics <br /> And 6 other func...
                        </>
                    )}
                />
            </SwiperSlide>
            <SwiperSlide>
                <DashboardSliderSlide
                    title="Топ Функций"
                    backgroundUrl="/functions.png"
                    renderText={() => (
                        <>
                            Покажем вам встроенные функции <br /> в нашем мини-приложении
                        </>
                    )}
                />
            </SwiperSlide>
        </Swiper>
    );
};
