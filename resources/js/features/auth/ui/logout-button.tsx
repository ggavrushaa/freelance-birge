import { Card } from '@/shared/ui/card';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTrigger,
} from '@/shared/ui/drawer';
import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import classNames from 'classnames';

interface LogoutButtonProps {
    className?: string;
}

export const LogoutButton = (props: LogoutButtonProps) => {
    return (
        <Drawer>
            <DrawerTrigger className="w-full">
                <Card
                    className={classNames(
                        'btn-press flex flex-row items-center gap-2 px-4 py-3',
                        props.className,
                    )}
                >
                    <Text fontColor="primary" className="font-bold">
                        Выйти
                    </Text>
                    <img src="/icons/logout.svg" className="h-4.5 w-4.5" />
                </Card>
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
                        Выйти?
                    </Text>
                </DrawerHeader>
                <DrawerFooter className='pb-20'>
                    <div className="rounded-xl bg-[#efeff4] px-15 py-3 text-center">
                        <Text fontSize={11}>
                            Перед выходом с аккаунта вы должны убедиться что сохранили Сид фразу ,
                            без нее вход будет невозможен
                        </Text>
                    </div>
                    <div className="rounded-xl bg-[#efeff4] px-15 py-3 text-center btn-press">
                        <Title fontSize={24} className="font-medium text-red">
                            Я сохранил, Выйти
                        </Title>
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
