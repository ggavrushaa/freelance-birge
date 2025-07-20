import { UserCard } from '@/entities/user';
import { Card } from '@/shared/ui/card';
import { Text } from '@/shared/ui/text';
import { Navbar } from '@/widgets/navbar';
import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

const ProfileShowPage = () => {
    return (
        <div className="flex-1 bg-[#efeff4] px-6 pt-20">
            <UserCard className='mb-6'/>
            <Card className='py-0 px-4 [&>div:last-of-type]:border-0 gap-0'>
                <div className='flex items-center border-b border-gray py-1.5'>
                    <img src="/icons/profile/stats.svg" />
                    <Text fontColor='black' className='ml-3'>Статистика</Text>
                    <img src="/icons/profile/arrow.svg" className='ml-auto'/>
                </div>
                <div className='flex items-center border-b border-gray py-1.5'>
                    <img src="/icons/profile/stats.svg" />
                    <Text fontColor='black' className='ml-3'>Статистика</Text>
                    <img src="/icons/profile/arrow.svg" className='ml-auto'/>
                </div>
            </Card>
        </div>
    );
};

ProfileShowPage.layout = (page: ReactNode) => (
    <main className="flex min-h-[100svh] flex-col">
        <Head title="Profile page" />
        {page}
        <footer>
            <Navbar />
        </footer>
    </main>
);

export default ProfileShowPage;
