import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTrigger } from "@/shared/ui/drawer";
import { Text } from "@/shared/ui/text";
import { Title } from "@/shared/ui/title";

interface NotificationClearButtonProps {
    onClear: () => void;
    className?: string;
}

export const NotificationClearButton = (props: NotificationClearButtonProps) => {
    const { onClear } = props;
    return (
        <Drawer>
            <DrawerTrigger className="w-full">
                <Text fontColor="primary" className='text-right'>Очистить</Text>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="relative flex flex-row items-center justify-between pt-2.5">
                    <DrawerClose>
                        <Title fontSize={19} className="text-primary">
                            Закрыть
                        </Title>
                    </DrawerClose>
                    <Text
                        fontSize={24}
                        fontColor="black"
                        className="absolute top-1 left-1/2 -translate-x-1/2 font-bold"
                    >
                        Уведомления
                    </Text>
                </DrawerHeader>
                <DrawerFooter className="pb-20">
                    <div className="rounded-xl bg-[#efeff4] px-4 py-3 text-center">
                        <Title className='font-medium'>Хотите очистить уведомления?</Title>
                        <Text fontSize={11}>
                            Вы больше не сможете восстановить историю уведомлений
                        </Text>
                    </div>
                    <div className="btn-press rounded-xl bg-[#efeff4] px-15 py-3 text-center">
                        <Title fontSize={24} className="font-medium text-red" onClick={onClear}>
                            Очистить
                        </Title>
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};